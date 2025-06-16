import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import GoBack from "@/components/GoBack";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as FileSystem from "expo-file-system"; // Use expo-file-system instead
import * as Sharing from "expo-sharing"; // Use expo-sharing instead

const RegisterRestaurant = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  // Function to handle PDF download and sharing
  const handleDownloadPDF = async () => {
    try {
      // Path where we'll save the PDF
      const fileUri = `${FileSystem.documentDirectory}letter_of_understanding.pdf`;
      
      // For demo purposes, we'll use a base64-encoded minimal PDF that contains "HI" text
      const pdfContent = 'JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PAovVHlwZSAvWE9iamVjdAovU3VidHlwZSAvRm9ybQovQkJveCBbMCAwIDEwMCAxMDBdCi9SZXNvdXJjZXMgPDwvRm9udCA8PC9GMSAyIDAgUj4+Pj4KL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbmd0aCA0OQo+PgpzdHJlYW0KeJxLyjzHwKCgpKBgZGBUUpBaUuLuGuLkoufoEuQf4Oobblbk5hEc5Osbwggh8M6vzMnJTzOwNDQwM7Y0NTcBCQAAsEUOCgplbmRzdHJlYW0KZW5kb2JqCjYgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL0NvbnRlbnRzIDcgMCBSCi9SZXNvdXJjZXMgPDwKL1hPYmplY3QgPDwKL1hGNSA1IDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAgMCA1OTUgODQyXQo+PgplbmRvYmoKNyAwIG9iago8PAovTGVuZ3RoIDQ0Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nCvkcgrhMjQwNVMIy+MK5HIE0YZczkAIF4Qac3FVAPEI1QplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovQ291bnQgMQovS2lkcyBbNiAwIFJdCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKNCA4IG9iago8PAovUHJvZHVjZXIgKEZQREYgMS43KQovQ3JlYXRpb25EYXRlIChEOjIwMjQwNDI0MTIzNDU2KQo+PgplbmRvYmoKCjggMCBvYmoKPDwKL1R5cGUgL0Fubm90Ci9TdWJ0eXBlIC9MaW5rCi9SZWN0IFsxMjAgMzAwIDE4MCAzMzBdCi9BIDw8L1R5cGUgL0FjdGlvbiAvUyAvVVJJIC9VUkkgKGh0dHBzOi8vZXhhbXBsZS5jb20pPj4KL0JvcmRlciBbMCAwIDBdCi9GIDQKPj4KZW5kb2JqCgp4cmVmCjAgOQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAzNzQgMDAwMDAgbiAKMDAwMDAwMDQ3MCAwMDAwMCBuIAowMDAwMDAwNDIzIDAwMDAwIG4gCjAwMDAwMDA1MjkgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMjAzIDAwMDAwIG4gCjAwMDAwMDAyOTkgMDAwMDAgbiAKMDAwMDAwMDYwMCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDkKL1Jvb3QgMSAwIFIKL0luZm8gNCA4IFIKPj4Kc3RhcnR4cmVmCjczNAolJUVPRg==';
      
      // Write the base64 data to a file
      await FileSystem.writeAsStringAsync(fileUri, pdfContent, { 
        encoding: FileSystem.EncodingType.Base64 
      });
      
      // Check if sharing is available on this device
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        // Share the PDF file
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Download Letter of Understanding',
          UTI: 'com.adobe.pdf' // This is for iOS
        });
        
        Alert.alert('Success', 'Letter of Understanding downloaded successfully!');
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      Alert.alert('Error', 'Failed to download the PDF file. Please try again.');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity>
            <GoBack />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={styles.headerTitle}>Partner Contract</Text>
        </View>

        <View style={styles.formCard}>
          <Text allowFontScaling={false}  style={styles.sectionTitle}>Oveview</Text>
        </View>
        <View style={styles.formCard}>
          <View style={styles.titleContainer}>
            <Text allowFontScaling={false}  style={styles.title}>Letter of Understanding</Text>
            <TouchableOpacity onPress={handleDownloadPDF}>
              <Image
                source={require("../../assets/images/Download.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text allowFontScaling={false}  style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text allowFontScaling={false}  style={styles.saveButtonText}>Save</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontWeight: "500",
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
  },
  scrollView: {
    flex: 1,
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
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 8,
  },
  title: {
    fontSize: RFPercentage(2),
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
    fontSize: RFPercentage(2),
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
    fontSize: RFPercentage(2),
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
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 12,
    marginBottom: 2,
  },
  radioGroupTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#333",
    marginTop: 12,
    marginBottom: 2,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioText: {
    fontSize: 11,
    fontFamily: "Poppins-Medium",
    color: "#333",
    marginLeft: 8,
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
  radioGroupNew: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginVertical: 5,
  },
  additionalOptions: {
    marginTop: 8,
  },
  checkboxContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#01615F",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 8,
  },

  cancelButtonText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },

  saveButton: {
    backgroundColor: "#01615F",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 8,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },

  workingDaysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectAllText: {
    fontSize: 14,
    color: "#01615F",
    fontFamily: "Poppins-Regular",
  },
  checkboxGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  checkboxColumn: {
    flex: 1,
    fontSize: RFPercentage(1.3),
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures "Select" is aligned right
    alignItems: "center",
  },
  categoryButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 14,
    // marginBottom: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#FFFFFF",
  },
  categoryText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  editText: {
    fontSize: RFPercentage(2),
    color: "#01615F",
  },
  cardHolderText: {
    fontSize: RFPercentage(2),
    color: "#666",
    marginVertical: 5,
  },
  noteText: {
    fontSize: RFPercentage(2),
    color: "#666",
    marginTop: 5,
  },
  requirementsTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  requirementsList: {
    marginTop: 5,
  },
  bulletPoint: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
    paddingHorizontal: 14,
    fontFamily: "Poppins-Regular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  categoryBox: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryHeading: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
  categoryDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  selectText: {
    color: "#01615F",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "bold",
  },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 5 },
  chip: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 5,
    backgroundColor: "#fff",
  },
  selectedChip: { backgroundColor: "#01615F", borderColor: "#01615F" },
  chipText: { fontSize: 14, color: "#333" },
  selectedChipText: { color: "#fff" },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#01615F",
    borderColor: "#01615F",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
  },
});

export default RegisterRestaurant;