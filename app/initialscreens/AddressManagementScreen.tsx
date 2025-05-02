import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import GoBack from "@/components/GoBack";
import { DeleteConfirmationModal, MoreOptionsMenu } from "@/components/Options";
import { useRouter, useLocalSearchParams } from "expo-router";
import ShareModal from "@/components/ShareModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";

interface Address {
  id: number;
  type: string;
  address: string;
  icon: string;
}

const AddressManagementScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [searchText, setSearchText] = useState<string>("");
  const [moreOptionsVisible, setMoreOptionsVisible] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [shareModalVisible, setShareModalVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  
  // State for addresses
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      address: "Green Valley Apartments, Lakeview Street",
      icon: "home",
    },
    {
      id: 2,
      type: "Work Place",
      address: "Green Valley Apartments, Lakeview Street",
      icon: "work",
    },
  ]);

  const [recentSearches, setRecentSearches] = useState<Address[]>([
    {
      id: 3,
      type: "Green Valley",
      address: "Green Valley Apartments, Lakeview Street",
      icon: "history",
    },
  ]);

  // Effect to handle address updates from navigation params
  useEffect(() => {
    if (params && params.editedAddress) {
      try {
        // Parse the edited address data
        const addressData = JSON.parse(params.editedAddress as string);
        
        // Update the appropriate address list
        if (addressData.id) {
          // Update saved addresses
          setSavedAddresses(prev => 
            prev.map(addr => 
              addr.id === parseInt(addressData.id) 
              ? {
                  ...addr,
                  type: addressData.type || addr.type,
                  address: addressData.formattedAddress,
                  icon: getIconForType(addressData.type)
                } 
              : addr
            )
          );
          
          // Also update recent searches if the ID matches
          setRecentSearches(prev => 
            prev.map(addr => 
              addr.id === parseInt(addressData.id) 
              ? {
                  ...addr,
                  type: addressData.type || addr.type,
                  address: addressData.formattedAddress,
                  icon: addr.icon
                } 
              : addr
            )
          );
        }
      } catch (e) {
        console.error('Error parsing edited address:', e);
      }
    }
  }, [params]);
  
  // Helper function to get the icon based on address type
  const getIconForType = (type: string): string => {
    switch (type) {
      case 'Home': return 'home';
      case 'Work': return 'work';
      default: return 'location-on';
    }
  };

  const handleUseCurrentLocation = () => {
    router.push({
      pathname: "/UserDetails/MapView",
      params: { mode: "currentLocation" },
    });
    console.log("Use my current location clicked");
  };

  const handleAddNewAddress = () => {
    router.push({
      pathname: "/UserDetails/MapView",
      params: { mode: "addAddress" },
    });
  };

  const handleMoreOptions = (address: Address, iconRef: any) => {
    iconRef.current.measureInWindow((x: number, y: number) => {
      setMenuPosition({ x, y });
      setSelectedAddress(address);
      setMoreOptionsVisible(true);
    });
  };

  const handleEdit = () => {
    if (selectedAddress) {
      // Parse the address to extract components (this is a simplistic approach)
      const addressParts = selectedAddress.address.split(", ");
      
      // Map address parts to fields - this is a best-effort approach
      // In a real app, you should store the address components separately
      let building = addressParts[0] || "";
      let street = addressParts[1] || "";
      let town = addressParts[2] || "";
      let city = addressParts[3] || "";
      let state = addressParts[4] || "";
      let country = addressParts[5] || "";
      let pincode = addressParts[6] || "";
      
      router.push({
        pathname: "/UserDetails/MapView", // Update this path as needed
        params: {
          id: selectedAddress.id.toString(),
          type: selectedAddress.type,
          building: building,
          street: street,
          town: town,
          city: city,
          state: state,
          country: country,
          pincode: pincode,
          isEditing: "true", // Flag to indicate edit mode
        },
      });
      setMoreOptionsVisible(false);
    }
  };

  const handleDelete = () => {
    setDeleteConfirmationVisible(true);
    setMoreOptionsVisible(false);
  };

  const handleShare = () => {
    setShareModalVisible(true);
    setMoreOptionsVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleConfirmDelete = () => {
    if (selectedAddress) {
      // Check if the address is in saved addresses
      if (savedAddresses.some(addr => addr.id === selectedAddress.id)) {
        setSavedAddresses(prev => 
          prev.filter(address => address.id !== selectedAddress.id)
        );
      } 
      // Check if the address is in recent searches
      else if (recentSearches.some(addr => addr.id === selectedAddress.id)) {
        setRecentSearches(prev => 
          prev.filter(address => address.id !== selectedAddress.id)
        );
      }
      
      setDeleteConfirmationVisible(false);
      setSelectedAddress(null);
      Alert.alert("Success", "Address deleted successfully");
    }
  };

  const renderAddressItem = (item: Address) => {
    const iconRef = useRef(null);

    return (
      <View style={styles.addressItem} key={item.id}>
        <View style={styles.addressLeft}>
          <Icon name={item.icon} size={24} color="#666" />
          <View style={styles.addressDetails}>
            <Text style={styles.addressType}>{item.type}</Text>
            <Text style={styles.addressText}>{item.address}</Text>
          </View>
        </View>
        <TouchableOpacity
          ref={iconRef}
          onPress={() => handleMoreOptions(item, iconRef)}
        >
          <Icon name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Enter your area or apartment name
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Try Elm Street..."
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== "" && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Icon name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Location Options */}
      <TouchableOpacity
        style={styles.locationOption}
        onPress={handleUseCurrentLocation}
      >
        <Icon name="my-location" size={20} color="#01615F" />
        <Text style={styles.locationText}>Use my current location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.locationOption}
        onPress={handleAddNewAddress}
      >
        <Icon name="add" size={20} color="#01615F" />
        <Text style={styles.locationText}>Add new address</Text>
      </TouchableOpacity>

      {/* Saved Addresses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>
        {savedAddresses.length > 0 ? (
          savedAddresses.map((address) => renderAddressItem(address))
        ) : (
          <Text style={styles.emptyText}>No saved addresses found</Text>
        )}
      </View>

      {/* Recent Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RECENT SEARCHES</Text>
        {recentSearches.length > 0 ? (
          recentSearches.map((address) => renderAddressItem(address))
        ) : (
          <Text style={styles.emptyText}>No recent searches</Text>
        )}
      </View>

      {/* More Options Menu */}
      <MoreOptionsMenu
        visible={moreOptionsVisible}
        onClose={() => setMoreOptionsVisible(false)}
        onEditPress={handleEdit}
        onSharePress={handleShare}
        onDeletePress={handleDelete}
        position={menuPosition}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        visible={deleteConfirmationVisible}
        address={selectedAddress?.address || ""}
        onCancel={handleDeleteCancel}
        onDelete={handleConfirmDelete}
      />

      {/* Share Modal */}
      <ShareModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        address={selectedAddress?.address || ""}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(2),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: "#929292",
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: RFPercentage(2),
  },
  locationOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  locationText: {
    marginLeft: 16,
    color: "#01615F",
    fontSize: RFPercentage(2),
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: RFPercentage(2),
    color: "#666",
    fontWeight: "500",
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  addressLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  addressDetails: {
    marginLeft: 16,
    flex: 1,
  },
  addressType: {
    fontSize: RFPercentage(2),
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
    padding: 16,
  },
});

export default AddressManagementScreen;