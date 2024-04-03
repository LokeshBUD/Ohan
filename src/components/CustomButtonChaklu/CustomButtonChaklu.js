import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text, type }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4169E1',
    width: '60%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    // Additional styles
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#4169E1',
  },
  container_TERTIARY: {
    backgroundColor: '#D3D3D3',
    width: '40%',
  },
  container_ad: {
    backgroundColor: 'f9f9f9',
    borderWidth: 0, // Set border width to 0 to make it invisible
    shadowOpacity: 0, // Remove shadow opacity
    shadowRadius: 0,  // Remove shadow radius
    elevation: 0,    // Remove elevation
    shadowOffset: {   // Remove shadow offset
      width: 0,
      height: 0,
  },
  margin:100,
},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  text_TERTIARY: {
    color: 'gray',
  },
  text_ad: {
    color: 'gray',
    textDecorationLine: 'underline', // Underline the text
    fontWeight: 'bold',
  },
});

export default CustomButton;
