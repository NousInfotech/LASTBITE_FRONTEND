// BackButton.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from 'expo-router';

const GoBack: React.FC = () => {
  const navigation = useNavigation();

  const handleBack = (): void => {
    navigation.goBack(); // This will take the user back to the previous screen
  };

  return (
    <TouchableOpacity 
      onPress={handleBack} 
      style={{ padding: 8, marginLeft: -8 }}
      activeOpacity={0.7}
    >
      <Icon name="arrow-left" size={24} color="#333" />
    </TouchableOpacity>
  );
};

export default GoBack;
