import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "react-native-modal-datetime-picker";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from "react-native-safe-area-context";

const HelpOrder = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [chosenFile, setChosenFile] = useState(null);
  const [queryType, setQueryType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // For Date Picker visibility
  const [incidentDate, setIncidentDate] = useState(""); // Store the selected date
  const [subject, setSubject] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  interface FileInfo {
  name: string;
  uri: string;
  size: number;
  type: string; // Use `type` instead of `mimeType`
}


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

// const handleChooseFile = async () => {
//   try {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: ['image/*', 'application/pdf'], // Specify allowed file types
//       copyToCacheDirectory: true,
//     });

//     // Check if the user selected a file
//     if (result.type === 'success') {
//       const { uri, name, type } = result; // Use `type` directly from the result

//       // Get file information
//       const fileInfo = await FileSystem.getInfoAsync(uri);
//       if (!fileInfo.exists) {
//         alert('File does not exist.');
//         return;
//       }

//       if (fileInfo.size && fileInfo.size > 5 * 1024 * 1024) {
//         alert('File size must be less than 5MB.');
//         return;
//       }

//       // Set the chosen file
//       setChosenFile({
//         name,
//         uri,
//         size: fileInfo.size || 0, // Default to 0 if size is unavailable
//         type, // Use the `type` property
//       });
//     }
//   } catch (error: any) {
//     alert('Error picking file: ' + error.message);
//   }
// };

  // Handle query type selection from the modal
  const handleSelectQueryType = (option : any) => {
    setSelectedOption(option);
    setQueryType(option);
    setModalVisible(false);
  };

  // Handle date selection
  const handleConfirm = (date: any) => {
    setIncidentDate(date.toLocaleDateString());
    setDatePickerVisibility(false);
  };

  const validateForm = () => {
    return (
      queryType.trim() &&
      subject.trim() &&
      phoneNumber.trim() &&
      email.trim() &&
      incidentDate.trim()
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }
    // Proceed with submission
    console.log("Form submitted!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity>
            <GoBack />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Raise New Query</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Query Type <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.inputText}>{queryType || "Select Query Type"}</Text>
            <Ionicons name="chevron-down" size={18} color="#01615F" />
          </TouchableOpacity>

          {/* Modal for Query Type Selection */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                {["Order Related", "Payment/Refund", "Account issue", "Feedback/complaint", "Technical Problem", "Other"].map(
                  (option, index) => (
                    <Pressable
                      key={index}
                      style={styles.radioOption}
                      onPress={() => handleSelectQueryType(option)}
                    >
                      <Text style={styles.radioOptionText}>{option}</Text>
                      <Ionicons
                        name={selectedOption === option ? "radio-button-on" : "radio-button-off"}
                        size={18}
                        color={selectedOption === option ? "#01615F" : "#ccc"}
                      />
                    </Pressable>
                  )
                )}
              </View>
            </View>
          </Modal>

          <Text style={styles.label}>Order ID</Text>
          <TextInput style={styles.input} placeholder="Select Your Order" />

         

          <Text style={styles.label}>Subject <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Short Description of the query"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            multiline={true}
            numberOfLines={4}
            placeholder="Detailed Explanation  of the issue"
          />

          <Text style={styles.label}>
            Phone number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput style={styles.input} placeholder="+91 000000000" />

          <Text style={styles.label}>
            Email <Text style={styles.required}>*</Text>
          </Text>
          <TextInput style={styles.input} placeholder="Youremail@gmail.com" />

          <Text style={styles.label}>Upload Attachments</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.uploadButton} 
            // onPress={handleChooseFile}
            >
              <Text style={styles.uploadButtonText}>Choose File</Text>
            </TouchableOpacity>
            <Text style={styles.fileName}>
              {chosenFile ? chosenFile : "No Chosen File"}
            </Text>
          </View>

          <Text style={styles.label}>
            Date of Incident <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text style={styles.inputText}>
              {incidentDate || "Select Date"}
            </Text>
            <Ionicons name="calendar" size={18} color="#ccc" />
          </TouchableOpacity>

          {/* <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          /> */}

<Pressable
            style={styles.checkboxContainer}
            onPress={() => setIsChecked(!isChecked)}
          >
            <View
              style={[
                styles.customCheckbox,
                { borderColor: isChecked ? "#01615F" : "#ccc" },
              ]}
            >
              {isChecked && (
                <Ionicons name="checkmark" size={18} color="#01615F" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>
              Confirm that information provided is accurate.
            </Text>
          </Pressable>

          <TouchableOpacity
             style={[styles.submitButton, { backgroundColor: validateForm() ? "#01615F" : "#ccc" }]}
             onPress={handleSubmit}
             disabled={!validateForm()}
          >
            <Text style={styles.submitButtonText}>Submit Query</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  form: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
  },
  textarea: {
    textAlignVertical: "top",
    height: 100,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  customCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkboxLabel: {
    fontFamily: "Poppins-Regular",
    color: "#333",
    flex: 1,
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#01615F",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: RFPercentage(2),
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  radioOptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: "#01615F",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
});

export default HelpOrder;
