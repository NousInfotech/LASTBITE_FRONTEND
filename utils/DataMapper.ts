import { IRestaurant, FoodType } from '@/Interfaces/restaurant.interface';

export class DataMapper {
  // Since you want to use only IRestaurant, this class just validates and returns the same structure
  static mapIRestaurantToRestaurant(apiRestaurant: IRestaurant): IRestaurant {
    console.log('Processing API restaurant:', apiRestaurant);
    
    // Just return the same IRestaurant with any missing defaults filled in
    return {
      ...apiRestaurant,
      restaurantId: apiRestaurant.restaurantId || '',
      restaurantName: apiRestaurant.restaurantName || 'Unknown Restaurant',
      isActive: apiRestaurant.isActive !== false,
      rating: apiRestaurant.rating || 4.0,
      availableCategories: apiRestaurant.availableCategories || apiRestaurant.cuisines || ['Restaurant'],
      typeOfFood: apiRestaurant.typeOfFood || [FoodType.VEG], // Default to VEG if not specified
      createdAt: apiRestaurant.createdAt || new Date(),
      updatedAt: apiRestaurant.updatedAt || new Date(),
    };
  }

  // Map array of API restaurants
  static mapIRestaurantsToRestaurants(apiRestaurants: IRestaurant[]): IRestaurant[] {
    console.log('Processing array of API restaurants:', apiRestaurants);
    
    return apiRestaurants.map(restaurant => 
      this.mapIRestaurantToRestaurant(restaurant)
    );
  }
}