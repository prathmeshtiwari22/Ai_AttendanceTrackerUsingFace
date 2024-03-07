import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";

const image = require("../assets/images/hm.jpg");
const rimage = require("../assets/images/20944201.jpg");
import { firebase } from "./config";



const Register = ({ navigation }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const registerUser = async (name, email, password) => {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .auth()
            .currentUser.sendEmailVerification({
              handleCodeInApp: true,
              url: "https://vega-a0de6.firebaseapp.com",
            })
            .then(() => {
              alert("Verification Email Sent");
            })
            .catch((error) => {
              alert(error.message);
            })
            .then(() => {
              firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                  name,
                  email,
                });
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.bg}>
      <TouchableOpacity
        style={{
          borderRadius: 15,
          justifyContent: "flex-start",
          marginRight: 325,
          marginTop: -40,
        }}
      >
        <AntDesign
          style={{ marginLeft: 3, marginTop: 2 }}
          name="arrowleft"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Image
        style={{ width: 200, height: 200, marginBottom: 30 }}
        source={rimage}
      />
      <View style={{ marginTop: 5 }} />
      <Text style={{ fontSize: 17, color: "black" }}>
        Register to your account
      </Text>
      <View style={{ marginTop: 20 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "white",
          paddingVertical: 5,
          borderRadius: 10,
          marginTop: 30,
          borderWidth: 2,
          borderColor: "#007FFF",
        }}
      >
        <Ionicons
          style={{ marginLeft: 8 }}
          name="person-sharp"
          size={25}
          color="black"
        />
        <TextInput
          onChangeText={(name) => setName(name)}
          autoCorrect={false}
          placeholder="Enter your name"
          placeholderTextColor={"grey"}
          style={{
            color: "black",
            marginVertical: 10,
            width: 300,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "white",
          paddingVertical: 5,
          borderRadius: 10,
          marginTop: 30,
          borderWidth: 2,
          borderColor: "#007FFF",
        }}
      >
        <MaterialIcons
          style={{ marginLeft: 8 }}
          name="email"
          size={25}
          color="black"
        />
        <TextInput
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter your email"
          placeholderTextColor={"grey"}
          style={{
            color: "black",
            marginVertical: 10,
            width: 300,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "white",
          paddingVertical: 5,
          borderRadius: 10,
          marginTop: 30,
          borderWidth: 2,
          borderColor: "#007FFF",
        }}
      >
        <AntDesign
          style={{ marginLeft: 8 }}
          name="lock1"
          size={25}
          color="black"
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          placeholder="Enter your password"
          placeholderTextColor={"grey"}
          style={{
            color: "black",
            marginVertical: 10,
            width: 300,
          }}
        />
      </View>
      <View style={{ marginTop: 50 }} />
      <TouchableOpacity
        onPress={() => registerUser(name, email, password)}
        style={{
          width: 150,
          borderRadius: 50,
          borderColor: "blue",
          backgroundColor: "#007FFF",
          marginLeft: "auto",
          marginRight: "auto",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
          }}
        >
          REGISTER
        </Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => navigation.replace("login")}
        style={{ marginTop: 12 }}
      >
        <Text style={{ textAlign: "center", color: "blue", fontSize: 16 }}>
          Already have an account? Sign in
        </Text>
      </Pressable>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
});
