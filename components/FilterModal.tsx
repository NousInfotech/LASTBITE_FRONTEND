import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Define the props interface
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  tellUsMoreText?: string;
  filterOptions: string[];
  buttonText: {
    cancel: string;
    apply: string;
  };
  inputType: "radio" | "checkbox";
  onApply: (selectedFilter: string | string[]) => void; // Callback for Apply action
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  title,
  tellUsMoreText,
  filterOptions,
  buttonText,
  inputType,
  onApply, // Accept the callback function
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]); // Use an array to hold selected filters

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <View />; // Render nothing or a placeholder while fonts are loading
  }

  const handleSelectOption = (option: string) => {
    // If the option is already selected, remove it, else add it to the array
    setSelectedFilter((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option); // Deselect option
      } else {
        return [...prev, option]; // Select option
      }
    });
  };

  const handleApply = () => {
    onApply(selectedFilter); // Trigger the callback passed from the parent
    onClose(); // Close the modal
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.header}>
            <View>
              {tellUsMoreText && (
                <Text style={styles.tellUsMoreText}>{tellUsMoreText}</Text>
              )}
              <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Filter Options */}
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionRow}
              onPress={() => handleSelectOption(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
              <View
                style={[
                  styles.radio,
                  selectedFilter.includes(option)
                    ? styles.radioSelectedCircle
                    : null,
                ]}
              >
                {selectedFilter.includes(option) && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>{buttonText.cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={handleApply} // Trigger Apply action
            >
              <Text style={styles.applyText}>{buttonText.apply}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    zIndex: 40,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    zIndex: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  tellUsMoreText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#7D7D7D",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    maxWidth: "85%",
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc", // Outer border color (unselected state)
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Circle shape for radio
  },
  radioSelectedCircle: {
    borderColor: "#006D5B", // Green color for selected radio
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#006D5B", // Green color when selected
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  applyButton: {
    backgroundColor: "#006D5B",
  },
  cancelText: {
    color: "black",
    fontFamily: "Poppins-Regular",
  },
  applyText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
  },
});

export default FilterModal;
