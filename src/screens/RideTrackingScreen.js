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
  Platform,
  Alert,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

function RideTrackingScreen({ navigation }) {
  const [rideStatus, setRideStatus] = useState('arriving'); // arriving, picked_up, in_transit
  const [estimatedTime, setEstimatedTime] = useState(8);
  const [driverLocation, setDriverLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [userLocation] = useState({
    latitude: 37.7849,
    longitude: -122.4194,
  });
  const [pulseAnimation] = useState(new Animated.Value(1));

  // Pulse animation for driver marker
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
      }));
      
      if (estimatedTime > 0) {
        setEstimatedTime(prev => Math.max(0, prev - 1));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [estimatedTime]);

  const handleContactDriver = () => {
    Alert.alert(
      'Contact Driver',
      'Choose how you want to contact Aisha',
      [
        { text: 'Call', onPress: () => console.log('Calling driver...') },
        { text: 'Message', onPress: () => console.log('Opening chat...') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleCancelRide = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel this ride? Cancellation fees may apply.',
      [
        { text: 'No, Keep Ride', style: 'cancel' },
        { text: 'Yes, Cancel', style: 'destructive', onPress: () => console.log('Ride cancelled') },
      ]
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      'Emergency',
      'This will share your location with emergency contacts and authorities.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Emergency', style: 'destructive', onPress: () => console.log('Emergency activated') },
      ]
    );
  };

  const handleBackPress = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const getStatusText = () => {
    switch (rideStatus) {
      case 'arriving':
        return 'Driver is arriving';
      case 'picked_up':
        return 'Picked up';
      case 'in_transit':
        return 'On the way';
      default:
        return 'Tracking ride';
    }
  };

  const getStatusColor = () => {
    switch (rideStatus) {
      case 'arriving':
        return '#4CAF50';
      case 'picked_up':
        return '#2196F3';
      case 'in_transit':
        return '#FF9800';
      default:
        return '#4CAF50';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{getStatusText()}</Text>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
            <Icon name="emergency" size={24} color="#FF5722" />
          </TouchableOpacity>
        </View>

        {/* Map Container */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: (driverLocation.latitude + userLocation.latitude) / 2,
              longitude: (driverLocation.longitude + userLocation.longitude) / 2,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            showsUserLocation={false}
            showsMyLocationButton={false}
            followsUserLocation={true}
            customMapStyle={mapStyle}
          >
            {/* Driver Marker with Pulse Animation */}
            <Marker coordinate={driverLocation}>
              <Animated.View style={[
                styles.driverMarker,
                { transform: [{ scale: pulseAnimation }] }
              ]}>
                <LinearGradient
                  colors={['#4CAF50', '#45A049']}
                  style={styles.markerGradient}
                >
                  <Icon name="directions-car" size={20} color="#FFF" />
                </LinearGradient>
              </Animated.View>
            </Marker>

            {/* User Marker */}
            <Marker coordinate={userLocation}>
              <View style={styles.userMarker}>
                <Icon name="person" size={16} color="#FFF" />
              </View>
            </Marker>

            {/* Route Line */}
            <Polyline
              coordinates={[driverLocation, userLocation]}
              strokeColor="#4CAF50"
              strokeWidth={3}
              lineDashPattern={[10, 5]}
            />
          </MapView>
          
          {/* Map Overlay - Real-time Map View Label */}
          <View style={styles.mapLabel}>
            <Text style={styles.mapLabelText}>Real-time Map View</Text>
          </View>
        </View>

        {/* Driver Info Card */}
        <View style={styles.driverCard}>
          <LinearGradient
            colors={['#FFF', '#F8F9FA']}
            style={styles.cardGradient}
          >
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Text style={styles.avatarText}>AS</Text>
              </View>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>Aisha Sharma</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      name="star"
                      size={14}
                      color={star <= 4 ? "#FFD700" : "#E0E0E0"}
                    />
                  ))}
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
                <Text style={styles.carInfo}>Swift Dzire • DL3CP 8876</Text>
              </View>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                <Text style={styles.statusText}>Online</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* ETA Card */}
        <View style={styles.etaCard}>
          <LinearGradient
            colors={['#E3F2FD', '#BBDEFB']}
            style={styles.etaGradient}
          >
            <View style={styles.etaContent}>
              <View style={styles.etaIcon}>
                <Icon name="access-time" size={32} color="#1976D2" />
              </View>
              <View style={styles.etaInfo}>
                <Text style={styles.etaTime}>{estimatedTime} min</Text>
                <Text style={styles.etaLabel}>Estimated Arrival</Text>
              </View>
              <View style={styles.etaProgress}>
                <View style={[styles.progressBar, { width: `${Math.max(10, 100 - (estimatedTime * 10))}%` }]} />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Trip Details */}
        <View style={styles.tripDetails}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          
          <View style={styles.locationContainer}>
            <View style={styles.locationItem}>
              <View style={[styles.locationDot, { backgroundColor: '#4CAF50' }]} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Pickup</Text>
                <Text style={styles.locationText}>123 Main Street, Downtown</Text>
              </View>
            </View>
            
            <View style={styles.locationLine} />
            
            <View style={styles.locationItem}>
              <View style={[styles.locationDot, { backgroundColor: '#F44336' }]} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Destination</Text>
                <Text style={styles.locationText}>456 Oak Avenue, Uptown</Text>
              </View>
            </View>
          </View>

          <View style={styles.tripMetrics}>
            <View style={styles.metric}>
              <Icon name="straighten" size={20} color="#757575" />
              <Text style={styles.metricValue}>8.5 km</Text>
              <Text style={styles.metricLabel}>Distance</Text>
            </View>
            <View style={styles.metric}>
              <Icon name="attach-money" size={20} color="#757575" />
              <Text style={styles.metricValue}>₹185</Text>
              <Text style={styles.metricLabel}>Fare</Text>
            </View>
            <View style={styles.metric}>
              <Icon name="payment" size={20} color="#757575" />
              <Text style={styles.metricValue}>Card</Text>
              <Text style={styles.metricLabel}>Payment</Text>
            </View>
          </View>
        </View>

        {/* Safety Features */}
        <View style={styles.safetySection}>
          <Text style={styles.sectionTitle}>Safety & Support</Text>
          <View style={styles.safetyButtons}>
            <TouchableOpacity style={styles.safetyButton}>
              <Icon name="share-location" size={20} color="#4CAF50" />
              <Text style={styles.safetyButtonText}>Share Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.safetyButton}>
              <Icon name="report-problem" size={20} color="#FF9800" />
              <Text style={styles.safetyButtonText}>Report Issue</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={handleContactDriver}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#00BCD4', '#0097A7']}
              style={styles.buttonGradient}
            >
              <Icon name="phone" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Contact Driver</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancelRide}
            activeOpacity={0.8}
          >
            <View style={styles.cancelButtonContent}>
              <Icon name="cancel" size={20} color="#F44336" />
              <Text style={styles.cancelButtonText}>Cancel Ride</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const mapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  emergencyButton: {
    padding: 8,
  },
  mapContainer: {
    height: height * 0.4,
    backgroundColor: '#E0E0E0',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapLabel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mapLabelText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  driverMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  userMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  driverCard: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardGradient: {
    borderRadius: 16,
    padding: 20,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  carInfo: {
    fontSize: 14,
    color: '#757575',
  },
  statusIndicator: {
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#757575',
  },
  etaCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  etaGradient: {
    borderRadius: 16,
    padding: 20,
  },
  etaContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etaIcon: {
    marginRight: 16,
  },
  etaInfo: {
    flex: 1,
  },
  etaTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2',
    lineHeight: 36,
  },
  etaLabel: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  etaProgress: {
    width: 60,
    height: 4,
    backgroundColor: 'rgba(25, 118, 210, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1976D2',
    borderRadius: 2,
  },
  tripDetails: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 4,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 12,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 5,
    marginVertical: -6,
  },
  tripMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  safetySection: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  safetyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  safetyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 0.48,
  },
  safetyButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  contactButton: {
    flex: 1,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F44336',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cancelButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  cancelButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
  bottomPadding: {
    height: 32,
  },
});

export default RideTrackingScreen;