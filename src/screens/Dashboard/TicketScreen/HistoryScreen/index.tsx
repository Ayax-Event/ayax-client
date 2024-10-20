import { useEffect, useState } from "react";
import HistoryScreenView from "./view";
import { getOrders } from "../../../../utils/api";
import { Alert } from "react-native";

const HistoryScreen = () => {
  const [historyTickets, setHistoryTickets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistoryTickets = async () => {
    setIsLoading(true);
    try {
      const response = await getOrders(
        "?filter_status=paid&filter_eventType=historical"
      );
      setHistoryTickets(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch history tickets: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryTickets();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHistoryTickets();
    setRefreshing(false);
  };
  return (
    <HistoryScreenView
      historyTickets={historyTickets}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default HistoryScreen;
