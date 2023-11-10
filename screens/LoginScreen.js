import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  View,
} from "react-native";

import { windowHeight, windowWidth } from "../utils/Dimensions";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import "firebase/firestore";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }

    if (!password) {
      Alert.alert("Password field is required.");
    }
    console.log(email);
    signIn(email, password);
  };
  async function signIn(email, password) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate("Welcome"));
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  }
  const logInFB = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "1104242490020753",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
        navigation.navigate("Welcome");
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <Text style={styles.text}>create an account</Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCaptalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivare}>
          By registering,youconfirm that you accept our
        </Text>
        <TouchableOpacity onPress={() => alert("terms and condition")}>
          <Text style={[styles.color_textPrivare, { color: "red" }]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivare}>and</Text>
        <Text style={(styles.color_textPrivare, { color: "red" })}>
          Privacy Policy
        </Text>
      </View>
      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={logInFB}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an account?create here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafd",
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },

  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivare: {
    fontSize: 13,

    color: "grey",
  },

  navButtonText: {
    fontSize: 10,

    color: "#2e64e5",
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#2e65e5",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
