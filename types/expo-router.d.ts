// @types/expo-router.d.ts
import 'expo-router';

declare module 'expo-router' {
  interface Router {
    query: Record<string, string | undefined>;
  }
}
