import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import Logo from '../../../assets/images/Logo.png';
import CustomInput from '../../components/CustomInputChaklu';
import CustomButton from '../../components/CustomButtonChaklu';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const SignUp = () => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // New state to store selected date

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  }

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date); // Update selected date
  }

  const onRegisterPressed = () => {
    console.warn('Register');
  }

  return (
    <GestureHandlerRootView> 
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * .3 }]} />
        <Text style={styles.title}>Create an account</Text>
        <CustomInput placeholder="Username" placeholderTextColor="#707070" value={username} setValue={setUsername}></CustomInput>
        <TouchableOpacity style={[styles.dobButton, selectedDate]} onPress={showDatePicker}>
  <Text style={styles.dobText}>{selectedDate ? `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}` : 'DOB'}</Text>
</TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <CustomInput placeholder="Email" placeholderTextColor="#707070" value={email} setValue={setEmail}></CustomInput>
        <CustomInput placeholder="Password"  placeholderTextColor="#707070" value={password} setValue={setPassword} secureTextEntry={true}></CustomInput>
        <CustomInput placeholder="Repeat Password"  placeholderTextColor="#707070" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}></CustomInput>
        <CustomButton text="Register" onPress={onRegisterPressed}></CustomButton>
        <Text style={styles.text}>By registering, you confirm that you accept our{` `}<Text style={styles.link}>Terms of Use</Text>{' '}and{` `}<Text style={styles.link}>Privacy Policy</Text></Text>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
    maxHeight: 200,
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
  dobButton: {
    alignItems: 'center', // Center the content horizontally
  justifyContent: 'center', // Center the content vertically
  
  height: 50,
  width: '70%',
  borderColor: '#ccc',
  borderBottomWidth: 1, // Add bottom border
  borderRadius: 0, // Remove border radius
  paddingHorizontal: 10,
  marginVertical: 5,
  },
  
  dobText: {
  fontSize: 13.5, // Adjust the font size as needed
  color: '#707070',
  width: '100%', // Set the width to 100%
  overflow: 'hidden', // Hide overflow
  textAlign: 'left', // Align text to the left
  textOverflow: 'ellipsis', // Add ellipsis if text overflows
  }
});

export default SignUp;
