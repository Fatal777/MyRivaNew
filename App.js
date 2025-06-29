import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RideBookingScreen from './src/screens/RideBookingScreen';
import RidesListScreen from './src/screens/RidesListScreen';
import RideDetailsPopupScreen from './src/screens/RideDetailsPopupScreen';
import BookingConfirmationScreen from './src/screens/BookingConfirmationScreen';
import RideTrackingScreen from './src/screens/RideTrackingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RideBooking" component={RideBookingScreen} />
        <Stack.Screen name="RidesList" component={RidesListScreen} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
        <Stack.Screen name="RideTracking" component={RideTrackingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
