import { useEffect, useState } from "react";
import HistoryScreenView from "./view";
import { getOrders } from "../../../../utils/api";
import { Alert } from "react-native";

const HistoryScreen = () => {
  const [historyTickets, setHistoryTickets] = useState([]);

  const fetchHistoryTickets = async () => {
    try {
      const response = await getOrders(
        "?filter_status=paid&filter_eventType=historical"
      );
      setHistoryTickets(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch history tickets: " + error);
    }
  };

  useEffect(() => {
    fetchHistoryTickets();
  }, []);
  return <HistoryScreenView historyTickets={historyTickets} />;
};

export default HistoryScreen;
