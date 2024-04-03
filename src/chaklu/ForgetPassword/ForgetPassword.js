import { View, Text , Image,StyleSheet,useWindowDimensions} from 'react-native'
import React,{useState} from 'react'

import CustomInput from '../../components/CustomInputChaklu';
import CustomButton from '../../components/CustomButtonChaklu';

const Forget = () => {

  const {height}=useWindowDimensions();
  const {Username,setUsername}=useState('');
  const {email,setEmail}=useState('');
  
  const {Password,setPassword}=useState('');
  const {PasswordRepeat,setPasswordRepeat}=useState('');
  const onSignInPressed=()=>{
    console.warn("Sign In");
  }
  const onForgetPasswordPressed = () =>{
    console.warn('ForgetPassword');
  }
  const onSignUpPressed =() =>{
    console.warn('Sign Up');
  }
  const onRegisterPressed =() =>{
    console.warn('Register');
  }
  const onterms =()=>{
    console.warn('terms');
  }
  const onprivacy=()=>{
    console.warn('privacy');
  }
  
  return (
    <View style={styles.root}>
      
      <Text style={styles.title}>Reset Password</Text>
      <CustomInput placeholder="Email" value={email} setValue={setEmail}></CustomInput>
      <CustomInput placeholder="New Password" value={Password} setValue={setPassword} secureTextEntry={true}></CustomInput>
      <CustomInput placeholder="Repeat Password" value={PasswordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}></CustomInput>
      <CustomButton text="Confirm" onPress={onRegisterPressed}></CustomButton>
      

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
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:'Black',
    margin:10,
  },
  text:{
    color:'gray',
    marginVertical:10,

  },
  link:{
    color:'#FDB075',

  }
  
})
export default Forget;