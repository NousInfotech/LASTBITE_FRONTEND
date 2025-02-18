import { useMutation } from "@tanstack/react-query";
import api from "./api";
import {
  OtpRequest,
  OtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  RestaurantDetails,
  CreateRestaurantResponse,
} from "./types";

const sendOtp = async (data: OtpRequest): Promise<OtpResponse> => {
  const response = await api.post<OtpResponse>("/otp/send-otp", data);
  return response.data;
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
  });
};

const verifyOtp = async (
  data: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
  const response = await api.post<VerifyOtpResponse>("/otp/verify-otp", data);
  return response.data;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};

// API function to create restaurant
const createRestaurant = async (
  data: RestaurantDetails
): Promise<CreateRestaurantResponse> => {
  const response = await api.post<CreateRestaurantResponse>(
    "/restaurantsDetails/create",
    data
  );
  return response.data;
};

// Custom hook for mutation
export const useCreateRestaurant = () => {
  return useMutation({
    mutationFn: createRestaurant,
  });
};
