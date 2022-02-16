import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function Match({ route, navigation }) {
  console.log(route.params);
  return (
    //    loggedInProfile,
    //userswiped
    // <Text>{route.params.loggedInProfile.displayName}</Text>
    //<Text>{route.params.userSwiped.displayName}</Text>
    <View
      style={{
        height: "100%",
        paddingTop: 100,
        backgroundColor: "#F44336",
        opacity: 0.89,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          paddingTop: 100,
          paddingHorizontal: 50,
        }}
      >
        <Image
          style={{ height: 100, width: 300 }}
          resizeMode="contain"
          source={{ uri: "http://links.papareact.com/mg9" }}
        ></Image>
      </View>
      <Text style={{ color: "white", textAlign: "center", marginTop: 25 }}>
        You And {route.params.userSwiped.displayName} have Liked each other.
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 25,
        }}
      >
        <Image
          style={{ height: 140, width: 140, borderRadius: 200 }}
          source={{ uri: route.params.loggedInProfile.photoURL }}
        ></Image>
        <Image
          style={{ height: 140, width: 140, borderRadius: 200 }}
          source={{ uri: route.params.userSwiped.photoURL }}
        ></Image>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
        style={{
          backgroundColor: "white",
          margin: 25,
          paddingVertical: 32,
          borderRadius: 200,
          marginTop: 100,
        }}
      >
        <Text style={{ textAlign: "center" }}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
