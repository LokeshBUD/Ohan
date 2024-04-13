import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({userData}) => {
  const navigation = useNavigation(); // Add this line
  // const route = useRoute();
  // console.log("route =>",route)
  // const { userData } = route.params || {}; // Destructure userData from route.params
  console.log("userData:", userData);
  
  useEffect(() => {
    // Your useEffect logic here
  }, [userData]);

  return (
    <GestureHandlerRootView>
      <ScrollView horizontal={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('../../assets/images/logo-bg-removed.png')} style={styles.logo}/>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>Welcome, {userData?.name || 'Guest'}!</Text> 
            <View style={styles.boxContainer}>
              <TouchableOpacity style={styles.boxWrapper} onPress={() => navigation.navigate('Details')}>
                <Image source={require('../../assets/images/consultation.png')} style={styles.boxImage}/>
                <Text style={styles.boxText}>Book a Consultation</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.boxWrapper} onPress={() => navigation.navigate('Details')}>
                <Image source={require('../../assets/images/consultation.png')} style={styles.Image}/>
                <Text style={styles.imageText}>Academics</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.boxWrapper} onPress={() => navigation.navigate('Details')}>
                <Image source={require('../../assets/images/consultation.png')} style={styles.Image}/>
                <Text style={styles.imageText}>Our Partners</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: '5%'
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginLeft: 10,
    alignItems: 'flex',
  },
  logo: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boxContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  boxWrapper: {
    margin: 10,
  },

  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginTop: -65,
    marginBottom: 45,
  },

  boxImage: {
    width: 370,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    opacity: 0.5,
  },

  Image: {
    width: 370,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    opacity: 0.5,
  },

  imageText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginTop: -120,
    marginBottom: 90,
  },
});

export default HomeScreen;
