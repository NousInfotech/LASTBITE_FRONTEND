import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationProp } from "@react-navigation/native";
import GoBack from "@/components/GoBack";
import * as Font from "expo-font";
import Button from "@/components/ButtoN";
import { useRouter } from "expo-router";
import { RFPercentage } from "react-native-responsive-fontsize";

type AddressInputProps = {
  navigation: NavigationProp<any>; // You can specify a more specific type for your screen if needed
};

const AddressInput = ({ navigation }: AddressInputProps) => {
  const [selectedTag, setSelectedTag] = useState("Home");
  const [formData, setFormData] = useState({
    houseNo: "",
    apartment: "",
    voiceDirections: "",
    directions: "",
    alternatePhone: "",
  });

  const locationTags = [
    { id: "Home", icon: "home", label: "Home" },
    { id: "Work", icon: "briefcase", label: "Work" },
    { id: "Friends", icon: "account-group", label: "Friends & family" },
    { id: "Other", icon: "map-marker", label: "Other" },
  ];

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving address...", formData);
    router.push("/(tabs)/home");
  };
  const router = useRouter();
  const useFonts = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
      (async () => {
        await Font.loadAsync({
          "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      })();
    }, []);

    return fontsLoaded;
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <GoBack />
      </View>

      {/* Location Header */}
      <View style={styles.locationHeader}>
        <Icon name="map-marker" size={32} color="#006A6A" />
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationTitle}>LakeView street</Text>
          <Text style={styles.locationSubtitle}>
            123, Green Valley, Lakeview Street
          </Text>
        </View>
      </View>

      {/* Info Message */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          A detailed address will help our delivery partner reach your doorstep
          easily.
        </Text>
      </View>

      {/* Form Inputs */}
      <TextInput
        style={styles.input}
        placeholder="House / Flat / Block No."
        value={formData.houseNo}
        onChangeText={(text) => setFormData({ ...formData, houseNo: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Apartment / Road / Area (Optional)"
        value={formData.apartment}
        onChangeText={(text) => setFormData({ ...formData, apartment: text })}
      />

      <Text style={styles.label}>Directions to reach (Optional)</Text>

      <TouchableOpacity style={styles.voiceInput}>
        <Text style={styles.voiceInputText}>
          Tap to record voice directions
        </Text>
        <Icon name="microphone" size={20} color="#006A6A" />
      </TouchableOpacity>

      <TextInput
        style={[styles.input, styles.directionsInput]} // Add the specific padding style
        placeholder="e.g. Ring the bell on the red gate..."
        value={formData.directions}
        onChangeText={(text) => setFormData({ ...formData, directions: text })}
      />

      {/* Save As Tags */}
      <Text style={styles.label}>Save As</Text>
      <View style={styles.tagsContainer}>
        {locationTags.map((tag) => (
          <TouchableOpacity
            key={tag.id}
            style={[styles.tag, selectedTag === tag.id && styles.selectedTag]}
            onPress={() => setSelectedTag(tag.id)}
          >
            <Icon
              name={tag.icon}
              size={16}
              color={selectedTag === tag.id ? "#006A6A" : "#666"}
            />
            <Text
              style={[
                styles.tagText,
                selectedTag === tag.id && styles.selectedTagText,
              ]}
            >
              {tag.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Alternate Phone */}
      <TextInput
        style={styles.input}
        placeholder="Alternate phone number (Optional)"
        value={formData.alternatePhone}
        onChangeText={(text) =>
          setFormData({ ...formData, alternatePhone: text })
        }
        keyboardType="phone-pad"
      />

      {/* Save Button */}
      <Button buttonContent="Save And Proceed" onPress={handleSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginBottom: 2,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  locationTextContainer: {
    marginLeft: 6,
  },
  locationTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "#000",
  },
  locationSubtitle: {
    fontSize: 15,
    color: "#929292",
    fontFamily: "Poppins-Regular",
  },
  infoBox: {
    backgroundColor: "rgba(1, 97, 95, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#01615F",
  },
  infoText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
  },
  input: {
    borderWidth: 2,
    borderColor: "#929292",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  label: {
    fontSize: 14,
    color: "#191A1F",
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
  },
  voiceInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#929292",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  voiceInputText: {
    color: "#929292",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 6,
  },
  selectedTag: {
    borderColor: "#006A6A",
    backgroundColor: "rgba(1, 97, 95, 0.1)",
  },
  tagText: {
    fontSize: 14,
    color: "#01615F",
    fontFamily: "Poppins-Medium",
  },
  selectedTagText: {
    color: "#006A6A",
    fontFamily: "Poppins-Regular",
  },

  directionsInput: {
    paddingBottom: 24, // Add padding to the bottom of this input
  },
});

export default AddressInput;
