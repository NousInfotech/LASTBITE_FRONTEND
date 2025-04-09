import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function MoneyGifts() {
  // Handle the back button press
  const handleBackPress = () => {
    // Use router.back() for navigation
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Money & Gift cards</Text>
      </View>
      
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceTitle}>Available Balance</Text>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-circle-outline" size={20} color="#fff" />
          </View>
        </View>
        
        <Text style={styles.balanceAmount}>$0</Text>
        
        <Text style={styles.balanceDescription}>
          This balance can be used for all your orders across categories (food & indameni*)
        </Text>
        
        {/* Coins Image - Replacing with icon since image might be causing issues */}
        <View style={styles.coinsImageContainer}>
          <Ionicons name="cash-outline" size={60} color="#fff" style={styles.coinsIcon} />
        </View>
      </View>
      
      {/* Gift Card Option */}
      <View style={styles.giftCardSection}>
        <Text style={styles.giftCardTitle}>Spread joy with personalized e-gift cards!</Text>
        <Text style={styles.giftCardDescription}>
          Make every special occasion memorable with e-gift vouchers for your loved ones.
        </Text>
        
        <TouchableOpacity style={styles.buyVoucherButton}>
          <Text style={styles.buyVoucherText}>Buy a gift voucher</Text>
        </TouchableOpacity>
      </View>
      
      {/* Update Alert */}
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>Major update alert</Text>
        <Text style={styles.alertDescription}>
          HDFC bank Credit Card cashback will now credit directly in the statement.
        </Text>
      </View>
      
      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addBalanceButton}>
          <Text style={styles.addBalanceText}>Add Balance</Text>
        </TouchableOpacity>
        
        <View style={styles.redeemContainer}>
          <Text style={styles.redeemQuestion}>Have a gift voucher? </Text>
          <TouchableOpacity>
            <Text style={styles.redeemLink}>Redeem Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: '#00857A',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceTitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  infoIconContainer: {
    marginLeft: 6,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceDescription: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    opacity: 0.9,
    width: '70%',
  },
  coinsImageContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinsIcon: {
    opacity: 0.8,
  },
  giftCardSection: {
    marginTop: 20,
  },
  giftCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  giftCardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  buyVoucherButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 4,
  },
  buyVoucherText: {
    fontWeight: '500',
    color: '#333',
  },
  alertBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 13,
    color: '#555',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  addBalanceButton: {
    backgroundColor: '#00857A',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  addBalanceText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  redeemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redeemQuestion: {
    color: '#555',
    fontSize: 14,
  },
  redeemLink: {
    color: '#00857A',
    fontSize: 14,
    fontWeight: '500',
  },
});