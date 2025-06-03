import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useUserData, updateUserData, UserData } from "@/utils/UserDataStore";

const EditAccount: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const userData = useUserData();

  // State for form fields
  const [name, setName] = useState<string>(userData.name || "John Daron");
  const [email, setEmail] = useState<string>(userData.email || "");
  const [phone, setPhone] = useState<string>(userData.phone || "+91 91234 65891");

  // Editing states
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  
  const [isChanged, setIsChanged] = useState<boolean>(false);

  // Update local state when userData changes
  useEffect(() => {
    setName(userData.name || "John Daron");
    setEmail(userData.email || "");
    setPhone(userData.phone || "+91 91234 65891");
  }, [userData]);

  useEffect(() => {
    async function loadFonts(): Promise<void> {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }
  
    loadFonts();
  
    // Track changes in input fields
    setIsChanged(
      name !== userData.name || 
      email !== userData.email || 
      phone !== userData.phone
    );
  
  }, [name, email, phone, userData]);

  const handleEdit = (field: keyof UserData): void => {
    if (field === "name") setIsEditingName(true);
    if (field === "email") setIsEditingEmail(true);
    if (field === "phone") setIsEditingPhone(true);
  };

  const handleCancel = (field: keyof UserData): void => {
    if (field === "name") {
      setIsEditingName(false);
      setName(userData.name);
    } else if (field === "email") {
      setIsEditingEmail(false);
      setEmail(userData.email);
    } else if (field === "phone") {
      setIsEditingPhone(false);
      setPhone(userData.phone);
    }
  };

  const handleUpdate = (field: keyof UserData): void => {
    let value: string = "";
    
    if (field === "name") {
      value = name;
      setIsEditingName(false);
    } else if (field === "email") {
      value = email;
      setIsEditingEmail(false);
    } else if (field === "phone") {
      value = phone;
      setIsEditingPhone(false);
    }
    
    // Update the store
    updateUserData(field, value);
    
    // Show success message
    Alert.alert("Success", `Your ${field} has been updated successfully.`);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Account</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              editable={isEditingName}
            />
            <TouchableOpacity onPress={() => handleEdit("name")}>
              <Text style={styles.editText}>EDIT</Text>
            </TouchableOpacity>
          </View>
          {isEditingName && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel("name")}
              >
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.updateButton,
                  { backgroundColor: isChanged ? "#01615F" : "#F2F2F2" },
                ]}
                disabled={!isChanged}
                onPress={() => handleUpdate("name")}
              >
                <Text style={styles.buttonTextUpdate}>Update</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Your Email Address"
              editable={isEditingEmail}
            />
            <TouchableOpacity onPress={() => handleEdit("email")}>
              <Text style={styles.editText}>EDIT</Text>
            </TouchableOpacity>
          </View>
          {isEditingEmail && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel("email")}
              >
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.updateButton,
                  { backgroundColor: isChanged ? "#01615F" : "#F2F2F2" },
                ]}
                disabled={!isChanged}
                onPress={() => handleUpdate("email")}
              >
                <Text style={styles.buttonTextUpdate}>Update</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              editable={isEditingPhone}
            />
            <TouchableOpacity onPress={() => handleEdit("phone")}>
              <Text style={styles.editText}>EDIT</Text>
            </TouchableOpacity>
          </View>
          {isEditingPhone && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel("phone")}
              >
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.updateButton,
                  { backgroundColor: isChanged ? "#01615F" : "#F2F2F2" },
                ]}
                disabled={!isChanged}
                onPress={() => handleUpdate("phone")}
              >
                <Text style={styles.buttonTextUpdate}>Update</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditAccount;

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
  form: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "space-between",
  },
  input: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
  editText: {
    fontSize: RFPercentage(2),
    color: "#01615F",
    fontFamily: "Poppins-Medium",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#01615F",
    alignItems: "center",
    marginRight: 10,
  },
  updateButton: {
    flex: 1,
    backgroundColor: "#F2F2F2", // Initially gray
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#F2F2F2", // Keeps disabled color
  },
  buttonTextCancel: {
    fontSize: 14,
    color: "#01615F",
    fontFamily: "Poppins-Medium",
  },
  buttonTextUpdate: {
    fontSize: 14,
    color: "#FFF",
    fontFamily: "Poppins-Medium",
  },
});