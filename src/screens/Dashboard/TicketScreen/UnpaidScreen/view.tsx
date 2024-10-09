import React from "react";
import { View, Text, FlatList, ScrollView, RefreshControl } from "react-native";
import Ticket from "../../../../components/Ticket";
import tailwind from "twrnc";

const UnpaidScreenView = ({ unpaidTickets, onRefresh, refreshing }) => {
  return (
    <View style={tailwind`flex-1`}>
      {unpaidTickets.length > 0 ? (
        <FlatList
          data={unpaidTickets}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Ticket key={item._id} ticket={item} />}
          onRefresh={onRefresh}
          refreshing={refreshing}
          contentContainerStyle={tailwind`flex-grow`}
        />
      ) : (
        <ScrollView
          contentContainerStyle={tailwind`flex-1 justify-center items-center`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={tailwind`p-2 text-lg text-gray-600`}>
            No unpaid tickets
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default UnpaidScreenView;
