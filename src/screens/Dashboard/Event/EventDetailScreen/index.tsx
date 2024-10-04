import React, { useEffect, useState } from "react";
import EventDetailScreenView from "./view";
import { getEventDetail } from "../../../../utils/api";

const EventDetailScreen = ({ route }) => {
  const { eventId } = route.params;
  const [eventData, setEventData] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(false);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const res = await getEventDetail(eventId);
      console.log(res, "<<<<<<<<<<");
      setEventData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]); // Add eventId as dependency

  console.log(eventData);
  return <EventDetailScreenView eventData={eventData} loading={loading} />;
};

export default EventDetailScreen;
