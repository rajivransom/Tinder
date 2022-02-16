import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, where } from "@firebase/firestore";
import { db } from "../firebase";
import { query } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";
import { FlatList } from "react-native-gesture-handler";

export default function ChatList({ navigation }) {
  const [matches, setmatches] = useState([]);
  const { user } = useAuth();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setmatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );
  return matches.length > 0 ? (
    <FlatList
      style={{ height: "100%" }}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatRow matchedDetails={item} navigation={navigation} />
      )}
    ></FlatList>
  ) : (
    <Text>No matched at the moment</Text>
  );
}

const styles = StyleSheet.create({});
