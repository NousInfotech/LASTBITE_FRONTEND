import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFPercentage } from "react-native-responsive-fontsize";

// Define types for the props
interface MoreOptionsMenuProps {
  visible: boolean;
  onClose: () => void;
  onEditPress: () => void;
  onSharePress: () => void;
  onDeletePress: () => void;
  position?: { x: number; y: number };
}

interface DeleteConfirmationModalProps {
  visible: boolean;
  address: string;
  onCancel: () => void;
  onDelete: () => void;
}

export const MoreOptionsMenu: React.FC<MoreOptionsMenuProps> = ({
  visible,
  onClose,
  onEditPress,
  onSharePress,
  onDeletePress,
  position,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.menuOverlay}>
          <View style={[
              styles.menuContent,
              position ? { position: 'absolute', left: position.x, top: position.y } : {},
            ]}>
            <TouchableOpacity style={styles.menuItem} onPress={onEditPress}>
              <Icon name="edit" size={20} color="#333" />
              <Text allowFontScaling={false}  style={styles.menuText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={onSharePress}>
              <Icon name="share" size={20} color="#333" />
              <Text allowFontScaling={false}  style={styles.menuText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={onDeletePress}>
              <Icon name="delete-outline" size={20} color="#FF4646" />
              <Text allowFontScaling={false}  style={[styles.menuText, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ visible, address, onCancel, onDelete }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
      animationType="fade"
    >
      <View style={styles.deleteOverlay}>
        <View style={styles.deleteContent}>
          <View style={styles.deleteIconContainer}>
            <View style={styles.deleteIconCircle}>
              <Icon name="delete-outline" size={24} color="#FF4646" />
            </View>
          </View>

          <Text allowFontScaling={false}  style={styles.deleteTitle}>
            Proceed to delete this address?
          </Text>
          <Text allowFontScaling={false}  style={styles.deleteAddress}>{address}</Text>

          <View style={styles.deleteButtons}>
            <TouchableOpacity
              style={[styles.deleteButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text allowFontScaling={false}  style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.deleteButton, styles.confirmButton]}
              onPress={onDelete}
            >
              <Text allowFontScaling={false}  style={styles.confirmButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Main Component where address is edited, shared, and deleted
export const AddressManager: React.FC = () => {
  const [address, setAddress] = useState<string>("123 Main Street, City");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  // Handle the edit button press (toggle edit mode)
  const handleEditPress = () => {
    setIsEditable(!isEditable);
  };

  // Handle the share button press (log share functionality)
  const handleSharePress = () => {
    console.log("Sharing address:", address);
    // Add alternative sharing functionality if required
  };

  // Handle the delete button press (show confirmation modal)
  const handleDeletePress = () => {
    setDeleteModalVisible(true);
  };

  // Delete the address
  const handleDelete = () => {
    setAddress("");
    setDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  return (
    <View>
      <MoreOptionsMenu
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEditPress={handleEditPress}
        onSharePress={handleSharePress}
        onDeletePress={handleDeletePress}
      />

      {/* Address editing view */}
     <TextInput allowFontScaling={false} 
        value={address}
        editable={isEditable}
        onChangeText={setAddress}
        style={styles.addressInput}
      />

      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        address={address}
        onCancel={handleCancelDelete}
        onDelete={handleDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContent: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 2,
    marginLeft:-105,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 120, // Fixed width
    zIndex: 1000, // Ensure it's above other content
  },
  
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    minWidth: 150,
  },
  menuText: {
    marginLeft: 12,
    fontSize: RFPercentage(2),
    color: "#333",
  },
  deleteText: {
    color: "#FF4646",
  },
  addressInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  deleteOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  deleteIconContainer: {
    marginBottom: 16,
  },
  deleteIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  deleteAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  deleteButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
  },
  confirmButton: {
    backgroundColor: "#FF4646",
  },
  cancelButtonText: {
    color: "#333",
    textAlign: "center",
    fontSize: RFPercentage(2),
  },
  confirmButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: RFPercentage(2),
  },
});
