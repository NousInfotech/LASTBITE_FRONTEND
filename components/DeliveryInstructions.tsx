import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RFPercentage } from "react-native-responsive-fontsize";

interface DeliveryInstruction {
  id: string;
  icon: (isActive: boolean) => React.ReactNode;
  text: string;
}

const instructions: DeliveryInstruction[] = [
  {
    id: "1",
    icon: (isActive) => (
      <Entypo name="bell" size={24} color={isActive ? "#01516F" : "#929292"} />
    ),
    text: "Avoid\nringing bell",
  },
  {
    id: "2",
    icon: (isActive) => (
      <FontAwesome5
        name="door-open"
        size={24}
        color={isActive ? "#01516F" : "#929292"}
      />
    ),
    text: "Leave at\nthe door",
  },
  {
    id: "3",
    icon: (isActive) => (
      <FontAwesome
        name="microphone"
        size={24}
        color={isActive ? "#01516F" : "#929292"}
      />
    ),
    text: "Directions\nto reach",
  },
  {
    id: "4",
    icon: (isActive) => (
      <FontAwesome5
        name="mobile"
        size={24}
        color={isActive ? "#01516F" : "#929292"}
      />
    ),
    text: "Avoid\ncalling",
  },
  {
    id: "5",
    icon: (isActive) => (
      <FontAwesome5
        name="shield-alt"
        size={24}
        color={isActive ? "#01516F" : "#929292"}
      />
    ),
    text: "Leave with\nsecurity",
  },
];

const DeliveryInstructions: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    if (id === "3") setShowModal(true); // Open modal for "Directions to reach"
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.instructionsContainer}
        horizontal
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
      >
        {instructions.map((instruction) => {
          const isActive = selectedIds.includes(instruction.id);
          return (
            <TouchableOpacity
              key={instruction.id}
              style={[
                styles.outerContainer,
                isActive && styles.activeContainer,
              ]}
              onPress={() => handleSelect(instruction.id)}
            >
              <View style={styles.instructionItem}>
                <View style={styles.iconContainer}>
                  {instruction.icon(isActive)}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.instructionText}>{instruction.text}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Modal for "Directions to reach" */}
     {/* Modal for "Directions to reach" */}
<Modal
  visible={showModal}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setShowModal(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* "X" Button at the top-right */}
      <TouchableOpacity
        style={styles.closeButtonTopRight}
        onPress={() => setShowModal(false)}
      >
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.modalTitle}>Directions to Reach</Text>
      <Text style={styles.modalSubText}>
        123 Main Street, City, Country
      </Text>

      <View style={styles.inputWithIcon}>
  <TextInput
    style={styles.inputBox}
    placeholder="Tap to reach Voice Direction"
    placeholderTextColor="black"
  />
  <FontAwesome name="microphone" size={20} color="#01615F" style={styles.icon} />
</View>
      <TextInput
        style={styles.inputBoxOne}
        placeholder="Type here"
        placeholderTextColor="#929292"
      />

<TouchableOpacity
  style={styles.saveButton}
  onPress={() => setShowModal(false)}
>
  <Text style={styles.saveButtonText}>Save Instruction</Text>
</TouchableOpacity>

    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginLeft: 0 },
  instructionsContainer: {},
  scrollContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  outerContainer: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginHorizontal: 6,
    marginBottom: 8,
    paddingVertical: 8,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  activeContainer: {
     borderColor: "#01615F", 
     backgroundColor: "#e8f5e9" 
    },
  instructionItem: { 
    position: "relative", 
    padding: 4 
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  textContainer: { 
    alignItems: "flex-start"
   },
  instructionText: {
    fontSize: RFPercentage(1.3),
    color: "#000",
    lineHeight: 16,
    fontFamily: "Poppins-Regular",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  modalSubText: { 
    fontSize: 14, 
    color: "#929292", 
    marginBottom: 20 
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    position: "relative",
  },
  icon: {
    position: "absolute",
  right: 10,
  top: "50%",
  transform: [{ translateY: -10 }],
  },
  inputBox: {
    padding: 12,
    fontSize: 14,
    color: "black",
    fontWeight:"bold",
  },
  inputBoxOne: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    
    height:100,
  },
  saveButton: {
    backgroundColor: "#01615F",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },
  
  closeButtonTopRight: {
    position: "absolute",
    top: 30,
    right: 30,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  closeButtonText: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    color: "black",
  },
  
});

export default DeliveryInstructions;
