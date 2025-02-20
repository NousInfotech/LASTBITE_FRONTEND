import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";

interface SearchBarVoiceProps extends TextInputProps {
  onInputPress?: () => void; 
  onChangeText?: (text: string) => void; 
  placeholder?: string; 
  redirectTargets: string[];
}

const SearchBarVoice: React.FC<SearchBarVoiceProps> = ({
  onInputPress,
  onChangeText,
  placeholder = "Search here...",
  ...rest
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
  }, []);

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
          editable={!onInputPress} 
          onChangeText={onChangeText}
          {...rest} 
        />
        <Icon name="mic-none" size={24} color="#01615F" style={styles.voiceIcon} />
      </TouchableOpacity>
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
  voiceIcon: {
    paddingLeft: 8,
  },
});

export default SearchBarVoice;
