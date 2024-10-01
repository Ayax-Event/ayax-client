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

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isLoggedIn = true;
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
        <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DashboardTab"
          component={Dashboard}
        />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="EventExplore" component={EventExploreScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <Stack.Screen name="SignUp" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
