// restaurant.interface.ts

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
  // Add document properties as needed
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