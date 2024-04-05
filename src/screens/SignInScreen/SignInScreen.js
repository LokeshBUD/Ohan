import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';

import Logo from "../../../assets/images/logo-bg-removed.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import HomePage from '../HomePage';

import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";


const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const Login = () =>{
    auth().signInWithEmailAndPassword(email, Password).then(() => {
      console.log("login succesful");
      navigation.navigate("Home");
    })
    
  }
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Image 
          source={Logo} 
          style={[styles.logo, {height: height*0.5}]}/>
      <CustomInput placeholder={"Email"} onChangeText={ text => setEmail(text)}/>
      <CustomInput placeholder={"Password"} onChangeText={ text => setPassword(text) } secureTextEntry/>
      <CustomButton text="Login" onPress={Login}/>
    </View>
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
  }
});


export default SignInScreen;