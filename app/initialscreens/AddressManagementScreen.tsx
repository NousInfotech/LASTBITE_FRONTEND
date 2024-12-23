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
import { useRouter } from "expo-router";

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

  const handleMoreOptions = (address: Address) => {
    setSelectedAddress(address);
    setMoreOptionsVisible(true);
  };

  const handleEdit = () => {
    if (selectedAddress) {
      setEditMode(true);
      setEditedAddress(selectedAddress.address);
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

  const renderAddressItem = (item: Address) => (
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
        address={selectedAddress?.address || ""}
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
});

export default AddressManagementScreen;
