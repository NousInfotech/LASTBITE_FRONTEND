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
import { RFPercentage } from "react-native-responsive-fontsize";

type Props = {
  onClose: () => void;
};


const PersonalDetails = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mothersFullName, setMothersFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [showAddressScreen, setShowAddressScreen] = useState(false);
  const [showYesDetails, setShowYesDetails] = useState(false);

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

  const handleSave = () => {
    console.log("Personal Details Saved:", {
      fullName,
      dob,
      gender,
      mothersFullName,
      email,
    });
  };
  const isFormValid = fullName && dob && gender && mothersFullName && email;
  const handleGenderConfirm = () => {
    setGender(selectedGender);
    setIsGenderModalVisible(false);
  };

  const handleNext = () => {
    setShowAddressScreen(true);
  };

  if (showAddressScreen) {
    return <AddressDetails />;
  }

  if (showYesDetails) {
    return <YesDetails onClose={() => setShowYesDetails(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
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
            <Text style={styles.title}>Your Personal Details</Text>
            <Text style={styles.subText}>As per your PAN Account</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  value={dob}
                  onChangeText={setDob}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setIsGenderModalVisible(true)}
                >
                  <Text style={styles.inputText}>
                    {gender || "Select gender"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mother's Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your mother's full name"
                  value={mothersFullName}
                  onChangeText={setMothersFullName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Personal Email ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.submitButton, !isFormValid && styles.disabledButton]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Gender Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isGenderModalVisible}
        onRequestClose={() => setIsGenderModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Gender</Text>
              <TouchableOpacity onPress={() => setIsGenderModalVisible(false)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Male")}
            >
              <Text style={styles.radioText}>Male</Text>
              <View style={styles.radioCircle}>
                {selectedGender === "Male" && <View style={styles.radioFill} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Female")}
            >
              <Text style={styles.radioText}>Female</Text>
              <View style={styles.radioCircle}>
                {selectedGender === "Female" && (
                  <View style={styles.radioFill} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedGender("Other")}
            >
              <Text style={styles.radioText}>Other</Text>
              <View style={styles.radioCircle}>
                {selectedGender === "Other" && (
                  <View style={styles.radioFill} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleGenderConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const AddressDetails = () => {
    const router = useRouter();
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [showYesDetails, setShowYesDetails] = useState(false);

  const handleNext = () => {
    router.push("/Screens/EmployeeDetails");
  };

  const handleChangeAddress = () => {
    console.log("New Address:", newAddress);
    setIsModalVisible(false);
    setShowYesDetails(true); // Set this to true when "Yes" is clicked
  };

  if (showYesDetails) {
    return <YesDetails onClose={() => setShowYesDetails(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Your current home address</Text>
        <Text style={styles.subText}>
          Your email will be delivered to this address
        </Text>
        <View style={styles.addressContainer}>
          <View style={styles.addressContent}>
            <View>
              <Text style={styles.addressTitle}>Address</Text>
              <Text style={[styles.subText, styles.addressText]}>
                123 Example St, City, Country
              </Text>
            </View>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => setIsDefaultAddress(!isDefaultAddress)}
            >
              {isDefaultAddress && <View style={styles.radioFill} />}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.changeButtonText}>Change Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Changing Address */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay_A}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle_A}>Are You Sure?</Text>
            <Text style={styles.subText}>
          Sure Want to change the current address
        </Text>
            <View style={styles.modalButtons}>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleChangeAddress}
              >
                <Text style={styles.saveButtonText}>Yes</Text>
              </TouchableOpacity>
             
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const YesDetails = ({ onClose }: Props) => {
  const [newAddress, setNewAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [showAddressScreen, setShowAddressScreen] = useState(false);

  const handleNext = () => {
    setShowAddressScreen(true);
  };
  if (showAddressScreen) {
    return <AddressDetails />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <GoBack />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Address</Text>
        <Text style={styles.subText}>
        The card will be delivered here.
        </Text>
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>PinCode</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your zip code"
              value={zip}
              onChangeText={setZip}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>House no/Building Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={newAddress}
              onChangeText={setNewAddress}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Street"
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Area /Landmark</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Area"
              value={state}
              onChangeText={setState}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your City"
              value={state}
              onChangeText={setState}
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

export default PersonalDetails;

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
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins-SemiBold",
    marginBottom: 4,
  },
  subText: {
    fontSize: RFPercentage(2),
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
    fontSize: RFPercentage(2.5),
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  addressContainer: {
    marginTop: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  addressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
  },
  addressText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  changeButton: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#01615F",
    marginBottom: 10,
  },
  changeButtonText: {
    color: "#01615F",
    textAlign: "center",
    paddingHorizontal: 80,
    fontFamily: "Poppins-Medium",
  },
  nextButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 145,
  },
  modalOverlay_A: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalContainer: {
  width: "80%",
  padding: 20,
  backgroundColor: "#fff",
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalTitle_A: {
  fontSize: RFPercentage(2.5),
  fontWeight: "bold",
  marginBottom: 10,
},
modalButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
},
saveButton: {
  padding: 10,
  backgroundColor: "#01615F",
  borderRadius: 5,
  paddingHorizontal: 50,
},
cancelButton: {
  padding: 10,
  borderWidth: 1,
  borderColor: "#01615F",
  borderRadius: 5,
  backgroundColor: "#FFF",
  paddingHorizontal: 50,
},
saveButtonText: {
  color: "#fff",
  fontWeight: "bold",
},
cancelButtonText: {
  color: "#01615F",
  textAlign: "center",
  // paddingHorizontal: 80,
  fontFamily: "Poppins-Medium",
},
detailsContainer: {
  marginTop: 16,
  padding: 16,
  backgroundColor: "#f9f9f9",
  borderRadius: 8,
  width: "90%",
},
detailsText: {
  fontSize: RFPercentage(2),
  color: "#333",
},

});
