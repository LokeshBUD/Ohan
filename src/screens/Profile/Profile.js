import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Profile = ({userData}) => {
  // const route = useRoute();
  // console.log(route)
  // const { userData } = route.params || {}; // Initialize userData as an empty object if not provided
  console.log(userData)
  const askForPermissions = permission => {
    request(permission).then(result => {
      console.log(result);
    });
  };

  const [image, setImage] = useState(null);

  const getdata = async () => {
    try {
      const usersCollection = firestore().collection('Users');
      const snapshot = await usersCollection.where('email', '==', userData?.email).get();

      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      getdata();
    }

    if (Platform.OS === 'android') {
      askForPermissions(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } else if (Platform.OS === 'ios') {
      askForPermissions(PERMISSIONS.IOS.MEDIA_LIBRARY);
    }
  }, [userData]); // Run effect only when userData changes

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
        console.log('Image URI:', response.assets[0].uri);
      }
    });
  };

  const navigation = useNavigation();
  const handleLogout = () => {
    console.log('Logout clicked');
    navigation.navigate("Signin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: userData?.photo }} style={styles.image} />
        <Button
          title="Upload Image"
          onPress={handleImageUpload}
        />
      </View>
      <View style={styles.infoTable}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{userData?.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{userData?.email}</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    backgroundColor: '#FFFFFF',
  
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: '25%',
  },
  infoTable: {
    marginBottom: 20,
    alignItems: 'left',
    paddingLeft: '5%'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
});

export default Profile;
