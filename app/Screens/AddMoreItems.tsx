import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  category?: string;
}

interface AddMoreItemsProps {
  route?: {
    params: {
      items: Item[];
      updateItems: React.Dispatch<React.SetStateAction<Item[]>>;
    }
  };
  items?: Item[];
  setItems?: React.Dispatch<React.SetStateAction<Item[]>>;
}

interface MenuItem {
  menuItemId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurantId: string;
  image: string;
  isAvailable: boolean;
}

const mockMenuItems: MenuItem[] = [
  {
    menuItemId: 1,
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and spices.',
    price: 12.99,
    category: 'Biryani',
    restaurantId: 'r1',
    image: 'https://via.placeholder.com/150',
    isAvailable: true,
  },
  {
    menuItemId: 2,
    name: 'Gulab Jamun',
    description: 'Delicious deep-fried dumplings soaked in sugar syrup.',
    price: 4.99,
    category: 'Desserts',
    restaurantId: 'r1',
    image: 'https://via.placeholder.com/150',
    isAvailable: true,
  },
  {
    menuItemId: 3,
    name: 'Paneer Tikka',
    description: 'Soft paneer cubes marinated in spices and grilled to perfection.',
    price: 9.99,
    category: 'North Indian',
    restaurantId: 'r1',
    image: 'https://via.placeholder.com/150',
    isAvailable: true,
  },
  {
    menuItemId: 4,
    name: 'Grilled Chicken',
    description: 'Juicy chicken grilled with herbs and spices.',
    price: 14.99,
    category: 'Grill',
    restaurantId: 'r2',
    image: 'https://via.placeholder.com/150',
    isAvailable: true,
  },
];

const AddMoreItems: React.FC<AddMoreItemsProps> = (props) => {
  const router = useRouter();
  const { restaurantId, restaurantName } = useLocalSearchParams<{
    restaurantId: string;
    restaurantName: string;
  }>();
  
  // Handle both direct props and route params for maximum compatibility
  let currentItems: Item[] = [];
  let setCurrentItems: React.Dispatch<React.SetStateAction<Item[]>> | null = null;
  
  // Check if we have route params
  if (props.route?.params) {
    currentItems = props.route.params.items || [];
    setCurrentItems = props.route.params.updateItems;
  } 
  // If not, use the direct props
  else {
    currentItems = props.items || [];
    setCurrentItems = props.setItems || null;
  }
  
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems] = useState<MenuItem[]>(mockMenuItems);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Biryani', 'Desserts', 'North Indian', 'Grill'])
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(category) ? newSet.delete(category) : newSet.add(category);
      return newSet;
    });
  };

  const handleAddItem = (menuItem: MenuItem) => {
    if (!setCurrentItems) return;
    
    const existingItemIndex = currentItems.findIndex((item) => item.id === menuItem.menuItemId);
    if (existingItemIndex !== -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCurrentItems(updatedItems);
    } else {
      const newItem: Item = {
        id: menuItem.menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        image: menuItem.image,
        category: menuItem.category,
      };
      setCurrentItems([...currentItems, newItem]);
    }
  };

  const handleRemoveItem = (id: number) => {
    if (!setCurrentItems) return;
    
    const index = currentItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updated = [...currentItems];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
        setCurrentItems(updated);
      } else {
        setCurrentItems(updated.filter((item) => item.id !== id));
      }
    }
  };

  const getItemQuantity = (menuItemId: number): number => {
    const found = currentItems.find((item) => item.id === menuItemId);
    return found ? found.quantity : 0;
  };

  const filteredMenuItems = searchQuery
    ? menuItems.filter((item) => {
        const searchableText = `${item.name} ${item.category} ${item.description}`.toLowerCase();
        return searchableText.includes(searchQuery.toLowerCase());
      })
    : menuItems;

  // Added search input field
  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Add More Items</Text>
        
        {renderSearchBar()}

        {Array.from(new Set(filteredMenuItems.map((item) => item.category))).map((category) => (
          <View key={category}>
            <TouchableOpacity
              onPress={() => toggleCategory(category)}
              style={styles.categoryChip}
            >
              <Text style={styles.categoryText}>{category}</Text>
              <Text>{expandedCategories.has(category) ? '-' : '+'}</Text>
            </TouchableOpacity>

            {expandedCategories.has(category) &&
              filteredMenuItems
                .filter((item) => item.category === category)
                .map((menuItem) => (
                  <View key={menuItem.menuItemId} style={styles.menuCard}>
                    <Image source={{ uri: menuItem.image }} style={styles.menuImage} />
                    <View style={styles.menuDetails}>
                      <Text style={styles.menuName}>{menuItem.name}</Text>
                      <Text style={styles.menuPrice}>${menuItem.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.addButtonContainer}>
                      {getItemQuantity(menuItem.menuItemId) === 0 ? (
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => handleAddItem(menuItem)}
                        >
                          <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.counterContainer}>
                          <TouchableOpacity
                            style={styles.minusButton}
                            onPress={() => handleRemoveItem(menuItem.menuItemId)}
                          >
                            <Text style={styles.addButtonText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.counterText}>
                            {getItemQuantity(menuItem.menuItemId)}
                          </Text>
                          <TouchableOpacity
                            style={styles.plusButton}
                            onPress={() => handleAddItem(menuItem)}
                          >
                            <Text style={styles.addButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
          </View>
        ))}
      </ScrollView>
      
      {/* Optional: Add a bottom bar for Done/Back button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => router.back()}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: RFPercentage(2.2),
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 12,
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Poppins-Regular',
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  cartItemsContainer: {
    marginBottom: 16,
  },
  cartItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 4,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: RFPercentage(1.6),
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginVertical: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: RFPercentage(1.8),
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 4,
    padding: 10,
    backgroundColor: '#EFFFF4',
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: RFPercentage(1.8),
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  menuCategory: {
    fontSize: RFPercentage(1.3),
    color: '#777',
    marginVertical: 2,
    fontFamily: 'Poppins-Regular',
  },
  menuPrice: {
    fontSize: RFPercentage(1.8),
    color: '#01615F',
    fontFamily: 'Poppins-Medium',
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minusButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#01615F',
    borderRadius: 4,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#01615F',
    borderRadius: 4,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: RFPercentage(1.6),
    marginHorizontal: 10,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    backgroundColor: '#01615F',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: RFPercentage(1.4),
    fontFamily: 'Poppins-Regular',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#01615F',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
  },
});

export default AddMoreItems;