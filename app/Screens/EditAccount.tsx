import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

const EditAccount = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Initial values
  const initialName = "John Daron";
  const initialEmail = "";
  const initialPhone = "John Daron A";

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  
  const [isChanged, setIsChanged] = useState(false); // Track changes

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
  
    // Track changes in input fields
    setIsChanged(
      name !== initialName || email !== initialEmail || phone !== initialPhone
    );
  
  }, [name, email, phone]);
  

  const handleEdit = (field: any) => {
    if (field === "name") setIsEditingName(true);
    if (field === "email") setIsEditingEmail(true);
    if (field === "phone") setIsEditingPhone(true);
  };

  const handleCancel = (field :any) => {
    if (field === "name") {
      setIsEditingName(false);
      setName(initialName);
    } else if (field === "email") {
      setIsEditingEmail(false);
      setEmail(initialEmail);
    } else if (field === "phone") {
      setIsEditingPhone(false);
      setPhone(initialPhone);
    }
    setIsChanged(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
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
    fontSize: 12,
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
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  editText: {
    fontSize: 12,
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
