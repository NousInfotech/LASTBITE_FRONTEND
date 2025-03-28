import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

interface AddressParams {
  building?: string;
  street?: string;
  town?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

const AddressEditScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as AddressParams; // Explicitly type the parameters

  const [editedAddress, setEditedAddress] = useState({
    building: params.building || "",
    street: params.street || "",
    town: params.town || "",
    city: params.city || "",
    state: params.state || "",
    country: params.country || "",
    pincode: params.pincode || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setEditedAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Logic to save the updated address
    console.log("Saved Address:", editedAddress);
    router.back(); // Navigate back to the previous screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Address</Text>

      {/* Building No and Name */}
      <TextInput
        style={styles.input}
        value={editedAddress.building}
        onChangeText={(value) => handleInputChange("building", value)}
        placeholder="Building No and Name"
      />

      {/* Street */}
      <TextInput
        style={styles.input}
        value={editedAddress.street}
        onChangeText={(value) => handleInputChange("street", value)}
        placeholder="Street"
      />

      {/* Town */}
      <TextInput
        style={styles.input}
        value={editedAddress.town}
        onChangeText={(value) => handleInputChange("town", value)}
        placeholder="Town"
      />

      {/* City */}
      <TextInput
        style={styles.input}
        value={editedAddress.city}
        onChangeText={(value) => handleInputChange("city", value)}
        placeholder="City"
      />

      {/* State */}
      <TextInput
        style={styles.input}
        value={editedAddress.state}
        onChangeText={(value) => handleInputChange("state", value)}
        placeholder="State"
      />

      {/* Country */}
      <TextInput
        style={styles.input}
        value={editedAddress.country}
        onChangeText={(value) => handleInputChange("country", value)}
        placeholder="Country"
      />

      {/* Pincode */}
      <TextInput
        style={styles.input}
        value={editedAddress.pincode}
        onChangeText={(value) => handleInputChange("pincode", value)}
        placeholder="Pincode"
        keyboardType="numeric"
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#01615F",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddressEditScreen;
