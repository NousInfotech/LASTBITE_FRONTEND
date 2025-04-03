import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [pipEnabled, setPipEnabled] = useState(true);
 const [modalVisible, setModalVisible] = useState(false);

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

  if (!fontsLoaded) {
    return null;
  }
const confirmDelete = () => {
    setModalVisible(false);
    // router.push("/login");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => console.log("Account deleted") },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
<ScrollView>
      {/* Order Related Messages */}
      <View style={styles.Content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Related Messages</Text>
          <Text style={styles.description}>
            Order-related SMS cannot be disabled as they are critical to providing service.
          </Text>
      </View>

      {/* Recommendations & Reminders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations & Remainders</Text>
        <Text style={styles.description}>
          Keep this on to receive offer recommendations & timely reminders based on your interests.
        </Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>SMS</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#01615F" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#ddd"
            onValueChange={() => setSmsEnabled(!smsEnabled)}
            value={smsEnabled}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>WhatsApp</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#01615F" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#ddd"
            onValueChange={() => setWhatsappEnabled(!whatsappEnabled)}
            value={whatsappEnabled}
          />
        </View>
      </View>

      {/* Picture in Picture Mode */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Picture In Picture Mode</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Allow Picture in Picture Mode</Text>
          <Switch
            trackColor={{ false: "#ddd", true: "#01615F" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#ddd"
            onValueChange={() => setPipEnabled(!pipEnabled)}
            value={pipEnabled}
          />
        </View>
        <Text style={styles.subText}>
          PIP mode allows you to live track your order in a small window pinned to one corner of your screen while you navigate to other apps or to the home screen.
        </Text>
      </View>

      <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Deletion</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.deleteButtonText}>Delete account</Text>
        </TouchableOpacity>
      </View>
      </View>
            </ScrollView>
            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Are you sure want to delete your account?</Text>
                        <Text style={styles.modalText}>Once deleted, you will lose access to this account along with the saved details.</Text>
                        <View style={styles.modalButtons}>
                          <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => setModalVisible(false)}
                          >
                            <Text style={styles.cancelbuttonText}>Cancel</Text>
                          </TouchableOpacity>
            
                          <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={confirmDelete}
                          >
                            <Text style={[styles.buttonText, { color: "#FFF" }]}>
                              Delete
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  Content:{
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 6,
    color: "#000",
  },
  alertBox: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  alertText: {
    fontSize: RFPercentage(2),
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  subText: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#929292",
    marginBottom: 10,
    width: 300,
  },
  description: {
    fontSize: RFPercentage(2),
    color: "#666",
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  switchLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  deleteButton: {
    borderWidth:1,
    borderColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FF3B30",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    borderWidth:1,
    borderColor:'red',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#FFFFF",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#000",
  },
  cancelbuttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "red",
  },
});
