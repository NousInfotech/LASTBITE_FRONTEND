export interface OtpRequest {
  phone: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  otp?: string;
  role?:string;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

export interface RestaurantDetails {
  ownerName: string;
  restaurantName: string;
  profilePhoto: string;
  shopNumber: string;
  address: string;
  complexName: string;
  pincode: string;
  emailAddress: string;
  mobileNumber: string;
  whatsappNumber: string;
  workingDays: string[];
  openingTime: string;
  closingTime: string;
  category: string;
  ownerPanNo: string;
  gstinNo: string;
  bankIfscCode: string;
  bankAccountNumber: string;
  fssaiCertificateNo: string;
  kindOfFood: string;
  cuisines: string[];
  packingCharges: number;
}

export interface CreateRestaurantResponse {
  success: boolean;
  message: string;
  data?: RestaurantDetails;
}

export interface AddGroceryPayload {
  image: string;
  itemName: string;
  quantity: number;
  price: number;
}

export interface AddGroceryResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    image: string;
    itemName: string;
    quantity: number;
    price: number;
  };
}

export interface GroceryItem {
  _id: string;
  itemName: string;
  price: number;
  available: boolean;
  quantity: string;
  image: string; 
}
