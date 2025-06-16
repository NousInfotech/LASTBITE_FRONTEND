import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { RFPercentage} from "react-native-responsive-fontsize";


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
  onApply: (selectedFilter: string | string[]) => void; 
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  title,
  tellUsMoreText,
  filterOptions,
  buttonText,
  inputType,
  onApply, 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]); 

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <View />; 
  }

  const handleSelectOption = (option: string) => {
    setSelectedFilter((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option); 
      } else {
        return [...prev, option]; 
      }
    });
  };

  const handleApply = () => {
    onApply(selectedFilter); 
    onClose(); 
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View>
              {tellUsMoreText && (
                <Text allowFontScaling={false}  style={styles.tellUsMoreText}>{tellUsMoreText}</Text>
              )}
              <Text allowFontScaling={false}  style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionRow}
              onPress={() => handleSelectOption(option)}
            >
              <Text allowFontScaling={false}  style={styles.optionText}>{option}</Text>
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text allowFontScaling={false}  style={styles.cancelText}>{buttonText.cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={handleApply} // Trigger Apply action
            >
              <Text allowFontScaling={false}  style={styles.applyText}>{buttonText.apply}</Text>
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
    fontSize: RFPercentage(2.5),
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
    borderColor: "#ccc", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, 
  },
  radioSelectedCircle: {
    borderColor: "#006D5B", 
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#006D5B", 
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
