import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const RideBookingScreen = ({ navigation }) => {
  const [selectedRide, setSelectedRide] = useState('bike');
  const [selectedDestination, setSelectedDestination] = useState('');

  const rideOptions = [
    {
      id: 'bike',
      title: 'Bike',
      subtitle: 'Quick & cheap',
      icon: '🚲',
      time: '12 min',
      price: '$5',
      color: '#FF6B6B',
    },
    {
      id: 'car',
      title: 'Car',
      subtitle: 'Comfort & fast',
      icon: '🚗',
      time: '8 min',
      price: '$12',
      color: '#4ECDC4',
    },
    {
      id: 'bus',
      title: 'Auto/Bus',
      subtitle: 'Eco-friendly',
      icon: '🚌',
      time: '15 min',
      price: '$3',
      color: '#45B7D1',
    },
  ];

  const destinations = [
    { id: 1, name: 'Where do you want to go?', icon: 'location-outline' },
    { id: 2, name: 'Choose a saved place', icon: 'bookmark-outline' },
    { id: 3, name: 'Set destination on map', icon: 'map-outline' },
    { id: 4, name: 'Request a ride for someone', icon: 'person-add-outline' },
  ];

  const nearbyRides = [
    { id: 1, type: 'bike', distance: '2 min away', lat: 40.7128, lng: -74.0060 },
    { id: 2, type: 'car', distance: '5 min away', lat: 40.7150, lng: -74.0080 },
    { id: 3, type: 'bike', distance: '3 min away', lat: 40.7100, lng: -74.0040 },
  ];

  const handleRideSelect = (rideId) => {
    setSelectedRide(rideId);
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination.name);
  };

  const handleBookRide = () => {
    console.log('Booking ride:', selectedRide, selectedDestination);
    navigation.navigate('RidesList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Ride</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Journey Status Card */}
        <LinearGradient
          colors={['#FFB3BA', '#FFDFBA']}
          style={styles.journeyCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.journeyContent}>
            <View style={styles.journeyText}>
              <Text style={styles.journeyTitle}>Your journey starts</Text>
              <Text style={styles.journeySubtitle}>
                Get to where you want to go with ease
              </Text>
            </View>
            <View style={styles.journeyIcon}>
              <Text style={styles.mountainEmoji}>🏔️</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Choose Your Ride Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Ride</Text>
          <View style={styles.rideOptions}>
            {rideOptions.map((ride) => (
              <TouchableOpacity
                key={ride.id}
                style={[
                  styles.rideOption,
                  selectedRide === ride.id && styles.rideOptionSelected,
                ]}
                onPress={() => handleRideSelect(ride.id)}
                activeOpacity={0.8}
              >
                <View style={styles.rideIconContainer}>
                  <Text style={styles.rideIcon}>{ride.icon}</Text>
                </View>
                <Text style={styles.rideTitle}>{ride.title}</Text>
                <Text style={styles.rideSubtitle}>{ride.subtitle}</Text>
                <View style={styles.rideDetails}>
                  <Text style={styles.rideTime}>{ride.time}</Text>
                  <Text style={styles.ridePrice}>{ride.price}</Text>
                </View>
                {selectedRide === ride.id && (
                  <View style={[styles.selectedIndicator, { backgroundColor: ride.color }]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Destination Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Where to?</Text>
          <View style={styles.destinationOptions}>
            {destinations.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                style={[
                  styles.destinationOption,
                  selectedDestination === destination.name && styles.destinationSelected,
                ]}
                onPress={() => handleDestinationSelect(destination)}
                activeOpacity={0.7}
              >
                <View style={styles.destinationIconContainer}>
                  <Icon name={destination.icon} size={20} color="#666" />
                </View>
                <Text style={styles.destinationText}>{destination.name}</Text>
                <Icon name="chevron-forward" size={16} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.quickActionCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.quickActionContent}>
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>Add up to 5 stops to your journey</Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.quickActionIcon}>
              <Text style={styles.routeEmoji}>🗺️</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Rides Around You */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rides Around You</Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapEmoji}>🗺️</Text>
              <Text style={styles.mapText}>Interactive Map</Text>
              <View style={styles.rideMarkers}>
                {nearbyRides.map((ride) => (
                  <View key={ride.id} style={styles.rideMarker}>
                    <Text style={styles.markerText}>{ride.type === 'bike' ? '🚲' : '🚗'}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Book Ride Button */}
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedRide || !selectedDestination) && styles.bookButtonDisabled,
          ]}
          onPress={handleBookRide}
          disabled={!selectedRide || !selectedDestination}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              selectedRide && selectedDestination
                ? ['#667eea', '#764ba2']
                : ['#ccc', '#999']
            }
            style={styles.bookButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.bookButtonText}>Book Your Ride</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  journeyCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  journeyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  journeyText: {
    flex: 1,
  },
  journeyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  journeySubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  journeyIcon: {
    marginLeft: 15,
  },
  mountainEmoji: {
    fontSize: 40,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  rideOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rideOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 4,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  rideOptionSelected: {
    borderColor: '#667eea',
    backgroundColor: '#F0F4FF',
  },
  rideIconContainer: {
    marginBottom: 8,
  },
  rideIcon: {
    fontSize: 32,
  },
  rideTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  rideSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  rideDetails: {
    alignItems: 'center',
  },
  rideTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  ridePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  destinationOptions: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    overflow: 'hidden',
  },
  destinationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  destinationSelected: {
    backgroundColor: '#E3F2FD',
  },
  destinationIconContainer: {
    marginRight: 15,
  },
  destinationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  quickActionCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    fontSize: 14,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  quickActionIcon: {
    marginLeft: 15,
  },
  routeEmoji: {
    fontSize: 32,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
  },
  mapPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9ECEF',
    position: 'relative',
  },
  mapEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  rideMarkers: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  rideMarker: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  markerText: {
    fontSize: 20,
  },
  bookButton: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookButtonDisabled: {
    opacity: 0.6,
  },
  bookButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default RideBookingScreen;