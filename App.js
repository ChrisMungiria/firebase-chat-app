// Navigation imports
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Auth Stack
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";

// React Redux
import { Provider, useSelector } from "react-redux";
import store from "./store";

// React Native
import { Platform, StatusBar } from "react-native";

// Protected Tabe Navigator
import GroupChats from "./screens/protected/GroupChats";
import Profile from "./screens/protected/Profile";

// Icons
import { Ionicons } from "@expo/vector-icons";

function ProtectedStack() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="GroupChats"
        component={GroupChats}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Main() {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
      {user ? <ProtectedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle={`${
          Platform.OS !== "android" ? "dark-content" : "light-content"
        }`}
      />
      <Main />
    </Provider>
  );
}
