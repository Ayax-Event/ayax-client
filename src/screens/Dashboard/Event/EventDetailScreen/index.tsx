import React, { useEffect, useState } from "react";
import EventDetailScreenView from "./view";
import { createOrder, getEventDetail } from "../../../../utils/api";
import axios from "axios";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface RouteParams {
  eventId: string;
}

interface EventDetailScreenProps {
  route: {
    params: RouteParams;
  };
}

interface Ticket {
  _id: string;
  type: string;
}

interface EventData {
  tickets: Ticket[];
  location: {
    latitude: number;
    longtitude: number;
  };
}

interface BookingInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  ticketType: string;
  ticketQuantity: string;
  ticketId: string | null;
}

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { eventId } = route.params;
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    ticketType: "",
    ticketQuantity: "1",
    ticketId: null,
  });

  const handleInputChange = (field: keyof BookingInfo, value: string) => {
    if (field === "ticketType") {
      const selectedTicket = eventData?.tickets.find(
        (ticket) => ticket.type === value
      );
      setBookingInfo((prevInfo) => ({
        ...prevInfo,
        ticketType: value,
        ticketId: selectedTicket ? selectedTicket._id : null,
      }));
    } else {
      setBookingInfo((prevInfo) => ({
        ...prevInfo,
        [field]: value,
      }));
    }
  };

  const handleBooking = async () => {
    try {
      console.log("Booking info:", bookingInfo);
      const res = await createOrder(bookingInfo);
      console.log(res.data);
      if (res.data) {
        navigation.navigate("Midtrans", { uri: res.data.redirect_url });
      }
      setShowBookingModal(false);
    } catch (error) {
      Alert.alert("Error book event: ", error.message);
      console.log(error);
    }
  };

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

  return (
    <EventDetailScreenView
      eventData={eventData}
      loading={loading}
      address={address}
      setShowBookingModal={setShowBookingModal}
      handleInputChange={handleInputChange}
      handleBooking={handleBooking}
      showBookingModal={showBookingModal}
      bookingInfo={bookingInfo}
    />
  );
};

export default EventDetailScreen;
