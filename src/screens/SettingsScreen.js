import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Switch,
  Alert,
  Modal,
  TextInput,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

// Move components outside to prevent re-renders
const SettingItem = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showArrow = true, 
  rightComponent = null,
  iconColor = '#757575',
  iconBg = '#F5F5F5'
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.settingIcon, { backgroundColor: iconBg }]}>
      <Icon name={icon} size={22} color={iconColor} />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightComponent || (showArrow && (
      <Icon name="chevron-right" size={24} color="#BDBDBD" />
    ))}
  </TouchableOpacity>
);

SettingItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
  showArrow: PropTypes.bool,
  rightComponent: PropTypes.node,
  iconColor: PropTypes.string,
  iconBg: PropTypes.string,
};

const SectionHeader = ({ title, icon }) => (
  <View style={styles.sectionHeader}>
    <Icon name={icon} size={20} color="#2196F3" />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

function SettingsScreen({ navigation }) {
  // Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  // Modal States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);

  // Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTheme, setSelectedTheme] = useState('Light');

  // Animation
  const [fadeAnim] = useState(new Animated.Value(0));

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const themes = [
    { id: 'light', name: 'Light', icon: 'light-mode' },
    { id: 'dark', name: 'Dark', icon: 'dark-mode' },
    { id: 'auto', name: 'Auto', icon: 'brightness-auto' },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Navigate to profile editing screen with form fields for personal information.');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert('Account Deletion', 'Account deletion process initiated. You will receive a confirmation email.');
          }
        },
      ]
    );
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }
    
    Alert.alert('Success', 'Password changed successfully.');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'View our comprehensive privacy policy and data handling practices.');
  };

  const handleTermsOfService = () => {
    Alert.alert('Terms of Service', 'Review the terms and conditions for using RideFlow services.');
  };

  const handleManageData = () => {
    setShowDataModal(true);
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Your data export request has been submitted. You will receive a download link via email within 24 hours.');
    setShowDataModal(false);
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear temporary files and may improve app performance. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          onPress: () => {
            Alert.alert('Success', 'Cache cleared successfully.');
            setShowDataModal(false);
          }
        },
      ]
    );
  };

  const handleBackPress = () => {
    // Use optional chaining for safer navigation
    navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Account Settings */}
          <View style={styles.section}>
            <SectionHeader title="Account Settings" icon="account-circle" />
            <View style={styles.settingsContainer}>
              <SettingItem
                icon="edit"
                title="Edit Profile"
                subtitle="Manage your profile and account security"
                onPress={handleEditProfile}
                iconColor="#4CAF50"
                iconBg="#E8F5E8"
              />
              <SettingItem
                icon="lock"
                title="Change Password"
                subtitle="Update your account password"
                onPress={() => setShowPasswordModal(true)}
                iconColor="#2196F3"
                iconBg="#E3F2FD"
              />
              <SettingItem
                icon="security"
                title="Two-Factor Authentication"
                subtitle="Add an extra layer of security"
                showArrow={false}
                iconColor="#FF9800"
                iconBg="#FFF3E0"
                rightComponent={
                  <Switch
                    value={twoFactorAuth}
                    onValueChange={setTwoFactorAuth}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor="#FFF"
                  />
                }
              />
              <SettingItem
                icon="fingerprint"
                title="Biometric Authentication"
                subtitle="Use fingerprint or face recognition"
                showArrow={false}
                iconColor="#9C27B0"
                iconBg="#F3E5F5"
                rightComponent={
                  <Switch
                    value={biometricAuth}
                    onValueChange={setBiometricAuth}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor="#FFF"
                  />
                }
              />
              <SettingItem
                icon="delete-forever"
                title="Delete Account"
                subtitle="Permanently delete your account and data"
                onPress={handleDeleteAccount}
                iconColor="#F44336"
                iconBg="#FFEBEE"
              />
            </View>
          </View>

          {/* Notification Preferences */}
          <View style={styles.section}>
            <SectionHeader title="Notification Preferences" icon="notifications" />
            <View style={styles.settingsContainer}>
              <SettingItem
                icon="notifications-active"
                title="Push Notifications"
                subtitle="Receive notifications about your rides and updates"
                showArrow={false}
                iconColor="#4CAF50"
                iconBg="#E8F5E8"
                rightComponent={
                  <Switch
                    value={pushNotifications}
                    onValueChange={setPushNotifications}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor="#FFF"
                  />
                }
              />
              <SettingItem
                icon="email"
                title="Email Notifications"
                subtitle="Get updates and promotions via email"
                showArrow={false}
                iconColor="#2196F3"
                iconBg="#E3F2FD"
                rightComponent={
                  <Switch
                    value={emailNotifications}
                    onValueChange={setEmailNotifications}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor="#FFF"
                  />
                }
              />
              <SettingItem
                icon="sms"
                title="SMS Alerts"
                subtitle="Receive important alerts via text message"
                showArrow={false}
                iconColor="#FF9800"
                iconBg="#FFF3E0"
                rightComponent={
                  <Switch
                    value={smsAlerts}
                    onValueChange={setSmsAlerts}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor="#FFF"
                  />
                }
              />
            </View>
          </View>

          {/* Privacy & Security */}
          <View style={styles.section}>
            <SectionHeader title="Privacy & Security" icon="shield" />
            <View style={styles.settingsContainer}>
              <SettingItem
                icon="location-on"
                title="Location Tracking"
                subtitle="Allow location access for better service"
                showArrow={false}
                iconColor="#F44336"
                iconBg="#FFEBEE"
                rightComponent={
                  <Switch
                    value={locationTracking}
                    onValueChange={setLocationTracking}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor="#FFF"
                  />
                }
              />
              <SettingItem
                icon="policy"
                title="Privacy Policy"
                subtitle="Review our privacy practices and policies"
                onPress={handlePrivacyPolicy}
                iconColor="#2196F3"
                iconBg="#E3F2FD"
              />
              <SettingItem
                icon="description"
                title="Terms of Service"
                subtitle="Read the terms and conditions"
                onPress={handleTermsOfService}
                iconColor="#4CAF50"
                iconBg="#E8F5E8"
              />
              <SettingItem
                icon="storage"
                title="Manage Data"
                subtitle="Export, backup, or delete your data"
                onPress={handleManageData}
                iconColor="#9C27B0"
                iconBg="#F3E5F5"
              />
            </View>
          </View>

          {/* App Preferences */}
          <View style={styles.section}>
            <SectionHeader title="App Preferences" icon="settings" />
            <View style={styles.settingsContainer}>
              <SettingItem
                icon="language"
                title="Language"
                subtitle={selectedLanguage}
                onPress={() => setShowLanguageModal(true)}
                iconColor="#FF9800"
                iconBg="#FFF3E0"
              />
              <SettingItem
                icon="palette"
                title="Theme"
                subtitle={selectedTheme}
                onPress={() => setShowThemeModal(true)}
                iconColor="#9C27B0"
                iconBg="#F3E5F5"
              />
              <SettingItem
                icon="backup"
                title="Auto Backup"
                subtitle="Automatically backup your data"
                showArrow={false}
                iconColor="#4CAF50"
                iconBg="#E8F5E8"
                rightComponent={
                  <Switch
                    value={autoBackup}
                    onValueChange={setAutoBackup}
                    trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                    thumbColor="#FFF"
                  />
                }
              />
            </View>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appName}>MyRidev</Text>
            <Text style={styles.appVersion}>Version 2.1.0</Text>
            <Text style={styles.appCopyright}>© 2023 RideFlow Technologies</Text>
          </View>
        </Animated.View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Password Change Modal */}
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TouchableOpacity 
                onPress={() => setShowPasswordModal(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.textInput}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.textInput}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowPasswordModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleChangePassword}
              >
                <Text style={styles.confirmButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity 
                onPress={() => setShowLanguageModal(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.languageList}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageItem,
                    selectedLanguage === language.name && styles.selectedLanguageItem
                  ]}
                  onPress={() => {
                    setSelectedLanguage(language.name);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={[
                    styles.languageName,
                    selectedLanguage === language.name && styles.selectedLanguageName
                  ]}>
                    {language.name}
                  </Text>
                  {selectedLanguage === language.name && (
                    <Icon name="check" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        visible={showThemeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowThemeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Theme</Text>
              <TouchableOpacity 
                onPress={() => setShowThemeModal(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeItem,
                  selectedTheme === theme.name && styles.selectedThemeItem
                ]}
                onPress={() => {
                  setSelectedTheme(theme.name);
                  setShowThemeModal(false);
                }}
              >
                <Icon name={theme.icon} size={24} color="#757575" />
                <Text style={[
                  styles.themeName,
                  selectedTheme === theme.name && styles.selectedThemeName
                ]}>
                  {theme.name}
                </Text>
                {selectedTheme === theme.name && (
                  <Icon name="check" size={20} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Data Management Modal */}
      <Modal
        visible={showDataModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDataModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Data</Text>
              <TouchableOpacity 
                onPress={() => setShowDataModal(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.dataOption} onPress={handleExportData}>
              <Icon name="download" size={24} color="#4CAF50" />
              <View style={styles.dataOptionContent}>
                <Text style={styles.dataOptionTitle}>Export Data</Text>
                <Text style={styles.dataOptionSubtitle}>Download all your data</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.dataOption} onPress={handleClearCache}>
              <Icon name="cleaning-services" size={24} color="#FF9800" />
              <View style={styles.dataOptionContent}>
                <Text style={styles.dataOptionTitle}>Clear Cache</Text>
                <Text style={styles.dataOptionSubtitle}>Free up storage space</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Add PropTypes for the main component
SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginLeft: 8,
  },
  settingsContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#BDBDBD',
  },
  bottomPadding: {
    height: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    minWidth: width * 0.85,
    maxHeight: height * 0.8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
  modalCloseButton: {
    padding: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#F8F9FA',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalButton: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  languageList: {
    maxHeight: 300,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  selectedLanguageItem: {
    backgroundColor: '#E8F5E8',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  selectedLanguageName: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  selectedThemeItem: {
    backgroundColor: '#E8F5E8',
  },
  themeName: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    marginLeft: 12,
  },
  selectedThemeName: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  dataOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  dataOptionContent: {
    flex: 1,
    marginLeft: 12,
  },
  dataOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  dataOptionSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
});

export default SettingsScreen;