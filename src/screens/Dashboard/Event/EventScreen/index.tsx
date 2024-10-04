import React, { useEffect, useState, useCallback, useContext } from "react";
import { Alert } from "react-native";
import EventScreenView from "./view";
import { getAllCategory, getAllEvents } from "../../../../utils/api";
import { Event, Pagination, Category } from "../../../../type";
import { AuthContext } from "../../../../contexts/AuthContext";

const EventScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleCategorySelect = useCallback(
    (categoryName: string, categoryId: string) => {
      setSelectedCategory((prevCategory) =>
        prevCategory === categoryName ? null : categoryName
      );
      setSelectedCategoryId((prevId) =>
        prevId === categoryId ? null : categoryId
      );
      setEvents([]);
      setPage(1);
    },
    []
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategory();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      Alert.alert("Error", "Failed to fetch categories. Please try again.");
    }
  }, []);

  const fetchEvents = useCallback(
    async (pageNumber: number, refresh = false) => {
      setIsLoading(true);
      try {
        const data = await getAllEvents(pageNumber, selectedCategoryId || "");
        const newData = data.data;
        setEvents((prevData) =>
          refresh ? newData : [...prevData, ...newData]
        );
        setPagination(data.pagination);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        Alert.alert("Error", "Failed to fetch events. Please try again.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [selectedCategoryId]
  );

  const fetchMore = useCallback(() => {
    if (!isLoading && pagination?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, pagination]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchEvents(page, page === 1);
  }, [page, fetchEvents]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategoryId]);

  return (
    <EventScreenView
      handleCategorySelect={handleCategorySelect}
      events={events}
      fetchMore={fetchMore}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
      user={user}
      categories={categories}
      selectedCategory={selectedCategory}
    />
  );
};

export default EventScreen;
