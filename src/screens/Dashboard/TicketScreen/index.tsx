import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingScreen from "./UpcomingScreen";
import UnpaidScreen from "./UnpaidScreen";
import HistoryScreen from "./HistoryScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const TicketScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="Upcoming" component={UpcomingScreen} />
        <Tab.Screen name="Unpaid" component={UnpaidScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TicketScreen;
