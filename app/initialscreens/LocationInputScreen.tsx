// LocationInputScreen.tsx
import CurrentLocation from "@/components/CurrenLocation";
import GoBack from "@/components/GoBack";
import SearchInput from "@/components/SearchInput";
import { useNavigation, useRouter } from "expo-router";

import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, View, Text } from "react-native";

const LocationInputScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleClearSearch = (): void => {
    setSearchText("");
  };

  const handleGetLocation = () => {
    router.push({
      pathname: "/UserDetails/MapView",
      params: { mode: "currentLocation" },
    });
    console.log("Use my current location clicked");
  };
  const navigation = useNavigation();

  useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);
  
    const router = useRouter();

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
        <Text style={{ fontSize: RFPercentage(2), fontWeight: "700" }}>
          Enter your area or apartment name
        </Text>
      </View>

      {/* Search Input Container */}
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        handleClearSearch={handleClearSearch}
        placeholder="Search for locations..."
      />

      {/* Current Location Button */}
      <CurrentLocation handleGetLocation={handleGetLocation} />

      {/* Empty space for potential search results */}
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Search results will be rendered here */}
      </View>
    </SafeAreaView>
  );
};

export default LocationInputScreen;
