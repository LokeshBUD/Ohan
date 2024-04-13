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
import ProfileInfo from '../components/profileInfo/ProfileInfo';
import finishSignUpPage from '../screens/finishSignUppage/finishSignUpPage';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBook, faUser, faLeaf } from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator options={{headerShown:true,title:""}}>
        <Stack.Screen name="Intro" component={IntroPage}  options={{headerShown:false,title:""}}/>
        <Stack.Screen name="Signin" component={SignInScreen} options={{title:""}}/>
        <Stack.Screen name="forgotpass" component={ForgetPassword} options={{title:""}}/>
        <Stack.Screen name='SignUp' component={SignUpPage} options={{title:""}}/>
        <Stack.Screen name="finishSignUp" component={finishSignUpPage} options={{title:""}}/>
        <Stack.Screen name='Profile' component={Profile} options={{title:""}}/>
        <Stack.Screen name="tabs" component={Tabs} options={{headerShown:false,title:""}}/>
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
        component={props => <HomePage {...props} userData={userData}/>}
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
