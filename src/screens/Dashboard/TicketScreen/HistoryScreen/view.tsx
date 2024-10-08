import React from "react";
import { View, Text, FlatList } from "react-native";
import Ticket from "../../../../components/Ticket";
import tailwind from "twrnc";
const tw = tailwind;

const HistoryScreenView = ({ historyTickets }) => {
  return (
    <View>
      {historyTickets.length > 0 ? (
        <FlatList
          data={historyTickets}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Ticket key={item._id} ticket={item} />}
        />
      ) : (
        <Text style={tw`p-2`}>No history tickets</Text>
      )}
    </View>
  );
};

export default HistoryScreenView;
