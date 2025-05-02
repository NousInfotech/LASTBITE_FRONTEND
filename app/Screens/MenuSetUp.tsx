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
import { useCreateRestaurant } from "@/api/queryHooks";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { RFPercentage } from "react-native-responsive-fontsize";

const RegisterRestaurant = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [chosenFile, setChosenFile] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
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
    menuFile: null,
  });

  const mutation = useCreateRestaurant();
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    "Zero",
    "Based on item price",
    "Fixed (Order Level Packing)",
  ];
  const foodTypes = ["Veg Only", "Non-Veg Only", "Both Veg & Non-Veg"];
  const cuisines = [
    "Italian",
    "Chinese",
    "Indian",
    "Mexican",
    "Mediterranean",
    "Japanese",
    "American",
    "French",
    "Thai",
    "Middle Eastern",
  ];

  const toggleCuisine = (cuisine) => {
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

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = async () => {
    const formattedForm = {
      ...form,
      workingDays: Object.entries(form.workingDays)
        .filter(([_, isSelected]) => isSelected)
        .map(([day]) => day),
    };

    mutation.mutate(formattedForm, {
      onSuccess: (response) => {
        Alert.alert("Success", "Restaurant menu setup successfully!");
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
      requiredFields = [
        "ownerPanNo",
        "bankIfscCode",
        "bankAccountNumber",
        "fssaiCertificateNo",
      ];
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

  const handleChooseFile = async () => {
    try {
      // Using DocumentPicker for various file types
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "image/jpeg",
          "image/png",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
          "application/pdf",
        ],
        copyToCacheDirectory: true,
      });

      if (
        result.canceled === false &&
        result.assets &&
        result.assets.length > 0
      ) {
        const asset = result.assets[0];

        // Check file size (25MB limit)
        const fileSizeInMB = asset.size / (1024 * 1024);
        if (fileSizeInMB > 25) {
          Alert.alert("File Too Large", "Please select a file under 25MB");
          return;
        }

        // Set the file name to display
        setChosenFile(asset.name);

        // Store the file details in the form
        setForm((prev) => ({
          ...prev,
          menuFile: {
            uri: asset.uri,
            name: asset.name,
            type: asset.mimeType,
            size: asset.size,
          },
        }));

        Alert.alert("Success", "Menu file uploaded successfully!");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to upload file. Please try again.");
    }
  };

  const handleChooseImage = async () => {
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
    field: keyof typeof form,
    placeholder?: string,
    required?: boolean
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        value={form[field]}
        onChangeText={(text) => setForm((prev) => ({ ...prev, [field]: text }))} // Update state
        placeholder={placeholder || `Enter ${label}`} // Default placeholder
        style={styles.input}
        placeholderTextColor="#A0A0A0"
      />
    </View>
  );

  const handleSave = () => {
    // Validate required fields
    if (!form.category) {
      Alert.alert("Error", "Please enter a category name");
      return;
    }

    if (!selectedFoodType) {
      Alert.alert("Error", "Please select the kind of food");
      return;
    }

    if (selectedCuisines.length === 0) {
      Alert.alert("Error", "Please select at least one cuisine");
      return;
    }

    if (selectedOption === null) {
      Alert.alert("Error", "Please select packaging charges option");
      return;
    }

    // If validation passes, save the data
    setForm((prev) => ({
      ...prev,
      packingCharges:
        selectedOption === "Zero"
          ? 0
          : selectedOption === "Fixed (Order Level Packing)"
          ? 20
          : 5,
    }));

    handleSubmit();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <GoBack />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Menu SetUp</Text>
        </View>

        <>
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Upload your menu</Text>
            <View style={styles.inputContainer_A}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleChooseFile}
              >
                <Text style={styles.uploadButtonText}>Upload File</Text>
              </TouchableOpacity>
              <Text style={styles.fileName}>
                {chosenFile ? chosenFile : "Choose a File"}
              </Text>
            </View>

            <Text style={styles.requirementsTitle}>Requirements:</Text>
            <View style={styles.requirementsList}>
              <Text style={styles.bulletPoint}>
                • Upload clear menu card photos or as a word/excel file.
              </Text>
              <Text style={styles.bulletPoint}>
                • Item names and prices should be readable.
              </Text>
              <Text style={styles.bulletPoint}>
                • Menu should be in English only.
              </Text>
              <Text style={styles.bulletPoint}>
                • Every item should have a price mentioned against it.
              </Text>
              <Text style={styles.bulletPoint}>
                • Max file size: 25 MB (.jpg, .png, .docx, .xlsx, .pdf).
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Add Category</Text>
            <Text style={styles.sectionSubtitle}>
              Add a category to classify your products.
            </Text>

            {renderInput("Category", "category", "Enter category", true)}
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>
              What kind of food is on your menu?{" "}
            </Text>
            <View style={styles.radioGroupNew}>
              {foodTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.radioButton}
                  onPress={() => {
                    setSelectedFoodType(type);
                    setForm((prev) => ({ ...prev, kindOfFood: type }));
                  }}
                >
                  <View style={styles.radioCircle}>
                    {selectedFoodType === type && (
                      <View style={styles.radioFill} />
                    )}
                  </View>
                  <Text style={styles.radioText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Cuisine Selection */}
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>
              Add cuisines <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.chipContainer}>
              {cuisines.map((cuisine) => (
                <TouchableOpacity
                  key={cuisine}
                  style={[
                    styles.chip,
                    selectedCuisines.includes(cuisine) && styles.selectedChip,
                  ]}
                  onPress={() => toggleCuisine(cuisine)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedCuisines.includes(cuisine) &&
                        styles.selectedChipText,
                    ]}
                  >
                    {cuisine} {selectedCuisines.includes(cuisine) && "✕"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>
              Packaging Charges <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.sectionSubtitle}>
              Not applicable on Indian Breads, MRP Items, Packaged Beverages
              (Soft drinks, Water Bottle)
            </Text>

            {/* Options */}
            <View style={styles.optionsContainer}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedOption(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption === option && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
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

  backButton: {
    marginBottom: 8,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    // paddingBottom: -25,
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
