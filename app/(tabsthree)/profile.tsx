import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Alert,
} from "react-native";
import Header from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
const [profileImage, setProfileImage] = useState<string | null>(null);

  const [showOptions, setShowOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

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
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "Please grant camera permission to take pictures"
      );
    } else {
      takePicture();
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
    setShowOptions(false);
  };

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error taking picture:", error);
      Alert.alert("Error", "Failed to capture image");
    }
    setShowOptions(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
  
       <Header title="Profile"/>
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder} />
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowOptions(true)}
          >
            <Entypo name="camera" size={13} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text allowFontScaling={false}  style={styles.profileName}>Lorem Ipsum</Text>
      </View>
      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.sectionBox}
          onPress={() => router.push("/Screens/RidersDetails")}
        >
          <Text allowFontScaling={false}  style={styles.sectionTitle}>Basic Details</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionBox}
          onPress={() => router.push("/Screens/RidersAddress")}
        >
          <Text allowFontScaling={false}  style={styles.sectionTitle}>Address</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionBox}
          onPress={() => router.push("/Screens/RidersDocument")}
        >
          <Text allowFontScaling={false}  style={styles.sectionTitle}>Documentations</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionBox}
          onPress={() => router.push("/Screens/RatingReview")}
        >
          <Text allowFontScaling={false}  style={styles.sectionTitle}>Reviews and Ratings</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
      </ScrollView>

      {/* Image Picker Options Modal */}
      <Modal
        transparent={true}
        visible={showOptions}
        animationType="slide"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.optionsContainer}>
            <Text allowFontScaling={false}  style={styles.optionsTitle}>Select Profile Picture</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={pickImage}
            >
              <Entypo name="images" size={22} color="#01615F" />
              <Text allowFontScaling={false}  style={styles.optionText}>Upload from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={requestCameraPermission}
            >
              <Entypo name="camera" size={22} color="#01615F" />
              <Text allowFontScaling={false}  style={styles.optionText}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.cancelButton]}
              onPress={() => setShowOptions(false)}
            >
              <Text allowFontScaling={false}  style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* We're using ImagePicker for both gallery and camera, so we don't need a separate camera modal */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  profileCard: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E0E0",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  addButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#01615F",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 16,
  },
  sectionBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  optionsTitle: {
    fontSize: RFPercentage(2.2),
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  optionText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    marginLeft: 15,
    color: "#333",
  },
  cancelButton: {
    justifyContent: "center",
    borderBottomWidth: 0,
    marginTop: 10,
  },
  cancelText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    color: "#FF5858",
    textAlign: "center",
  },
  
});

export default ProfileScreen;