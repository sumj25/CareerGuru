import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,Modal,modalVisible
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as SQLite from 'expo-sqlite'
import {Title,Card,Button} from 'react-native-paper';
var db = SQLite.openDatabase( 'UserDatabase.db' );
const SCREEN_HEIGHT = Dimensions.get('window').height;
const EditProfileScreen = ({navigation}) => {
  const [namef,setNamef]=useState("")
  const [namel,setNamel]=useState('')
const [phones,setPhones]=useState("")
const [emails,setEmails]=useState("")
const [positions,setPositions]=useState("")
const [pictures,setPictures]=useState("")
const [countrys,setCountrys]=useState("")
const [citys,setCitys]=useState("")
const onChooseImagePress=()=>{
console.log('htydfg')
  ImagePicker.launchImageLibraryAsync({ 
    mediaTypes: "Images"
  }).then((result)=>{ 

    if (!result.cancelled) {
      // User picked an image
      console.log(result)
      const {height, width, type, uri} = result;
      setNamel(result.uri)
     
        
    }
 }); 
}
let register_user = () => {
  
  console.log(namef)
    if (!namef) {
      alert('Please fill first_name');
      return;
    }
    if (!namel) {
      alert('Please fill last_name');
      return;
    }
    if (!phones) {
      alert('Please fill phone no');
      return;
    }
    if (!emails) {
      alert('Please fill email');
      return;
    }
    if (!countrys) {
      alert('Please fill country');
      return;
    }
    if (!citys) {
      alert('Please fill city');
      return;
    }
    db.transaction(function(tx) {
      console.log("exc")
        tx.executeSql(
        'INSERT INTO profile_user (fname,lname,phone,email,country,city,position) VALUES (?,?,?,?,?,?,?)',
        [namef,namel,phones,emails,countrys,citys,positions],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'You are Updated Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate("Profile"),
                  },
                ],
                { cancelable: false }
              );
            
          } 
        }
      );
    });
  };
  return (
    <View style={styles.container}>
        <View style={styles.action}>
          <FontAwesome name="user-o"  size={20} />
          <TextInput
          value={namef}
          onChangeText={(namef) => setNamef(namef)}
          placeholder={'first name'}
          placeholderTextColor="#666666"
        />
        </View>
      
        <View style={styles.action}>
          <Feather name="phone" size={20} />
          <TextInput
          value={phones}
          onChangeText={(phones) => setPhones(phones)}
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false} />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o"  size={20} />
          <TextInput
          value={emails}
          onChangeText={(emails) => setEmails(emails)}
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
          />
        </View>
        <View style={styles.action}>
        <FontAwesome name="connectdevelop"  size={20} />
        <TextInput
        value={positions}
        onChangeText={(positions) => setPositions(positions)}
          placeholder="Positions"
          placeholderTextColor="#666666"
          keyboardType="email-address"
          autoCorrect={false}
        />
      </View>
        <View style={styles.action}>
          <FontAwesome name="globe"  size={20} />
          <TextInput
          value={countrys}
          onChangeText={(countrys) => setCountrys(countrys)}
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline"  size={20} />
          <TextInput
          value={citys}
          onChangeText={(citys) => setCitys(citys)}
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
          />
        </View>
        <Button
        icon={ namel==''?"update":"check"}
        mode="contained"
        color="red"
       onPress={onChooseImagePress} >Upload</Button> 
        <TouchableOpacity style={styles.commandButton} onPress={register_user}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
     
     


    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'center',
    marginTop:SCREEN_HEIGHT-600,
    marginLeft:10
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    paddingLeft:15
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
