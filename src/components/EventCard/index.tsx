import React, { FC, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import { Color } from "../../constants/Color";
import { dateConverter } from "../../utils/function/dateConverter";
import { useNavigation } from "@react-navigation/native";
import useLatLngToAddress from "../../hooks/useLatLngToAddress";

interface EventCardProps {
  eventImage: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  isHorizontal?: boolean;
  eventId: string;
}

const EventCard: FC<EventCardProps> = ({
  eventImage,
  eventName,
  eventDate,
  eventLocation,
  isHorizontal = false,
  eventId,
}) => {
  const [address, setAddress] = useState("");

  const { latitude, longtitude } = eventLocation;

  useLatLngToAddress(latitude, longtitude, setAddress);

  const [isFavorite, setIsFavorite] = useState(false);
  const nav = useNavigation();
  const containerStyle = isHorizontal ? tw`w-72 m-2` : tw`w-full`;
  const imageStyle = isHorizontal
    ? tw`w-full h-40 rounded-xl mb-2`
    : tw`w-full h-40 rounded-xl mb-2`;

  const handleCardPress = () => {
    nav.navigate("EventDetail", { eventId });
  };

  const handleLoveIconPress = (event: any) => {
    event.stopPropagation(); // Prevent card onPress from triggering
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      style={[tw`bg-white h-68 rounded-xl shadow-md p-3`, containerStyle]}
    >
      <Image source={{ uri: eventImage }} style={imageStyle} />
      <View style={tw`flex-1 h-24`}>
        <Text style={tw`text-base font-bold mb-1`} numberOfLines={1}>
          {eventName}
        </Text>
        <Text
          style={[
            tw`font-semibold mb-1`,
            { color: Color.primary, fontSize: 14 },
          ]}
          numberOfLines={1}
        >
          {dateConverter(eventDate)}
        </Text>
        <View style={tw`flex-row items-center mb-1`}>
          <Icon name="map-marker" size={16} color={Color.primary} />
          <Text style={tw`ml-1 text-sm text-gray-700`} numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleLoveIconPress} // Handle the love icon press
        style={tw`absolute top-4 right-4 bg-white bg-opacity-30 rounded-full p-2`}
      >
        <Icon
          name={isFavorite ? `heart` : `heart-o`}
          size={20}
          color={Color.primary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EventCard;
