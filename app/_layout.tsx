import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import { LogBox } from 'react-native';

// Hide all warnings in the UI, but keep them in the terminal
LogBox.ignoreAllLogs();

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function RootLayout() {
  // Load fonts asynchronously using useFonts hook
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Itim-Regular.ttf'),
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  // Ensure fonts are loaded before rendering
  if (!fontsLoaded) {
    return null; // You can display a loading screen or spinner here
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
