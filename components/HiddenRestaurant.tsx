import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { X } from "react-native-feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FeedbackReceived from "./FeedbackReceived";

const HiddenRestaurant = ({ restaurant, onClose, onUndo }) => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [mainModalVisible, setMainModalVisible] = useState(true);

  const handleTellMore = () => {
    setMainModalVisible(false); // Hide the main modal
    setFeedbackVisible(true); // Show the feedback modal
  };

  const handleClose = () => {
    if (feedbackVisible) {
      setFeedbackVisible(false);
      setMainModalVisible(true); // Return to the main modal if feedback modal is closed
    } else {
      onClose(); // Close the entire component
    }
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      Alert.alert("Error", "Please provide your feedback before submitting.");
      return;
    }
    setFeedbackVisible(false);
    setFeedbackSubmitted(true);
  };

  const handleUndo = () => {
    onUndo(restaurant.id); // Call the onUndo function to remove restaurant from hidden list
    onClose(); // Close the modal
  };

  if (feedbackSubmitted) {
    return (
      <FeedbackReceived
        message="Thank you for your feedback!"
        onClose={handleClose} // Pass the onClose handler
      />
    );
  }
  return (
    <>
    {mainModalVisible && (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>We have hidden Spice Haven</Text>
          <TouchableOpacity onPress={onClose}>
            <X stroke="#666" width={24} height={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          You can unhide it from your Account section. Tell us more about your
          decision and help us recommend you better.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.undoButton} onPress={handleUndo}>
            <FontAwesome name="undo" size={24} color="#097969" />
            <Text style={styles.undoText}>Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tellMoreButton}
            onPress={handleTellMore}
            accessible={true}
            accessibilityLabel="Provide additional feedback"
          >
            <Text style={styles.tellMoreText}>Tell Us More</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}

    {feedbackVisible && (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.feedbackWrapper}
      >
        <View style={styles.feedbackContainer}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackTitle}>We'd love your feedback</Text>
            <TouchableOpacity onPress={handleClose}>
              <X stroke="#666" width={24} height={24} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Please tell us more about your decision..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            value={feedbackText}
            onChangeText={setFeedbackText}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitFeedback}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )}
  </>
);
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 400,
    alignSelf: "center",
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  undoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5F2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    gap: 8,
  },
  undoText: {
    color: "#097969",
    fontWeight: "500",
  },
  tellMoreButton: {
    backgroundColor: "#097969",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  tellMoreText: {
    color: "white",
    fontWeight: "500",
  },
  feedbackWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackContainer: {
    width: width * 0.9,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  feedbackHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    height: 100,
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#097969",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "500",
  },
});

export default HiddenRestaurant;
