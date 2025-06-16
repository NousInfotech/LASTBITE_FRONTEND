import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export interface DeliveryOption {
  id: string;
  type: string;
  time: string;
  description: string[];
  ecoInfo?: string;
}

export interface DeliveryTypeOptionProps extends DeliveryOption {
  isSelected: boolean;
  onPress: () => void;
}

const DeliveryTypeOption: React.FC<DeliveryTypeOptionProps> = ({
    type,
    description,
    time,
    ecoInfo,
    isSelected,
    onPress,
  }) => (
    <TouchableOpacity
      style={[styles.optionContainer, isSelected && styles.selectedOption]}
      onPress={onPress}
    >
      {/* Circle with tick when selected */}
      <View style={[styles.tickIndicator, isSelected && styles.selectedTickIndicator]}>
        {isSelected && <Text allowFontScaling={false}  style={styles.tick}>✔</Text>}
      </View>
      <View style={styles.contentContainer}>
        <Text allowFontScaling={false}  style={styles.optionTitle}>{type}</Text>
        <Text allowFontScaling={false}  style={styles.optionTime}>{time}</Text>
        <View style={styles.descriptionContainer}>
          {description.map((desc, index) => (
            <Text allowFontScaling={false}  key={index} style={styles.optionDescription}>
              • {desc}
            </Text>
          ))}
        </View>
        {ecoInfo && (
          <>
            <View style={styles.divider} />
            <Text allowFontScaling={false}  style={styles.ecoInfo}>{ecoInfo}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
  

const DeliveryTypeSelection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('eco');

  const options: DeliveryOption[] = [
    {
      id: 'standard',
      type: 'Standard',
      time: '25–30 mins',
      description: ['Recommended if you are in a hurry', 'Minimal order grouping'],
    },
    {
      id: 'eco',
      type: 'Eco Saver',
      time: '30–35 mins',
      description: ['Less fuel pollution by grouping orders'],
      ecoInfo: '8 tons CO2 saved daily',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <DeliveryTypeOption
              key={option.id}
              {...option}
              isSelected={selectedOption === option.id}
              onPress={() => setSelectedOption(option.id)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      marginTop: -10,
    },
    container: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    optionsContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    optionContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 12,
      padding: 16,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      minHeight: 180,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    selectedOption: {
      borderColor: '#01615F',
      borderWidth: 2,
    },
    // Circle with background color change when selected
    tickIndicator: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey', // Circle border
        alignItems: 'center',
        display: 'flex',  // Ensure it behaves like a flex container
      },
    selectedTickIndicator: {
      backgroundColor: '#01615F', // Filled circle background when selected
    },
    tick: {
      color: '#fff', // White tick when selected
      fontSize: 8,
      justifyContent: 'center',
        alignItems: 'center',
    },
    optionTitle: {
      fontSize: RFPercentage(2),
      color: '#444',
      fontWeight: '500',
      marginBottom: 4,
    },
    optionTime: {
      fontSize: RFPercentage(2.5),
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#000',
    },
    descriptionContainer: {
      flex: 1,
      marginBottom: 8,
    },
    optionDescription: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
      marginBottom: 4,
    },
    divider: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 8,
    },
    ecoInfo: {
      fontSize: 14,
      color: '#01615F',
      fontWeight: '500',
    },
  });
  
export default DeliveryTypeSelection;