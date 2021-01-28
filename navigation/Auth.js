import React,{useState,useEffect} from 'react';
import {  View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfileScreen from '../screennav/EditProfileScreen';
import ProfileScreen from '../screennav/ProfileScreen';
const AppStack = createStackNavigator();
const Auth =() =>{
  const [isFirstLaunch,setIsFirstLaunch]=useState(null);
  let routeName;
  useEffect(()=>{
    AsyncStorage.getItem('alreadyLaunched').then((value)=>{
      if(value==null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      
      }
    });
  },[]);
  if(isFirstLaunch==null){
    return null;
  }
  else if(isFirstLaunch==true){
    routeName='onboarding'
  }
  else{
    routeName='Login';
  }

  return (
    
    
    <AppStack.Navigator 
    initialRouteName={routeName}>
    <AppStack.Screen name="Onboarding" component={OnboardingScreen}
    options={{header:() => null}} />
   
    <AppStack.Screen name="Profile" component={ProfileScreen}
    options={{header:() => null}} />
    <AppStack.Screen name="Edit" component={EditProfileScreen}
    options={{header:() => null}} />
    <AppStack.Screen name="Welcome" component={WelcomeScreen}
    options={{header:() => null}}
 />
    <AppStack.Screen name="Login" component={LoginScreen}
    options={{header:() => null}} />
    <AppStack.Screen name="Signup" component={SignupScreen} 
    options={{header:() => null}}/>
    </AppStack.Navigator>
    
    
  );
}
export default Auth;


