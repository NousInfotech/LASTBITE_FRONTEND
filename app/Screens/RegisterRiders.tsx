import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Alert,
} from "react-native";
import GoBack from "@/components/GoBack";
import * as Font from "expo-font";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const RegisterRiders = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [form, setForm] = useState({
    profilePhoto: "",
  });

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

  const handleContinue = (): void => {
    if (activeStep < 3) {
      setActiveStep((prevStep: number) => prevStep + 1);
    } else {
      router.push("../initialscreens/VerifiedScreen");

    }
  };

  const handleChooseFile = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "You need to grant permission to access the gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setForm((prev) => ({
        ...prev,
        profilePhoto: result.assets[0].uri,
      }));
    }
  };

  const renderInput = (
    label: string,
    placeholder?: string,
    required?: boolean
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        placeholder={placeholder || `Enter ${label}`}
        style={styles.input}
        placeholderTextColor="#A0A0A0"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <GoBack />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Riders Registration</Text>
          <View style={styles.progressContainer}>
            {[1, 2, 3].map((step, index) => (
              <React.Fragment key={index}>
                <View
                  style={[
                    styles.progressStep,
                    step <= activeStep ? styles.activeStep : {},
                  ]}
                />
                {index < 2 && <View style={styles.progressLine} />}
              </React.Fragment>
            ))}
          </View>
        </View>
        {activeStep === 1 && (
          <>
            <View style={styles.formCard}>
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Basic Details</Text>
                {renderInput("Name", "Enter Full name", true)}
                {renderInput("Email Address", "Enter email address", true)}
                {renderInput("Mobile Number", "Enter mobile number", true)}
                <Text style={styles.label}>
                  Profile Photo <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputContainer_A}>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleChooseFile}
                  >
                    <Text style={styles.uploadButtonText}>Upload File</Text>
                  </TouchableOpacity>
                  <Text style={styles.fileName}>
                    {form.profilePhoto ? "Profile chose" : "Choose a File"}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
        {activeStep === 2 && (
          <>
            <View style={styles.formCard}>
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Address Details</Text>
                {renderInput("Plot Number", "PlotNo", true)}
                {renderInput("Address", "Address", true)}
                {renderInput(
                  "Building/Mall/Complex Name",
                  "Enter Building/Mall/Complex Name",
                  true
                )}

                {renderInput("Pincode", "Enter Pincode", true)}
              </View>
            </View>
          </>
        )}
        {activeStep === 3 && (
          <>
            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Documentations</Text>
              <Text style={styles.label}>
                Aadhar Card <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputContainer_A}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleChooseFile}
                >
                  <Text style={styles.uploadButtonText}>Upload File</Text>
                </TouchableOpacity>
                <Text style={styles.fileName}>
                  {form.profilePhoto ? "Profile chose" : "Choose a File"}
                </Text>
              </View>
              {renderInput("Bank IFSC code", "Enter IFSC Code", true)}
              {renderInput("Bank Account number", "Enter account number", true)}
              <Text style={styles.label}>
                Dreiving License <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputContainer_A}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleChooseFile}
                >
                  <Text style={styles.uploadButtonText}>Upload File</Text>
                </TouchableOpacity>
                <Text style={styles.fileName}>
                  {form.profilePhoto ? "Profile chose" : "Choose a File"}
                </Text>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#01615F",
    textAlign: "center",
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  progressStep: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  activeStep: {
    backgroundColor: "#01615F",
  },
  completedStep: {
    backgroundColor: "#B0B0B0",
  },
  progressLine: {
    width: 100,
    height: 4,
    backgroundColor: "#ccc",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666",
    marginTop: -12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputContainer: {
    width: "48%",
  },
  inputContainer: {
    marginBottom: 8,
  },
  inputContainer_A: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  uploadButton: {
    backgroundColor: "#01615F",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  fileName: {
    marginLeft: 16,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#A0A0A0",
  },
  required: {
    color: "red",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#FFFFFF",
  },

  button: {
    backgroundColor: "#01615F",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 18,
    padding: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  cardHolderText: {
    fontSize: 12,
    color: "#666",
    marginVertical: 5,
  },
  noteText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});

export default RegisterRiders;
