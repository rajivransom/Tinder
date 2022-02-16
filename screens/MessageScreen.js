import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import getMatchedUserInfo from "../LIB/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import { KeyboardAvoidingView } from "react-native";
import { useRoute } from "@react-navigation/core";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";

export default function MessageScreen(props) {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchedDetails } = params;
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchedDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchedDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchedDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchedDetails.users[user.uid].photoURL,
      message: input,
    });
    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        callEnabled
        title={getMatchedUserInfo(matchedDetails.users, user.uid).displayName}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            style={{ paddingLeft: 20 }}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: messages }) =>
              messages.userId === user.uid ? (
                <SenderMessage key={messages.id} messages={messages} />
              ) : (
                <ReceiverMessage key={messages.id} messages={messages} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "grey",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginLeft: 20,
          }}
        >
          <TextInput
            style={{ height: 40, fontSize: 20 }}
            placeholder="Send Message"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
          ></TextInput>
          <Button onPress={sendMessage} title="Send" color="red"></Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
