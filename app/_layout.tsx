import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import '../global.css';

export default function RootLayout() {
  // Load fonts asynchronously using useFonts hook
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Itim-Regular.ttf'), // Outfit font
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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
