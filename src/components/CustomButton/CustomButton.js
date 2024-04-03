import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({text, onPress, type = "P"}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
        <Text style={styles[`container_${type}`]}>{text}</Text>
    </Pressable>
      
    
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    
    padding:'5%',
    margin: 5,
    width: '70%',
    
  },
  container_P:{
    backgroundColor: '#3b58ff',
    color: 'white',
    borderRadius: 65
  },
  container_T:{
    color: 'gray'
  }

});

export default CustomButton