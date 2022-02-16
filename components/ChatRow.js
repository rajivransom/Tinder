import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../LIB/getMatchedUserInfo";

export default function ChatRow({ matchedDetails, navigation }) {
  const { user } = useAuth();
  const [matchedUserInfo, setmatchedUserInfo] = useState(user);
  console.log(matchedDetails);

  useEffect(() => {
    setmatchedUserInfo(getMatchedUserInfo(matchedDetails.users, user.uid));
  }, [matchedDetails, user]);
  console.log("mui");
  console.log(matchedUserInfo.PhotoURL);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MessageScreen", { matchedDetails })}
      style={{
        flexDirection: "row",
        marginTop: 10,
        backgroundColor: "#FFF",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 1,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1.41,
        elevation: 2,
      }}
    >
      <Image
        style={{ borderRadius: 200, height: 80, width: 80, marginRight: 18 }}
        source={{ uri: matchedUserInfo.photoURL }}
      ></Image>
      <View>
        <Text style={{ fontWeight: "bold" }}>
          {matchedUserInfo.displayName}
        </Text>
        <Text>Say hi !</Text>
      </View>
    </TouchableOpacity>
  );
  //   4:37:08
}

const styles = StyleSheet.create({});
