import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Dimensions,
  Modal,
} from "react-native";
import * as Font from "expo-font";
import * as Location from "expo-location";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import AddressManagementScreen from "@/app/initialscreens/AddressManagementScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";

const LocationHeader = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [sliderVisible, setSliderVisible] = useState(false);
  const sliderAnimation = useState(
    new Animated.Value(-Dimensions.get("window").height)
  )[0];

  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
        PoppinsSemibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert("Location Permission", "Please enable location access.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      setLocation(
        `${address[0]?.street}, ${address[0]?.city}, ${address[0]?.region}`
      );
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchUserProfileImage = () => {
      const fetchedProfileImage = "https://via.placeholder.com/150";
      setUserProfileImage(fetchedProfileImage);
    };

    fetchUserProfileImage();
  }, []);

  const toggleSlider = () => {
    if (sliderVisible) {
      Animated.timing(sliderAnimation, {
        toValue: -Dimensions.get("window").height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSliderVisible(false));
    } else {
      setSliderVisible(true);
      Animated.timing(sliderAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const navigateToAddressManagement = () => {
    router.push("/initialscreens/AddressManagementScreen");
  };

  const handleProfilePress = () => {
    // Show popup with options instead of direct navigation
    setShowProfileOptions(true);
  };

  const handleSignup = () => {
    setShowProfileOptions(false);
    router.push("/auth/NumberLogin/otpScreen");
  };

  const handleContinueAsGuest = () => {
    setShowProfileOptions(false);
    router.push("/(tabs)/home");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.locationContainer}>
          <View style={styles.locationContent}>
            <View style={styles.locationLabelContainer}>
              <Entypo name="location-pin" size={24} color="#01615F" />
              <Text allowFontScaling={false}  style={styles.locationLabel}>Location</Text>
              <TouchableOpacity onPress={navigateToAddressManagement}>
                <AntDesign
                  name="caretdown"
                  size={13}
                  color="#191A1F"
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.locationSelector}>
              <Text allowFontScaling={false}  style={styles.locationText}>
                {location || errorMsg || "Fetching location..."}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
          >
            <Image
              style={styles.profileImage}
              source={require('../assets/images/human.jpeg')}
            />
          </TouchableOpacity>
        </View>

        {/* Profile Options Modal */}
        <Modal
          visible={showProfileOptions}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowProfileOptions(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowProfileOptions(false)}
          >
            <View style={styles.modalContent}>
              <Text allowFontScaling={false}  style={styles.modalTitle}>Profile Options</Text>
              
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleSignup}
              >
                <Text allowFontScaling={false}  style={styles.optionButtonText}>Signup</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.optionButton, styles.guestButton]}
                onPress={handleContinueAsGuest}
              >
                <Text allowFontScaling={false}  style={[styles.optionButtonText, styles.guestButtonText]}>Continue as Guest</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {sliderVisible && (
          <Animated.View
            style={[
              styles.sliderContainer,
              { transform: [{ translateY: sliderAnimation }] },
            ]}
          >
            <AddressManagementScreen />
            <TouchableOpacity style={styles.closeButton} onPress={toggleSlider}>
              <Text allowFontScaling={false}  style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: RFPercentage(2.5),
  },
  locationContent: {
    flex: 1,
    marginRight: 12,
  },
  locationLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationLabel: {
    fontSize: RFPercentage(2),
    fontFamily: "PoppinsSemibold",
    color: "#191A1F",
    marginLeft: 4,
  },
  arrowIcon: {
    marginLeft: 6,
    marginBottom: 6,
  },
  locationSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: RFPercentage(2),
    color: "#929292",
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  sliderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  closeButton: {
    backgroundColor: "#01615F",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    position: "absolute",
    top: 40,
    right: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontFamily: "PoppinsSemibold",
    fontSize: RFPercentage(2.5),
    marginBottom: 20,
    textAlign: "center",
    color: "#191A1F",
  },
  optionButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  guestButton: {
    backgroundColor: "#E0E0E0",
  },
  optionButtonText: {
    fontFamily: "Poppins",
    fontSize: RFPercentage(2),
    color: "white",
  },
  guestButtonText: {
    color: "#191A1F",
  },
});

export default LocationHeader;