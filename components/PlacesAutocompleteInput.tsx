// components/PlacesAutocompleteInput.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

interface Suggestion {
  place_id: number;
  display_name: string;
  // Add other properties if needed (e.g., lat, lon, etc.)
}

interface PlacesAutocompleteInputProps {
  onPlaceSelected: (details: Suggestion) => void;
}

const PlacesAutocompleteInput: React.FC<PlacesAutocompleteInputProps> = ({
  onPlaceSelected,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(() => {
        fetchSuggestions(query);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async (text: string) => {
    setLoading(true);
    try {
      const res = await axios.get<Suggestion[]>(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: text,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
          headers: {
            "Accept-Language": "en",
          },
        }
      );

      setSuggestions(res.data);
    } catch (error) {
      console.error("Failed to fetch location suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place: Suggestion) => {
    onPlaceSelected(place);
    setQuery(place.display_name);
    setSuggestions([]);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search for locations..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {loading && <ActivityIndicator size="small" style={{ marginTop: 10 }} />}
      {!loading && suggestions.length === 0 && query.length > 2 && (
        <Text style={styles.noResults}>No results found</Text>
      )}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={styles.item}
          >
            <Text numberOfLines={1}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderColor: "#EAEAEA",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1,
  },
  noResults: {
    padding: 10,
    fontStyle: "italic",
    color: "#888",
  },
});

export default PlacesAutocompleteInput;
