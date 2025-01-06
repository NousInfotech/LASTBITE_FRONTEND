import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Voice from "react-native-voice";
import { Audio } from "expo-av";
import * as Font from "expo-font";

interface SearchBarVoiceProps {
  onInputPress: () => void;
  redirectTargets: string[];
  placeholder?: string;
}

const SearchBarVoice: React.FC<SearchBarVoiceProps> = ({
  onInputPress,
  redirectTargets,
  placeholder = "Search here...",
}) => {
  const [searchText, setSearchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load custom fonts
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };
    loadFonts();
  }, []);

  // Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setPermissionGranted(status === "granted");
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
      }
    } catch (error) {
      console.error("Error requesting microphone permission:", error);
    }
  };

  // Initialize Voice event handlers
  useEffect(() => {
    requestMicrophonePermission();

    Voice.onSpeechResults = (e) => {
      if (e?.value?.[0]) {
        setSearchText(e.value[0]);
      }
    };

    Voice.onSpeechError = (e) => {
      console.error("Speech recognition error:", e);
      setIsListening(false);
    };

    Voice.onSpeechPartialResults = (e) => {
      if (e?.value?.[0]) {
        setSearchText(e.value[0]);
      }
    };

    Voice.onSpeechEnd = () => {
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  const startListening = () => {
    if (permissionGranted) {
      setIsListening(true);
      try {
        Voice.start("en-US");
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
      }
    } else {
      alert("Please grant microphone permission to use voice recognition.");
    }
  };

  const stopListening = () => {
    setIsListening(false);
    Voice.stop();
  };

  if (!fontsLoaded) {
    return null; // Show a loading placeholder if fonts are not loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#757575" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#757575"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={onInputPress}
        />
        <TouchableOpacity
          style={[styles.voiceButton, isListening && styles.listeningButton]}
          onPressIn={startListening}
          onPressOut={stopListening}
          disabled={isListening}
        >
          <Icon
            name={isListening ? "mic" : "mic-none"}
            size={24}
            color={isListening ? "#ffffff" : "#929292"}
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
    fontSize: 12,
    color: "#929292",
    paddingVertical: 8,
    fontFamily: "Poppins-Regular",
  },
  voiceButton: {
    padding: 8,
  },
  listeningButton: {
    backgroundColor: "#006B4D",
    borderRadius: 30,
  },
});

export default SearchBarVoice;
