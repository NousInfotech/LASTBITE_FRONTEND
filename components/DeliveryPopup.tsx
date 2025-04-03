import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';

interface DeliveryPopupProps {
  restaurantName: string;
  cartItemsCount: number;
  totalToPay: number;
  onClose?: () => void;
  onAddressSelect: () => void;
}

const DeliveryPopup: React.FC<DeliveryPopupProps> = ({ onAddressSelect, restaurantName, cartItemsCount, totalToPay }) => (
  <View style={styles.popupContainer}>
    <View style={styles.rowContainer}>
      <Image
        source={require('./../assets/images/Navigation.png')}
        style={styles.navigationImage}
        resizeMode="contain"
      />
      <Text style={styles.popupText}>Where would you like us to deliver this order?</Text>
    </View>
    <TouchableOpacity style={styles.popupButton} onPress={onAddressSelect}>
      <Text style={styles.popupButtonText}>Add or Select Address</Text>
    </TouchableOpacity>
  </View>
);

const DeliveryScreen: React.FC = () => {
  const [showPopup, setShowPopup] = useState<'address' | 'payment' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [restaurantName] = useState('Awesome Restaurant'); // Example value
  const [cartItemsCount] = useState(3); // Example value
  const [totalToPay] = useState(250); // Example value
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const openAddressPopup = () => setShowPopup('address');
  const openPaymentPopup = () => setShowPopup('payment');
  const closeAllPopups = () => setShowPopup(null);

  const handlePlaceOrder = () => {
    setShowModal(true);
  };

  const handleCancelOrder = () => {
    setShowModal(false);
    setShowPopup('address');
  };

  const handleConfirmOrder = () => {
    setShowModal(false);
    // router.push({
    //   pathname: '/Screens/PaymentScreen',
    //   params: {
    //     restaurantName,
    //     cartItemsCount,
    //     totalToPay,
    //   },
    // });
  };

  const handleAddNewAddress = () => {
    router.push({
      pathname: '/UserDetails/MapView',
      params: { mode: 'addAddress' },
    });
  };

  const calculateTotal = () => {
    // Your calculation logic here
    return totalToPay; // Just for example
  };

  return (
    <View style={styles.mainContainer}>
      <DeliveryPopup
        restaurantName={restaurantName || 'Restaurant'}
        cartItemsCount={cartItemsCount}
        totalToPay={calculateTotal()}
        onAddressSelect={openAddressPopup}
      />

      {showPopup === 'address' && (
        <View style={styles.addressPopupOverlay}>
          <View style={styles.addressPopupContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Choose a delivery address</Text>
              <TouchableOpacity onPress={closeAllPopups}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[
                { id: '1', name: 'Home', address: '123, Green Valley, Lakeview Street' },
                { id: '2', name: 'Office', address: '456, Ocean Drive, Seaside Blvd' },
              ]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.addressItem} onPress={openPaymentPopup}>
                  <Image
                    source={require('./../assets/images/Navigation.png')}
                    style={styles.navigationImage}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={styles.addressName}>{item.name}</Text>
                    <Text style={styles.addressDetails}>{item.address}</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.addressItem} onPress={handleAddNewAddress}>
              <View style={styles.iconTextContainer}>
                <Ionicons name="add-outline" size={24} color="#01516F" style={styles.addIcon} />
                <Text style={styles.addressName}>Add new address</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showPopup === 'payment' && (
        <View style={styles.paymentPopupOverlay}>
          <PaymentPopup
            onProceedPayment={handlePlaceOrder}
            totalToPay={totalToPay} // Pass totalToPay to PaymentPopup
          />
        </View>
      )}

      <Modal
        transparent
        animationType="fade"
        visible={showModal}
        onRequestClose={handleCancelOrder}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={require('./../assets/images/cash.png')}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <Text style={styles.modalTitle}>Placing Cash Order</Text>
            <Text style={styles.modalSubText}>
              Give cash or ask for QR code when your order is delivered
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancelOrder}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} >
                <Text style={styles.modalButtonText}>Yes! Place Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const PaymentPopup: React.FC<{ onProceedPayment: () => void; totalToPay: number }> = ({
  onProceedPayment,
  totalToPay,
}) => {
  const router = useRouter();

  const handleChangePaymentMethod = () => {
    // Navigate to PaymentScreen with required parameters
    router.push({
      pathname: '/Screens/PaymentScreen',
      params: {
        totalToPay,
      },
    });
  };

  return (
    <View style={styles.popupContainer}>
      <View style={styles.rowContainer}>
        <Image
          source={require('./../assets/images/cash.png')}
          style={styles.navigationImage}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.popupText}>Pay on Delivery (Cash)</Text>
          <Text style={styles.popupSubText}>Pay cash or ask for QR Code</Text>
        </View>
        <TouchableOpacity onPress={handleChangePaymentMethod} style={styles.chevronContainer}>
          <Text style={styles.changeText}>Change</Text>
          <Ionicons name="chevron-forward" size={16} color="#01516F" style={styles.chevron_a} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.popupButton} onPress={onProceedPayment}>
        <Text style={styles.popupButtonText}>Place Order | ₹{totalToPay}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryScreen;


const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 999,
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  navigationImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  popupText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontFamily: 'Poppins-Medium',

  },
  popupSubText: {
    fontSize: 8,
    color: '#333',
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  popupButton: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  popupButtonText: {
    color: '#fff',
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-Medium',
  },
  addressPopupOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure the popup is over other content
  },
  paymentPopupOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1001, // Ensure payment popup is above the address popup
  },
  addressPopupContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  closeButton: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Poppins-Regular',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
  addressName: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  addressDetails: {
    fontSize: RFPercentage(1.3),
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  chevron: {
    fontSize: RFPercentage(4),
    color: '#01615F',
    marginLeft: 'auto',
  },
  chevron_a: {
    fontSize: 20,
    color: '#01615F',
    marginLeft: 'auto',
  },
  chevronContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto', // Push the container to the right
    marginRight: 5, // Add space on the right
  },
  changeText: {
    fontSize: RFPercentage(2),
    color: '#01615F',
    fontFamily: 'Poppins-Medium',
    marginRight: 5, // Space between "Change" text and chevron
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: RFPercentage(1.3),
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: RFPercentage(1.3),
    fontFamily: 'Poppins-Medium',
  },
  modalCancelButton: {
    borderColor: '#01615F',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#01615F',
    fontSize: RFPercentage(1.3),
    fontFamily: 'Poppins-Medium',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    color: '#01615F',
    marginRight: 10,
  },
});

