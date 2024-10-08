import React from "react";
import { ActivityIndicator, View } from "react-native";
import tailwind from "twrnc";

const LoadingIndicator = () => {
  return (
    <View style={tailwind`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default LoadingIndicator;
