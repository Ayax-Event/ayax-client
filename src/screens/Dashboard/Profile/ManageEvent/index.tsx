import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ManageEventsView from "./view";
import { getMyEvents } from "../../../../utils/api";
import { useNavigation } from "@react-navigation/native";

const ManageEvent = () => {
  const [myEvents, setMyEvents] = useState([]);
  const nav = useNavigation();

  const fetchMyEvent = async () => {
    try {
      const response = await getMyEvents();
      const data = await response.data.data;
      setMyEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyEvent();
  }, []);

  return <ManageEventsView myEvents={myEvents} nav={nav} />;
};

export default ManageEvent;
