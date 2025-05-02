import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Define the item type
interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  category?: string;
}

interface AddMoreItemsModalProps {
  visible: boolean;
  onClose: () => void;
  currentItems: Item[];
  onUpdateItems: (items: Item[]) => void;
  onAddToCart: () => void;
  restaurantId?: string;
}

const AddMoreItemsModal: React.FC<AddMoreItemsModalProps> = ({
  visible,
  onClose,
  currentItems,
  onUpdateItems,
  onAddToCart,
  restaurantId
}) => {
  const router = useRouter();
  
  const navigateToRestaurantSelect = () => {
    // Serialize the current cart items to pass to the restaurant select screen
    const cartItemsParam = JSON.stringify(currentItems);
    
    // Navigate to the restaurant select screen with the cart items
    router.push({
      pathname: '/Screens/DishesSearch',
      params: { 
        restaurantId: restaurantId || '',
        cartItems: cartItemsParam
      }
    });
    
    // Close the modal after navigation
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Your Cart</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              {currentItems.length > 0 ? (
                <FlatList
                  data={currentItems}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>${item.price.toFixed(2)} × {item.quantity}</Text>
                      </View>
                      <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                  )}
                  style={styles.itemsList}
                />
              ) : (
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
              )}
              
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={navigateToRestaurantSelect}
              >
                <Text style={styles.addMoreButtonText}>Add More Items</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.continueButton}
                onPress={onClose}
              >
                <Text style={styles.continueButtonText}>Continue with current items</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: RFPercentage(2.4),
    fontFamily: 'Poppins-SemiBold',
    color: '#01615F',
  },
  closeButton: {
    fontSize: RFPercentage(2.4),
    color: '#777',
  },
  itemsList: {
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  itemPrice: {
    fontSize: RFPercentage(1.6),
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 2,
  },
  itemTotal: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-SemiBold',
    color: '#01615F',
  },
  emptyCartText: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Regular',
    color: '#777',
    textAlign: 'center',
    paddingVertical: 20,
  },
  addMoreButton: {
    backgroundColor: '#01615F',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  addMoreButtonText: {
    color: 'white',
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
  },
  continueButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#01615F',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#01615F',
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
  },
});

export default AddMoreItemsModal;