import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Voice from "react-native-voice";
import { RFPercentage } from "react-native-responsive-fontsize";

// Define a custom type for speech results
interface SpeechResultsEvent {
  value?: string[];
}

const VoiceInput = ({
  onVoiceInput,
}: {
  onVoiceInput: (text: string) => void;
}) => {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Set up the Voice event listeners
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechError = handleSpeechError;

    // Cleanup on unmount
    return () => {
      Voice.destroy().then(() => console.log("Voice resources destroyed"));
    };
  }, []);

  const startListening = () => {
    setListening(true);
    setError("");

    Voice.start("en-US")
      .then(() => console.log("Started listening"))
      .catch((err) => setError(err.message));
  };

  const stopListening = () => {
    setListening(false);
    Voice.stop()
      .then(() => console.log("Stopped listening"))
      .catch((err) => setError(err.message));
  };

  const handleSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0) {
      onVoiceInput(e.value[0]); // Pass the first recognized result to the parent
    }
    stopListening();
  };

  const handleSpeechError = (e: any) => {
    setError(e.error?.message || "An error occurred during speech recognition");
    stopListening();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={listening ? stopListening : startListening}
    >
      <Text style={styles.text}>
        {listening ? "Listening..." : "Tap to record voice directions"}
      </Text>
      <Icon name="microphone" size={20} color="#006A6A" />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#929292",
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    color: "red",
    fontSize: RFPercentage(2),
    marginTop: 4,
  },
});

export default VoiceInput;
