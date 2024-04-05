import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import Logo from "../../../assets/images/logo-bg-removed.png";
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Intropage = () => {
  const navigation = useNavigation();

  const onLoginPress = () => {
    navigation.navigate(`Signin`);
  }
  
  const onSignUpPress = () => {
    navigation.navigate(`SignUp`);
  }
  
  const onNoSign = () => {
    console.warn("Let's go");
    navigation.navigate(`Home`);
  }
  
  return (
    <View style={styles.root}>
      <Image source={Logo} />
      <CustomButton text="Login" onPress={onLoginPress}></CustomButton>
      <CustomButton text="Sign up" onPress={onSignUpPress}></CustomButton>
      
      {/* Added Text component with TouchableOpacity for hyperlink */}
      <TouchableOpacity onPress={onNoSign}>
        <View style={styles.continueWithoutSignIn}>
          <Text style={styles.continueText}>Continue without Signing in</Text>
          <Text style={styles.linkText}> (as Guest)</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  continueWithoutSignIn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  continueText: {
    color: '#007AFF', // Blue color for hyperlink
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline', // Underline effect for hyperlink
  }
});

export default Intropage;
