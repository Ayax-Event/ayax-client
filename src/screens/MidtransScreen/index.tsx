import React from "react";
import MidtransScreenView from "./view";

const MidtransScreen = ({ route }) => {
  const { uri } = route.params;
  return <MidtransScreenView uri={uri} />;
};

export default MidtransScreen;
