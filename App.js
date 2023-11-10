import React from "react";
import Providers from "./navigation";
import * as firebase from "firebase";
import apiKeys from "./config/keys";

class App extends React.Component {
  render() {
    if (!firebase.apps.length) {
      console.log("Connected with Firebase");
      firebase.initializeApp(apiKeys.firebaseConfig);
    }
    return <Providers />;
  }
}
export default App;
