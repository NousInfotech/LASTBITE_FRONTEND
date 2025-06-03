import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the user data interface
export interface UserData {
  name: string;
  email: string;
  phone: string;
}

// Default user data
const defaultUserData: UserData = {
  name: "John Daron",
  email: "",
  phone: "+91 91234 65891",
};

// Create a module-level variable to hold the current data
let currentUserData: UserData = { ...defaultUserData };
// Create a list of listeners to notify when data changes
const listeners: ((data: UserData) => void)[] = [];

// Save data to AsyncStorage
const saveUserData = async (data: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Load data from AsyncStorage
const loadUserData = async (): Promise<UserData> => {
  try {
    const data = await AsyncStorage.getItem('userData');
    if (data) {
      const parsedData: UserData = JSON.parse(data);
      currentUserData = parsedData;
      notifyListeners();
      return parsedData;
    }
    return defaultUserData;
  } catch (error) {
    console.error('Error loading user data:', error);
    return defaultUserData;
  }
};

// Update user data
export const updateUserData = (field: keyof UserData, value: string): UserData => {
  currentUserData = {
    ...currentUserData,
    [field]: value
  };
  
  // Save to AsyncStorage
  saveUserData(currentUserData);
  
  // Notify all listeners
  notifyListeners();
  
  return currentUserData;
};

// Get the current user data
export const getUserData = (): UserData => {
  return { ...currentUserData };
};

// Initialize by loading from storage
loadUserData();

// Notify all listeners when data changes
const notifyListeners = (): void => {
  listeners.forEach(listener => listener(currentUserData));
};

// Hook to use the user data in components
export const useUserData = (): UserData => {
  const [userData, setUserData] = useState<UserData>(currentUserData);
  
  useEffect(() => {
    // Add a listener
    const listener = (data: UserData): void => {
      setUserData({ ...data });
    };
    
    listeners.push(listener);
    
    // Initial load
    loadUserData().then(data => {
      setUserData({ ...data });
    });
    
    // Cleanup
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);
  
  return userData;
};