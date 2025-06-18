import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ScrollView,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const { width: screenWidth } = Dimensions.get('window');

interface FilterPopupProps {
  isVisible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
  onApply: (filters: { sortOption: string | null; preferences: string[] }) => void;
}

const CloseX: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeXContainer}>
    <Text allowFontScaling={false} style={styles.closeXText}>
      ×
    </Text>
  </TouchableOpacity>
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
          {/* Header with Close Button */}
          <View style={styles.header}>
            <Text allowFontScaling={false} style={styles.title}>
              Filtering and Sorting
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text allowFontScaling={false} style={styles.closeButtonText}>
                ×
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Sort by Section */}
            <View style={styles.section}>
              <Text allowFontScaling={false} style={styles.sectionTitle}>
                Sort by
              </Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  onPress={() => setSortOption("lowToHigh")}
                  style={[
                    styles.optionButton,
                    sortOption === "lowToHigh" && styles.selectedOption,
                  ]}
                >
                  <View style={styles.optionContent}>
                    <Text 
                      allowFontScaling={false} 
                      style={[
                        styles.optionText,
                        sortOption === "lowToHigh" && styles.selectedText
                      ]}
                    >
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
                    <Text 
                      allowFontScaling={false} 
                      style={[
                        styles.optionText,
                        sortOption === "highToLow" && styles.selectedText
                      ]}
                    >
                      Price - high to low
                    </Text>
                    {sortOption === "highToLow" && (
                      <CloseX onPress={() => setSortOption(null)} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Preferences Section */}
            <View style={styles.section}>
              <Text allowFontScaling={false} style={styles.sectionTitle}>
                Veg/Non-veg preference
              </Text>
              <View style={styles.optionsContainer}>
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
                        allowFontScaling={false}
                        style={[
                          styles.optionText,
                          preferences.includes(preference) && styles.selectedText
                        ]}
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
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text allowFontScaling={false} style={styles.clearText}>
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
              <Text allowFontScaling={false} style={styles.applyText}>
                Apply
              </Text>
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
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: RFPercentage(3),
    color: "#01615F",
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: RFPercentage(2.2),
    fontWeight: "bold",
    marginBottom: 15,
    color: '#333',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 45,
    backgroundColor: '#fafafa',
  },
  preferenceButton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 45,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  optionText: {
    fontSize: RFPercentage(2),
    color: '#666',
    flex: 1,
  },
  selectedOption: {
    borderColor: "#01615F",
    borderWidth: 2,
    backgroundColor: '#f0f8f7',
  },
  selectedText: {
    color: "#01615F",
    fontWeight: '600',
  },
  closeXContainer: {
    marginLeft: 8,
    padding: 4,
  },
  closeXText: {
    color: "#01615F",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFPercentage(2.2),
  },
  clearText: {
    color: "#01615F",
    fontWeight: "bold",
    fontSize: RFPercentage(2.2),
  },
});

export default FilterPopup;