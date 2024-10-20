import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingScreen from "./UpcomingScreen";
import UnpaidScreen from "./UnpaidScreen";
import HistoryScreen from "./HistoryScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../../../constants/Color";

const Tab = createMaterialTopTabNavigator();

const TicketScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: Color.primary },
      }}
    >
      <Tab.Screen name="Upcoming" component={UpcomingScreen} />
      <Tab.Screen name="Unpaid" component={UnpaidScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
};

export default TicketScreen;
