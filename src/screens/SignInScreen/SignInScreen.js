import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import Logo from "../../../assets/images/logo-bg-removed.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import HomePage from '../HomePage';
import { useNavigation } from '@react-navigation/native';


const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const auth = () =>{
    console.warn("login");
    navigation.navigate("Home");
  }
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Image 
          source={Logo} 
          style={[styles.logo, {height: height*0.5}]}/>
      <CustomInput placeholder={"UserName"}/>
      <CustomInput placeholder={"Password"}/>
      <CustomButton text="Login" onPress={auth}/>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#faf7e6',
    flex: 3,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 500,
  }
});


export default SignInScreen