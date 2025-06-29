// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onAnimationComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringScale1 = useRef(new Animated.Value(0.5)).current;
  const ringScale2 = useRef(new Animated.Value(0.5)).current;
  const wheelRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start wheel rotation animation
    Animated.loop(
      Animated.timing(wheelRotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();

    // Main animation sequence
    Animated.sequence([
      // Logo appears with scale and fade
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        // Decorative rings expand
        Animated.stagger(300, [
          Animated.timing(ringScale1, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(ringScale2, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
      // Wait a bit
      Animated.delay(500),
      // App name slides up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      // Pulse effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 2 }
      ),
    ]).start(() => {
      // Animation complete, wait a bit then proceed to main app
      setTimeout(() => {
        onAnimationComplete();
      }, 500);
    });
  }, []);

  const wheelRotate = wheelRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a0d1a" barStyle="light-content" />
      
      {/* Background gradient effect */}
      <View style={styles.gradientBackground} />
      
      {/* Floating decorative elements */}
      <FloatingShapes />
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: Animated.multiply(scaleAnim, pulseAnim) }
              ],
            },
          ]}
        >
          {/* Decorative rings */}
          <Animated.View
            style={[
              styles.decorativeRingOuter,
              {
                transform: [{ scale: ringScale2 }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.decorativeRing,
              {
                transform: [{ scale: ringScale1 }],
              },
            ]}
          />
          
          {/* Car Icon */}
          <View style={styles.carIcon}>
            <View style={styles.carBody}>
              <View style={styles.carWindow} />
              <View style={styles.carDoor} />
            </View>
            <View style={styles.carWheels}>
              <Animated.View 
                style={[
                  styles.wheel,
                  { transform: [{ rotate: wheelRotate }] }
                ]} 
              />
              <Animated.View 
                style={[
                  styles.wheel,
                  { transform: [{ rotate: wheelRotate }] }
                ]} 
              />
            </View>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.appName}>MyRiva</Text>
          <Text style={styles.tagline}>Safe Rides for Women</Text>
        </Animated.View>

        {/* Loading Dots */}
        <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
          <LoadingDots />
        </Animated.View>
      </View>

      {/* Bottom Text */}
      <Animated.View style={[styles.bottomContainer, { opacity: fadeAnim }]}>
        <Text style={styles.bottomText}>Empowering Women's Mobility</Text>
      </Animated.View>
    </View>
  );
};

const LoadingDots = () => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(dot2, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(dot3, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.delay(200),
        Animated.timing(dot1, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        Animated.timing(dot2, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        Animated.timing(dot3, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      ]).start(() => animateDots());
    };
    
    setTimeout(() => animateDots(), 2000); // Start after 2 seconds
  }, []);

  return (
    <View style={styles.dotsContainer}>
      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
    </View>
  );
};

const FloatingShapes = () => {
  const shape1Anim = useRef(new Animated.Value(0)).current;
  const shape2Anim = useRef(new Animated.Value(0)).current;
  const shape3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateShape = (anim, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 6000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateShape(shape1Anim, 0);
    animateShape(shape2Anim, 2000);
    animateShape(shape3Anim, 4000);
  }, []);

  const createFloatingTransform = (anim) => ({
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 0.33, 0.66, 1],
          outputRange: [0, -20, 10, 0],
        }),
      },
      {
        rotate: anim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  });

  return (
    <View style={styles.floatingElements}>
      <Animated.View style={[styles.floatingShape1, createFloatingTransform(shape1Anim)]} />
      <Animated.View style={[styles.floatingShape2, createFloatingTransform(shape2Anim)]} />
      <Animated.View style={[styles.floatingShape3, createFloatingTransform(shape3Anim)]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a0d1a', // Dark pink base
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  carIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  carBody: {
    width: 100,
    height: 50,
    backgroundColor: '#FF69B4',
    borderRadius: 25,
    position: 'relative',
    marginBottom: 8,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  carWindow: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 60,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    opacity: 0.95,
  },
  carDoor: {
    position: 'absolute',
    right: 30,
    top: 18,
    width: 2,
    height: 14,
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    borderRadius: 1,
  },
  carWheels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 110,
    paddingHorizontal: 15,
  },
  wheel: {
    width: 20,
    height: 20,
    backgroundColor: '#2D2D2D',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FF69B4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  decorativeRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#FF69B4',
    opacity: 0.3,
    zIndex: 1,
  },
  decorativeRingOuter: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#FF69B4',
    opacity: 0.15,
    zIndex: 0,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 105, 180, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  tagline: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    marginTop: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF69B4',
    marginHorizontal: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  floatingShape1: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 105, 180, 0.15)',
    top: '15%',
    left: '10%',
  },
  floatingShape2: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 105, 180, 0.15)',
    top: '70%',
    right: '15%',
  },
  floatingShape3: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 105, 180, 0.15)',
    top: '25%',
    right: '20%',
  },
});

export default SplashScreen;