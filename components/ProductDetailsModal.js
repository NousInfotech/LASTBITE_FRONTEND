import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

const ProductDetailsModal = ({ visible, onClose, item, onAddToCart, cartCounts }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Sync the modal visibility with the prop
  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);
  
  const handleRequestClose = () => {
    // Prevent accidental closing
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleRequestClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.headerTopRow}>
              <View style={styles.titlePriceContainer}>
                <Text style={styles.itemName}>{item?.name || "Lorem Ipsum"}</Text>
                <Text style={styles.itemPrice}>${item?.price?.toFixed(2) || "65"}</Text>
              </View>
              <View style={styles.addButtonContainer}>
                {/* We use the Add button regardless of cart state in the modal */}
                <TouchableOpacity 
                  style={styles.addButton} 
                  onPress={() => onAddToCart(item)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.itemDescription}>
              {item?.description || "Lorem ipsum dolor sit amet consectetur. Risi lorem blandit massa tincidun"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsSection}>
            <Text style={styles.detailsTitle}>Product details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Quantity:</Text>
              <Text style={styles.detailValue}>1 kg (Serves 3-4 people)</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Serves with:</Text>
              <Text style={styles.detailValue}>None</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivery Time:</Text>
              <Text style={styles.detailValue}>30-45 minutes</Text>
            </View>
          </View>
          
          {/* Close button at bottom */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleRequestClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
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
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 25,
  },
  modalHeader: {
    marginBottom: 15,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titlePriceContainer: {
    flex: 1,
    marginRight: 15,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    lineHeight: 20,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    borderColor: "#01615F",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%', // Takes full width of container
    alignItems: 'center',
  },
  addButtonText: {
    color: "#01615F",
    fontFamily: 'Poppins-Medium',
    fontSize: RFPercentage(2),
  },
  closeButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: "#333",
    fontFamily: 'Poppins-Medium',
    fontSize: RFPercentage(2),
  },
});

export default ProductDetailsModal;