import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface DeliveryInstruction {
  id: string;
  icon: React.ReactNode;
  text: string;
}

const instructions: DeliveryInstruction[] = [
  {
    id: '1',
    icon: <Entypo name="bell" size={24} color="#929292" />,
    text: 'Avoid\nringing bell',
  },
  {
    id: '2',
    icon: <FontAwesome5 name="door-open" size={24} color="#929292" />,
    text: 'Leave at\nthe door',
  },
  {
    id: '3',
    icon: <FontAwesome name="microphone" size={24} color="#929292" />,
    text: 'Directions\nto reach',
  },
  {
    id: '4',
    icon: <FontAwesome5 name="mobile" size={24} color="#929292" />,
    text: 'Avoid\ncalling',
  },
  {
    id: '5',
    icon: <FontAwesome5 name="shield-alt" size={24} color="#929292" />,
    text: 'Leave with\nsecurity',
  },
];

const DeliveryInstructions: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    ); // Toggle selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Instructions</Text>
      <ScrollView
        style={styles.instructionsContainer}
        horizontal
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
      >
        {instructions.map((instruction) => {
          const isActive = selectedIds.includes(instruction.id);
          return (
            <TouchableOpacity
              key={instruction.id}
              style={[
                styles.outerContainer,
                isActive && styles.activeContainer,
              ]}
              onPress={() => handleSelect(instruction.id)}
            >
              <View style={styles.instructionItem}>
                <View style={styles.iconContainer}>
                  {instruction.icon}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.instructionText}>{instruction.text}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  instructionsContainer: {},
  scrollContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  outerContainer: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 6,
    marginBottom: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeContainer: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  instructionItem: {
    position: 'relative',
    padding: 4,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  textContainer: {
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default DeliveryInstructions;
