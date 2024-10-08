import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import tailwind from "twrnc";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import { Color } from "../../../../constants/Color";
import Ticket from "../../../../components/Ticket";

const UpcomingScreenView = ({
  upcomingTickets,
  isLoading,
  onRefresh,
  refreshing,
  nav,
}) => {
  return (
    <View style={tailwind`flex-1 justify-center items-center p-4`}>
      {isLoading ? (
        <LoadingIndicator />
      ) : upcomingTickets.length > 0 ? (
        <FlatList
          data={upcomingTickets}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Ticket ticket={item} />}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      ) : (
        <View style={tailwind`flex-1 justify-center items-center`}>
          <Text
            style={tailwind`text-2xl font-bold text-gray-800 mb-2 text-center`}
          >
            Oops! No Upcoming Tickets
          </Text>
          <Text style={tailwind`text-lg text-gray-600 mb-2 text-center`}>
            It looks like you don't have any tickets yet.
          </Text>
          <Text style={tailwind`text-lg text-gray-600 mb-4 text-center`}>
            Why not buy a ticket and start your journey?
          </Text>
          <TouchableOpacity
            onPress={() => {
              nav.navigate("Home");
            }}
            style={[
              tailwind`px-6 py-2 rounded-full shadow-md`,
              { backgroundColor: Color.primary },
            ]}
          >
            <Text style={tailwind`text-white font-semibold text-lg`}>
              Buy a Ticket
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UpcomingScreenView;
