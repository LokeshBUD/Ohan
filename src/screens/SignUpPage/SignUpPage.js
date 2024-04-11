import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Logo from '../../assets/images/logo-bg-removed.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Moment from 'moment';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const SignUpPage = () => {
  const { height } = useWindowDimensions();
  const [name, setname] = useState("");
  const [date, setDate] = useState(""); // Initialize with empty string
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordRepeat, setPasswordRepeat] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of date picker
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to hold the selected date
  const [showDoneButton, setShowDoneButton] = useState(false); // State to control visibility of "Done" button
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    if (Password !== PasswordRepeat) {
      Alert.alert("Passwords do not match");
      return;
    }
    auth().createUserWithEmailAndPassword(email, Password)
      .then(() => {
        firestore().collection('Users').add({
          name: name,
          email: email,
          DOB: date,
          photo: "",
        })
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

  // Handler for date change in date picker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSelectedDate(currentDate); // Update the selected date
  };

  const handleDoneButton = () => {
    setShowDoneButton(false);
    setShowDatePicker(false);
    setDate(Moment(selectedDate).format('YYYY-MM-DD')); // Set the selected date
  };
  useEffect(() =>{
    setDate("");
  },[])

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false}>
        <Image source={Logo} style={[styles.logo, { height: height * .3 }]} />
        <Text style={styles.title}>Create an account</Text>
        <CustomInput title="Name" placeholder="Name" value={name} onChangeText={text => setname(text)} />
        <CustomInput title="Email" placeholder="Email" value={email} onChangeText={text => setEmail(text)} />
        <CustomInput title="Password" placeholder="Password" value={Password} onChangeText={text => setPassword(text)} secureTextEntry />
        <CustomInput title="Repeat Password" placeholder="Repeat Password" value={PasswordRepeat} onChangeText={text => setPasswordRepeat(text)} secureTextEntry />
        
        <TouchableOpacity 
        onPress={() => {setShowDatePicker(true) 
                        setShowDoneButton(true)}} 
        style={styles.scrollViewContent}>
          <View pointerEvents="none">
            <CustomInput title="Date of Birth" placeholder="Date of Birth" value={date} style={styles.text} />
          </View>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            mode='date'
            display='spinner'
            value={selectedDate}
            onChange={onDateChange}
          />
        )}

        {showDoneButton && (
          <CustomButton text="Done" onPress={handleDoneButton} />
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
  },
  dateview:{
    width: '100%'
  },
  customInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: '100%',
  }
});

export default SignUpPage;
