import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import EventCard from "../../../../components/EventCard";
import Icon from "react-native-vector-icons/FontAwesome";
import tailwind from "twrnc";
import { Color } from "../../../../constants/Color";
const tw = tailwind;

const ManageEventsView = ({ myEvents, nav }) => {
  return (
    <View style={tw`p-4`}>
      <FlatList
        data={myEvents}
        renderItem={({ item }) => (
          <View style={tw`mb-4`}>
            <EventCard
              inManageEvent={true}
              userId={item.userId}
              eventImage={item.thumbnail}
              eventDate={item.dateOfEvent}
              eventName={item.eventName}
              eventId={item._id}
              eventLocation={item.location}
            />
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
      {/* Camera Icon */}
      <TouchableOpacity
        style={tw`absolute bottom-4 right-4 bg-white rounded-full p-4 shadow-lg`}
        onPress={() => nav.navigate("CameraScreen")}
      >
        <Icon name="camera" size={30} color={Color.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default ManageEventsView;
