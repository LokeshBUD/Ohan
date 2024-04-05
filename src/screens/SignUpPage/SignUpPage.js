// SignUpPage.js

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import Logo from '../../../assets/images/logo-bg-removed.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import auth from '@react-native-firebase/auth';
import Navigation from '../../navigation';
import { useNavigation } from '@react-navigation/native';

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordRepeat, setPasswordRepeat] = useState("");
  
  const navigation = useNavigation()

  const onRegisterPressed = () => {
    if (Password !== PasswordRepeat) {
      Alert.alert("Passwords do not match");
      return;
    }
    auth().createUserWithEmailAndPassword(email, Password)
      .then(() => {
        Alert.alert("Registration successful");
      }).then(()=>{
        navigation.navigate(`Signin`);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }

  const onterms = () => {
    console.warn('terms');
  }

  const onprivacy = () => {
    console.warn('privacy');
  }

  console.log(email + "  " + Password)
  
  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, { height: height * .3 }]} />
      <Text style={styles.title}>Create an account</Text>
      <CustomInput placeholder="Username" value={Username} onChangeText={text => setUsername(text)} />
      <CustomInput placeholder="Email" value={email} onChangeText={text => setEmail(text)} />
      <CustomInput placeholder="Password" value={Password} onChangeText={text => setPassword(text)} secureTextEntry />
      <CustomInput placeholder="Repeat Password" value={PasswordRepeat} onChangeText={text => setPasswordRepeat(text)} secureTextEntry />
      
      <CustomButton text="Register" onPress={onRegisterPressed} />
      <Text style={styles.text}>By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onterms}>Terms of Use</Text> and{' '}
        <Text style={styles.link} onPress={onprivacy}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height:100,
    maxHeight:200,
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:'black',
    margin:10,
  },
  text:{
    color:'gray',
    marginVertical:10,
  },
  link:{
    color:'#FDB075',
  }
});

export default SignUpPage;
