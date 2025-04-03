import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import GoBack from "@/components/GoBack";
import CustomCheckbox from "@/components/CustomCheckbox";
import * as Font from "expo-font";
import { router } from "expo-router";
import { useCreateRestaurant } from "@/api/queryHooks";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

const RegisterRestaurant = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
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
  });

  const mutation = useCreateRestaurant();
  const [sameWhatsApp, setSameWhatsApp] = useState(true);
  const [timingMode, setTimingMode] = useState<"sameTime" | "daywise">(
    "sameTime"
  );
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
      ) as typeof prev.workingDays, 
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
    required?: boolean 
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        value={form[field]} 
        onChangeText={(text) => setForm((prev) => ({ ...prev, [field]: text }))} // Update state
        placeholder={placeholder || `Enter ${label}`} 
        style={styles.input}
        placeholderTextColor="#A0A0A0"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant Information</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImagePlaceholder} />
          <TouchableOpacity style={styles.addButton}>
            <Entypo name="camera" size={13} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Lorem Ipsum</Text>
      </View>
      <ScrollView style={styles.scrollView}>
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
            <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.cancelButton}>
    <Text style={styles.cancelButtonText}>Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.saveButton} >
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
        fontSize: RFPercentage(2),
        marginLeft: 16,
        fontWeight: "500",
        fontFamily: "Poppins-SemiBold",
      },
  scrollView: {
    flex: 1,
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
  
});

export default RegisterRestaurant;
