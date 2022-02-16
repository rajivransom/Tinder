import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SenderMessage({ key, messages }) {
  return (
    <View
      style={{
        borderRadius: 20,
        backgroundColor: "#8E24AA",
        paddingHorizontal: 20,
        paddingVertical: 15,

        alignSelf: "flex-start",
        marginLeft: "auto",
      }}
    >
      <Text style={{ color: "white" }}>{messages.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
