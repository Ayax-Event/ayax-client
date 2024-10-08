import React from "react";
import { View, Text } from "react-native";

const UnpaidScreenView = ({ unpaidTickets }) => {
  return (
    <View>
      {unpaidTickets.length > 0 ? (
        <View>
          <Text>Unpaid Screen</Text>
          <Text>{JSON.stringify(unpaidTickets)}</Text>
        </View>
      ) : (
        <Text>No history tickets</Text>
      )}
    </View>
  );
};

export default UnpaidScreenView;
