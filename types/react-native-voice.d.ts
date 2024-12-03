// react-native-voice.d.ts
declare module 'react-native-voice' {
  export function start(language: string): Promise<void>;
  export function stop(): Promise<void>;
  export function destroy(): Promise<void>;
  export function onSpeechResults(callback: (event: any) => void): void;
  export function onSpeechError(callback: (error: any) => void): void;
  export function onSpeechStart(callback: () => void): void;
  export function onSpeechEnd(callback: () => void): void;
  export function removeAllListeners(): void;  // Add this line
}
