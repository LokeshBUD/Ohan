import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Logo from '../../assets/images/logo-bg-removed.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Moment from 'moment';
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const FinishSignUpPage = () => {
  const { height } = useWindowDimensions();
  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of date picker
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to hold the selected date
  const [showDoneButton, setShowDoneButton] = useState(false); // State to control visibility of "Done" button
  
  const navigation = useNavigation();
  
  const route = useRoute(); // Use useRoute hook to access route params
  const { userData } = route.params || {}; // Destructure userData from route.params
  console.log("userData:", userData);
  
  const onRegisterPressed = async () => {
    try {
      // Update the DOB field in the Firestore document
      let formattedDate = date.toString();
      const usersRef = firestore().collection('Users');
      const userQuerySnapshot = await usersRef.where('email', '==', userData.email).get();
  
      if (userQuerySnapshot.empty) {
        console.log('No matching documents.');
        return;
      }
  
      userQuerySnapshot.forEach(async (doc) => {
        await usersRef.doc(doc.id).update({ DOB: formattedDate });
      });
      Alert.alert('Date of Birth Updated Successfully');
      navigation.navigate("Home", {userData: userData});
    } catch (error) {
      console.error('Error updating date of birth:', error);
      Alert.alert('Error', 'Failed to update Date of Birth');
    }
  }

  const onTerms = () => {
    console.warn('terms');
  }

  const onPrivacy = () => {
    console.warn('privacy');
  }

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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={Logo} style={[styles.logo, { height: height * .3 }]} />
        <Text style={styles.title}>Enter Date of Birth</Text>
        <TouchableOpacity 
          onPress={() => {
            setShowDatePicker(true);
            setShowDoneButton(true);
          }} 
          style={styles.dateview}>
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
  dateview: {
    width: '100%',
  },
  customInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: '100%',
  },
});

export default FinishSignUpPage;
