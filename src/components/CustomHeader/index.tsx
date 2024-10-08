import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import ayaxLogo from "../../assets/ayax-logo.png"; // Adjust the import path as needed
import { Color } from "../../constants/Color";

const CustomHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={ayaxLogo} style={styles.logo} />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 14,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CustomHeader;
