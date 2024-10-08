import { useEffect, useState } from "react";
import UnpaidScreenView from "./view";
import { getOrders } from "../../../../utils/api";
import { Alert } from "react-native";

const UnpaidScreen = () => {
  const [unpaidTickets, setUnpaidTickets] = useState([]);

  const fetchUnpaidTickets = async () => {
    try {
      const response = await getOrders("?filter_status=pending,expire");
      console.log(response, "response");
      setUnpaidTickets(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch unpaid tickets: " + error);
    }
  };

  useEffect(() => {
    fetchUnpaidTickets();
  }, []);
  return <UnpaidScreenView unpaidTickets={unpaidTickets} />;
};

export default UnpaidScreen;
