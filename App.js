// App.js
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
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
  const [isLoading, setIsLoading] = useState(true);
  const [splashComplete, setSplashComplete] = useState(false);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setSplashComplete(true);
    // Add a small delay for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Minimum splash screen duration (optional)
  useEffect(() => {
    const minSplashTime = setTimeout(() => {
      if (splashComplete) {
        setIsLoading(false);
      }
    }, 3000); // Minimum 3 seconds

    return () => clearTimeout(minSplashTime);
  }, [splashComplete]);

  // Show splash screen while loading
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a0d1a" />
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      </SafeAreaView>
    );
  }

  // Main app navigation
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});