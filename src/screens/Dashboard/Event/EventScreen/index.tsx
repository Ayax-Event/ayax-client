import React, { useEffect, useState, useCallback, useContext } from "react";
import { Alert } from "react-native";
import EventScreenView from "./view";
import { getAllCategory, getAllEvents } from "../../../../utils/api";
import { Event, Pagination } from "../../../../type";
import { AuthContext } from "../../../../contexts/AuthContext";

const EventScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategory();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchEvents = useCallback(
    async (pageNumber: number, refresh = false) => {
      setIsLoading(true);
      try {
        const res = await getAllEvents(pageNumber);
        const newData = res.data.data;
        setEvents((prevData) =>
          refresh ? newData : [...prevData, ...newData]
        );
        setPagination(res.data.pagination);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch events. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );
  const fetchMore = () => {
    if (!isLoading && pagination?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setEvents([]);
    setIsRefreshing(true);
    setPage(1);
    // fetchEvents(1, true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchEvents(page);
  }, [page, fetchEvents]);

  return (
    <EventScreenView
      events={events}
      fetchMore={fetchMore}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
      user={user}
      categories={categories}
    />
  );
};

export default EventScreen;
