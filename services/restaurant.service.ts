import { IRestaurant } from "@/Interfaces/restaurant.interface";

const BASE_URL = 'http://192.168.29.72:5000/restaurant';

// Add this interface for the API response structure
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export class RestaurantApiService {
  // Get all restaurants
  static async getAllRestaurants(limit?: number, page?: number): Promise<IRestaurant[]> {
    try {
      console.log('API Call: Getting all restaurants');
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
      const apiResponse: ApiResponse<IRestaurant[]> = await response.json();
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
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  }

  // Get restaurant by ID
  static async getRestaurantById(restaurantId: string): Promise<IRestaurant> {
    try {
      console.log('API Call: Getting restaurant by ID');
      console.log('Restaurant ID:', restaurantId);
      
      const url = `${BASE_URL}/${restaurantId}`;
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
      
      // Parse the API response - assuming single restaurant also follows same pattern
      const apiResponse: ApiResponse<IRestaurant> = await response.json();
      console.log('API Response Data:', apiResponse);
      
      // Check if the response is successful and has data
      if (apiResponse.success && apiResponse.data) {
        return apiResponse.data; // Return just the data
      } else {
        console.error('API response indicates failure:', apiResponse.message);
        throw new Error(apiResponse.message || 'API request failed');
      }
      
    } catch (error) {
      console.error('Error fetching restaurant by ID:', error);
      throw error;
    }
  }
}