
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text,TextInput,Alert, TouchableOpacity,Image,View,Button } from 'react-native';
import {windowHeight,windowWidth} from '../utils/Dimensions';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import 'firebase/firestore';
import 'firebase/firestore';
import { GoogleAuthData } from 'expo-google-sign-in';
const SignupScreen = ({navigation}) => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmPassword,setConfirmPassword]=useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const emptyState = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      };
      
  const handlePress = () => {
   
  if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      registration(
        email,
        password,
        lastName,
        firstName,
      );
  }
  };
  async function registration(email, password) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => navigation.navigate('Welcome'))
     } catch (err) {
      Alert.alert('There is something wrong!', err.message);
    }
  }
  const logInFB = async ()=> {
    try {
      await Facebook.initializeAsync({
        appId: '1104242490020753',
      });
      const {
        type,
        token,
        
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        navigation.navigate("Welcome")
         
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    
  }
    return (
        <View style={styles.container}> 
      
      <Text style={styles.text}>Create an account</Text>
      <FormInput
      labelValue={email}
      onChangeText={(userEmail) => setEmail(userEmail)}
      placeholderText="Email"
      iconType='user'
      keyboardType='email-address'
      autoCaptalize="none"
      autoCorrect={false}
      />
      <FormInput
      labelValue={password}
      onChangeText={(userPassword) => setPassword(userPassword)}
      placeholderText="Password"
      iconType='lock'
     secureTextEntry={true}
      />
      <FormInput
      labelValue={confirmPassword}
      onChangeText={(userconfirmPassword) => setConfirmPassword(userconfirmPassword)}
      placeholderText="Confirm Password"
      iconType='lock'
     secureTextEntry={true}
      />

      <TouchableOpacity  onPress={handlePress} style={styles.buttonContainer}>
        <Text style={styles.buttonText} >Sign Up</Text>
      </TouchableOpacity>
       
      <TouchableOpacity style={styles.forgotButton,{fontSize:15,fontWeight:'bold'}} onPress={()=> {}}>
      <Text style={styles.navButtonText}> Forgot Password </Text>
      </TouchableOpacity>
      <SocialButton 
      buttonTitle="Sign Up with Facebook"
      btnType="facebook"
      color="#4867aa"
      backgroundColor="#e6eaf4"
      onPress={logInFB} />
     

      <TouchableOpacity style={styles.navButton} onPress={()=> navigation.navigate('Login')}>
      <Text style={styles.navButtonText}> Have an account? Sign In</Text>
      </TouchableOpacity>
        </View>
    );
};
export default  SignupScreen;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f9fafd',
        padding:20,
    },
    
    
    text:{
       
        fontSize:28,
        marginBottom:10,
        color:'#051d5f'
    },
    navButton:{
        marginTop:15
    },
    forgotButton:{
        marginVertical:35,
        fontWeight:'bold',
        marginTop:19
    },
    navButtonText:{
        fontSize:15,
        fontWeight:'bold',
        color:'#2e64e5',
        marginTop:10
       
    },
    buttonContainer: {
      marginTop:10,
      width:'100%',
      height:windowHeight/15,
      backgroundColor:'#2e65e5',
      padding:10,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:3,
  },
  buttonText: {
      fontSize:18,
      fontWeight:'bold',
      color:'#ffffff',
      
  }
});