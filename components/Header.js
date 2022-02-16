import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Foundation, Ionicons } from "@expo/vector-icons";

export default function Header({ title, callEnabled, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => console.log(navigation.goBack())}
          style={{ padding: 9 }}
        >
          <Ionicons name="chevron-back-outline" size={36} color="#FF5864" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity
          style={{
            borderRadius: 200,
            padding: 9,
            marginRight: 20,

            backgroundColor: "#EF9A9A",
          }}
        >
          <Ionicons name="call" size={29} color="red"></Ionicons>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
