import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions, Button } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HomeScreen = ({ navigation }) => {
  const [images, setImages] = useState(0);
  const image = [
    "https://th.bing.com/th/id/OIP.-FjP-jW_lFqTVsI1_sMjOwHaEK?pid=Api&rs=1",
    "https://cache.techmahindra.com/static/img/hi-tech-enterprise-smart-assistant.jpg",
    "https://th.bing.com/th/id/OIP.sgQmFG9r_dXMx-yShpMQDwFJC9?pid=Api&rs=1",
    "https://cdn.wallpapersafari.com/50/75/zOLSVx.jpg",
    "https://th.bing.com/th/id/OIP.d_hKCrtwWHFmFiN78aq0-AHaEK?pid=Api&rs=1",
  ];
  useEffect(() => {
    changeImage();
  });
  const changeImage = () => {
    const randomNumber = Math.floor(Math.random() * image.length);
    setImages(randomNumber);
  };
  return (
    <View>
      <View style={{}}>
        <Image
          style={{
            height: SCREEN_HEIGHT - 113,
            width: SCREEN_WIDTH,
            resizeMode: "cover",
          }}
          source={{ uri: image[images] }}
        />
      </View>
      <View>
        <Button
          title="Search this area"
          backgroundColor="#f08e25"
          icon={{ name: "search" }}
          onPress={(text) => navigation.navigate("Detail", { text: "text" })}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default HomeScreen;
