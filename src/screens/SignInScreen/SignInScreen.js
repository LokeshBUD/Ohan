import { View, Image, StyleSheet, useWindowDimensions, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'; // Import GestureHandlerRootView here

import Logo from "../../../assets/images/logo-bg-removed.png";

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import HomePage from '../HomePage';

import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack'; // Import HeaderBackButton from react-navigation/stack
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import images from '../../../assets/images';
import { Text } from 'react-native-svg';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() =>{
    GoogleSignin.configure({
      webClientId: '183581092368-5nfp08m01ltjrcvkp6mp96uks6aaig31.apps.googleusercontent.com',
    });
  },[])
  const Login = () =>{
    auth().signInWithEmailAndPassword(email, Password).then(() => {
      console.log("login succesful");
      navigation.navigate("Home");
    })
    
  }
  const navigateToTabs = (userData) => {
    navigation.navigate("Home", { userData: userData });
  };
  const navigation = useNavigation();
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      // Get the users ID token
      const { idToken, user } = await GoogleSignin.signIn();
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
  
      // Once signed in, store user data in Firestore
      const userData = {
        userid: user.id,
        name: user.name,
        email: user.email,
        photo: user.photo
      };
  
      await firestore().collection('Users').doc("48qJYZKxdIxQ2BTwkoEx").set(userData);
  
      Alert.alert("Login Success");
      navigation.navigate("Home", { userData: userData });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Login Failed", "Failed to sign in with Google.");
    }
  }
  
  return (
    <GestureHandlerRootView> 
      <View style={styles.root}>
        
       
        <Image 
            source={Logo} 
            style={[styles.logo, {height: height*0.5}]}/>
        <CustomInput placeholder={"Email"} onChangeText={ text => setEmail(text)}/>
        <CustomInput placeholder={"Password"} onChangeText={ text => setPassword(text) } secureTextEntry/>
        <CustomButton text="Login" onPress={Login}/>
        <View style={styles.orContainer}>
          <Text>OR</Text>
        </View>
        <TouchableOpacity onPress={onGoogleButtonPress}>
          <Image 
            source={require("../../../assets/images/google.png")}
            style={styles.googleLogo} 
            />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 3,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 500,
  },
  googleLogo: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default SignInScreen;
