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
import Header from "@/components/GoBack";
import CustomCheckbox from "@/components/CustomCheckbox";
import * as Font from "expo-font";
import { router } from "expo-router";
import { useCreateRestaurant } from "@/api/queryHooks";
import * as ImagePicker from "expo-image-picker";
import { RFPercentage } from "react-native-responsive-fontsize";

const RegisterRestaurant = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [noGST, setNoGST] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category I");
  const [selectedFoodType, setSelectedFoodType] = useState("Veg Only");
  const [selectedCuisines, setSelectedCuisines] = useState([
    "Italian",
    "Chinese",
  ]);
  const [form, setForm] = useState({
    ownerName: "",
    restaurantName: "",
    profilePhoto: "",
    shopNumber: "",
    address: "",
    complexName: "",
    pincode: "",
    emailAddress: "",
    mobileNumber: "",
    whatsappNumber: "",
    workingDays: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    openingTime: "",
    closingTime: "",
    category: selectedCategory,
    ownerPanNo: "",
    gstinNo: "",
    bankIfscCode: "",
    bankAccountNumber: "",
    fssaiCertificateNo: "",
    kindOfFood: selectedFoodType,
    cuisines: selectedCuisines,
    packingCharges: 0,
  });

  const mutation = useCreateRestaurant();

  const [modalVisible, setModalVisible] = useState(false);


  const toggleCuisine = (cuisine : string) => {
    setSelectedCuisines((prev) => {
      const updatedCuisines = prev.includes(cuisine)
        ? prev.filter((item) => item !== cuisine) 
        : [...prev, cuisine]; 
      setForm((formPrev) => ({ ...formPrev, cuisines: updatedCuisines })); 
      return updatedCuisines;
    });
  };

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

  // Add effect to clear GSTIN when noGST is checked
  useEffect(() => {
    if (noGST) {
      setForm(prev => ({ ...prev, gstinNo: "" }));
    }
  }, [noGST]);

  if (!fontsLoaded) {
    return null;
  }

  const categories = [
    {
      name: "Category I",
      description: "Sells only freshly prepared food, no packed items",
    },
    {
      name: "Category II",
      description:
        "Sells only ice creams, bakery items, sweets, or packed foods",
    },
    {
      name: "Category III",
      description: "Sells both fresh and packed food items",
    },
  ];

  const handleSubmit = async () => {
    const formattedForm = {
      ...form,
      workingDays: Object.entries(form.workingDays)
        .filter(([_, isSelected]) => isSelected)
        .map(([day]) => day),
    };

    mutation.mutate(formattedForm, {
      onSuccess: (response) => {
        router.push("/(tabstwo)/home");
      },
      onError: (error) => {
        Alert.alert("Error", "Failed to register restaurant");
      },
    });
  };

  const handleContinue = (): void => {
    let requiredFields: string[] = [];
  
    if (activeStep === 1) {
      requiredFields = [
        "ownerName",
        "restaurantName",
        "profilePhoto",
        "shopNumber",
        "address",
        "complexName",
        "pincode",
        "emailAddress",
        "mobileNumber",
        "openingTime",
        "closingTime",
      ];
    } else if (activeStep === 2) {
      requiredFields = ["ownerPanNo", "bankIfscCode", "bankAccountNumber", "fssaiCertificateNo"];
      // Don't require GSTIN if noGST is checked
      if (!noGST) {
        requiredFields.push("gstinNo");
      }
    } else if (activeStep === 3) {
      requiredFields = ["kindOfFood"];
    }
  
    if (!form || typeof form !== "object") {
      Alert.alert("Error", "Form data is invalid");
      return;
    }
  
    const isFormValid: boolean = requiredFields.every((field) => {
      const value = form[field as keyof typeof form];
      return typeof value === "string" && value.trim() !== "";
    });
  
  
    if (!isFormValid) {
      Alert.alert("Error", "Please fill all mandatory fields");
      return;
    }
  
    if (activeStep < 4) {
      setActiveStep((prevStep: number) => prevStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const renderInput = (
    label: string,
    field: keyof typeof form,
    placeholder?: string,
    required?: boolean // Optional parameter for required field
  ) => (
    <View style={styles.inputContainer}>
      <Text allowFontScaling={false}  style={styles.label}>
        {label} {required && <Text allowFontScaling={false}  style={styles.required}>*</Text>}
      </Text>
     <TextInput allowFontScaling={false} 
  value={String(form[field] ?? "")} 
  onChangeText={(text) => setForm((prev) => ({ ...prev, [field]: text }))}
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
        <TouchableOpacity>
          <Header />
        </TouchableOpacity>
        <Text allowFontScaling={false}  style={styles.headerTitle}>Restaurant Documents</Text>
      </View>
       
          <>
            <View style={styles.formCard}>
              <Text allowFontScaling={false}  style={styles.sectionTitle}>
                What's your outlet-type? <Text allowFontScaling={false}  style={{ color: "red" }}>*</Text>
              </Text>
              <Text allowFontScaling={false}  style={styles.sectionSubtitle}>
                This determines whether Last Bite or you pay GST on the items
                sold.
              </Text>
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => {
                  setModalVisible(true);
                  setForm((prev) => ({ ...prev, category: selectedCategory }));
                }}
              >
                <Text allowFontScaling={false}  style={styles.categoryText}>{selectedCategory}</Text>
                <Text allowFontScaling={false}  style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <Text allowFontScaling={false}  style={styles.noteText}>
                Last Bite will pay the GST on your behalf.
              </Text>
            </View>

            <View style={styles.formCard}>
              <Text allowFontScaling={false}  style={styles.sectionTitle}>Enter PAN & GSTIN details</Text>
              {renderInput(
                "Business/Owner PAN",
                "ownerPanNo",
                "Enter Business/Owner PAN",
                true
              )}
              {/* <Text allowFontScaling={false}  style={styles.cardHolderText}>Card Holder: xoyyzz</Text> */}
              
              {/* Only show GSTIN input if noGST is false */}
              {!noGST && renderInput("GSTIN", "gstinNo", "Enter GSTIN", false)}

              <CustomCheckbox
                label="I don't have a GST Number"
                checked={noGST}
                onPress={() => setNoGST(!noGST)}
              />
            </View>

            {/* Official Bank Details */}
            <View style={styles.formCard}>
              <Text allowFontScaling={false}  style={styles.sectionTitle}>Official Bank Details</Text>
              {renderInput(
                "Bank IFSC code",
                "bankIfscCode",
                "Enter IFSC Code",
                true
              )}
              {renderInput(
                "Bank Account number",
                "bankAccountNumber",
                "Enter account number",
                true
              )}
            </View>

            <View style={styles.formCard}>
              <Text allowFontScaling={false}  style={styles.sectionTitle}>FSSAI certificate</Text>
              {renderInput(
                "FSSAI certificate number",
                "fssaiCertificateNo",
                "Enter FSSAI certificate number",
                true
              )}

              <Text allowFontScaling={false}  style={styles.requirementsTitle}>Requirements:</Text>
              <View style={styles.requirementsList}>
                <Text allowFontScaling={false}  style={styles.bulletPoint}>
                  • The FSSAI certificate should either match the name of the
                  restaurant or the owner.
                </Text>
                <Text allowFontScaling={false}  style={styles.bulletPoint}>
                  • The address on the FSSAI certificate should match the
                  address of the restaurant.
                </Text>
                <Text allowFontScaling={false}  style={styles.bulletPoint}>
                  • The FSSAI certificate should not be expiring before 30 days.
                </Text>
              </View>
            </View>
          </>
        
          <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.cancelButton}>
    <Text allowFontScaling={false}  style={styles.cancelButtonText}>Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.saveButton} >
    <Text allowFontScaling={false}  style={styles.saveButtonText}>Save</Text>
  </TouchableOpacity>
</View>

      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button at Top Right */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text allowFontScaling={false}  style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <Text allowFontScaling={false}  style={styles.modalTitle}>Select your outlet type</Text>
            {/* Category Options */}
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryBox}
                onPress={() => {
                  setSelectedCategory(category.name); // Update category
                  setModalVisible(false); // Close modal
                }}
              >
                <View style={styles.categoryHeader}>
                  <Text allowFontScaling={false}  style={styles.categoryHeading}>{category.name}</Text>
                  <Text allowFontScaling={false}  style={styles.selectText}>Select</Text>
                </View>
                <Text allowFontScaling={false}  style={styles.categoryDescription}>
                  {category.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontWeight: "500",
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
    justifyContent: "space-between", 
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