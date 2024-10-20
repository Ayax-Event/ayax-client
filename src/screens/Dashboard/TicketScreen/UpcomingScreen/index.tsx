import React, { useEffect, useState } from "react";
import UpcomingScreenView from "./view";
import { getOrders } from "../../../../utils/api";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UpcomingScreen = () => {
  const [upcomingTickets, setUpcomingTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const nav = useNavigation();
  const fetchUpcomingTickets = async () => {
    setIsLoading(true);
    try {
      const response = await getOrders(
        "?filter_status=paid&filter_eventType=upcoming"
      );

      setUpcomingTickets(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch upcoming tickets: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingTickets();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUpcomingTickets();
    setRefreshing(false);
  };

  return (
    <UpcomingScreenView
      upcomingTickets={upcomingTickets}
      isLoading={isLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
      nav={nav}
    />
  );
};

export default UpcomingScreen;
