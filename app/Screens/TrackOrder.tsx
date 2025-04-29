import GoBack from '@/components/GoBack';
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Text, 
  TouchableOpacity, 
  Image,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TrackOrder = () => {
  const [instructionsModalVisible, setInstructionsModalVisible] = useState(false);

  const showInstructionsModal = () => {
    setInstructionsModalVisible(true);
  };

  const hideInstructionsModal = () => {
    setInstructionsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.919,
          longitude: -77.035,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Restaurant marker */}
        <Marker coordinate={{ latitude: 38.921, longitude: -77.035 }} title="Your Location">
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/images/rider.png')}
              style={{ width: 40, height: 20 }}
              resizeMode="contain"
            />
          </View>
        </Marker>

        <Marker coordinate={{ latitude: 38.918, longitude: -77.035 }} title="Destination">
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/images/destination.png')}
              style={{ width: 20, height: 50 }}
              resizeMode="contain"
            />
          </View>
        </Marker>

        {/* Route polyline */}
        <Polyline
          coordinates={[
            { latitude: 38.921, longitude: -77.035 },
            { latitude: 38.921, longitude: -77.038 },
            { latitude: 38.919, longitude: -77.038 },
            { latitude: 38.919, longitude: -77.035 },
            { latitude: 38.918, longitude: -77.035 },
          ]}
          strokeColor="#01615F"
          strokeWidth={4}
        />
      </MapView>
      
      {/* Title Overlay - The Spice Hub */}
      <View style={styles.titleOverlay}>
        <View style={styles.goBack}>
          <GoBack />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleHeader}>Order From</Text>
          <Text style={styles.titleText}>The Spice Hub</Text>
        </View>
      </View>

      {/* Delivery Info Panel */}
      <View style={styles.infoPanel}>
        <View style={styles.statusRow}>
          <View style={styles.timeBadge}>
            <Text style={styles.timeNumber}>7</Text>
            <Text style={styles.timeLabel}>mins</Text>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.statusTitle}>Out for delivery</Text>
            <Text style={styles.statusDescription}>
              David is on the way to deliver your order and will assist you.
            </Text>
          </View>

          <View style={styles.onTimeIndicator}>
            <Text style={styles.onTimeText}>On Time</Text>
            <Icon name="check-circle" size={20} color="#01615F" />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.instructionsButton}
            onPress={showInstructionsModal}
          >
            <Icon name="message-text-outline" size={18} color="#01615F" style={{ marginRight: 6 }} />
            <Text style={styles.instructionsText}>Add Delivery Instructions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.phoneButton}>
            <Icon name="phone" size={22} color="#01615F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Instructions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={instructionsModalVisible}
        onRequestClose={hideInstructionsModal}
      >
        <TouchableWithoutFeedback onPress={hideInstructionsModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.instructionsModal}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add Delivery instructions</Text>
                  <TouchableOpacity onPress={hideInstructionsModal}>
                    <Icon name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.modalSubtitle}>Directions to help the driver reach you</Text>
                
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.instructionsInput}
                    placeholder="Type directions"
                    multiline={true}
                  />
                </View>
                
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={hideInstructionsModal}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '80%',
  },
  // Title overlay styles
  titleOverlay: {
    position: 'absolute',
    width: '100%',
    top: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 1,
  },
  goBack: {
    position: 'absolute',
    left: 16,
    zIndex: 2,
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
    flex: 1,
    marginHorizontal: 40, // Add spacing to make room for the GoBack button
  },
  titleHeader: {
    fontSize: RFPercentage(2),
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  restaurantMarker: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
    borderWidth: 2,
    borderColor: '#01615F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  destinationMarker: {
    alignItems: 'center',
    backgroundColor: "#01615F",
  },
  infoPanel: {
    position: 'absolute',
  bottom: 0,
  width: '100%',
  backgroundColor: '#fff',
  paddingHorizontal: 16,
  paddingVertical: 18,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  elevation: 0,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeBadge: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    width: 44,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  timeNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  textSection: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statusDescription: {
    fontSize: 14,
    color: '#555',
  },
  onTimeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onTimeText: {
    fontSize: 14,
    color: '#01615F',
    marginRight: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  instructionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionsText: {
    fontSize: 14,
    color: '#01615F',
    fontWeight: '500',
  },
  phoneButton: {
    backgroundColor: '#f0f8f6',
    borderRadius: 50,
    padding: 8,
    marginLeft: 10,
  },
  
  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  instructionsModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 16,
  },
  instructionsInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
  voiceButton: {
    padding: 8,
  },
  submitButton: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TrackOrder;