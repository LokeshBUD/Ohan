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
          <Image source={require('./components/book.png')} style={styles.bookImage}/>
          <Text style={styles.bookText}>Book a Consultation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxWrapper} onPress={() => navigation.navigate('Details')}>
          <Image source={require('./components/acad.webp')} style={styles.Image}/>
          <Text style={styles.imageText}>Academics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.boxWrapper} onPress={() => navigation.navigate('Details')}>
          <Image source={require('./components/part.jpg')} style={styles.Image}/>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  boxContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 200,
  },
  boxWrapper: {
    margin: 10,
  },

  bookText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginTop: -65,
    marginBottom: 45,
  },

  bookImage: {
    width: 370,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    opacity: 0.7,
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 200,
  },

  Image: {
    width: 370,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    opacity: 0.7,
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
