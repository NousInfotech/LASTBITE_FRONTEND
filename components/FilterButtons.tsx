import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { X } from "react-native-feather";
import Octicons from "@expo/vector-icons/Octicons";
import FilterModal from "./FilterModal"; 

interface FilterButtonsProps {
  onFilterChange: (selectedFilters: string[]) => void; // Callback to pass selected filters
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange }) => {
  const [filters] = useState<string[]>([
    "Filter by",
    "Pure Veg",
    "Non Veg",
    "Ratings 4.0+",
    "Rating 4.5+",
  ]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onApply = (selectedFilter: string | string[]) => {
    const selectedArray = Array.isArray(selectedFilter)
      ? selectedFilter
      : [selectedFilter];

    setActiveFilters(selectedArray);
    onFilterChange(selectedArray); // Notify parent component
    setIsModalVisible(false);
  };

  const handleFilterPress = (filter: string) => {
    if (filter === "Filter by") {
      setIsModalVisible(true);
    } else {
      setActiveFilters((prev) => {
        const newFilters = prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev, filter];

        onFilterChange(newFilters); // Notify parent component
        return newFilters;
      });
    }
  };

  return (
    <View>
      <Text style={styles.title}>Where to Eat Next</Text>
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilters.includes(filter) && styles.activeFilter,
              index === 0 && styles.firstButtonWithMargin,
            ]}
            onPress={() => handleFilterPress(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilters.includes(filter) && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
            {activeFilters.includes(filter) && (
              <X
                stroke="#fff"
                width={16}
                height={16}
                onPress={() => handleFilterPress(filter)}
                style={styles.icon}
              />
            )}
            {filter === "Filter by" && (
              <Octicons name="filter" size={16} color="#000" style={styles.icon} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isModalVisible && (
        <FilterModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Filter"
          filterOptions={[
            "Relevance",
            "Rating: High To Low",
            "Delivery Time: Low To High",
            "Delivery Time And Relevance",
            "Cost: Low To High",
            "Cost: High To Low",
            "Distance: Low To High",
          ]}
          buttonText={{
            cancel: "Cancel",
            apply: "Apply",
          }}
          inputType="radio"
          onApply={onApply}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  firstButtonWithMargin: {
    marginLeft: 16,
  },
  activeFilter: {
    backgroundColor: "#01615F",
  },
  filterText: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    marginRight: 4,
    fontSize: 15,
  },
  activeFilterText: {
    color: "#fff",
  },
  icon: {
    marginLeft: 4,
  },
});

export default FilterButtons;
