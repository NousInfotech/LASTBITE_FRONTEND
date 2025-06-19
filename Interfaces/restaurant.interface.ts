import { IFoodItem } from "@/Interfaces/foodItem.interface";

export interface IAddressGeo {
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  no: string;
  street: string;
  area: string;
  city: string;
  state: string;
  country: string;
  fullAddress: string;
  tag?: string;
}

export interface IDocuments {
  [key: string]: any;
}

export interface ITimings {
  day: Days;
  shifts: {
    start: string;
    end: string;
  }[];
}

export interface IRestaurant {
  restaurantId?: string;
  restaurantName: string;
  address: IAddressGeo;
  documents: IDocuments;
  timings: ITimings[];
  tags: string[];
  cuisines?: string[];
  typeOfFood?: FoodType[];
  profilePhoto?: string;
  isActive?: boolean;
  availableCategories?: string[]; // e.g., ["biryani", "noodles", "desserts"]
  rating?: number; // from 1.0 to 5.0
  createdAt?: Date;
  updatedAt?: Date;
}





export interface INutritionInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
}

export enum FoodType {
  VEG = "veg",
  NON_VEG = "non_veg",
  HALAL = "halal",
  VEGAN = "vegan",
  KOSHER = "kosher",
  GLUTEN_FREE = "gluten_free",
  JAIN = "jain",
  EGGETARIAN = "eggetarian",
  SEAFOOD = "seafood",
  ORGANIC = "organic"
}

export enum Days {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}

export enum SpiceLevel {
  MILD = "mild",
  MEDIUM = "medium",
  HOT = "hot",
  EXTRA_HOT = "extra_hot"
}

// API Response interfaces
export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface IRestaurantListResponse {
  restaurants: IRestaurant[];
  total: number;
  page?: number;
  limit?: number;
}

export interface IFoodItemListResponse {
  foodItems: IFoodItem[];
  total: number;
  page?: number;
  limit?: number;
}

// Search and filter interfaces
export interface ISearchParams {
  query?: string;
  category?: string;
  cuisines?: string[];
  typeOfFood?: FoodType[];
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  isAvailable?: boolean;
  sortBy?: 'rating' | 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}