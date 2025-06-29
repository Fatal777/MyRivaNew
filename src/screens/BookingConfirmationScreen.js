import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

function BookingConfirmationScreen({ navigation, route }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [slideAnim] = useState(new Animated.Value(50));

  // Default booking data for demo
  const defaultBookingData = {
    bookingId: 'BK-2024-789',
    from: '123 Riverdale Ave',
    to: '456 Central St',
    dateTime: 'Fri, Jul 19, 10:30 AM',
    vehicleType: 'Premium Sedan',
    fare: 28.50,
    driverName: 'Sarah Johnson',
    driverRating: 4.8,
    driverAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    driverPhone: '+1-555-0123',
    vehicleModel: 'Toyota Camry',
    vehicleNumber: 'ABC-1234',
    estimatedArrival: '8 minutes',
    distance: '12.5 km',
    duration: '25 minutes',
  };

  const bookingData = route?.params?.bookingData || defaultBookingData;

  useEffect(() => {
    // Animate elements on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleTrackRide = () => {
    Alert.alert(
      'Track Your Ride',
      'You will be redirected to the live tracking screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Track Now',
          onPress: () => {
            // Navigate to tracking screen
            console.log('Navigate to tracking screen');
          },
        },
      ]
    );
  };

  const handleViewAllRides = () => {
    Alert.alert(
      'View All Rides',
      'See your ride history and upcoming bookings.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'View History',
          onPress: () => {
            console.log('Navigate to rides history');
          },
        },
      ]
    );
  };

  const handleCallDriver = () => {
    Alert.alert(
      'Call Driver',
      `Call ${bookingData.driverName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            console.log(`Calling ${bookingData.driverPhone}`);
          },
        },
      ]
    );
  };

  const handleMessageDriver = () => {
    Alert.alert(
      'Message Driver',
      `Send a message to ${bookingData.driverName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Message',
          onPress: () => {
            console.log('Opening chat with driver');
          },
        },
      ]
    );
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking? Cancellation fees may apply.',
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Booking Cancelled', 'Your booking has been cancelled successfully.');
            navigation?.goBack();
          },
        },
      ]
    );
  };

  const handleBackPress = () => {
    navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Confirmed</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.successIcon}>
            <LinearGradient
              colors={['#4CAF50', '#66BB6A']}
              style={styles.successIconGradient}
            >
              <Icon name="check" size={40} color="white" />
            </LinearGradient>
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your ride has been booked successfully
          </Text>
        </Animated.View>

        {/* Booking Details Card */}
        <Animated.View
          style={[
            styles.detailsCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Route Information */}
          <View style={styles.routeSection}>
            <View style={styles.routeItem}>
              <View style={styles.routeIndicator}>
                <View style={[styles.routeDot, styles.startDot]} />
              </View>
              <View style={styles.routeText}>
                <Text style={styles.routeLabel}>From</Text>
                <Text style={styles.routeAddress}>{bookingData.from}</Text>
              </View>
            </View>
            
            <View style={styles.routeLine} />
            
            <View style={styles.routeItem}>
              <View style={styles.routeIndicator}>
                <View style={[styles.routeDot, styles.endDot]} />
              </View>
              <View style={styles.routeText}>
                <Text style={styles.routeLabel}>To</Text>
                <Text style={styles.routeAddress}>{bookingData.to}</Text>
              </View>
            </View>
          </View>

          {/* Trip Details */}
          <View style={styles.tripDetailsSection}>
            <View style={styles.tripDetailRow}>
              <View style={styles.tripDetailItem}>
                <Icon name="access-time" size={16} color="#666" />
                <Text style={styles.tripDetailLabel}>Date & Time</Text>
                <Text style={styles.tripDetailValue}>{bookingData.dateTime}</Text>
              </View>
              <View style={styles.tripDetailItem}>
                <Icon name="directions-car" size={16} color="#666" />
                <Text style={styles.tripDetailLabel}>Vehicle Type</Text>
                <Text style={styles.tripDetailValue}>{bookingData.vehicleType}</Text>
              </View>
            </View>
            
            <View style={styles.tripDetailRow}>
              <View style={styles.tripDetailItem}>
                <Icon name="straighten" size={16} color="#666" />
                <Text style={styles.tripDetailLabel}>Distance</Text>
                <Text style={styles.tripDetailValue}>{bookingData.distance}</Text>
              </View>
              <View style={styles.tripDetailItem}>
                <Icon name="schedule" size={16} color="#666" />
                <Text style={styles.tripDetailLabel}>Duration</Text>
                <Text style={styles.tripDetailValue}>{bookingData.duration}</Text>
              </View>
            </View>
          </View>

          {/* Fare Section */}
          <View style={styles.fareSection}>
            <Text style={styles.fareLabel}>Fare</Text>
            <Text style={styles.fareAmount}>${bookingData.fare.toFixed(2)}</Text>
          </View>
        </Animated.View>

        {/* Driver Information */}
        <Animated.View
          style={[
            styles.driverCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.driverHeader}>
            <Text style={styles.driverSectionTitle}>Your Driver</Text>
            <Text style={styles.estimatedArrival}>Arrives in {bookingData.estimatedArrival}</Text>
          </View>
          
          <View style={styles.driverInfo}>
            <Image source={{ uri: bookingData.driverAvatar }} style={styles.driverAvatar} />
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{bookingData.driverName}</Text>
              <View style={styles.driverRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{bookingData.driverRating}</Text>
              </View>
              <Text style={styles.vehicleInfo}>
                {bookingData.vehicleModel} • {bookingData.vehicleNumber}
              </Text>
            </View>
            <View style={styles.driverActions}>
              <TouchableOpacity
                style={styles.driverActionButton}
                onPress={handleCallDriver}
              >
                <Icon name="phone" size={20} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.driverActionButton}
                onPress={handleMessageDriver}
              >
                <Icon name="message" size={20} color="#2196F3" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Additional Information */}
        <Animated.View
          style={[
            styles.infoCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.infoItem}>
            <Icon name="info-outline" size={20} color="#2196F3" />
            <Text style={styles.infoText}>
              You will receive SMS updates about your ride status
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="security" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>
              Your ride is covered by our safety guarantee
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="payment" size={20} color="#FF9800" />
            <Text style={styles.infoText}>
              Payment will be processed after ride completion
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={handleTrackRide}
        >
          <LinearGradient
            colors={['#00BCD4', '#0097A7']}
            style={styles.trackButtonGradient}
          >
            <Icon name="my-location" size={20} color="white" />
            <Text style={styles.trackButtonText}>Track My Ride</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.secondaryActions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleViewAllRides}
          >
            <Text style={styles.secondaryButtonText}>View All Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelBooking}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
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
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  successIcon: {
    marginBottom: 20,
  },
  successIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  detailsCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeSection: {
    marginBottom: 20,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIndicator: {
    width: 20,
    alignItems: 'center',
    marginRight: 16,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  startDot: {
    backgroundColor: '#4CAF50',
  },
  endDot: {
    backgroundColor: '#F44336',
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#e0e0e0',
    marginLeft: 9,
    marginVertical: 8,
  },
  routeText: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  routeAddress: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  tripDetailsSection: {
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tripDetailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tripDetailItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  tripDetailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 4,
  },
  tripDetailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  fareSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  fareLabel: {
    fontSize: 16,
    color: '#666',
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4',
  },
  driverCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  estimatedArrival: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
  },
  driverActions: {
    flexDirection: 'row',
  },
  driverActionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomActions: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trackButton: {
    marginBottom: 12,
  },
  trackButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  trackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginRight: 8,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#f44336',
    fontWeight: '500',
  },
});

// Example usage component
const BookingConfirmationExample = () => {
  const [showScreen, setShowScreen] = useState(true);

  if (showScreen) {
    return (
      <BookingConfirmationScreen
        navigation={{
          goBack: () => setShowScreen(false),
        }}
        route={{
          params: {
            bookingData: {
              bookingId: 'BK-2024-789',
              from: '123 Riverdale Ave',
              to: '456 Central St',
              dateTime: 'Fri, Jul 19, 10:30 AM',
              vehicleType: 'Premium Sedan',
              fare: 28.50,
              driverName: 'Sarah Johnson',
              driverRating: 4.8,
              driverAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
              driverPhone: '+1-555-0123',
              vehicleModel: 'Toyota Camry',
              vehicleNumber: 'ABC-1234',
              estimatedArrival: '8 minutes',
              distance: '12.5 km',
              duration: '25 minutes',
            },
          },
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#00BCD4',
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
        onPress={() => setShowScreen(true)}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Show Booking Confirmation
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingConfirmationScreen;