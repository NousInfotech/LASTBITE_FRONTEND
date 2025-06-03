import React from 'react';
import { View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import AddMoreItems from '../app/Screens/AddMoreItems';

// Define the route params type
type AddMoreItemsParams = {
  items: any[]; // Replace 'any' with the correct item type
  updateItems: (newItems: any[]) => void;
};

const AddMoreItemsScreen = () => {
  // Provide type for route params
  const route = useRoute<RouteProp<Record<string, AddMoreItemsParams>, string>>();

  const params = route.params ?? { items: [], updateItems: () => {} };
  const { items = [], updateItems = () => {} } = params;

  return (
    <View style={{ flex: 1 }}>
      <AddMoreItems
        items={items}
        setItems={(newItems: any[]) => {
          updateItems(newItems);
        }}
      />
    </View>
  );
};

export default AddMoreItemsScreen;
