import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AddMoreItems from '../app/Screens/AddMoreItems'

// This is a wrapper component that will be used as the screen in navigation
const AddMoreItemsScreen = () => {
  const route = useRoute();
  const params = route.params || { items: [], updateItems: () => {} };
  const { items = [], updateItems = () => {} } = params;
  
  return (
    <View style={{ flex: 1 }}>
      <AddMoreItems 
        items={items} 
        setItems={(newItems) => {
          // Call the update function passed through navigation
          updateItems(newItems);
        }}
      />
    </View>
  );
};

export default AddMoreItemsScreen;

