import { useEffect, useState } from "react";
import UnpaidScreenView from "./view";
import { getOrders } from "../../../../utils/api";
import { Alert } from "react-native";

const UnpaidScreen = () => {
  const [unpaidTickets, setUnpaidTickets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUnpaidTickets = async () => {
    setIsLoading(true);
    try {
      const response = await getOrders("?filter_status=pending,expire");
      console.log(response, "response");
      setUnpaidTickets(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch unpaid tickets: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUnpaidTickets();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUnpaidTickets();
    setRefreshing(false);
  };

  return (
    <UnpaidScreenView
      unpaidTickets={unpaidTickets}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default UnpaidScreen;
