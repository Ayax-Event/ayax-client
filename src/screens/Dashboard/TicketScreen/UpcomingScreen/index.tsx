import React, { useEffect, useState } from "react";
import UpcomingScreenView from "./view";
import { getOrders } from "../../../../utils/api";
import { Alert } from "react-native";

const UpcomingScreen = () => {
  const [upcomingTickets, setUpcomingTickets] = useState([]);

  useEffect(() => {
    const fetchUpcomingTickets = async () => {
      try {
        const response = await getOrders(
          "?filter_status=paid&filter_eventType=upcoming"
        );

        setUpcomingTickets(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch upcoming tickets: " + error);
      }
    };

    fetchUpcomingTickets();
  }, []);

  return <UpcomingScreenView upcomingTickets={upcomingTickets} />;
};

export default UpcomingScreen;
