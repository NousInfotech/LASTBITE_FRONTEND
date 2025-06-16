import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";
import * as Font from "expo-font";
import { router } from "expo-router";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [stopTimerModal, setStopTimerModal] = useState(false);
  const [shiftActive, setShiftActive] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [shiftTime, setShiftTime] = useState("--:-- --");
 const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
    checkShiftStatus();
  }, []);

  // Check if shift is active when component loads
  const checkShiftStatus = async () => {
    try {
      const active = await AsyncStorage.getItem('shiftActive');
      if (active === 'true') {
        const startTime = await AsyncStorage.getItem('shiftStartTime');
        const currentEarnings = await AsyncStorage.getItem('currentEarnings');
        
        if (startTime) {
          const start = new Date(startTime);
          const now = new Date();
          const elapsed = Math.floor((now.getTime() - start.getTime()) / 1000); // elapsed seconds
          
          setShiftActive(true);
          setEarnings(parseInt(currentEarnings || '0'));
          setElapsedTime(elapsed);
          
          // Format shift time
          const formattedTime = formatTime(start);
          setShiftTime(formattedTime);
          
          // Start timer
          startEarningsTimer(elapsed);
        }
      }
    } catch (error) {
      console.error('Error checking shift status:', error);
    }
  };

  // Format time to HH:MM AM/PM
  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return hours + ':' + strMinutes + ' ' + ampm;
  };

  // Start the earnings timer
  const startEarningsTimer = (initialElapsed = 0) => {
    // Clear any existing interval
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    // Set initial elapsed time
    setElapsedTime(initialElapsed);
    
    // Start a new interval
    const interval = setInterval(async () => {
      setElapsedTime(prev => {
        const newElapsed = prev + 1;
        
        // Check if 15 minutes have passed (900 seconds)
        if (newElapsed % 900 === 0) {
          // Add ₹10 to earnings
          setEarnings(prevEarnings => {
            const newEarnings = prevEarnings + 10;
            // Save to AsyncStorage
            AsyncStorage.setItem('currentEarnings', newEarnings.toString());
            return newEarnings;
          });
        }
        
        return newElapsed;
      });
    }, 1000);
    
    setTimerInterval(interval);
  };

  // Stop the shift and timer
  const stopShift = async () => {
    // Clear the interval
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    // Reset shift status
    setShiftActive(false);
    setShiftTime("--:-- --");
    
    // Clear AsyncStorage
    await AsyncStorage.removeItem('shiftActive');
    await AsyncStorage.removeItem('shiftStartTime');
    await AsyncStorage.removeItem('currentEarnings');
    
    // Show confirmation
    Alert.alert(
      "Shift Ended",
      `Your shift has ended. Total earnings: ₹${earnings}`,
      [{ text: "OK" }]
    );
    
    // Reset earnings for next shift
    setEarnings(0);
    setElapsedTime(0);
    setStopTimerModal(false);
  };

  // Format elapsed time for display
  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartShift = () => {
    if (shiftActive) {
      // If shift is active, show stop timer modal
      setStopTimerModal(true);
    } else {
      // Otherwise show face verification modal
      setModalVisible(true);
    }
  };

  const startVerification = (): void => {
    setModalVisible(false);
    router.push('/auth2/CameraScreen');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeStopTimerModal = () => {
    setStopTimerModal(false);
  };

  if (!fontsLoaded) {
    return null; // Optionally, show a loading screen or placeholder
  }

  const handleMap = () => {
    router.push('/(tabsthree)/map')
  }

  const handleViewDetails = () => {
    router.push('/Screens/ViewDetailsRiders')
  }
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <LocationHeader />
      <SearchBarVoice
        onInputPress={() => {}}
        redirectTargets={["Dishes", "Restaurants"]}
        placeholder="Search...."
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Shift Starting Section */}
        <View style={styles.shiftContainer}>
          <Text allowFontScaling={false}  style={styles.rupeeSign}>₹{earnings}</Text>
          {!shiftActive ? (
            <Text allowFontScaling={false}  style={styles.shiftText}>
              Begin your work shift with just a click!
            </Text>
          ) : (
            <Text allowFontScaling={false}  style={styles.shiftText}>
              Your shift is active! Tap timer to end shift.
            </Text>
          )}

          <TouchableOpacity
            style={styles.startShiftButton}
            onPress={handleStartShift}
          >
            {!shiftActive ? (
              <Text allowFontScaling={false}  style={styles.startShiftText}>Start Your Shift</Text>
            ) : (
              <Text allowFontScaling={false}  style={styles.startShiftText}>{formatElapsedTime(elapsedTime)}</Text>
            )}
          </TouchableOpacity>

          <Text allowFontScaling={false}  style={styles.shiftedAtText}>
            SHIFTED AT: {shiftTime}
          </Text>
        </View>

        {/* Quick Links Section */}
        <Text allowFontScaling={false}  style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.quickLinksContainer}>
          <View style={styles.quickLinkCard}>
            <View style={styles.iconCircle}>
              <Image
                source={require("../../assets/images/order-1.png")}
                style={styles.linkIcon}
              />
            </View>
            <Text allowFontScaling={false}  style={styles.linkTitle}>Completed Orders</Text>
            <Text allowFontScaling={false}  style={styles.linkValue}>20</Text>
          </View>

          <View style={styles.quickLinkCard}>
            <View style={styles.iconCircle}>
              {/* <Image
                source={require("../../assets/images/Star.png")}
                style={styles.linkIcon}
              /> */}
            </View>
            <Text allowFontScaling={false}  style={styles.linkTitle}>Average Rating</Text>
            <Text allowFontScaling={false}  style={styles.linkValue}>4.5</Text>
          </View>
        </View>

        {/* Current Order Section */}
        <Text allowFontScaling={false}  style={styles.sectionTitle}>Current Order</Text>
        <View style={styles.currentOrderCard}>
          <View style={styles.orderHeader}>
            <Text allowFontScaling={false}  style={styles.orderStatus}>On the Way</Text>
            <Text allowFontScaling={false}  style={styles.orderTime}>
              Remaining time:<Text allowFontScaling={false}  style={styles.deliveryPlace}> 15 mins</Text>
            </Text>
          </View>

          <View style={styles.orderDetails}>
            <Text allowFontScaling={false}  style={styles.earnings}>
              Estimated Earnings: <Text allowFontScaling={false}  style={styles.amount}>₹40</Text>
            </Text>

            <Text allowFontScaling={false}  style={styles.deliveryLocation}>
              Deliver at: <Text allowFontScaling={false}  style={styles.deliveryPlace}>abc</Text>
            </Text>
          </View>
          <Text allowFontScaling={false}  style={styles.deliveryInfo}>
            Time: 16 mins | Distance: 3.34 kms
          </Text>
          <View style={styles.orderActions}>
            <TouchableOpacity style={styles.mapButton} onPress={handleMap}>
              <Text allowFontScaling={false}  style={styles.mapButtonText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
              <Text allowFontScaling={false}  style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Face Verification Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text allowFontScaling={false}  style={styles.modalTitle}>
                Please complete face verification to start your delivery job.
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text allowFontScaling={false}  style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.verificationButton}
              onPress={startVerification}
            >
              <Text allowFontScaling={false}  style={styles.verificationButtonText}>Start Verification</Text>
            </TouchableOpacity>
            
            <View style={styles.guideContainer}>
              <Text allowFontScaling={false}  style={styles.guideTitle}>Quick Guide for Face Verification</Text>
              <View style={styles.guideItem}>
                <Text allowFontScaling={false}  style={styles.guideText}>• Stand in good lighting for clear detection.</Text>
              </View>
              <View style={styles.guideItem}>
                <Text allowFontScaling={false}  style={styles.guideText}>• Keep your face centered in the frame.</Text>
              </View>
              <View style={styles.guideItem}>
                <Text allowFontScaling={false}  style={styles.guideText}>• Make sure your head is clear and not covered.</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Stop Timer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={stopTimerModal}
        onRequestClose={closeStopTimerModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text allowFontScaling={false}  style={styles.modalTitle}>
                Do you want to end your current shift?
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeStopTimerModal}>
                <Text allowFontScaling={false}  style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <Text allowFontScaling={false}  style={styles.shiftStats}>
              Total time: {formatElapsedTime(elapsedTime)}
            </Text>
            <Text allowFontScaling={false}  style={styles.shiftStats}>
              Total earnings: ₹{earnings}
            </Text>
            
            <TouchableOpacity 
              style={styles.stopShiftButton}
              onPress={stopShift}
            >
              <Text allowFontScaling={false}  style={styles.verificationButtonText}>Stop Shift</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={closeStopTimerModal}
            >
              <Text allowFontScaling={false}  style={styles.cancelButtonText}>Continue Shift</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  shiftContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  rupeeSign: {
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    color: "#01615F",
    marginBottom: 8,
  },
  shiftText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 16,
  },
  startShiftButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  startShiftText: {
    color: "#FFFFFF",
    fontSize: RFPercentage(2),
    fontWeight: "600",
  },
  shiftedAtText: {
    fontSize: RFPercentage(2),
    color: "#999999",
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    color: "#333333",
    marginTop: 24,
    marginBottom: 12,
  },
  quickLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickLinkCard: {
    backgroundColor: "#01615F",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  linkIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  linkTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 4,
  },
  linkValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  currentOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  orderStatus: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    color: "#01615F",
  },
  orderTime: {
    fontSize: 14,
    color: "#666666",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  earnings: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  deliveryInfo: {
    fontSize: RFPercentage(2),
    color: "#666666",
    marginBottom: 24,
  },
  deliveryLocation: {
    fontSize: 14,
    color: "#666666",
  },
  deliveryPlace: {
    fontWeight: "bold",
    color: "#333333",
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 6,
    paddingVertical: 12,
    flex: 1,
    marginRight: 10,
  },
  mapIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  mapButtonText: {
    color: "#01615F",
    fontSize: 14,
    fontWeight: "500",
  },
  detailsButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 6,
    paddingVertical: 12,
  },
  detailsButtonText: {
    color: "#01615F",
    fontSize: 14,
    fontWeight: "500",
  },
  amount: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: RFPercentage(2),
    color: "#333333",
    fontFamily: "Poppins-Medium",
    flex: 1,
    paddingRight: 10,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#333333",
    fontWeight: "bold",
  },
  verificationButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  verificationButtonText: {
    color: "#FFFFFF",
    fontSize: RFPercentage(2),
    fontWeight: "600",
  },
  guideContainer: {
    marginTop: 10,
  },
  guideTitle: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
  },
  guideItem: {
    marginBottom: 8,
  },
  guideText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },
  // New styles for the stop timer modal
  shiftStats: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Medium",
  },
  stopShiftButton: {
    backgroundColor: "#DC3545",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontWeight: "600",
  },
});

export default Home;