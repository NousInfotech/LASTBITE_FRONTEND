import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Check, X } from "react-native-feather";

interface FeedbackReceivedProps {
  message: string;
  onClose: () => void; // Function to close the component
}

const FeedbackReceived: React.FC<FeedbackReceivedProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Check stroke="#097969" width={24} height={24} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Feedback Received</Text>
          <Text style={styles.description}>
            Thank you! This will help us personalise your recommendations
            better!
          </Text>
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X stroke="#666" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center", // Center horizontally
    maxWidth: "90%", // Adjust width to fit the background correctly
    maxHeight: "20%", // Limit maximum height
  },
  content: {
    flexDirection: "column",
    alignItems: "flex-start", // Center text and icon
    gap: 8, // Reduced gap for a compact layout
  },
  checkCircle: {
    backgroundColor: "#E8F5F2",
    borderRadius: 50,
    padding: 10, // Adjust padding for a smaller icon
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    marginTop: 8,
  },
  title: {
    fontSize: 14, // Adjust font size for compactness
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  description: {
    fontSize: RFPercentage(2),, // Adjust font size for description
    color: "#666",
    lineHeight: 16,
  },
  closeButton: {
    padding: 8,
    position: "absolute",
    top: 8,
    right: 8,
  },
});


export default FeedbackReceived;
