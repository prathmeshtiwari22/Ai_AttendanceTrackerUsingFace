import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "./config";
import { useRouter } from "expo-router";

const image = require("../assets/images/hm.jpg");
const limage = require("../assets/images/4957136.jpg");

const Login = ({navigation}) => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
    

    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
            .then(() => {
                alert("Password reset Email sent")
            }).catch((error) => {
                alert(error)
            })
    }

    const loginUser = async (email, password) => {
        console.log('Logging in...');
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('Login successful!');
            navigation.replace("BottomTabNavigation");
        } catch (error) {
            console.error('Login error:', error.message);
            alert(error.message);
        }
    };


  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.bg}>
      <TouchableOpacity
        style={{
          borderRadius: 15,
          justifyContent: "flex-start",
          marginRight: 325,
          marginTop: -50,
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
        source={limage}
      />
      <View style={{ marginTop: 5 }} />
      <Text style={{ fontSize: 17, color: "black" }}>
        Login to your account
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
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Keep me logged in</Text>

        <Text
          onPress={() => {
            changePassword();
          }}
          style={{ color: "#007FFF", fontWeight: "500", marginLeft: 60 }}
        >
          Forgot Password?
        </Text>
      </View>
      <View style={{ marginTop: 50 }} />
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
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
          LOGIN
        </Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => navigation.replace("Register")}
        style={{ marginTop: 12 }}
      >
        <Text style={{ textAlign: "center", color: "blue", fontSize: 16 }}>
          Don't have an account? Sign Up
        </Text>
      </Pressable>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
});
