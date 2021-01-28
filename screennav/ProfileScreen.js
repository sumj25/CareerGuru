import React,{useState,useEffect} from 'react';
import {  StyleSheet, Text, View,Image,Linking,Platform ,Modal,modalVisible,TouchableHighlight,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Title,Card,Button} from 'react-native-paper';
import { Ionicons,MaterialIcons,Entypo } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite'
import 'firebase/storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
var db = SQLite.openDatabase( 'UserDatabase.db' );
const ProfileScreen = ({navigation}) =>{
  let [items, setItems] = useState({});
  const [image,setImage]=useState('https://images.unsplash.com/photo-1611083075509-fba08db259ac?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80')
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
     db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS profile_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,fname VARCHAR(200),lname VARCHAR(200),phone VARCHAR(200),email VARCHAR(200),country VARCHAR(200),city VARCHAR(200),position VARCHAR(200))',
    )
    });
  }, []);
  const fun= ()=> {
    console.log("h")
    setItems({});
      db.transaction((tx) => {
     tx.executeSql(
        'SELECT * FROM profile_user',
        [],
        (tx, results) => {
         var len= results.rows.length-1;
            setItems(results.rows.item(len));
            console.log(items)
          console.log(items.fname)
          
        }
      );
    });
    setModalVisible(true);
   };
  const openDial=()=>{
    if(Platform.OS==="android"){
      Linking.openURL("tel:12345")
    }
    else{
      Linking.openURL("telprompt:12345")
    }
  }
    return (
      <View style={styles.container}>
    
    <LinearGradient
    colors={["#0033ff","#6bc1ff"]}
    style={{height:"20%"}}/>
    <View style={{alignItems:"center"}}>
    <Image
    style={{width:140,height:140,borderRadius:140/2,marginTop:-50}}
    source={{uri:''?image:items.lname}}/>
    </View>
    <View style={{alignItems:"center"}}>
    <Title>{items.fname} </Title>
    <Text style={{fontSize:18}}>{items.position}</Text></View>
   <Card style={styles.myCard} onPress={()=>{Linking.openURL("mailto:asdf@")}}>
   <View style={styles.cardContent}>
   <MaterialIcons name="email" size={32} color="green"/> 
   <Text style={styles.mytext}>{items.email}</Text>
   </View>
   </Card>
   <Card style={styles.myCard} onPress={()=>openDial()}>
   <View style={styles.cardContent}>
   <Entypo name="phone" size={32} color="green"/> 
   <Text style={styles.mytext}>{items.phone}</Text>
   </View>
   </Card>
   <Card style={styles.myCard}>
   <View style={styles.cardContent}>
   <FontAwesome name="globe"  size={32} color="green" /> 
   <Text style={styles.mytext}>{items.country}</Text>
   </View>
   </Card>
   <Card style={styles.myCard}>
   <View style={styles.cardContent}>
   <Icon name="map-marker-outline"  size={32} color="green" />
   <Text style={styles.mytext}>{items.city}</Text>
   </View>
   </Card>
  <View style={{flexDirection:"row",justifyContent:"space-around"}}>
  <Button
  icon="account-edit"
  mode="contained"
  onPress={()=>{navigation.navigate("Edit")}}>Edit</Button>
  <Modal
 animationType="slide"
 transparent={true}
 visible={modalVisible}
 onRequestClose={() => {
   Alert.alert("Modal has been closed.");
 }}
>
 <View style={styles.centeredView}>
   <View style={styles.modalView}>
     <Text style={styles.modalText}>Update Successfully</Text>

     <TouchableHighlight
       style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
       onPress={() => {
         setModalVisible(!modalVisible);
       }}
     >
       <Text style={styles.textStyle}>Ok</Text>
     </TouchableHighlight>
   </View>
 </View>
</Modal>

<TouchableHighlight
 style={styles.openButton}
 onPress={() => {
   fun()
   
 }}
>
 <Text style={styles.textStyle}>Update Profile</Text>
</TouchableHighlight>
  
  <Button
  icon="logout"
  mode="contained"
  color="red"
 onPress={()=>navigation.navigate("Login")} >Log Out</Button>
 </View>

   </View>
    );
    };
    const styles = StyleSheet.create({
        container: {
          flex: 1,
        
        },
        myCard:{
          margin:7
        },
        cardContent:{
          flexDirection:"row",
          padding:8
        },
        mytext:{
          fontSize:18,
          marginTop:5,
          marginLeft:5
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
      export default ProfileScreen;