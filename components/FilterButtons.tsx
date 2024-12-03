import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { X } from 'react-native-feather';  // For the X icon
import { useFonts } from 'expo-font'; 
import Octicons from '@expo/vector-icons/Octicons';
import FilterModal from './FilterModal';

const FilterButtons = () => {
  const [filters, setFilters] = useState(['Filter by', 'Pure Veg', 'Non Veg', 'Ratings 4.0+', 'Rating 4.5+']);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  // Add or remove active filter from activeFilters array
  const toggleActiveFilter = (filter: string) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)  // Remove filter if already active
        : [...prevFilters, filter]  // Add filter to active filters if it's not already active
    );
  };

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  });

  // Remove a specific active filter when the 'X' is clicked
  const removeActiveFilter = (filter: string) => {
    setActiveFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
  };

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where to Eat Next</Text>
      {/* ScrollView for horizontal scrolling */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilters.includes(filter) && styles.activeFilter,
            ]}
            onPress={() => {
              if (filter === 'Filter by') {
                setIsModalVisible(true); // Open FilterModal when 'Filter by' button is pressed
              } else {
                toggleActiveFilter(filter);  // Toggle active filter for other filters
              }
            }}
          >
            <Text
              style={[
                styles.filterText,
                activeFilters.includes(filter) && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
            {/* Show 'X' icon only for active filters */}
            {activeFilters.includes(filter) && (
              <X
                stroke="#fff"
                width={16}
                height={16}
                onPress={() => removeActiveFilter(filter)}  // Remove active filter
                style={styles.icon}
              />
            )}
            {filter === 'Filter by' && (  // Add filter icon to 'Filter by' button
              <Octicons name="filter" size={16} color="#01615F" style={styles.icon} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FilterModal visibility based on state */}
      {isModalVisible && (
        <FilterModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilter: {
    backgroundColor: '#01615F',
  },
  filterText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    marginRight: 4,
    fontSize: 10,
  },
  activeFilterText: {
    color: '#fff',
  },
  icon: {
    marginLeft: 4,
  },
});

export default FilterButtons;
