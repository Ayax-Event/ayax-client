import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color } from "../../constants/Color";
import EventScreen from "./Event/EventScreen";
import SearchScreen from "./SearchScreen";
import AddEventScreen from "./AddEventScreen";
import TicketScreen from "./TicketScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
          header: ({ route }) => {
            let title = route.name;
            if (route.name === "AddEvent") {
              title = "Add Event";
            }
            return <CustomHeader title={title} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={EventScreen}
        />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="AddEvent" component={AddEventScreen} />
        <Tab.Screen name="Ticket" component={TicketScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Dashboard;
