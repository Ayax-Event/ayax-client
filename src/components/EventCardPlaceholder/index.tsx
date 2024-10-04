import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import tw from "twrnc";

const EventCardPlaceholder = ({ isHorizontal = false }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const containerStyle = isHorizontal ? tw`w-72 m-2` : tw`w-full`;

  return (
    <Animated.View
      style={[tw`bg-gray-200 h-68 rounded-xl p-3`, containerStyle, { opacity }]}
    >
      {/* Placeholder for image */}
      <View style={tw`w-full h-40 rounded-xl bg-gray-300 mb-2`} />

      {/* Placeholder for event name */}
      <View style={tw`w-3/4 h-5 bg-gray-300 rounded mb-2`} />

      {/* Placeholder for event date */}
      <View style={tw`w-1/2 h-4 bg-gray-300 rounded mb-2`} />

      {/* Placeholder for event location */}
      <View style={tw`flex-row items-center mb-2`}>
        <View style={tw`w-4 h-4 bg-gray-300 rounded-full`} />
        <View style={tw`ml-2 w-3/4 h-4 bg-gray-300 rounded`} />
      </View>

      {/* Placeholder for favorite button */}
      <View
        style={tw`absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full`}
      />
    </Animated.View>
  );
};

export default EventCardPlaceholder;
