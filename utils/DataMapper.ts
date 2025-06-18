import { IRestaurant, FoodType } from '@/Interfaces/restaurant.interface';

// Interface for the existing Restaurant component
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
  veg: boolean;
  nonVeg: boolean;
  vegan: boolean;
}

export class DataMapper {
  // Map API response to component interface
  static mapIRestaurantToRestaurant(apiRestaurant: IRestaurant): Restaurant {
    console.log('Mapping API restaurant to component interface:', apiRestaurant);
    
    // Helper function to determine food types
    const hasVeg = apiRestaurant.typeOfFood?.includes(FoodType.VEG) || false;
    const hasNonVeg = apiRestaurant.typeOfFood?.includes(FoodType.NON_VEG) || false;
    const hasVegan = apiRestaurant.typeOfFood?.includes(FoodType.VEGAN) || false;
    
    // Create details string from address
    const details = `${apiRestaurant.address?.area || 'Unknown area'}, ${apiRestaurant.address?.city || 'Unknown city'}`;
    
    const mappedRestaurant: Restaurant = {
      restaurantId: apiRestaurant.restaurantId || '',
      name: apiRestaurant.restaurantName || 'Unknown Restaurant',
      details: details,
      coverImage: apiRestaurant.profilePhoto || 'https://www.seasonsandsuppers.ca/wp-content/uploads/2019/10/slow-cooker-pulled-pork-1200.jpg',
      ratingCount: Math.floor(Math.random() * 300) + 50, // Default random count since not in API
      ratingAverage: apiRestaurant.rating || 4.0,
      categories: apiRestaurant.availableCategories || apiRestaurant.cuisines || ['Restaurant'],
      menu: ['m1', 'm2', 'm3'], // Default menu items since not in API
      isActive: apiRestaurant.isActive !== false, // Default to true if not specified
      createdAt: apiRestaurant.createdAt?.toString() || new Date().toISOString(),
      updatedAt: apiRestaurant.updatedAt?.toString() || new Date().toISOString(),
      veg: hasVeg,
      nonVeg: hasNonVeg,
      vegan: hasVegan,
    };
    
    console.log('Mapped restaurant:', mappedRestaurant);
    return mappedRestaurant;
  }

  // Map array of API restaurants
  static mapIRestaurantsToRestaurants(apiRestaurants: IRestaurant[]): Restaurant[] {
    console.log('Mapping array of API restaurants:', apiRestaurants);
    
    const mappedRestaurants = apiRestaurants.map(restaurant => 
      this.mapIRestaurantToRestaurant(restaurant)
    );
    
    console.log('Mapped restaurants array:', mappedRestaurants);
    return mappedRestaurants;
  }
}