// HIDDEN FEATURE WORKING

// import AsyncStorage from '@react-native-async-storage/async-storage';

// export interface Restaurant {
//   restaurantId: string;
//   name: string;
//   details: string;
//   coverImage: string;
//   ratingCount: number;
//   ratingAverage: number;
//   categories: string[];
//   menu: string[];
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// const HIDDEN_RESTAURANTS_KEY = 'HIDDEN_RESTAURANTS';

// export const addToHiddenRestaurants = async (restaurant: Restaurant): Promise<void> => {
//   try {
//     // Get current hidden restaurants
//     const currentHiddenString = await AsyncStorage.getItem(HIDDEN_RESTAURANTS_KEY);
//     const currentHidden: Restaurant[] = currentHiddenString ? JSON.parse(currentHiddenString) : [];
    
//     // Check if already exists
//     if (!currentHidden.some(r => r.restaurantId === restaurant.restaurantId)) {
//       // Add to hidden restaurants
//       const updatedHidden = [...currentHidden, restaurant];
//       await AsyncStorage.setItem(HIDDEN_RESTAURANTS_KEY, JSON.stringify(updatedHidden));
//     }
//   } catch (error) {
//     console.error('Error adding restaurant to hidden:', error);
//   }
// };

// export const removeFromHiddenRestaurants = async (restaurantId: string): Promise<void> => {
//   try {
//     // Get current hidden restaurants
//     const currentHiddenString = await AsyncStorage.getItem(HIDDEN_RESTAURANTS_KEY);
//     const currentHidden: Restaurant[] = currentHiddenString ? JSON.parse(currentHiddenString) : [];
    
//     // Filter out the restaurant to unhide
//     const updatedHidden = currentHidden.filter(r => r.restaurantId !== restaurantId);
//     await AsyncStorage.setItem(HIDDEN_RESTAURANTS_KEY, JSON.stringify(updatedHidden));
//   } catch (error) {
//     console.error('Error removing restaurant from hidden:', error);
//   }
// };

// export const getHiddenRestaurants = async (): Promise<Restaurant[]> => {
//   try {
//     const hiddenString = await AsyncStorage.getItem(HIDDEN_RESTAURANTS_KEY);
//     return hiddenString ? JSON.parse(hiddenString) : [];
//   } catch (error) {
//     console.error('Error getting hidden restaurants:', error);
//     return [];
//   }
// };

// export const isRestaurantHidden = async (restaurantId: string): Promise<boolean> => {
//   try {
//     const hidden = await getHiddenRestaurants();
//     return hidden.some(r => r.restaurantId === restaurantId);
//   } catch (error) {
//     console.error('Error checking if restaurant is hidden:', error);
//     return false;
//   }
// };









import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Restaurant {
  restaurantId: string;
  name: string;
  details: string;
  coverImage: string;
  ratingCount: number;
  ratingAverage: number;
  categories: string[];
  menu: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Keys for AsyncStorage
const HIDDEN_RESTAURANTS_KEY = 'HIDDEN_RESTAURANTS';
const FAVORITE_RESTAURANTS_KEY = 'FAVORITE_RESTAURANTS';

// Hidden restaurants functionality (existing code)
export const addToHiddenRestaurants = async (restaurant: Restaurant): Promise<void> => {
  try {
    // Get current hidden restaurants
    const currentHiddenString = await AsyncStorage.getItem(HIDDEN_RESTAURANTS_KEY);
    const currentHidden: Restaurant[] = currentHiddenString ? JSON.parse(currentHiddenString) : [];
    
    // Check if already exists
    if (!currentHidden.some(r => r.restaurantId === restaurant.restaurantId)) {
      // Add to hidden restaurants
      const updatedHidden = [...currentHidden, restaurant];
      await AsyncStorage.setItem(HIDDEN_RESTAURANTS_KEY, JSON.stringify(updatedHidden));
    }
  } catch (error) {
    console.error('Error adding restaurant to hidden:', error);
  }
};

export const removeFromHiddenRestaurants = async (restaurantId: string): Promise<void> => {
  try {
    // Get current hidden restaurants
    const currentHiddenString = await AsyncStorage.getItem(HIDDEN_RESTAURANTS_KEY);
    const currentHidden: Restaurant[] = currentHiddenString ? JSON.parse(currentHiddenString) : [];
    
    // Filter out the restaurant to unhide
    const updatedHidden = currentHidden.filter(r => r.restaurantId !== restaurantId);
    await AsyncStorage.setItem(HIDDEN_RESTAURANTS_KEY, JSON.stringify(updatedHidden));
  } catch (error) {
    console.error('Error removing restaurant from hidden:', error);
  }
};

export const getHiddenRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const hiddenString = await AsyncStorage.getItem(HIDDEN_RESTAURANTS_KEY);
    return hiddenString ? JSON.parse(hiddenString) : [];
  } catch (error) {
    console.error('Error getting hidden restaurants:', error);
    return [];
  }
};

export const isRestaurantHidden = async (restaurantId: string): Promise<boolean> => {
  try {
    const hidden = await getHiddenRestaurants();
    return hidden.some(r => r.restaurantId === restaurantId);
  } catch (error) {
    console.error('Error checking if restaurant is hidden:', error);
    return false;
  }
};

// Favorite restaurants functionality (new code)
export const addToFavoriteRestaurants = async (restaurant: Restaurant): Promise<void> => {
  try {
    // Get current favorite restaurants
    const currentFavoritesString = await AsyncStorage.getItem(FAVORITE_RESTAURANTS_KEY);
    const currentFavorites: Restaurant[] = currentFavoritesString ? JSON.parse(currentFavoritesString) : [];
    
    // Check if already exists
    if (!currentFavorites.some(r => r.restaurantId === restaurant.restaurantId)) {
      // Add to favorite restaurants
      const updatedFavorites = [...currentFavorites, restaurant];
      await AsyncStorage.setItem(FAVORITE_RESTAURANTS_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error adding restaurant to favorites:', error);
  }
};

export const removeFromFavoriteRestaurants = async (restaurantId: string): Promise<void> => {
  try {
    // Get current favorite restaurants
    const currentFavoritesString = await AsyncStorage.getItem(FAVORITE_RESTAURANTS_KEY);
    const currentFavorites: Restaurant[] = currentFavoritesString ? JSON.parse(currentFavoritesString) : [];
    
    // Filter out the restaurant to remove from favorites
    const updatedFavorites = currentFavorites.filter(r => r.restaurantId !== restaurantId);
    await AsyncStorage.setItem(FAVORITE_RESTAURANTS_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing restaurant from favorites:', error);
  }
};

export const getFavoriteRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const favoritesString = await AsyncStorage.getItem(FAVORITE_RESTAURANTS_KEY);
    return favoritesString ? JSON.parse(favoritesString) : [];
  } catch (error) {
    console.error('Error getting favorite restaurants:', error);
    return [];
  }
};

export const isRestaurantFavorite = async (restaurantId: string): Promise<boolean> => {
  try {
    const favorites = await getFavoriteRestaurants();
    return favorites.some(r => r.restaurantId === restaurantId);
  } catch (error) {
    console.error('Error checking if restaurant is favorite:', error);
    return false;
  }
};