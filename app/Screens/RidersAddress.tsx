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
import { Entypo } from "@expo/vector-icons";

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
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address</Text>
      </View>
      <ScrollView style={styles.scrollView}>
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
          <View style={styles.buttonContainer}>
                 <TouchableOpacity style={styles.cancelButton}>
                   <Text style={styles.cancelButtonText}>Cancel</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.saveButton}>
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
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  scrollView: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 8,
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
    fontSize: 16,
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
    fontSize: 16,
    fontFamily: "Poppins-Medium",
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

});

export default RegisterRestaurant;
