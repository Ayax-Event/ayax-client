import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import EventScreen from "./Event/EventScreen";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerTitle: "",
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen name="Home" component={EventScreen} />
    </Tab.Navigator>
  );
};

export default Dashboard;
