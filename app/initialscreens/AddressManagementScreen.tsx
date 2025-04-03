import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  StyleSheet,
  findNodeHandle,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import GoBack from "@/components/GoBack";
import { DeleteConfirmationModal, MoreOptionsMenu } from "@/components/Options";
import { useRouter } from "expo-router";
import ShareModal from "@/components/ShareModal"; // Update the path accordingly
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
  const [searchText, setSearchText] = useState<string>("");
  const [moreOptionsVisible, setMoreOptionsVisible] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedAddress, setEditedAddress] = useState<string>("");
  const [shareModalVisible, setShareModalVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  let savedAddresses: Address[] = [
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
  ];

  const recentSearches: Address[] = [
    {
      id: 3,
      type: "Green Valley",
      address: "Green Valley Apartments, Lakeview Street",
      icon: "history",
    },
  ];

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
      router.push({
        pathname: "/initialscreens/AddressEditScreen",  // Correct path
        params: {
          building: "Building A",
          street: "Main Street",
          town: "Downtown",
          city: "Metropolis",
          state: "Stateville",
          country: "Countryland",
          pincode: "123456",
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
      savedAddresses = savedAddresses.filter(
        (address) => address.id !== selectedAddress.id
      );
      setDeleteConfirmationVisible(false);
      setSelectedAddress(null);
    }
  };

  const handleSaveEdit = () => {
    if (selectedAddress) {
      const updatedAddresses = savedAddresses.map((address) =>
        address.id === selectedAddress.id
          ? { ...address, address: editedAddress }
          : address
      );
      savedAddresses = updatedAddresses;
      setEditMode(false);
      setSelectedAddress(null);
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
        {savedAddresses.map((address) => renderAddressItem(address))}
      </View>

      {/* Recent Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RECENT SEARCHES</Text>
        {recentSearches.map((address) => renderAddressItem(address))}
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
    marginLeft: 16,
    fontWeight: "500",
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
    fontSize: RFPercentage(2),,
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
  menu: {
    position: "absolute",
    top: 50,
    right: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    zIndex: 10,
  },
  menuOption: {
    padding: 8,
    fontSize: RFPercentage(2),
    color: "#333",
  },
});

export default AddressManagementScreen;
