import React from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity>
      <Text style={StyleSheet.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};
export default FormButton;
const styles = StyleSheet.create({
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
