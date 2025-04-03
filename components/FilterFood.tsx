import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

interface FilterPopupProps {
  isVisible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
  onApply: (filters: { sortOption: string | null; preferences: string[] }) => void;
}

const CloseX: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <Text style={styles.closeXText} onPress={onPress}>
    {" "}X
  </Text>
);

const FilterPopup: React.FC<FilterPopupProps> = ({ isVisible, onClose, onApply }) => {
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<string[]>([]);

  const togglePreference = (preference: string) => {
    if (preferences.includes(preference)) {
      setPreferences(preferences.filter((pref) => pref !== preference));
    } else {
      setPreferences([...preferences, preference]);
    }
  };

  const handleApply = () => {
    onApply({ sortOption, preferences });
    onClose();
  };

  const handleClear = () => {
    setSortOption(null);
    setPreferences([]);
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Filtering and Sorting</Text>
          <Text style={styles.sectionTitle}>Sort by</Text>

          {/* Sorting Options */}
          <View style={styles.sortOptions}>
            <TouchableOpacity
              onPress={() => setSortOption("lowToHigh")}
              style={[
                styles.optionButton,
                sortOption === "lowToHigh" && styles.selectedOption,
              ]}
            >
              <View style={styles.optionContent}>
                <Text style={sortOption === "lowToHigh" ? styles.selectedText : undefined}>
                  Price - low to high
                </Text>
                {sortOption === "lowToHigh" && (
                  <CloseX onPress={() => setSortOption(null)} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSortOption("highToLow")}
              style={[
                styles.optionButton,
                sortOption === "highToLow" && styles.selectedOption,
              ]}
            >
              <View style={styles.optionContent}>
                <Text style={sortOption === "highToLow" ? styles.selectedText : undefined}>
                  Price - high to low
                </Text>
                {sortOption === "highToLow" && (
                  <CloseX onPress={() => setSortOption(null)} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Preferences */}
          <Text style={styles.sectionTitle}>Veg/Non-veg preference</Text>
          <View style={styles.preferences}>
            {["Veg", "Egg", "Non Veg"].map((preference) => (
              <TouchableOpacity
                key={preference}
                onPress={() => togglePreference(preference)}
                style={[
                  styles.preferenceButton,
                  preferences.includes(preference) && styles.selectedOption,
                ]}
              >
                <View style={styles.optionContent}>
                  <Text
                    style={preferences.includes(preference) ? styles.selectedText : undefined}
                  >
                    {preference}
                  </Text>
                  {preferences.includes(preference) && (
                    <CloseX onPress={() => togglePreference(preference)} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#01615F",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  sortOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  optionButton: {
    padding: 9,
    flex: 1,
    // marginHorizontal: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOption: {
    borderColor: "#01615F",
    borderWidth: 1,
    borderRadius: 20,
  },
  selectedText: {
    color: "#01615F",
  },
  closeXText: {
    color: "#01615F",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    marginBottom: 10,
  },
  preferences: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  preferenceButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
    flex: 1,
    marginHorizontal: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  clearButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#01615F",
    paddingHorizontal: 20,
  },
  applyButton: {
    padding: 10,
    backgroundColor: "#01615F",
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  applyText: {
    color: "#fff",
    fontWeight:"bold",
   paddingHorizontal: 25,
    paddingVertical:8,
  },
  clearText:{
     color: "#01615F",
    fontWeight:"bold",
    paddingHorizontal: 25,
    paddingVertical:8,
  }
});

export default FilterPopup;