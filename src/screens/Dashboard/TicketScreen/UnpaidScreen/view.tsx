import React from "react";
import { View, Text, FlatList } from "react-native";
import Ticket from "../../../../components/Ticket";

const UnpaidScreenView = ({ unpaidTickets }) => {
  return (
    <View>
      {unpaidTickets.length > 0 ? (
        <FlatList
          data={unpaidTickets}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Ticket key={item._id} ticket={item} />}
        />
      ) : (
        <Text>No history tickets</Text>
      )}
    </View>
  );
};

export default UnpaidScreenView;
