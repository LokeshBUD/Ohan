import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React, { useReducer } from 'react';
import Logo from "../../../assets/images/logo-bg-removed.png";
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';



const Intropage = () => {
  const navigation = useNavigation();

  const onLoginPress = () =>{
      navigation.navigate(`Signin`);
  }
  const onSignPress = () =>{
    console.warn("Sign In");
  }
  const onNoSign = () =>{
    console.warn("lets go");
  }
  return (
    <View style={styles.root}>
      <Image source={Logo} />
      <CustomButton text="Login" onPress={onLoginPress}></CustomButton>
      <CustomButton text="Sign In" onPress={onSignPress}></CustomButton>
      <CustomButton text="Continue without Signing in" onPress={onNoSign} type='T'></CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: '#faf7e6',
        flex: 1
    }
});

export default Intropage