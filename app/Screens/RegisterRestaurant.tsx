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
import CustomCheckbox from "@/components/CustomCheckbox";
import * as Font from "expo-font";
import { router } from "expo-router";
import { useCreateRestaurant } from "@/api/queryHooks";
import * as ImagePicker from "expo-image-picker";

const RegisterRestaurant = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [chosenFile, setChosenFile] = useState(null);
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

  const [sameWhatsApp, setSameWhatsApp] = useState(true);
  const [timingMode, setTimingMode] = useState<"sameTime" | "daywise">(
    "sameTime"
  );
  const [modalVisible, setModalVisible] = useState(false);

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
        ? prev.filter((item) => item !== cuisine) // Remove if already selected
        : [...prev, cuisine]; // Add if not selected

      setForm((formPrev) => ({ ...formPrev, cuisines: updatedCuisines })); // Update form

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
  

  const handleSelectAll = () => {
    const allSelected = Object.values(form.workingDays).every(Boolean);

    setForm((prev) => ({
      ...prev,
      workingDays: Object.fromEntries(
        (
          Object.keys(prev.workingDays) as (keyof typeof prev.workingDays)[]
        ).map((day) => [day, !allSelected])
      ) as typeof prev.workingDays, // Explicitly type as the same structure
    }));
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
    field: keyof typeof form,
    placeholder?: string,
    required?: boolean // Optional parameter for required field
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        value={form[field]} // Ensure value matches form field
        onChangeText={(text) => setForm((prev) => ({ ...prev, [field]: text }))} // Update state
        placeholder={placeholder || `Enter ${label}`} // Default placeholder
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
          <Text style={styles.headerTitle}>Restaurant Information</Text>
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4].map((step, index) => (
              <React.Fragment key={index}>
                <View
                  style={[
                    styles.progressStep,
                    step <= activeStep ? styles.activeStep : {},
                  ]}
                />
                {index < 3 && <View style={styles.progressLine} />}
              </React.Fragment>
            ))}
          </View>
        </View>
        {activeStep === 1 && (
          <>
            <View style={styles.formCard}>
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Basic Details</Text>
                {renderInput(
                  "Owner's full name ",
                  "ownerName",
                  "Enter Full name",
                  true
                )}
                {renderInput(
                  "Restaurant Name",
                  "restaurantName",
                  "Enter Restaurant name",
                  true
                )}
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
                <Text style={styles.sectionTitle}>Add restaurant location</Text>
                <Text style={styles.sectionSubtitle}>
                  Provide exact details for quick food delivery.
                </Text>

                <View style={styles.row}>
                  <View style={styles.halfInputContainer}>
                    {renderInput(
                      "Shop/Plot Number",
                      "shopNumber",
                      "Shop/PlotNo",
                      true
                    )}
                  </View>
                  <View style={styles.halfInputContainer}>
                    {renderInput("Address", "address", "Floor no", true)}
                  </View>
                </View>

                {renderInput(
                  "Building/Mall/Complex Name",
                  "complexName",
                  "Enter Building/Mall/Complex Name",
                  true
                )}

                {renderInput("Pincode", "pincode", "Enter Pincode", true)}
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Owner Contact Details</Text>

                {/* Email Address & Mobile Number */}
                {renderInput(
                  "Email Address",
                  "emailAddress",
                  "Enter email address",
                  true
                )}
                {renderInput(
                  "Mobile Number",
                  "mobileNumber",
                  "Enter mobile number",
                  true
                )}

                {/* WhatsApp Number Options */}
                <Text style={styles.radioGroupTitle}>
                  WhatsApp Number Options
                </Text>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setSameWhatsApp(true)}
                >
                  <View style={styles.radioCircle}>
                    {sameWhatsApp && <View style={styles.radioFill} />}
                  </View>
                  <Text style={styles.radioText}>
                    My WhatsApp number is the same as above
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setSameWhatsApp(false)}
                >
                  <View style={styles.radioCircle}>
                    {!sameWhatsApp && <View style={styles.radioFill} />}
                  </View>
                  <Text style={styles.radioText}>
                    I have a different WhatsApp number
                  </Text>
                </TouchableOpacity>

                {!sameWhatsApp &&
                  renderInput("WhatsApp Number", "whatsappNumber", "whatsapp")}
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.formSection}>
                <View style={styles.workingDaysHeader}>
                  <Text style={styles.sectionTitle}>
                    Working Days <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <TouchableOpacity onPress={handleSelectAll}>
                    <Text style={styles.selectAllText}>Select All</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.checkboxGrid}>
                  <View style={styles.checkboxColumn}>
                    {(
                      ["Monday", "Tuesday", "Wednesday", "Thursday"] as Array<
                        keyof typeof form.workingDays
                      >
                    ).map((day) => (
                      <CustomCheckbox
                        key={day}
                        label={day}
                        checked={form.workingDays[day]}
                        onPress={() =>
                          setForm((prev) => ({
                            ...prev,
                            workingDays: {
                              ...prev.workingDays,
                              [day]: !prev.workingDays[day],
                            },
                          }))
                        }
                      />
                    ))}
                  </View>
                  <View style={styles.checkboxColumn}>
                    {(
                      ["Friday", "Saturday", "Sunday"] as Array<
                        keyof typeof form.workingDays
                      >
                    ).map((day) => (
                      <CustomCheckbox
                        key={day}
                        label={day}
                        checked={form.workingDays[day]}
                        onPress={() =>
                          setForm((prev) => ({
                            ...prev,
                            workingDays: {
                              ...prev.workingDays,
                              [day]: !prev.workingDays[day],
                            },
                          }))
                        }
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.formSection}>
                {/* <View style={styles.radioGroup}> */}
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setTimingMode("sameTime")}
                >
                  <View style={styles.radioCircle}>
                    {timingMode === "sameTime" && (
                      <View style={styles.radioFill} />
                    )}
                  </View>
                  <Text style={styles.radioText}>
                    I open and close my restaurant at the same time
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setTimingMode("daywise")}
                >
                  <View style={styles.radioCircle}>
                    {timingMode === "daywise" && (
                      <View style={styles.radioFill} />
                    )}
                  </View>
                  <Text style={styles.radioText}>
                    I've separate daywise timings.
                  </Text>
                </TouchableOpacity>
              </View>
              {/* </View> */}
              <View style={styles.row}>
                <View style={styles.halfInputContainer}>
                  {renderInput("Opening Time", "openingTime", "9:00 AM", true)}
                </View>
                <View style={styles.halfInputContainer}>
                  {renderInput("Closing Time", "closingTime", "9:00 PM", true)}
                </View>
              </View>
            </View>
          </>
        )}
        {activeStep === 2 && (
          <>
            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>
                What's your outlet-type? <Text style={{ color: "red" }}>*</Text>
              </Text>
              <Text style={styles.sectionSubtitle}>
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
                <Text style={styles.categoryText}>{selectedCategory}</Text>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <Text style={styles.noteText}>
                Last Bite will pay the GST on your behalf.
              </Text>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Enter PAN & GSTIN details</Text>
              {renderInput(
                "Business/Owner PAN",
                "ownerPanNo",
                "Enter Business/Owner PAN",
                true
              )}
              {/* <Text style={styles.cardHolderText}>Card Holder: xoyyzz</Text> */}
              {renderInput("GSTIN", "gstinNo", "Enter GSTIN", false)}

              <CustomCheckbox
                label="I don’t have a GST Number"
                checked={noGST}
                onPress={() => setNoGST(!noGST)}
              />
            </View>

            {/* Official Bank Details */}
            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Official Bank Details</Text>
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
              <Text style={styles.sectionTitle}>FSSAI certificate</Text>
              {renderInput(
                "FSSAI certificate number",
                "fssaiCertificateNo",
                "Enter FSSAI certificate number",
                true
              )}

              <Text style={styles.requirementsTitle}>Requirements:</Text>
              <View style={styles.requirementsList}>
                <Text style={styles.bulletPoint}>
                  • The FSSAI certificate should either match the name of the
                  restaurant or the owner.
                </Text>
                <Text style={styles.bulletPoint}>
                  • The address on the FSSAI certificate should match the
                  address of the restaurant.
                </Text>
                <Text style={styles.bulletPoint}>
                  • The FSSAI certificate should not be expiring before 30 days.
                </Text>
              </View>
            </View>
          </>
        )}
        {activeStep === 3 && (
          <>
            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Upload your menu</Text>
              <View style={styles.inputContainer_A}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  // onPress={handleChooseFile}
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
        )}

        {activeStep === 4 && (
          <>
            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Oveview</Text>
            </View>
            <View style={styles.formCard}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Letter of Understanding</Text>
                <Image
                  source={require("../../assets/images/Download.png")}
                  style={styles.image}
                />
              </View>
            </View>

            {/* <CustomCheckbox
              label="I have read & accept the Terms & Condition"
              checked={noGST}
              onPress={() => setNoGST(!noGST)}
            /> */}
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            ``
            <Text style={styles.modalTitle}>Select your outlet type</Text>
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
                  <Text style={styles.categoryHeading}>{category.name}</Text>
                  <Text style={styles.selectText}>Select</Text>
                </View>
                <Text style={styles.categoryDescription}>
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
    width: 70,
    height: 4,
    backgroundColor: "#ccc",
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
    justifyContent: "space-between", // Keeps the text on the left and image on the right
  },

  image: {
    width: 20, // Adjust size as needed
    height: 20,
    marginLeft: 8, // Add some spacing between text and image
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
    fontSize: 10,
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
    fontSize: 12,
    color: "#01615F",
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
    fontSize: 18,
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
    fontSize: 16,
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
