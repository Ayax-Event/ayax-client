import React from "react";
import { View, Text, FlatList, ScrollView, RefreshControl } from "react-native";
import Ticket from "../../../../components/Ticket";
import tailwind from "twrnc";
const tw = tailwind;

const HistoryScreenView = ({ historyTickets, onRefresh, refreshing }) => {
  return (
    <View style={tw`flex-1`}>
      {historyTickets.length > 0 ? (
        <FlatList
          data={historyTickets}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Ticket key={item._id} ticket={item} />}
          onRefresh={onRefresh}
          refreshing={refreshing}
          contentContainerStyle={tw`flex-grow`}
        />
      ) : (
        <ScrollView
          contentContainerStyle={tw`flex-1 justify-center items-center`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={tw`p-2 text-lg text-gray-600`}>No history tickets</Text>
        </ScrollView>
      )}
    </View>
  );
};

export default HistoryScreenView;
