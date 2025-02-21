import { useMutation, useQuery,useQueryClient,UseQueryOptions } from "@tanstack/react-query";
import api from "./api";
import {
  OtpRequest,
  OtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  RestaurantDetails,
  CreateRestaurantResponse,
  AddGroceryPayload,
  AddGroceryResponse,
  GroceryItem,
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

const verifyOtp = async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const response = await api.post<VerifyOtpResponse>("/otp/verify-otp", data);
  return response.data;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};

// API function to create restaurant
const createRestaurant = async (data: RestaurantDetails): Promise<CreateRestaurantResponse> => {
  const response = await api.post<CreateRestaurantResponse>("/restaurantsDetails/create", data);
  return response.data;
};

// Custom hook for mutation
export const useCreateRestaurant = () => {
  return useMutation({
    mutationFn: createRestaurant,
  });
};


export const useAddGrocery = () => {
  return useMutation<AddGroceryResponse, Error, AddGroceryPayload>({
    mutationFn: async (newGrocery) => {
      const response = await api.post("/groceries/add", newGrocery);
      return response.data;
    },
  });
};

const fetchGroceries = async (): Promise<GroceryItem[]> => {
  const response = await api.get<GroceryItem[]>("/groceries/");
  return response.data;
};

export const useGroceries = () => {
  return useQuery({
    queryKey: ["groceries"],
    queryFn: fetchGroceries,
  });
};

export const useDeleteGrocery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_id: string) => {
      await api.delete(`/groceries/${_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceries"] }); // Refresh groceries list
    },
  });
};

export const useGrocery = (id: string, options?: Partial<UseQueryOptions<GroceryItem, Error>>) => {
  return useQuery<GroceryItem>({
    queryKey: ["grocery", id],
    queryFn: async () => {
      const response = await api.get(`/groceries/${id}`);
      return response.data;
    },
    enabled: !!id, // Prevents query from running if ID is not available
    ...(options ?? {}), // Merges additional options safely
  });
};
// Update grocery item
export const useUpdateGrocery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<GroceryItem> }) => {
      const response = await api.put(`/groceries/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceries"] }); // Refresh groceries list
    },
    onError: (error) => {
      console.error("Failed to update grocery:", error);
    },
  });
};