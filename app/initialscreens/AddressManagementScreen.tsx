import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import GoBack from "@/components/GoBack";
import { DeleteConfirmationModal, MoreOptionsMenu } from "@/components/Options";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { useRouter } from "expo-router";

const AddressManagementScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [editedAddress, setEditedAddress] = useState(""); // Track the edited address
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const savedAddresses = [
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

  const recentSearches = [
    {
      id: 3,
      type: "Green Valley",
      address: "Green Valley Apartments, Lakeview Street",
      icon: "history",
    },
  ];

  const handleUseCurrentLocation = () => {
    // Pass query parameters directly in the route string
    router.push({
      pathname: "/UserDetails/MapView",
      params: { mode: "currentLocation" },
    });
    console.log("use my current location clicked");
  };
  const handleAddNewAddress = () => {
    // Pass query parameters directly in the route string
    router.push({
      pathname: "/UserDetails/MapView",
      params: { mode: "addAddress" },
    });
  };
  const handleMoreOptions = (address) => {
    setSelectedAddress(address);
    setMoreOptionsVisible(true); // Show more options menu
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedAddress(selectedAddress.address); // Pre-fill the address to be edited
    setMoreOptionsVisible(false); // Close the options menu
  };

  const handleDelete = () => {
    setDeleteConfirmationVisible(true);
    setMoreOptionsVisible(false); // Close MoreOptionsMenu
  };

  const handleShare = () => {
    setShareModalVisible(true); // Open share modal
    setMoreOptionsVisible(false); // Close options menu
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleConfirmDelete = () => {
    // Handle delete logic here (e.g., remove the address from savedAddresses)
    setDeleteConfirmationVisible(false);
    setSelectedAddress(null);
  };

  const handleSaveEdit = () => {
    // Save the edited address (update the savedAddresses array)
    const updatedAddresses = savedAddresses.map((address) =>
      address.id === selectedAddress.id
        ? { ...address, address: editedAddress }
        : address
    );
    // Update saved addresses
    savedAddresses = updatedAddresses;
    setEditMode(false);
    setSelectedAddress(null);
  };

  const renderAddressItem = (item) => (
    <View style={styles.addressItem} key={item.id}>
      <View style={styles.addressLeft}>
        <Icon name={item.icon} size={24} color="#666" />
        <View style={styles.addressDetails}>
          <Text style={styles.addressType}>{item.type}</Text>
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleMoreOptions(item)}>
        <Icon name="more-vert" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );

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
        <Icon name="my-location" size={20} color="#008ACE" />
        <Text style={styles.locationText}>Use my current location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.locationOption}
        onPress={handleAddNewAddress}
      >
        <Icon name="add" size={20} color="#008ACE" />
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
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        visible={deleteConfirmationVisible}
        address={selectedAddress?.address}
        onCancel={handleDeleteCancel}
        onDelete={handleConfirmDelete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: 90,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  locationOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  locationText: {
    marginLeft: 16,
    color: "#008ACE",
    fontSize: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 12,
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
    fontSize: 16,
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 8,
  },
  editInput: {
    margin: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  saveButton: {
    backgroundColor: "#008ACE",
  },
  cancelButtonText: {
    color: "#000",
  },
  saveButtonText: {
    color: "#fff",
  },
  modalContent: {
    margin: 16,
    fontSize: 16,
    color: "#666",
  },
  shareButton: {
    backgroundColor: "#008ACE",
  },
  shareButtonText: {
    color: "#fff",
  },
});

export default AddressManagementScreen;
