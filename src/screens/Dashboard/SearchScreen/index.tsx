import React from "react";
import SearchScreenView from "./view";
import WebView from "react-native-webview";

const SearchScreen = () => {
  return (
    <WebView source={{ uri: "https://www.google.com" }} style={{ flex: 1 }} />
  );
};

export default SearchScreen;
