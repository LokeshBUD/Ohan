import { View, Text , Image,StyleSheet,useWindowDimensions} from 'react-native'
import React,{useState} from 'react'
// import Logo from "../../assets/images/logo-bg-removed.png";
// import CustomInput from '../../components/CustomInputChaklu';
// import CustomButton from '../../components/CustomButtonChaklu';
import {useNavigation} from '@react-navigation/native';

const signIn = () => {

  const {height}=useWindowDimensions();
  const navigation = useNavigation();
  const {Username,setUsername}=useState('');
  const {Password,setPassword}=useState('');
  const onSignInPressed=()=>{
    console.warn("Sign In");
  }
  const onForgetPasswordPressed = () =>{
    
    navigation.navigate("ForgetPassword");
  }
  const onSignUpPressed =() =>{
    
    navigation.navigate("SignUp");
  }
  
  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo,{height:height*.3}]} />
      <CustomInput placeholder="Username" value={Username} setValue={setUsername}></CustomInput>
      <CustomInput placeholder="Password" value={Password} setValue={setPassword} secureTextEntry={true}></CustomInput>
      <CustomButton text="Sign In" onPress={onSignInPressed} type="PRIMARY"></CustomButton>
      <CustomButton text="Forget Password" onPress={onForgetPasswordPressed} type="TERTIARY"></CustomButton>
      <CustomButton text="Sign Up" onPress={onSignUpPressed} type="ad"></CustomButton>

    </View>
  )
}
const styles = StyleSheet.create({
  root:({
    alignItems: 'center',
    padding: 20,

  }),
  logo: {
    width: '70%',
    maxWidth: 300,
    height:100,
    maxHeight:200,
  },
  
})
export default SignIn;