import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Button, FlatList } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProfileInfo from '../../components/profileInfo/ProfileInfo';

const Profile = ({ userData }) => {
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const askForPermissions = permission => {
    request(permission).then(result => {
      console.log(result);
    });
  };

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
        const user = doc.data();
        setDateOfBirth(user.DOB || "");
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
  }, [userData]);

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

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick();
      setSelectedDocuments(prevDocs => [...prevDocs, doc]); // Add the selected document to the state
    } catch (err) {
      console.log(err);
    }
  };

  const renderDocumentItem = ({ item }) => {
    return (
      <View style={styles.documentItem}>
        <Text style={styles.documentName}>{item.name}</Text>
      </View>
    );
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

      <View > 
        <Text style={styles.label}>Personal Info</Text>
      </View>
      <View style={{marginLeft: '10%'}}>
        <View style={styles.infoTable}>
          <ProfileInfo icon="user" info={userData.name || "Name"} />
          <ProfileInfo icon="envelope" info={userData.email || "Email"} />
          <ProfileInfo icon="calendar" info={dateOfBirth || "Date of Birth"} />
        </View>
      </View>
      
      <View > 
        <Text style={styles.label}> Documents</Text>
      </View>
      
      <FlatList
  horizontal
  data={[{ id: 'uploadButton' }, ...selectedDocuments]}
  renderItem={({ item }) => item.id === 'uploadButton' ? (
    <TouchableOpacity style={styles.button} onPress={selectDoc}>
      <FontAwesomeIcon icon={faPlus} size={20} color="white" />
    </TouchableOpacity>
  ) : (
    <View style={styles.documentItem}>
      <Text style={styles.documentName}>{item.name}</Text>
    </View>
  )}
  keyExtractor={item => (item && item.id) ? item.id.toString() : Math.random().toString()}
/>

      <Button title="Logout" onPress={handleLogout}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoTable: {
    marginBottom: 20,
    padding: '3%',
    borderRadius: 5,
    backgroundColor: 'lightgray'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  documentItem: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10,
  },
  documentName: {
    fontSize: 16,
  },
});

export default Profile;
