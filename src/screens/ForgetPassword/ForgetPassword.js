import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const navigation = useNavigation();
  const onSignInPressed = () => {
    console.warn('Sign In');
    
  };
  const onForgetPasswordPressed = () => {
    console.warn('ForgetPassword');
  };
  const onSignUpPressed = () => {
    console.warn('Sign Up');
  };
  const onRegisterPressed = () => {
    console.warn('Register');
    navigation.navigate(`Signin`);
  };
  const onTerms = () => {
    console.warn('Terms');
  };
  const onPrivacy = () => {
    console.warn('Privacy');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset Password</Text>
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="New Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomInput
        placeholder="Repeat Password"
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        secureTextEntry={true}
      />
      <CustomButton text="Confirm" onPress={onRegisterPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ForgetPassword;
