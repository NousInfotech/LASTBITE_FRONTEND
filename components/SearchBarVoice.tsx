import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";

interface SearchBarVoiceProps {
  onInputPress: (text: string) => void; 
  placeholder?: string;
  redirectTargets: string[];
  onChangeText: (text: string) => void; 

}

const SearchBarVoice: React.FC<SearchBarVoiceProps> = ({
  onInputPress,
  placeholder = "Search here...",
  redirectTargets,
}) => {
  const [searchText, setSearchText] = useState("");
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
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#757575" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#757575"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            onInputPress(text); // Pass the searchText immediately to onInputPress
          }}
        />
        <TouchableOpacity style={styles.voiceButton}>
          <Icon name="mic-none" size={24} color="#929292" />
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
});

export default SearchBarVoice;
