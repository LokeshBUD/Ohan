import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {

  const name = "Shaun"; //get name from DB

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./components/logo.png')} style={styles.logo}/>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Welcome, { name }!</Text>
        <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.boxWrapper} onPress={() => navigation.navigate('Details')}>
          <Image source={require('./components/t1.jpg')} style={styles.boxImage}/>
          <Text style={styles.boxText}>Book a Consultation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxWrapper} onPress={() => navigation.navigate('Details')}>
          <Image source={require('./components/t1.jpg')} style={styles.Image}/>
          <Text style={styles.imageText}>Academics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.boxWrapper} onPress={() => navigation.navigate('Details')}>
          <Image source={require('./components/t1.jpg')} style={styles.Image}/>
          <Text style={styles.imageText}>Our Partners</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3eb',
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
