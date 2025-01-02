import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Voice from "react-native-voice";
import { Audio } from 'expo-av';

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

  const requestMicrophonePermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        // console.log('Microphone permission granted!');
      } else {
        setPermissionGranted(false);
        alert('Permission to access microphone is required!');
      }
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
    }
  };

  useEffect(() => {
    requestMicrophonePermission();
    Voice.onSpeechResults = (e) => {
      console.log("Received speech results event:", e);
      if (e) {
        if (e.value) {
          console.log("Speech results:", e.value);
          setSearchText(e.value[0]);
        } else {
          console.log("No speech results");
        }
      } else {
        console.log("No speech results event received");
      }
    };
    Voice.onSpeechError = (e) => {
      console.error("Speech recognition error:", e);
      setIsListening(false);
    };
    Voice.onSpeechPartialResults = (e) => {
      console.log("Speech partial results:", e);
      if (e.value) {
        setSearchText(e.value[0]);
      }
    };
    Voice.onSpeechEnd = () => {
      console.log("Speech ended");
      setIsListening(false);
    };
    return () => {
      Voice.destroy();
    };
  }, []);

  const startListening = () => {
    if (permissionGranted) {
      setIsListening(true);
      try {
        Voice.start("en-US");
        console.log("Starting speech recognition...");
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    } else {
      console.log("Permission not granted");
      alert("Please grant microphone permission to use voice recognition.");
    }
  };

  const stopListening = () => {
    setIsListening(false);
    Voice.stop();
    console.log("Speech stopped");
    console.log("Captured text:", searchText);
  };

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
    fontSize: 16,
    color: "#929292",
    paddingVertical: 8,
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