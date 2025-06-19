import { IFoodItem } from "@/Interfaces/foodItem.interface";

const BASE_URL = 'http://192.168.29.72:5000/food-item'; // Adjust this to match your API endpoint

// Add this interface for the API response structure
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export class FoodItemApiService {
  // Get all food items
  static async getAllFoodItems(limit?: number, page?: number): Promise<IFoodItem[]> {
    try {
      console.log('API Call: Getting all food items');
      console.log('Parameters:', { limit, page });
      
      let url = BASE_URL;
      const params = new URLSearchParams();
      
      if (limit) params.append('limit', limit.toString());
      if (page) params.append('page', page.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the API response with proper typing
      const apiResponse: ApiResponse<IFoodItem[]> = await response.json();
      console.log('API Response Data:', apiResponse);
      
      // Check if the response is successful and has data
      if (apiResponse.success && apiResponse.data) {
        console.log('Extracting data array from API response');
        return apiResponse.data; // Return just the data array
      } else {
        console.error('API response indicates failure:', apiResponse.message);
        throw new Error(apiResponse.message || 'API request failed');
      }
      
    } catch (error) {
      console.error('Error fetching food items:', error);
      throw error;
    }
  }

  // Get food item by ID
  static async getFoodItemById(foodItemId: string): Promise<IFoodItem> {
    try {
      console.log('API Call: Getting food item by ID');
      console.log('Food Item ID:', foodItemId);
      
      const url = `${BASE_URL}/${foodItemId}`;
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response Status:', response.status);
      
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the API response - assuming single food item also follows same pattern
      const apiResponse: ApiResponse<IFoodItem> = await response.json();
      console.log('API Response Data:', apiResponse);
      
      // Check if the response is successful and has data
      if (apiResponse.success && apiResponse.data) {
        return apiResponse.data; // Return just the data
      } else {
        console.error('API response indicates failure:', apiResponse.message);
        throw new Error(apiResponse.message || 'API request failed');
      }
      
    } catch (error) {
      console.error('Error fetching food item by ID:', error);
      throw error;
    }
  }

  // Get food items by restaurant ID
  static async getFoodItemsByRestaurantId(restaurantId: string, limit?: number, page?: number): Promise<IFoodItem[]> {
    try {
      console.log('API Call: Getting food items by restaurant ID');
      console.log('Restaurant ID:', restaurantId);
      console.log('Parameters:', { limit, page });
      
      let url = `${BASE_URL}/restaurant/${restaurantId}`;
      const params = new URLSearchParams();
      
      if (limit) params.append('limit', limit.toString());
      if (page) params.append('page', page.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response Status:', response.status);
      
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the API response with proper typing
      const apiResponse: ApiResponse<IFoodItem[]> = await response.json();
      console.log('API Response Data:', apiResponse);
      
      // Check if the response is successful and has data
      if (apiResponse.success && apiResponse.data) {
        console.log('Extracting data array from API response');
        return apiResponse.data; // Return just the data array
      } else {
        console.error('API response indicates failure:', apiResponse.message);
        throw new Error(apiResponse.message || 'API request failed');
      }
      
    } catch (error) {
      console.error('Error fetching food items by restaurant ID:', error);
      throw error;
    }
  }

  // Search food items by name or description
  static async searchFoodItems(searchQuery: string, limit?: number, page?: number): Promise<IFoodItem[]> {
    try {
      console.log('API Call: Searching food items');
      console.log('Search Query:', searchQuery);
      console.log('Parameters:', { limit, page });
      
      let url = `${BASE_URL}/search`;
      const params = new URLSearchParams();
      
      params.append('q', searchQuery);
      if (limit) params.append('limit', limit.toString());
      if (page) params.append('page', page.toString());
      
      url += `?${params.toString()}`;
      
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response Status:', response.status);
      
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the API response with proper typing
      const apiResponse: ApiResponse<IFoodItem[]> = await response.json();
      console.log('API Response Data:', apiResponse);
      
      // Check if the response is successful and has data
      if (apiResponse.success && apiResponse.data) {
        console.log('Extracting data array from API response');
        return apiResponse.data; // Return just the data array
      } else {
        console.error('API response indicates failure:', apiResponse.message);
        throw new Error(apiResponse.message || 'API request failed');
      }
      
    } catch (error) {
      console.error('Error searching food items:', error);
      throw error;
    }
  }

  // Get food items by category
  static async getFoodItemsByCategory(category: string, limit?: number, page?: number): Promise<IFoodItem[]> {
    try {
      console.log('API Call: Getting food items by category');
      console.log('Category:', category);
      console.log('Parameters:', { limit, page });
      
      let url = `${BASE_URL}/category/${encodeURIComponent(category)}`;
      const params = new URLSearchParams();
      
      if (limit) params.append('limit', limit.toString());
      if (page) params.append('page', page.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response Status:', response.status);
      
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the API response with proper typing
      const apiResponse: ApiResponse<IFoodItem[]> = await response.json();
      console.log('API Response Data:', apiResponse);
      
      // Check if the response is successful and has data
      if (apiResponse.success && apiResponse.data) {
        console.log('Extracting data array from API response');
        return apiResponse.data; // Return just the data array
      } else {
        console.error('API response indicates failure:', apiResponse.message);
        throw new Error(apiResponse.message || 'API request failed');
      }
      
    } catch (error) {
      console.error('Error fetching food items by category:', error);
      throw error;
    }
  }
}