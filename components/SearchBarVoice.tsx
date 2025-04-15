// import React, { useEffect, useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   TextInputProps,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import * as Font from "expo-font";
// import { RFPercentage } from "react-native-responsive-fontsize";

// interface SearchBarVoiceProps extends TextInputProps {
//   onInputPress?: () => void;
//   onChangeText?: (text: string) => void;
//   placeholder?: string;
//   redirectTargets?: string[]; // Make this optional
// }

// const SearchBarVoice: React.FC<SearchBarVoiceProps> = ({
//   onInputPress,
//   onChangeText,
//   placeholder = "Search here...",
//   redirectTargets = [], // Provide a default empty array
//   ...rest
// }) => {
//   const [fontsLoaded, setFontsLoaded] = useState(false);

//   useEffect(() => {
//     const loadFonts = async () => {
//       try {
//         await Font.loadAsync({
//           "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//           "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
//           "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
//         });
//         setFontsLoaded(true);
//       } catch (error) {
//         console.error("Error loading fonts:", error);
//       }
//     };
//     loadFonts();
//   }, []);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.searchContainer}
//         onPress={onInputPress}
//         activeOpacity={onInputPress ? 0.7 : 1}
//       >
//         <Icon name="search" size={24} color="#757575" style={styles.searchIcon} />
//         <TextInput
//           style={styles.input}
//           placeholder={placeholder}
//           placeholderTextColor="#757575"
//           editable={!onInputPress}
//           onChangeText={onChangeText}
//           {...rest}
//         />
//         <Icon name="mic-none" size={24} color="#01615F" style={styles.voiceIcon} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: "#FFFFFF",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 55,
//     borderWidth: 1,
//     borderColor: "#929292",
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: RFPercentage(2),
//     color: "#929292",
//     paddingVertical: 8,
//     fontFamily: "Poppins-Regular",
//   },
//   voiceIcon: {
//     paddingLeft: 8,
//   },
// });

// export default SearchBarVoice;




import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TextInputProps,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

// Your Google Cloud Speech-to-Text API key
const GOOGLE_SPEECH_API_KEY = 'YOUR_API_KEY';

interface SearchBarVoiceProps extends TextInputProps {
  onInputPress?: () => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  redirectTargets?: string[];
}

const SearchBarVoice: React.FC<SearchBarVoiceProps> = ({
  onInputPress,
  onChangeText,
  placeholder = "Search here...",
  redirectTargets = [],
  ...rest
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const recording = useRef<Audio.Recording | null>(null);

  useEffect(() => {
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
    
    return () => {
      stopRecording();
    };
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error("Error requesting audio permissions:", error);
      return false;
    }
  };

  const startRecording = async () => {
    try {
      const permissionGranted = await requestPermissions();
      
      if (!permissionGranted) {
        Alert.alert(
          'Microphone Permission',
          'Please grant microphone permission in your device settings to use voice search.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Prepare and configure the recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      
      // Create a new recording instance
      const { recording: newRecording } = await Audio.Recording.createAsync({
        android: {
          extension: '.wav',
          outputFormat: Audio.AndroidOutputFormat.DEFAULT,
          audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
          sampleRate: 16000,
          numberOfChannels: 1,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 16000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: 16000,
        },
      });
      
      recording.current = newRecording;
      setIsListening(true);
      
      // Provide feedback that listening has started
      Speech.speak('Listening...', { rate: 0.8 });
      
      // For better UX, automatically stop recording after 7 seconds
      setTimeout(() => {
        if (isListening) {
          stopRecording();
        }
      }, 7000);
      
    } catch (error) {
      console.error("Error starting recording:", error);
      Alert.alert('Error', 'Failed to start voice recording. Please try again.');
      setIsListening(false);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording.current || !isListening) return;
      
      setIsListening(false);
      setIsProcessing(true);
      setInputValue("Processing...");
      
      await recording.current.stopAndUnloadAsync();
      
      // Get the recording URI
      const uri = recording.current.getURI();
      recording.current = null;
      
      if (uri) {
        // Here we process the audio file for speech-to-text
        await processAudioForSpeechRecognition(uri);
      } else {
        setIsProcessing(false);
        setInputValue("");
      }
      
    } catch (error) {
      console.error("Error stopping recording:", error);
      setIsListening(false);
      setIsProcessing(false);
      Alert.alert('Error', 'Failed to process recording. Please try again.');
    }
  };
  
  // Process audio for speech recognition
  const processAudioForSpeechRecognition = async (audioUri: string) => {
    try {
      // Create FormData for the audio file
      const formData = new FormData();
      
      // Add the audio file
      // Note: The exact file details might need adjustment based on your environment
      formData.append('audio', {
        uri: audioUri,
        type: 'audio/wav',
        name: 'speech.wav',
      } as any);
      
      // Replace with the actual Google Cloud Speech-to-Text API endpoint
      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_SPEECH_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify({
            config: {
              encoding: 'LINEAR16',
              sampleRateHertz: 16000,
              languageCode: 'en-US',
            },
            audio: {
              content: audioUri, // This might need to be base64 encoded
            },
          }),
        }
      );
      
      const data = await response.json();
      console.log('Speech recognition response:', data);
      
      if (data && data.results && data.results.length > 0) {
        const recognizedText = data.results[0].alternatives[0].transcript;
        setInputValue(recognizedText);
        if (onChangeText) {
          onChangeText(recognizedText);
        }
      } else {
        setInputValue("");
        Alert.alert('Info', 'No speech detected. Please try again.');
      }
    } catch (error) {
      console.error('Error in speech recognition:', error);
      setInputValue("");
      Alert.alert('Error', 'Failed to process speech. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceIconPress = () => {
    if (isListening) {
      stopRecording();
    } else if (!isProcessing) {
      startRecording();
    }
  };
  
  const handleTextChange = (text: string) => {
    setInputValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={onInputPress}
        activeOpacity={onInputPress ? 0.7 : 1}
      >
        <Icon name="search" size={24} color="#757575" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#757575"
          editable={!onInputPress && !isProcessing}
          onChangeText={handleTextChange}
          value={rest.value !== undefined ? rest.value : inputValue}
          {...rest}
        />
        <TouchableOpacity 
          onPress={handleVoiceIconPress} 
          style={styles.voiceButton}
          disabled={isProcessing}
        >
          <Icon 
            name={isListening ? "mic" : isProcessing ? "hourglass-empty" : "mic-none"} 
            size={24} 
            color={isListening ? "#E53935" : isProcessing ? "#FFA000" : "#01615F"} 
            style={styles.voiceIcon} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isListening && (
        <View style={styles.recordingIndicator}>
          <Icon name="graphic-eq" size={16} color="#E53935" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    position: "relative",
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
    fontSize: RFPercentage(2),
    color: "#929292",
    paddingVertical: 8,
    fontFamily: "Poppins-Regular",
  },
  voiceIcon: {
    paddingLeft: 8,
  },
  voiceButton: {
    padding: 8,
  },
  recordingIndicator: {
    position: "absolute",
    bottom: 4,
    right: 24,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 2,
  }
});

export default SearchBarVoice;











