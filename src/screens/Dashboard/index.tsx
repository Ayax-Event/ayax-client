import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import EventScreen from "./Event/EventScreen";
import SearchScreen from "./SearchScreen";
import AddEventScreen from "./AddEventScreen";
import TicketScreen from "./TicketScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color } from "../../constants/Color";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStatusBarHeight: 0,
        headerTitle: "",
        headerShadowVisible: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "AddEvent":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;
            case "Ticket":
              iconName = focused ? "ticket" : "ticket-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.secondary,
      })}
    >
      <Tab.Screen name="Home" component={EventScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="AddEvent" component={AddEventScreen} />
      <Tab.Screen name="Ticket" component={TicketScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Dashboard;
