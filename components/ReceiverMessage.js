import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ReceiverMessage({ messages, key }) {
  console.log(messages.message);
  return (
    <View
      style={{
        borderRadius: 200,
        backgroundColor: "#8E24AA",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: 10,
        width: 100,
        marginVertical: 8,
        alignSelf: "flex-start",
        marginLeft: "auto",
      }}
    >
      <Text style={{ color: "white" }}>{messages.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
