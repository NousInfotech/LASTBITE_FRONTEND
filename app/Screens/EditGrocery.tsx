import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useGrocery, useUpdateGrocery } from "@/api/queryHooks";
import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import GoBack from "@/components/GoBack";
import { GroceryItem } from "@/api/types";

const EditGrocery = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>(); // Ensure ID is correctly typed
  const { data: grocery, isLoading, refetch } = useGrocery(id, { staleTime: 0 });
  const updateGrocery = useUpdateGrocery();

  const [form, setForm] = useState<Partial<GroceryItem>>({
    itemName: "",
    quantity: "",
    price: 0,
    available: false,
    image: "",
  });

  // Populate state when data is fetched
  useEffect(() => {
    if (grocery) {
      setForm({
        itemName: grocery.itemName,
        quantity: grocery.quantity?.toString() || "",
        price: grocery.price,
        available: grocery.available,
        image: grocery.image,
      });
    }
  }, [grocery]);

  // Refetch data when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  if (isLoading) return <Text>Loading...</Text>;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setForm((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handleSave = () => {
    updateGrocery.mutate(
      { id, data: form },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["grocery", id] }); // Refresh data
          router.back();
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Grocery</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          <Image source={{ uri: form.image }} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Grocery Name</Text>
            <TextInput
              style={styles.input}
              value={form.itemName}
              onChangeText={(text) => setForm((prev) => ({ ...prev, itemName: text }))}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              value={form.quantity}
              onChangeText={(text) => setForm((prev) => ({ ...prev, quantity: text }))}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={form.price.toString()}
              onChangeText={(text) => setForm((prev) => ({ ...prev, price: Number(text) || 0 }))}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>Stock Status</Text>
          <View style={styles.stockStatusContainer}>
            <Switch
              value={form.available}
              onValueChange={(value) => setForm((prev) => ({ ...prev, available: value }))}
            />
            <Text style={[styles.availableText, { color: form.available ? "#34C759" : "#FF3B30" }]}>
              {form.available ? "Available" : "Out of Stock"}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100, // Adjust size as needed
    height: 100,
    borderRadius: 50, // Ensures circular image
    resizeMode: "cover", // Makes sure image fits properly
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#888",
  },
  loremText: {
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontFamily: "Poppins-Regular",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  stockStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures the switch and text are apart
    paddingHorizontal: 8, // Adds spacing
    borderRadius: 8,
    marginBottom: 16,
  },
  availableText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#01516F",
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#006D5B",
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  saveButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
});

export default EditGrocery;
