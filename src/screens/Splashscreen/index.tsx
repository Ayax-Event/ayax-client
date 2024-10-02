import React from "react";
import styles from "./styles";
import ayaxLogo from "../../assets/ayax-logo.png";
import { Image, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={ayaxLogo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;
