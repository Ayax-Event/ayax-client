import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Dashboard";
import EventDetailScreen from "../screens/Dashboard/Event/EventDetailScreen";
import ChangePasswordScreen from "../screens/Dashboard/Profile/ChangePasswordScreen";
import ProfileEditScreen from "../screens/Dashboard/Profile/ProfileEditScreen";
import EventExploreScreen from "../screens/Dashboard/Event/EventExploreScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SplashScreen from "../screens/Splashscreen";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import NetworkLogger from "react-native-network-logger";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const [isNetworkLogShown, setIsNetworkLogShown] = useState(false);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "white",
        },
      }}
    >
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : isLoggedIn ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="DashboardTab"
              component={Dashboard}
            />
            <Stack.Screen name="EventDetail" component={EventDetailScreen} />
            <Stack.Screen name="EventExplore" component={EventExploreScreen} />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={LoginScreen}
              options={{
                headerTitle: "",
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              options={{ headerShown: false }}
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
      <Modal visible={isNetworkLogShown}>
        <NetworkLogger />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 32,
            left: 32,
            backgroundColor: "white",
            padding: 16,
            borderRadius: 32,
          }}
          onPress={() => setIsNetworkLogShown(false)}
        >
          <Text style={{ fontSize: 32 }}>{"X"}</Text>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 32,
          left: 32,
          backgroundColor: "white",
          padding: 16,
          borderRadius: 32,
        }}
        onPress={() => setIsNetworkLogShown(true)}
      >
        <Text style={{ fontSize: 32 }}>{"+"}</Text>
      </TouchableOpacity>
    </NavigationContainer>
  );
};

export default Navigation;
