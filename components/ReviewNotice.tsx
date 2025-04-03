import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Policy: undefined;
  // Add other routes as needed
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ReviewNotice: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePolicyPress = () => {
    navigation.navigate('Policy');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Review your order and address details to avoid cancellations
      </Text>
      
      <View style={styles.innerContainer}>
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeLabel}>Note: </Text>
          <Text style={styles.noticeText}>
            Please ensure your address and order details are correct. This order, if cancelled, is non-refundable.
          </Text>
        </View>

        <TouchableOpacity 
          onPress={handlePolicyPress}
          activeOpacity={0.7}
        >
          <Text style={styles.policyButton}>READ POLICY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom:20,
  },
  heading: {
    fontSize: RFPercentage(2),
    fontFamily:'Poppins-SemiBold',
    color: '#000000',
    marginBottom: 12,
    lineHeight: 22,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  noticeContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 8,
  },
  noticeLabel: {
    fontSize: 14,
    color: '#01615F',
    fontFamily:'Poppins-SemiBold',
  },
  noticeText: {
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    color: '#929292',
    flex: 1,
    lineHeight: 20,
  },
  policyButton: {
    color: '#01615F',
    fontSize: 14,
    fontFamily:'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
});

export default ReviewNotice;
