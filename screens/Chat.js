import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import ChatList from "../components/ChatList";
import { StyleSheet, Text, View } from "react-native";

export default function Chat({ navigation }) {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled={false} navigation={navigation} />
      <ChatList navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
