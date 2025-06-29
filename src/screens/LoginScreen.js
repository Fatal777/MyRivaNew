import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const handleLogin = async () => {
    let hasErrors = false;

    if (!email.trim()) {
      setEmailError('Email is required');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasErrors = true;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasErrors = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasErrors = true;
    }

    if (hasErrors) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Login successful!');
      // You can add navigation here if needed
      // navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login integration would go here');
  };

  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Facebook login integration would go here');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality would go here');
  };

  const handleSignUp = () => {
    // navigation.navigate('SignUp');
    Alert.alert('Sign Up', 'Navigate to sign up screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Log in to MyFitness</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#A0A0A0"
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#A0A0A0"
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  disabled={isLoading}
                >
                  <Text style={styles.eyeText}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
              disabled={isLoading}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Log in</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={handleGoogleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={handleFacebookLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 8,
  },
  eyeText: {
    fontSize: 18,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 6,
    marginLeft: 4,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#00BCD4',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#B0BEC5',
    elevation: 0,
    shadowOpacity: 0,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    color: '#777777',
    fontSize: 16,
    marginHorizontal: 16,
    fontWeight: '500',
  },
  socialButton: {
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 20,
  },
  signUpText: {
    color: '#777777',
    fontSize: 16,
  },
  signUpLink: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

// PropTypes validation
LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginScreen;