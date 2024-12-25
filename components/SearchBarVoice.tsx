import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  const [searchText, setSearchText] = useState("");

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
          value={searchText}
          onChangeText={setSearchText}
          onFocus={onInputPress} // Call the callback prop when input is focused
          className="font-medium"
        />
        <TouchableOpacity style={styles.voiceButton}>
          {/* Voice button functionality can be added here */}
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
