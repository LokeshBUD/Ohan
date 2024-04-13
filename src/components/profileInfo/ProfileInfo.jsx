import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faCalendar } from '@fortawesome/free-solid-svg-icons';

const ProfileInfo = ({ icon, info }) => {
  // Map the input icon string to the corresponding FontAwesome icon
  const getFontAwesomeIcon = iconName => {
    switch (iconName) {
      case 'user':
        return faUser;
      case 'envelope':
        return faEnvelope;
      case 'calendar':
        return faCalendar;
      default:
        return faUser; // Default icon
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FontAwesomeIcon icon={getFontAwesomeIcon(icon)} size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>{info}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default ProfileInfo;
