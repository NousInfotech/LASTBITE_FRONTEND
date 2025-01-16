import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
            <MaterialIcons name="close" size={24} color="#01615F" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>
            $150 savings with this coupon
          </Text>
          
          <Text style={styles.modalSubtext}>
            Try now and save every time you order
          </Text>

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
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#01615F',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  modalSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  yayButton: {
    // backgroundColor: '#01615F',
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