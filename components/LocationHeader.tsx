import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
import * as Location from "expo-location";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import AddressManagementScreen from "@/app/initialscreens/AddressManagementScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationHeader = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sliderVisible, setSliderVisible] = useState(false);
  const sliderAnimation = useState(
    new Animated.Value(-Dimensions.get("window").height)
  )[0];

  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
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
            <Text style={styles.locationLabel}>Location</Text>
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
            <Text style={styles.locationText}>
              {location || errorMsg || "Fetching location..."}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Image
            style={styles.profileImage}
            source={{
              uri: userProfileImage || "https://via.placeholder.com/32",
            }}
          />
        </TouchableOpacity>
      </View>

      {sliderVisible && (
        <Animated.View
          style={[
            styles.sliderContainer,
            { transform: [{ translateY: sliderAnimation }] },
          ]}
        >
          <AddressManagementScreen />
          <TouchableOpacity style={styles.closeButton} onPress={toggleSlider}>
            <Text style={styles.closeButtonText}>Close</Text>
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
    fontSize: 16,
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
    fontSize: 12,
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
    fontSize: 16,
  },
});

export default LocationHeader;
