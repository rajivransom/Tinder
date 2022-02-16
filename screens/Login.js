import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import useAuth from "../hooks/useAuth";

export default function Login({ navigation }) {
  const { user } = useAuth();
  const { signInWithGoogle, loading } = useAuth();
  console.log(user);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 100,
            width: 52,
            alignSelf: "center",
            marginHorizontal: "24%",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 12,
            justifyContent: "center",
          }}
          onPress={signInWithGoogle}
        >
          <Text style={{ fontWeight: "900", textAlign: "center" }}>
            Sign in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
