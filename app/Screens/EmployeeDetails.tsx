import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

const EmployeeDetails = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [type, setType] = useState("");
  const [showScreen, setShowScreen] = useState(false);

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
    return null; // Optionally, show a loading screen or placeholder
  }
  const handleConfirm = () => {
    setType(selectedType);
    setIsModalVisible(false);
  };

  const handleNext = () => {
    setShowScreen(true);
  };

  if (showScreen) {
    return <EmploymentType />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Your employment details</Text>
            <Text style={styles.subText}>
              This helps to provide HDFC Bank to set your personalized credit
              limit
            </Text>
            {/* Input Field moved here */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Employment Type</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setIsModalVisible(true)}
              >
                <Text style={styles.inputText}>
                  {type || "Select Employment Type"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Employment Type</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedType("Salaried")}
            >
              <Text style={styles.radioText}>Salaried</Text>
              <View style={styles.radioCircle}>
                {selectedType === "Salaried" && (
                  <View style={styles.radioFill} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedType("Self Employed")}
            >
              <Text style={styles.radioText}>Self Employed</Text>
              <View style={styles.radioCircle}>
                {selectedType === "Self Employed" && (
                  <View style={styles.radioFill} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const EmploymentType = () => {
        const router = useRouter();
  
        const handleNext = () => {
            const personalStatus = true; 
            const panStatus = true; 
            router.push({
              pathname: "./../wallet",
              params: { 
                personalStatus: String(personalStatus), 
                panStatus: String(panStatus) 
              }, 
            });
          };
          
   
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity>
            <GoBack />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Your employment details</Text>
          <Text style={styles.subText}>
          This helps to provide HDFC Bank to set your personalizes credit limit 
          </Text>
          <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
              <Text style={styles.label}>Employment Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Employment Type"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Comapany Name"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Designation</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Designation"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Work Email ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email ID"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>AnnualIncome(INR) </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Annual Income"
              />
            </View>
          </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
export default EmployeeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 6,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#929292",
    marginBottom: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#929292",
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  disabledButton: {
    backgroundColor: "#C7C7C7",
  },
  submitButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "80%",
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  closeButton: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    color: "#929292",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    width: "100%",
  },
  radioText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#01615F",
    alignItems: "center",
    justifyContent: "center",
  },
  radioFill: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#01615F",
  },

  confirmButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
});
