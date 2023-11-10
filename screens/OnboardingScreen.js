import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import Onboarding from "react-native-onboarding-swiper";
const SCREEN_WIDTH = Dimensions.get("window").width;
const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "white",
          image: (
            <Image
              source={require("../assets/4.jpeg")}
              style={{ width: SCREEN_WIDTH, height: 400 }}
            />
          ),
          title: "Connect to the World",
          subtitle: "Apply for jobs",
        },
        {
          backgroundColor: "white", //#fdeb93
          image: (
            <Image
              source={require("../assets/2.jpeg")}
              style={{ width: SCREEN_WIDTH, height: 400 }}
            />
          ),
          title: "Share Your Favorites",
          subtitle: "Verified job openings from trusted employers",
        },
        {
          backgroundColor: "white",
          image: (
            <Image
              source={require("../assets/1.jpeg")}
              style={{ width: SCREEN_WIDTH, height: 400 }}
            />
          ),
          title: "Become The Star",
          subtitle: "Fast updates on all your job applications",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
