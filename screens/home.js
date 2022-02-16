import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  YellowBox,
  LogBox,
  Vibration,
} from "react-native";

import Swiper from "react-native-deck-swiper";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  getDocs,
  setDoc,
  where,
  DocumentSnapshot,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";
import { query } from "firebase/firestore";
import genetateId from "../LIB/generateid";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
YellowBox.ignoreWarnings([""]);
console.disableYellowBox = true;
const DUMMY_DATA = [
  {
    firstName: "Scarlett",
    lastName: "Johannson",
    job: "Actress",
    photoURL:
      "https://assets.vogue.com/photos/58dedeaaa6df677eb9f7df72/master/w_2560%2Cc_limit/00-holding-scarlett-johansson-5-things.jpg",
    age: 37,
    id: 1,
  },
  {
    firstName: "Vin",
    lastName: "Diesel",
    job: "Actor",
    photoURL:
      "https://m.media-amazon.com/images/M/MV5BMjExNzA4MDYxN15BMl5BanBnXkFtZTcwOTI1MDAxOQ@@._V1_.jpg",
    age: 40,
    id: 2,
  },
  {
    firstName: "Walter",
    lastName: "White",
    job: "Teacher",
    photoURL:
      "https://www.gannett-cdn.com/-mm-/bbfb481119aa5a0573c35d089a1b9eac53f920ac/c=0-0-576-768/local/-/media/USATODAY/USATODAY/2014/02/08//1391870458000--breaking-bad-cranston-gallery-2612-.jpg?width=300&height=400&fit=crop&format=pjpg&auto=webp",
    age: 54,
    id: 3,
  },
  {
    firstName: "Ariana",
    lastName: "Grande",
    job: "Singer",
    photoURL:
      "https://static01.nyt.com/images/2014/08/24/arts/24GRANDE1/24JPGRANDE1-superJumbo.jpg",
    age: 26,
    id: 4,
  },
];

export default function home({ navigation }) {
  const swiperef = useRef(null);
  const [profile, setProfile] = useState([]);
  const { user, logOut } = useAuth();
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("ModalScreen");
        }
      }),

    []
  );
  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];
      console.log("________________-LOG________________-");
      console.log(swipes);

      console.log([...passedUserIds, ...swipedUserIds]);
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) =>
          setProfile(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          )
      );
    };

    fetchCards();
    return unsub;
  }, [db]);
  const swipeLeft = async (cardIndex) => {
    if (!profile[cardIndex]) return;
    const userSwiped = profile[cardIndex];

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex) => {
    if (!profile[cardIndex]) return;
    const userSwiped = profile[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();
    console.log("hjkop");
    console.log(loggedInProfile);
    //if the user swiped on you...//
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          //user matched you before u matched with him
          //create a match ! <3
          console.log(`you matched with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
          //create Match

          setDoc(doc(db, "matches", genetateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });
          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          //user swiped as first interaction between two
        }
      }
    );
    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* header */}
      <View
        style={{
          alignItems: "center",
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={logOut}
          style={{ position: "absolute", left: 15, top: 9 }}
        >
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
            }}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ModalScreen")}>
          <Image
            resizeMode="contain"
            style={{ height: 60, width: 55 }}
            source={require("../tinder.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={{ position: "absolute", right: 14, top: 9 }}
        >
          <Ionicons color="#FF5864" size={30} name="chatbubble-sharp" />
        </TouchableOpacity>
      </View>

      {/* header end */}
      {/* Cards' */}
      <View style={{ flex: 1 }}>
        <Swiper
          ref={swiperef}
          stackSize={4}
          backgroundColor={"#4FD8C5"}
          infinite={true}
          onSwipedRight={(cardIndex) => {
            console.log("swipw match");
            swipeRight(cardIndex);
          }}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe Pass");
            swipeLeft(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "Nope",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "Match",
              style: {
                label: {
                  textAlign: "left",
                  color: "red",
                },
              },
            },
          }}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profile}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={{
                  position: "relative",
                  backgroundColor: "white",
                  height: "75%",
                  borderRadius: 12,
                }}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 18,
                    position: "absolute",
                    top: 0,
                  }}
                  source={{ uri: card.photoURL }}
                ></Image>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    width: "100%",
                    height: 60,
                    bottom: 0,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 18,
                    paddingVertical: 8,
                    borderRadius: 18,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={{ fontWeight: "bold" }}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={
                  ({
                    position: "relative",
                    backgroundColor: "white",
                    height: "75%",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                  },
                  { flexDirection: "column", flex: 1 })
                }
              >
                <Text
                  style={{
                    position: "absolute",
                    top: 100,
                    left: 100,
                    zIndex: 2,
                    fontWeight: "bold",
                    padding: 25,
                  }}
                >
                  oops No More Profiles
                </Text>
                <Image
                  style={{
                    position: "relative",
                    height: 500,
                    width: "100%",
                    borderRadius: 18,
                  }}
                  source={{
                    uri: "https://s3.r29static.com/bin/entry/b7c/x,80/2057678/image.jpg",
                  }}
                ></Image>
              </View>
            )
          }
        ></Swiper>
      </View>
      <View
        style={{
          margin: 20,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={() => swiperef.current.swipeLeft()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
            width: 64,
            height: 64,
            backgroundColor: "#EF9A9A",
          }}
        >
          <Entypo color="red" name="cross" size={24}></Entypo>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swiperef.current.swipeRight()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
            width: 64,
            height: 64,
            backgroundColor: "#00C200",
          }}
        >
          <AntDesign color="green" name="heart" size={24}></AntDesign>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
