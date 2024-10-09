import React from "react";
import { View, Text, FlatList, ScrollView, RefreshControl } from "react-native";
import tailwind from "twrnc";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import Ticket from "../../../../components/Ticket";

const YourComponent = ({
  isLoading,
  onRefresh,
  refreshing,
  upcomingTickets,
}) => {
  if (isLoading) {
    return (
      <ScrollView
        contentContainerStyle={tailwind`flex-1 justify-center items-center`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LoadingIndicator />
      </ScrollView>
    );
  }

  if (upcomingTickets.length > 0) {
    return (
      <FlatList
        data={upcomingTickets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Ticket ticket={item} />}
        onRefresh={onRefresh}
        refreshing={refreshing}
        contentContainerStyle={tailwind`flex-grow`}
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={tailwind`flex-1 justify-center items-center`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={tailwind`flex-1 justify-center items-center`}>
        <Text
          style={tailwind`text-2xl font-bold text-gray-800 mb-2 text-center`}
        >
          Oops! No Upcoming Tickets
        </Text>
        <Text style={tailwind`text-lg text-gray-600 mb-2 text-center`}>
          It looks like you don't have any tickets yet.
        </Text>
      </View>
    </ScrollView>
  );
};

export default YourComponent;
