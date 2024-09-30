import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Dashboard";
// import CreatePostScreen from "../screens/Dashboard/Home/CreatePostScreen";
// import PostDetailScreen from "../screens/Dashboard/Home/PostDetailScreen";
// import LoginScreen from "../screens/Auth/LoginScreen";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import SplashScreen from "../screens/SplashScreen";
// import RegisterScreen from "../screens/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  //   const { isLoggedIn, isLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="DashboardTab"
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
