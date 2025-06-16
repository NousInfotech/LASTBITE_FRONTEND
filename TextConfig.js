import { Text, TextInput } from 'react-native';

// Disable font scaling for all Text components
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

// Optional: also disable for TextInput if needed
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;
