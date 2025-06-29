import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Share,
  Linking,
  Animated,
  PanResponder,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

function RideDetailsPopupScreen({ visible, onClose, rideData, navigation }) {
  const [slideAnim] = useState(new Animated.Value(height));
  const [dragOffset] = useState(new Animated.Value(0));

  const defaultRideData = {
    driverName: 'Joshua',
    driverRating: 4.9,
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    vehicleNumber: '382-SOD23',
    vehicleModel: 'BMW-R2',
    destination: 'Home',
    distance: '4.3km',
    address: '3342 Hill Street, Jacksonville, FL 32202',
    fare: 12.32,
    paymentMethod: 'MasterCard 2321',
    estimatedTime: '12 min',
    tripId: 'TR-2024-001',
  };

  const ride = rideData || defaultRideData;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy > 10 && Math.abs(gestureState.dx) < 50,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) dragOffset.setValue(gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) handleClose();
      else Animated.spring(dragOffset, { toValue: 0, useNativeDriver: true }).start();
    },
  });

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, { toValue: 0, tension: 100, friction: 8, useNativeDriver: true }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dragOffset.setValue(0);
      onClose();
    });
  };

  const handleChatWithDriver = () => {
    Alert.alert('Chat with Driver', `Start a chat with ${ride.driverName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Start Chat', onPress: () => console.log('Opening chat...') },
    ]);
  };

  const handleCallDriver = () => {
    Alert.alert('Call Driver', `Call ${ride.driverName} at ${ride.vehicleNumber}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => Linking.openURL('tel:+1234567890') },
    ]);
  };

  const handleChangeDestination = () => {
    Alert.alert('Change Destination', 'Do you want to change or add a destination?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Change', onPress: () => console.log('Changing destination...') },
      { text: 'Add Stop', onPress: () => console.log('Adding stop...') },
    ]);
  };

  const handleChangePayment = () => {
    Alert.alert('Change Payment Method', 'Select a new payment method', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Credit Card', onPress: () => console.log('Credit card selected') },
      { text: 'Digital Wallet', onPress: () => console.log('Digital wallet selected') },
      { text: 'Cash', onPress: () => console.log('Cash selected') },
    ]);
  };

  const handleShareTrip = async () => {
    try {
      const shareMessage = `I'm on my way to ${ride.destination}!\nDriver: ${ride.driverName} (${ride.driverRating}⭐)\nVehicle: ${ride.vehicleModel} - ${ride.vehicleNumber}\nETA: ${ride.estimatedTime}\nTrip ID: ${ride.tripId}`;
      await Share.share({ message: shareMessage, title: 'My Ride Status' });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleCancelTrip = () => {
    Alert.alert('Cancel Trip', 'Are you sure you want to cancel this trip?', [
      { text: 'Keep Trip', style: 'cancel' },
      {
        text: 'Cancel Trip',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Trip Cancelled', 'Your trip has been cancelled successfully.');
          handleClose();
        },
      },
    ]);
  };

  const handleConfirmRide = () => {
    Alert.alert('Confirm Ride', `Confirm your ride with ${ride.driverName}?`, [
      { text: 'Back', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          Animated.sequence([
            Animated.timing(slideAnim, {
              toValue: height,
              duration: 400,
              useNativeDriver: true,
            })
          ]).start(() => {
            dragOffset.setValue(0);
            onClose();
          });
          Alert.alert('Ride Confirmed!', 'Your driver is on the way.');
        },
      },
    ]);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.popup, { transform: [{ translateY: slideAnim }, { translateY: dragOffset }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragHandle} />
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="keyboard-arrow-down" size={28} color="#666" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Ride Details</Text>
            <View style={styles.headerSpacer} />
          </View>
          <View style={{ padding: 20 }}>
            <Text style={styles.driverName}>{ride.driverName}</Text>
            <Text style={styles.detailText}>{ride.vehicleModel} · {ride.vehicleNumber}</Text>
            <Text style={styles.detailText}>{ride.address}</Text>
            <Text style={styles.detailText}>Estimated: {ride.estimatedTime}</Text>
          </View>
          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelTrip}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmRide}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.85,
    paddingBottom: 34,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerSpacer: {
    width: 36,
  },
  driverName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#444',
    fontSize: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#00BCD4',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RideDetailsPopupScreen;
