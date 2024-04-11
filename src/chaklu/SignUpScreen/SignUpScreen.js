import { View, Text , Image,StyleSheet,useWindowDimensions} from 'react-native'
import React,{useState} from 'react'
import Logo from '../../assets/images/Logo.png';
import CustomInput from '../../components/CustomInputChaklu';
import CustomButton from '../../components/CustomButtonChaklu';

const signUp = () => {

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
      <Image source={Logo} style={[styles.logo,{height:height*.3}]} />
      <Text style={styles.title}>Create an account</Text>
      <CustomInput placeholder="Username" value={Username} setValue={setUsername}></CustomInput>
      <CustomInput placeholder="Email" value={email} setValue={setEmail}></CustomInput>
      <CustomInput placeholder="Password" value={Password} setValue={setPassword} secureTextEntry={true}></CustomInput>
      <CustomInput placeholder="Repeat Password" value={PasswordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}></CustomInput>
      
      <CustomButton text="Register" onPress={onRegisterPressed}></CustomButton>
      <Text style={styles.text}>By registering, you confirm that you accept our{` `}<Text style={styles.link} onPress={onterms}>Terms of Use</Text>{' '}and{` `}<Text style={styles.link} onPress={onprivacy}>Privacy Policy</Text></Text>

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
  
})
export default signUp;