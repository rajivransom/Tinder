import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { createContext, useContext } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";

const Authcontext = createContext({});
const config = {
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
  expoClientId: `1040634103587-gjcalfm7c139edbpdtnalgpm2f38p8bb.apps.googleusercontent.com`,
  //    1040634103587-gjcalfm7c139edbpdtnalgpm2f38p8bb.apps.googleusercontent.com

  androidClientId: `1040634103587-5s6hej1k382bq9c5jd2l94j5p976r1c8.apps.googleusercontent.com`,
};
// useMemo is use to cache and to avoid unncessary re-rendering
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          console.log(user.displayName);
        } else {
          setUser(null);
        }
        setLoadingInitial = false;
      }),

    []
  );
  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };
  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        //For OAuth
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential); //for firebase
        }
        return Promise.reject();
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };
  const memoizedValue = useMemo(
    () => ({
      user,
      signInWithGoogle,
      loading,
      error,
      logOut,
    }),
    [user, loading, error]
  );
  return (
    <Authcontext.Provider value={memoizedValue}>
      {children}
    </Authcontext.Provider>
  );
};
export default function useAuth() {
  return useContext(Authcontext);
}
