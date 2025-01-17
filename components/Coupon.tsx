import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CouponModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: () => void;
}

const CouponModal: React.FC<CouponModalProps> = ({ isVisible, onClose, onApply }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} />
          </TouchableOpacity>

          {/* Image and text container */}
          <View style={styles.imageAndTextContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('./../assets/images/Percentage.png')}
                style={styles.percentageImage}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.modalTitle}>
                $150 savings with this coupon
              </Text>
              <Text style={styles.modalSubtext}>
                Try now and save every time you order
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.yayButton}
            onPress={() => {
              onApply();
              onClose();
            }}
          >
            <Text style={styles.yayButtonText}>YAY!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: '90%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  imageAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2, // Add spacing below the container
    marginTop:30

  },
  imageContainer: {
    borderRadius: 50,
    backgroundColor: '#e8f5e9',
    padding: 10,
    marginRight: 10, // Add spacing between the image and text
  },
  percentageImage: {
    width: 30, // Adjust the size as needed
    height: 30,
  },
  textContainer: {
    flex: 1, // Allow text to take up remaining space
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#01615F',
    textAlign: 'left', // Align text to the left
  },
  modalSubtext: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'left', // Align text to the left
  },
  yayButton: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
  },
  yayButtonText: {
    color: '#01615F',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default CouponModal;
