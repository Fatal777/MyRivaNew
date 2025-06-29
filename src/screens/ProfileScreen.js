import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  Animated,
  Alert,
  Switch,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

// Move components outside of parent component for better performance
const StatCard = ({ title, value, subtitle, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
    {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
  </View>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.string.isRequired,
};

const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true, rightComponent = null }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuIconContainer}>
      <Icon name={icon} size={24} color="#757575" />
    </View>
    <View style={styles.menuContent}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    {rightComponent || (showArrow && (
      <Icon name="chevron-right" size={24} color="#BDBDBD" />
    ))}
  </TouchableOpacity>
);

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  showArrow: PropTypes.bool,
  rightComponent: PropTypes.element,
};

const ActivityItem = ({ item }) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIcon, { backgroundColor: `${item.color}20` }]}>
      <Icon name={item.icon} size={20} color={item.color} />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityType}>{item.type}</Text>
      <Text style={styles.activityDate}>{item.date}</Text>
    </View>
    <View style={styles.activityRight}>
      <Text style={styles.activityAmount}>{item.amount}</Text>
      <Text style={[styles.activityStatus, { color: item.color }]}>{item.status}</Text>
    </View>
  </View>
);

ActivityItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const userStats = {
    totalRides: 250,
    ridePoints: 75,
    completionRate: 98.5,
    rating: 4.9,
  };

  const recentActivity = [
    {
      id: '1',
      type: 'Car Ride',
      date: '2023-06-28 at 10:30 AM',
      amount: '$15.50',
      status: 'Completed',
      icon: 'directions-car',
      color: '#4CAF50',
    },
    {
      id: '2',
      type: 'Bus Ride',
      date: '2023-06-27 at 04:15 PM',
      amount: '$2.50',
      status: 'Completed',
      icon: 'directions-bus',
      color: '#2196F3',
    },
    {
      id: '3',
      type: 'Auto Ride',
      date: '2023-06-24 at 07:00 AM',
      amount: '$10.25',
      status: 'Completed',
      icon: 'motorcycle',
      color: '#FF9800',
    },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleMyRidesHistory = () => {
    Alert.alert('My Rides History', 'View your complete ride history with detailed information.');
  };

  const handlePersonalInformation = () => {
    Alert.alert('Personal Information', 'Manage your name, email, and phone number.');
  };

  const handleManageAddresses = () => {
    Alert.alert('Manage Addresses', 'Add or update your saved locations and drop-off locations.');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Add, remove, or set default payment methods and cards.');
  };

  const handlePreferencesSettings = () => {
    Alert.alert('Preferences & Settings', 'Customize your ride preferences and app settings.');
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Get help with your account, rides, and common questions.');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your RideFlow account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('User signed out') },
      ]
    );
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
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="#000" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Profile Header Card */}
        <Animated.View style={[styles.profileCard, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#2196F3', '#1976D2', '#0D47A1']}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileHeader}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }}
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editImageButton}>
                  <Icon name="camera-alt" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Sarah Johnson</Text>
                <Text style={styles.profileSubtitle}>Mobile Payment Member</Text>
                <View style={styles.membershipBadge}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.membershipText}>Premium</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard 
              title="Total Rides" 
              value={userStats.totalRides} 
              color="#4CAF50" 
            />
            <StatCard 
              title="Ride Points" 
              value={userStats.ridePoints} 
              color="#2196F3" 
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard 
              title="Completion Rate" 
              value={`${userStats.completionRate}%`} 
              color="#FF9800" 
            />
            <StatCard 
              title="Rating" 
              value={userStats.rating} 
              subtitle="⭐⭐⭐⭐⭐"
              color="#9C27B0" 
            />
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity 
          style={styles.editProfileButton}
          onPress={handleEditProfile}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF5252']}
            style={styles.editButtonGradient}
          >
            <Icon name="edit" size={20} color="#FFF" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Account Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Management</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="history"
              title="My Rides History"
              subtitle="View your past and current ride history"
              onPress={handleMyRidesHistory}
            />
            <MenuItem
              icon="person"
              title="Personal Information"
              subtitle="Manage your name, email, and phone number"
              onPress={handlePersonalInformation}
            />
            <MenuItem
              icon="location-on"
              title="Manage Addresses"
              subtitle="Add or update your saved locations and drop-off locations"
              onPress={handleManageAddresses}
            />
            <MenuItem
              icon="payment"
              title="Payment Methods"
              subtitle="Add, remove, or set default payment methods and cards"
              onPress={handlePaymentMethods}
            />
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {recentActivity.map((item) => (
              <ActivityItem key={item.id} item={item} />
            ))}
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Activities</Text>
              <Icon name="arrow-forward" size={16} color="#2196F3" />
            </TouchableOpacity>
          </View>
        </View>

        {/* General Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon="settings"
              title="Preferences & Settings"
              subtitle="Customize ride preferences and notifications"
              onPress={handlePreferencesSettings}
            />
            <MenuItem
              icon="notifications"
              title="Notifications"
              subtitle="Push notifications for rides and updates"
              showArrow={false}
              rightComponent={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor="#FFF"
                />
              }
            />
            <MenuItem
              icon="location-on"
              title="Location Services"
              subtitle="Allow location access for better experience"
              showArrow={false}
              rightComponent={
                <Switch
                  value={locationEnabled}
                  onValueChange={setLocationEnabled}
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor="#FFF"
                />
              }
            />
            <MenuItem
              icon="help"
              title="Help & Support"
              subtitle="Get help with your account and common questions"
              onPress={handleHelpSupport}
            />
            <MenuItem
              icon="logout"
              title="Sign Out"
              subtitle="Sign out from your RideFlow account"
              onPress={handleSignOut}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>RideFlow v2.1.0</Text>
          <Text style={styles.appCopyright}>© 2023 RideFlow Technologies</Text>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity 
                onPress={() => setShowEditModal(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>Profile editing functionality would be implemented here with form fields for name, email, phone, etc.</Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
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
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
  },
  profileCard: {
    margin: 16,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileGradient: {
    borderRadius: 20,
    padding: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  membershipText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 0.48,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 2,
  },
  editProfileButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  editButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  editButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  activityContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 14,
    color: '#757575',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  activityStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2196F3',
    marginRight: 4,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
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
    minWidth: width * 0.8,
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
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalText: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default ProfileScreen;