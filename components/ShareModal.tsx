import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFPercentage } from "react-native-responsive-fontsize";

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  address: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onClose, address }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Share Address</Text>
          <Text style={styles.modalAddress}>{address}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <FontAwesome name="whatsapp" size={30} color="#25D366" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="instagram" size={30} color="#E4405F" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="facebook" size={30} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="twitter" size={30} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: "600",
    marginBottom: 10,
  },
  modalAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#01615F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
  },
});

export default ShareModal;
