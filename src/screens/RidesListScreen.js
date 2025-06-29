import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

function RidesListScreen({ navigation }) {
  const [selectedRide, setSelectedRide] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const ridesData = [
    {
      id: 1,
      driverName: 'Alice Johnson',
      rating: 4.8,
      vehicle: 'Car',
      pickup: 'Central Plaza',
      destination: 'Downtown Office',
      pickupTime: '10:00 AM',
      dropTime: '10:20 AM',
      price: 15.50,
      distance: '8.5 km',
      estimatedTime: '20 min',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 2,
      driverName: 'Bob Williams',
      rating: 4.6,
      vehicle: 'Bike',
      pickup: 'Main Street Cafe',
      destination: 'Riverside Park',
      pickupTime: '10:15 AM',
      dropTime: '10:30 AM',
      price: 8.00,
      distance: '4.2 km',
      estimatedTime: '15 min',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 3,
      driverName: 'Charlie Brown',
      rating: 4.9,
      vehicle: 'Auto',
      pickup: 'Westside Market',
      destination: 'Museum District',
      pickupTime: '10:30 AM',
      dropTime: '10:45 AM',
      price: 12.75,
      distance: '6.1 km',
      estimatedTime: '15 min',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 4,
      driverName: 'Diana Prince',
      rating: 4.7,
      vehicle: 'Car',
      pickup: 'University Campus',
      destination: 'Tech Hub',
      pickupTime: '10:40 AM',
      dropTime: '11:00 AM',
      price: 18.00,
      distance: '12.3 km',
      estimatedTime: '20 min',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
  ];

  const getVehicleIcon = (vehicle) => {
    switch (vehicle.toLowerCase()) {
      case 'car': return 'directions-car';
      case 'bike': return 'motorcycle';
      case 'auto': return 'airport-shuttle';
      default: return 'directions-car';
    }
  };

  const getVehicleColor = (vehicle) => {
    switch (vehicle.toLowerCase()) {
      case 'car': return '#4CAF50';
      case 'bike': return '#FF9800';
      case 'auto': return '#2196F3';
      default: return '#4CAF50';
    }
  };

  const handleBookRide = (ride) => {
    setSelectedRide(ride.id);
    Alert.alert(
      'Confirm Booking',
      `Book ride with ${ride.driverName}?\nPrice: $${ride.price}\nEstimated time: ${ride.estimatedTime}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book Now',
          onPress: () => {
            Alert.alert('Success', 'Ride booked successfully!');
            setSelectedRide(null);
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const RideCard = ({ ride }) => (
    <View style={[styles.rideCard, selectedRide === ride.id && styles.selectedCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.driverInfo}>
          <Image source={{ uri: ride.avatar }} style={styles.avatar} />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{ride.driverName}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{ride.rating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.vehicleInfo}>
          <View style={[styles.vehicleIcon, { backgroundColor: getVehicleColor(ride.vehicle) }]}>
            <Icon name={getVehicleIcon(ride.vehicle)} size={20} color="white" />
          </View>
          <Text style={styles.vehicleType}>{ride.vehicle}</Text>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <View style={styles.routeItem}>
          <Icon name="my-location" size={16} color="#4CAF50" />
          <Text style={styles.locationText}>{ride.pickup}</Text>
          <Text style={styles.timeText}>{ride.pickupTime}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeItem}>
          <Icon name="location-on" size={16} color="#F44336" />
          <Text style={styles.locationText}>{ride.destination}</Text>
          <Text style={styles.timeText}>{ride.dropTime}</Text>
        </View>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.detailItem}>
          <Icon name="straighten" size={16} color="#666" />
          <Text style={styles.detailText}>{ride.distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="access-time" size={16} color="#666" />
          <Text style={styles.detailText}>{ride.estimatedTime}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${ride.price.toFixed(2)}</Text>
          <Text style={styles.priceLabel}>Total Fare</Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: getVehicleColor(ride.vehicle) }]}
          onPress={() => handleBookRide(ride)}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Rides</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="tune" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <Icon name="search" size={20} color="#4CAF50" />
          <Text style={styles.statusText}>Searching nearby rides...</Text>
        </View>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Icon name="refresh" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {ridesData.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
        
        <View style={styles.loadMoreContainer}>
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load More Rides</Text>
            <Icon name="keyboard-arrow-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'white',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333', flex: 1, textAlign: 'center' },
  headerActions: { flexDirection: 'row' },
  filterButton: { padding: 8 },
  statusBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'white',
    borderBottomWidth: 1, borderBottomColor: '#e0e0e0',
  },
  statusItem: { flexDirection: 'row', alignItems: 'center' },
  statusText: { marginLeft: 8, color: '#666', fontSize: 14 },
  refreshButton: { padding: 4 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  rideCard: {
    backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  selectedCard: { borderWidth: 2, borderColor: '#4CAF50' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  driverInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  driverDetails: { flex: 1 },
  driverName: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { marginLeft: 4, fontSize: 14, color: '#666' },
  vehicleInfo: { alignItems: 'center' },
  vehicleIcon: {
    width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
    marginBottom: 4,
  },
  vehicleType: { fontSize: 12, color: '#666', fontWeight: '500' },
  routeInfo: { marginBottom: 16 },
  routeItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  routeLine: { width: 2, height: 20, backgroundColor: '#e0e0e0', marginLeft: 7, marginVertical: 4 },
  locationText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#333' },
  timeText: { fontSize: 14, color: '#666', fontWeight: '500' },
  rideDetails: { flexDirection: 'row', marginBottom: 16 },
  detailItem: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  detailText: { marginLeft: 6, fontSize: 14, color: '#666' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceContainer: { flex: 1 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  priceLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  bookButton: {
    paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4,
  },
  bookButtonText: { color: 'white', fontSize: 14, fontWeight: '600' },
  loadMoreContainer: { alignItems: 'center', marginTop: 16 },
  loadMoreButton: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 24, backgroundColor: 'white',
    borderRadius: 8, elevation: 1,
  },
  loadMoreText: { marginRight: 8, color: '#666', fontSize: 14 },
});

export default RidesListScreen;
