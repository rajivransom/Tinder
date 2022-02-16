import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import Modal, { ReactNativeModal } from "react-native-modal";

import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "../firebase";

export default function Modalscreen({ navigation }) {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const incomplete = !image || !job || !age;
  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        style={{ height: 100, width: "100%" }}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      ></Image>
      <Text
        style={{ fontSize: 20, color: "grey", padding: 10, fontWeight: "bold" }}
      >
        Welcome {user.displayName}
      </Text>
      <Text
        style={{
          textAlign: "center",
          padding: 20,
          fontWeight: "bold",
          color: "red",
        }}
      >
        step 1 : The profile pic
      </Text>
      <TextInput
        value={image}
        onChangeText={(txt) => {
          setImage(txt);
        }}
        placeholder="Enter  A profile pic URL"
      ></TextInput>
      <Text
        style={{
          textAlign: "center",
          padding: 20,
          fontWeight: "bold",
          color: "red",
        }}
      >
        step 1 : The job
      </Text>
      <TextInput
        value={job}
        onChangeText={(txt) => {
          setJob(txt);
        }}
        placeholder="Enter  A Occupation"
      ></TextInput>
      <Text
        style={{
          textAlign: "center",
          padding: 20,
          fontWeight: "bold",
          color: "red",
        }}
      >
        step 1 : The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={(txt) => {
          setAge(txt);
        }}
        maxLength={2}
        keyboardType="numeric"
        placeholder="Enter Your age"
      ></TextInput>
      {console.log(incomplete)}
      <TouchableOpacity
        disabled={incomplete}
        onPress={updateUserProfile}
        style={{
          position: "absolute",
          bottom: 40,
          backgroundColor: incomplete ? "grey" : "#EF5350",
          padding: 15,
          borderRadius: 12,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 21, color: "white" }}>
          Update Profile
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
