import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IntroPage from '../screens/IntroPage';
import SignInScreen from '../screens/SignInScreen';
import HomePage from '../screens/HomePage';
import Academics from '../screens/Academics';
import Profile from '../screens/Profile';
import SignUpPage from '../screens/SignUpPage';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBook, faUser } from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroPage} />
        <Stack.Screen name="Signin" component={SignInScreen} />
        <Stack.Screen name="forgotpass" component={ForgetPassword} />
        <Stack.Screen name='SignUp' component={SignUpPage} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name="Home" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tabs = ({ route }) => {
  // Extract userData from the route params
  const { userData } = route.params || {};
  console.log(userData)
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      initialParams={{ userData: userData }} // Pass userData to the tab navigator
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="academics"
        component={Academics}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faBook} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={props => <Profile {...props} userData={userData} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
