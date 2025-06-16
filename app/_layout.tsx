// app/_layout.tsx or app/layout.tsx (your RootLayout)
import '../TextConfig';
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import { LogBox } from 'react-native';
import { useEffect } from "react";

LogBox.ignoreAllLogs();
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Itim-Regular.ttf'),
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      // Load assets/fonts or any setup here
      // await someSetupFunction(); // optional

      // Hide splash when ready
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
