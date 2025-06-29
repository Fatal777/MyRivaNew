import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [showTour, setShowTour] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const RideCard = ({ icon, title, subtitle, gradient, onPress }) => (
    <TouchableOpacity style={styles.rideCard} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient colors={gradient} style={styles.rideCardGradient}>
        <View style={styles.rideIconContainer}>
          <View style={styles.rideIcon}>
            <Icon name={icon} size={24} color="#FEFEFE" />
          </View>
        </View>
        <View style={styles.rideTextContainer}>
          <Text style={styles.rideTitle}>{title}</Text>
          <Text style={styles.rideSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.rideArrow}>
          <Icon name="chevron-forward" size={16} color="#FEFEFE" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEFEFE" />
      
      {/* Header */}
      <LinearGradient colors={['#FEFEFE', '#9AC1F0']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="menu" size={24} color="#000000" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.userName}>Sarah</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="notifications-outline" size={24} color="#000000" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <LinearGradient colors={['#FC55CA', '#9AC1F0']} style={styles.profileGradient}>
                <Text style={styles.profileText}>SA</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Tour Banner */}
        {showTour && (
          <Animated.View style={[styles.tourBanner, { opacity: fadeAnim }]}>
            <LinearGradient colors={['#9AC1F0', '#FC55CA']} style={styles.tourGradient}>
              <TouchableOpacity
                style={styles.tourCloseButton}
                onPress={() => setShowTour(false)}
              >
                <Icon name="close" size={20} color="#FEFEFE" />
              </TouchableOpacity>
              
              <View style={styles.tourIcon}>
                <Icon name="rocket-outline" size={32} color="#FEFEFE" />
              </View>
              
              <Text style={styles.tourTitle}>New to MyRiva?</Text>
              <Text style={styles.tourDescription}>
                Discover seamless ride booking with enhanced safety features. 
                Let's get you started on your journey!
              </Text>
              
              <TouchableOpacity style={styles.tourButton}>
                <Text style={styles.tourButtonText}>Start Guided Tour</Text>
                <Icon name="arrow-forward" size={16} color="#FC55CA" />
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Quick Stats */}
        <Animated.View style={[styles.statsContainer, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.statCard}>
            <Icon name="time-outline" size={24} color="#FC55CA" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Rides</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="star" size={24} color="#9AC1F0" />
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="wallet-outline" size={24} color="#FC55CA" />
            <Text style={styles.statNumber}>$125</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </Animated.View>

        {/* Book Your Ride Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Book Your Ride</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.rideGrid}>
            <RideCard
              icon="car-sport"
              title="Car Ride"
              subtitle="Comfortable & Fast"
              gradient={['#000000', '#333333']}
              onPress={() => navigation.navigate('RideBooking')}
            />
            <RideCard
              icon="bicycle"
              title="Auto Ride"
              subtitle="Quick & Affordable"
              gradient={['#FC55CA', '#9AC1F0']}
              onPress={() => navigation.navigate('RideBooking')}
            />
            <RideCard
              icon="bicycle-outline"
              title="Bike Ride"
              subtitle="Eco-friendly"
              gradient={['#9AC1F0', '#FC55CA']}
              onPress={() => navigation.navigate('RideBooking')}
            />
            <RideCard
              icon="apps"
              title="More Options"
              subtitle="Explore All"
              gradient={['#000000', '#FC55CA']}
              onPress={() => navigation.navigate('RideBooking')}
            />
          </View>
        </View>

        {/* Recent Rides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <TouchableOpacity style={styles.recentRideCard} activeOpacity={0.9}>
            <View style={styles.recentRideIconContainer}>
              <LinearGradient colors={['#9AC1F0', '#FC55CA']} style={styles.recentRideIcon}>
                <Icon name="car-sport" size={20} color="#FEFEFE" />
              </LinearGradient>
            </View>
            
            <View style={styles.recentRideDetails}>
              <Text style={styles.recentRideTitle}>City Center Trip</Text>
              <Text style={styles.recentRideTime}>Today, 10:30 AM</Text>
              <View style={styles.recentRideRoute}>
                <Icon name="location" size={12} color="#9AC1F0" />
                <Text style={styles.recentRideLocation}>Home → Downtown</Text>
              </View>
            </View>
            
            <View style={styles.recentRidePrice}>
              <Text style={styles.recentRidePriceAmount}>$25.00</Text>
              <View style={styles.recentRideStatus}>
                <Icon name="checkmark-circle" size={12} color="#4CAF50" />
                <Text style={styles.recentRideStatusText}>Completed</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.recentRideAction}>
              <Icon name="chevron-forward" size={20} color="#9AC1F0" />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Additional Recent Ride */}
          <TouchableOpacity style={styles.recentRideCard} activeOpacity={0.9}>
            <View style={styles.recentRideIconContainer}>
              <LinearGradient colors={['#FC55CA', '#9AC1F0']} style={styles.recentRideIcon}>
                <Icon name="bicycle" size={20} color="#FEFEFE" />
              </LinearGradient>
            </View>
            
            <View style={styles.recentRideDetails}>
              <Text style={styles.recentRideTitle}>Office Commute</Text>
              <Text style={styles.recentRideTime}>Yesterday, 8:15 AM</Text>
              <View style={styles.recentRideRoute}>
                <Icon name="location" size={12} color="#FC55CA" />
                <Text style={styles.recentRideLocation}>Apt → Tech Park</Text>
              </View>
            </View>
            
            <View style={styles.recentRidePrice}>
              <Text style={styles.recentRidePriceAmount}>$18.50</Text>
              <View style={styles.recentRideStatus}>
                <Icon name="checkmark-circle" size={12} color="#4CAF50" />
                <Text style={styles.recentRideStatusText}>Completed</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.recentRideAction}>
              <Icon name="chevron-forward" size={20} color="#FC55CA" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Floating Quick Book Button */}
        <TouchableOpacity 
          style={styles.quickBookButton} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('RideBooking')}
        >
          <LinearGradient colors={['#FC55CA', '#9AC1F0']} style={styles.quickBookGradient}>
            <Icon name="add" size={24} color="#FEFEFE" />
            <Text style={styles.quickBookText}>Quick Book</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Icon name="home" size={24} color="#FC55CA" />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="time-outline" size={24} color="#666" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person-outline" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="settings-outline" size={24} color="#666" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 8,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#FC55CA',
    borderRadius: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#FEFEFE',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  tourBanner: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tourGradient: {
    padding: 20,
    position: 'relative',
  },
  tourCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  tourIcon: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  tourTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FEFEFE',
    textAlign: 'center',
    marginBottom: 10,
  },
  tourDescription: {
    fontSize: 14,
    color: '#FEFEFE',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    opacity: 0.9,
  },
  tourButton: {
    backgroundColor: '#FEFEFE',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tourButtonText: {
    color: '#FC55CA',
    fontWeight: '600',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  sectionAction: {
    fontSize: 14,
    color: '#9AC1F0',
    fontWeight: '600',
  },
  rideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rideCard: {
    width: (width - 52) / 2,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
  },
  rideCardGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  rideIconContainer: {
    alignItems: 'flex-end',
  },
  rideIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rideTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FEFEFE',
    marginBottom: 4,
  },
  rideSubtitle: {
    fontSize: 12,
    color: '#FEFEFE',
    opacity: 0.8,
  },
  rideArrow: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  recentRideCard: {
    backgroundColor: '#FEFEFE',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recentRideIconContainer: {
    marginRight: 15,
  },
  recentRideIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentRideDetails: {
    flex: 1,
  },
  recentRideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  recentRideTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  recentRideRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recentRideLocation: {
    fontSize: 12,
    color: '#9AC1F0',
    fontWeight: '500',
  },
  recentRidePrice: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  recentRidePriceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
  },
  recentRideStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  recentRideStatusText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
  },
  recentRideAction: {
    padding: 5,
  },
  quickBookButton: {
    margin: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  quickBookGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  quickBookText: {
    color: '#FEFEFE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FEFEFE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: '#F8F0FF',
    borderRadius: 15,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#FC55CA',
    fontWeight: '600',
  },
});

export default HomeScreen;