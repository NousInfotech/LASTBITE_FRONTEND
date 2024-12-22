import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Check, X } from "react-native-feather";

interface FeedbackReceivedProps {
  message: string;
  onClose: () => void; // Function to close the component
}

const FeedbackReceived: React.FC<FeedbackReceivedProps> = ({
  message,
  onClose,
}) => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const handleCloseFeedback = () => {
    setFeedbackVisible(false);
  };
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

        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCloseFeedback}
        >
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
  },
  content: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },
  checkCircle: {
    backgroundColor: "#E8F5F2",
    borderRadius: 50,
    padding: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
    position: "absolute",
    top: 2,
    right: 2,
  },
});

export default FeedbackReceived;
