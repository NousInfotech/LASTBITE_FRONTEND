import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
  handleClearSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchText, setSearchText, handleClearSearch }) => {
  const inputRef = useRef<TextInput>(null); // Create a reference to the TextInput

  const handleSearchIconPress = () => {
    // Focus on the input field when the search icon is pressed
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleSearchIconPress} activeOpacity={0.7}>
          <Icon name="search" size={20} color="#929292" />
        </TouchableOpacity>
        <TextInput
          ref={inputRef} // Attach the ref to the TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Try Elm Street..."
          placeholderTextColor="#9CA3AF"
          style={styles.textInput}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} activeOpacity={0.7}>
            <Icon name="x" size={20} color="#929292" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 9,
    borderWidth: 1,
    borderColor: '#929292',
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 10,
    color: 'black',
  },
});

export default SearchInput;
