import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import home from "./screens/home";

import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Match from "./screens/Match";
import MessageScreen from "./screens/MessageScreen";

import useAuth from "./hooks/useAuth";
import Modalscreen from "./screens/ModalScreen";

export default function Stacknavigator() {
  const Stack = createNativeStackNavigator();
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={home}></Stack.Screen>
            <Stack.Screen
              options={{ gestureEnabled: true, gestureDirection: "horzontal" }}
              name="Chat"
              component={Chat}
            ></Stack.Screen>
            <Stack.Screen
              name="MessageScreen"
              component={MessageScreen}
            ></Stack.Screen>
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={Match}></Stack.Screen>
          </Stack.Group>
          <>
            <Stack.Group
              screenOptions={{
                presentation: "modal",
              }}
            >
              <Stack.Screen
                options={{
                  animationTypeForReplace: "pop",
                  orientation: "portrait",
                  presentation: "fullScreenModal",
                }}
                name="ModalScreen"
                component={Modalscreen}
              ></Stack.Screen>
            </Stack.Group>
          </>
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
