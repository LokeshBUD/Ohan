import { View, Image, StyleSheet, useWindowDimensions, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Logo from "../../assets/images/logo-bg-removed.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-svg';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() =>{
    GoogleSignin.configure({
      webClientId: '183581092368-5nfp08m01ltjrcvkp6mp96uks6aaig31.apps.googleusercontent.com',
    });
  }, []);

  const Login = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const usersCollection = firestore().collection('Users');
      const snapshot = await usersCollection.where('email', '==', email).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        const userData = {
          name: doc.data().name,
          email: email,
        };
        navigation.navigate("Home", { userData: userData });
      });
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login Failed", "Failed to sign in.");
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken, user } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      const usersCollection = firestore().collection('Users');
      const snapshot = await usersCollection.where('email', '==', user.email).get();
      
      if (snapshot.empty) {
        const userData = {
          DOB: "",
          name: user.name,
          email: user.email,
          photo: user.photo
        };
        await firestore().collection('Users').add(userData);
        navigation.navigate('finishSignUp', { userData: userData });
      } else {
        snapshot.forEach(doc => {
          const userData = {
            DOB: "",
            name: user.name,
            email: user.email,
            photo: user.photo
          };
          
          if (!doc.data().DOB) {
            console.log(userData)
            navigation.navigate('finishSignUp', { userData: userData });
          } else {
            console.log("HOME NAVIGATION",userData)
            navigation.navigate("tabs", {userData:userData});
          }
        });
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Login Failed", "Failed to sign in with Google.");
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.5 }]} />
        <CustomInput placeholder="Email" onChangeText={text => setEmail(text)} />
        <CustomInput placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry />
        <CustomButton text="Login" onPress={Login} />
        <View style={styles.orContainer}>
          <Text>OR</Text>
        </View>
        <TouchableOpacity onPress={onGoogleButtonPress}>
          <Image source={require("../../assets/images/google.png")} style={styles.googleLogo} />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
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
