import React, { useEffect, useState } from "react";
import EventDetailScreenView from "./view";
import { getEventDetail } from "../../../../utils/api";
import axios from "axios";

const EventDetailScreen = ({ route }) => {
  const { eventId } = route.params;
  const [eventData, setEventData] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const res = await getEventDetail(eventId);
      setEventData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (eventData) {
      const getAddressFromLatLng = async () => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${eventData.location.latitude},${eventData.location.longtitude}&key=${process.env.EXPO_GOOGLE_MAPS_API_KEY}`
          );

          if (response.data.status === "OK") {
            const result = response.data.results[0];
            setAddress(result.formatted_address);
          } else {
            console.error("Geocoding failed:", response.data.status);
          }
        } catch (error) {
          console.error("Error fetching the address:", error);
        }
      };
      getAddressFromLatLng();
    }
  }, [eventData]);

  console.log(eventData);
  return (
    <EventDetailScreenView
      eventData={eventData}
      loading={loading}
      address={address}
    />
  );
};

export default EventDetailScreen;
