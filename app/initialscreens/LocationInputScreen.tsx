import CurrentLocation from "@/components/CurrenLocation";
import GoBack from "@/components/GoBack";
import SearchInput from "@/components/SearchInput";
import { useNavigation, useRouter } from "expo-router";

import React, { useState, useEffect } from "react";
import { 
  SafeAreaView, 
  StatusBar, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  StyleSheet,
  Alert 
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface for location data
interface LocationItem {
  id: string;
  name: string;
  description: string;
  lat?: number;
  lng?: number;
  address?: any;
  place_id?: string;
}

// Google Maps API Key - Replace with your actual API key
const GOOGLE_MAPS_API_KEY = "AIzaSyC0KfZKWEjvw25jMncLBXoHknBkz0Y_pFc";

// Function to fetch location suggestions from Google Places API
const fetchLocationSuggestions = async (query: string): Promise<LocationItem[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    // Add "Tamil Nadu" to the search query to restrict results to Tamil Nadu
    const searchQuery = `${query}, Tamil Nadu, India`;
    
    // Use Google Places Autocomplete API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(searchQuery)}&key=${GOOGLE_MAPS_API_KEY}&components=country:in`
    );
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error("Google Places API error:", data.status, data.error_message);
      throw new Error(`Google Places API error: ${data.status}`);
    }
    
    // Transform predictions to match our interface
    const predictions = data.predictions || [];
    
    // If no results, return empty array
    if (predictions.length === 0) {
      return [];
    }
    
    // Get more details for the predictions
    const detailedLocations = await Promise.all(
      predictions.map(async (prediction: any) => {
        // Get place details for each prediction
        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=geometry,formatted_address,name&key=${GOOGLE_MAPS_API_KEY}`
        );
        
        if (!detailsResponse.ok) {
          throw new Error(`Network response was not ok: ${detailsResponse.status}`);
        }
        
        const detailsData = await detailsResponse.json();
        
        if (detailsData.status !== "OK") {
          console.error("Google Places Details API error:", detailsData.status);
          // Return a partial result if details fetch fails
          return {
            id: prediction.place_id,
            name: prediction.structured_formatting?.main_text || prediction.description.split(",")[0],
            description: prediction.description,
            place_id: prediction.place_id
          };
        }
        
        const result = detailsData.result;
        
        // Extract the location details
        return {
          id: prediction.place_id,
          name: prediction.structured_formatting?.main_text || result.name,
          description: prediction.description,
          lat: result.geometry?.location?.lat,
          lng: result.geometry?.location?.lng,
          address: result.formatted_address,
          place_id: prediction.place_id
        };
      })
    );
    
    return detailedLocations;
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    return [];
  }
};

// Keys for AsyncStorage
const RECENT_SEARCHES_KEY = "recentLocationSearches";

const LocationInputScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<LocationItem[]>([]);

  const navigation = useNavigation();
  const router = useRouter();

  // Load recent searches from storage
  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const storedSearches = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
        if (storedSearches) {
          setRecentSearches(JSON.parse(storedSearches));
        }
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    };
    
    loadRecentSearches();
  }, []);

  const saveRecentSearch = async (location: LocationItem) => {
    try {
      // Add to start of array and ensure no duplicates
      const updatedSearches = [
        location,
        ...recentSearches.filter(item => item.id !== location.id)
      ].slice(0, 5); // Keep only 5 most recent
      
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Failed to save recent search:', error);
    }
  };

  const handleClearSearch = (): void => {
    setSearchText("");
    setSuggestions([]);
  };

  const handleGetLocation = () => {
    router.push({
      pathname: "/UserDetails/MapView",
      params: { mode: "currentLocation" },
    });
    console.log("Use my current location clicked");
  };

  const handleSelectLocation = (location: LocationItem) => {
    console.log("Selected location:", location);
    
    // Save to recent searches
    saveRecentSearch(location);
    
    // Navigate to the next screen with the selected location
    router.push({
      pathname: "/UserDetails/MapView",
      params: { 
        location: JSON.stringify(location),
        mode: "selectedLocation" 
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Fetch location suggestions when searchText changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchText.trim()) {
        setIsLoading(true);
        try {
          const results = await fetchLocationSuggestions(searchText);
          setSuggestions(results);
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
          setSuggestions([]);
          Alert.alert("Error", "Failed to fetch location suggestions. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500); // Debounce delay of 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const renderSuggestionItem = ({ item }: { item: LocationItem }) => (
    <TouchableOpacity 
      style={styles.suggestionItem}
      onPress={() => handleSelectLocation(item)}
    >
      <Ionicons 
        name={recentSearches.some(search => search.id === item.id) ? "time-outline" : "location-outline"} 
        size={24} 
        color="#757575" 
      />
      <View style={styles.suggestionTextContainer}>
        <Text allowFontScaling={false}  style={styles.suggestionTitle}>{item.name}</Text>
        <Text allowFontScaling={false}  style={styles.suggestionDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />

      {/* Header with back button */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
          borderColor: "#F1F1F1",
        }}
      >
        <GoBack /> {/* BackButton component here */}
        <Text allowFontScaling={false}  style={{ fontSize: RFPercentage(2), fontWeight: "700" }}>
          Enter your area or apartment name in Tamil Nadu
        </Text>
      </View>

      {/* Search Input Container */}
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        handleClearSearch={handleClearSearch}
        placeholder="Search for locations in Tamil Nadu..."
      />

      {/* Current Location Button */}
      <CurrentLocation handleGetLocation={handleGetLocation} />

      {/* Suggestions Dropdown */}
      <View style={styles.suggestionsContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0066CC" />
          </View>
        ) : (
          <FlatList
            data={searchText.trim() ? suggestions : recentSearches}
            renderItem={renderSuggestionItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              !searchText.trim() && recentSearches.length > 0 ? (
                <Text allowFontScaling={false}  style={styles.sectionHeader}>Recent Searches</Text>
              ) : null
            }
            ListEmptyComponent={
              searchText.trim() ? (
                <Text allowFontScaling={false}  style={styles.emptyMessage}>
                  No locations found in Tamil Nadu. Try a different search term.
                </Text>
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  suggestionsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  suggestionTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  suggestionTitle: {
    fontSize: RFPercentage(2),
    fontWeight: '500',
  },
  suggestionDescription: {
    fontSize: RFPercentage(1.7),
    color: '#757575',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: RFPercentage(1.8),
    fontWeight: '600',
    color: '#666666',
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  emptyMessage: {
    padding: 20,
    textAlign: 'center',
    color: '#757575',
  }
});

export default LocationInputScreen;