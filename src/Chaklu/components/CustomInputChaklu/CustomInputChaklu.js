import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      margin: 5,
      width: '100%',
  },
  input: {
      
      borderRadius: 5,
      margin: 5,
      width: '70%',
      padding: 5,
      borderBottomWidth: 1, // Width of the bottom border
      borderBottomColor: '#ccc', // Color of the bottom border
      paddingVertical: 8, // Adjust the padding as per your requirement
      marginBottom: 10,
  }
  
});
export default CustomInput;
