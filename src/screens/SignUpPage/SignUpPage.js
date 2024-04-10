import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Logo from '../../../assets/images/logo-bg-removed.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Moment from 'moment';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const [name, setname] = useState("");
  const [date, setDate] = useState(new Date()); // Initialize with current date
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordRepeat, setPasswordRepeat] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of date picker
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    if (Password !== PasswordRepeat) {
      Alert.alert("Passwords do not match");
      return;
    }
    auth().createUserWithEmailAndPassword(email, Password)
      .then(() => {
        Alert.alert("Registration successful");
        navigation.navigate(`Signin`);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }

  const onTerms = () => {
    console.warn('terms');
  }

  const onPrivacy = () => {
    console.warn('privacy');
  }

  console.log(email + "  " + Password)

  // Handler for date change in date picker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Hide the date picker after selection
    setDate(currentDate); // Update the selected date
  };

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={Logo} style={[styles.logo, { height: height * .3 }]} />
        <Text style={styles.title}>Create an account</Text>
        <CustomInput placeholder="name" value={name} onChangeText={text => setname(text)} />
        <CustomInput placeholder="Email" value={email} onChangeText={text => setEmail(text)} />
        <CustomInput placeholder="Password" value={Password} onChangeText={text => setPassword(text)} secureTextEntry />
        <CustomInput placeholder="Repeat Password" value={PasswordRepeat} onChangeText={text => setPasswordRepeat(text)} secureTextEntry />
        
        {/* Date Time Picker */}
        <CustomInput
          placeholder="Date of Birth"
          value={Moment(date).format('YYYY-MM-DD')}
          onFocus={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="spinner"
            onChange={onDateChange}
          />
        )}
        
        <CustomButton text="Register" onPress={onRegisterPressed} />
        <Text style={styles.text}>By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTerms}>Terms of Use</Text> and{' '}
          <Text style={styles.link} onPress={onPrivacy}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#FFFFFF",
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
  }
});

export default SignUpPage;
