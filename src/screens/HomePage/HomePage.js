import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
// import Icon from 'react-native-vector-icons/dist/FontAwesome';

// const myIcon = <Icon name="rocket" size={30} color="#900" />;
const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Ohan</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white"
    }
})

export default HomePage