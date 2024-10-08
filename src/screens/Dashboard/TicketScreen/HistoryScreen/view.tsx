import React from "react";
import { View, Text } from "react-native";

const HistoryScreenView = ({ historyTickets }) => {
  return (
    <View>
      {historyTickets.length > 0 ? (
        <View>
          <Text>History Screen</Text>
          <Text>{JSON.stringify(historyTickets)}</Text>
        </View>
      ) : (
        <Text>No history tickets</Text>
      )}
    </View>
  );
};

export default HistoryScreenView;
