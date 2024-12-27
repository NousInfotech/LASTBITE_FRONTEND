import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Voice from "react-native-voice"; // Import react-native-voice for speech-to-text

// Define the props interface
interface SearchBarVoiceProps {
  onInputPress: () => void; // Callback function for input focus
  redirectTargets: string[]; // Array of redirect target strings
  placeholder?: string; // Optional placeholder text
}

const SearchBarVoice: React.FC<SearchBarVoiceProps> = ({
  onInputPress,
  redirectTargets,
  placeholder = "Search here...", // Default placeholder value
}) => {
  const [searchText, setSearchText] = useState(""); // State to hold the search text
  const [isListening, setIsListening] = useState(false);

  // Function to start voice recognition
  const startListening = () => {
    setIsListening(true);
    Voice.start("en-US"); // Start the speech recognition in English
  };

  // Function to stop voice recognition
  const stopListening = () => {
    setIsListening(false);
    Voice.stop(); // Stop the speech recognition
  };

  // Handle speech-to-text results
  const onSpeechResults = (e: any) => {
    console.log("Speech results:", e.value); // Debug log to see the recognized text
    setSearchText(e.value[0]); // Update the search text with the first speech result
  };

  // Handle speech recognition errors
  const onSpeechError = (e: any) => {
    console.error("Speech recognition error:", e.error); // Debug log for errors
    setIsListening(false);
  };

  // Register event listeners for voice recognition
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={24}
          color="#757575"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder} // Use the placeholder prop
          placeholderTextColor="#757575"
          value={searchText} // Bind the search text to the input
          onChangeText={setSearchText} // Update search text when manually typed
          onFocus={onInputPress} // Call the callback prop when input is focused
        />
        <TouchableOpacity
          style={styles.voiceButton}
          onPressIn={startListening} // Start listening when button is pressed
          onPressOut={stopListening} // Stop listening when button is released
          disabled={isListening} // Disable the button if already listening
        >
          <Icon
            name={isListening ? "mic" : "mic-none"} // Change the icon based on the listening state
            size={24}
            color={isListening ? "#007AFF" : "#929292"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 55,
    borderWidth: 1,
    borderColor: "#929292",
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#929292",
    paddingVertical: 8,
  },
  voiceButton: {
    padding: 4,
  },
});

export default SearchBarVoice;
