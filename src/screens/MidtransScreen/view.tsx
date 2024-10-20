import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const MidtransScreenView = ({ uri }) => {
  return uri ? (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri }}
        onNavigationStateChange={(state) => {
          console.log(state, "state");
        }}
      />
    </SafeAreaView>
  ) : null;
};

export default MidtransScreenView;
