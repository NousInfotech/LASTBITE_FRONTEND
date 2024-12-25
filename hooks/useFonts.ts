import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    })();
  }, []);

  return fontsLoaded;
};

export default useFonts;
