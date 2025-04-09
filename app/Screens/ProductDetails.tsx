import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetail() {
  const {name, price, image} = useLocalSearchParams();
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={image as any}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Info Section */}
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoHeader}>
            <View>
              <Text style={styles.productTitle}>{name}</Text>
              <Text style={styles.productPrice}>{price}</Text>
              <Text style={styles.productDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
            <View>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>Quantity (kg)</Text>
                {quantity === 0 ? (
                  <TouchableOpacity style={styles.addButton} onPress={incrementQuantity}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.counterContainer}>
                    <TouchableOpacity style={styles.counterButton} onPress={decrementQuantity}>
                      <Text style={styles.counterButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{quantity}</Text>
                    <TouchableOpacity style={styles.counterButton} onPress={incrementQuantity}>
                      <Text style={styles.counterButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Product details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category:</Text>
              <Text style={styles.detailValue}>Fruits</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Seller:</Text>
              <Text style={styles.detailValue}>Fresh Farm Organics</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Country of Origin:</Text>
              <Text style={styles.detailValue}></Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Storage:</Text>
              <Text style={styles.detailValue}>Keep it cool, dry place or refrigerate for longevity</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivery Time:</Text>
              <Text style={styles.detailValue}>1-2 days</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    marginTop: 10,
    padding: 8,
  },
  imageContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  productImage: {
    width: 250,
    height: 250,
  },
  productInfoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  productInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#01615F',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
    maxWidth: '80%',
  },
  quantityContainer: {
    alignItems: 'flex-end',
  },
  quantityText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: "#01615F",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#01615F',
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterText: {
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  detailsContainer: {
    marginTop: 24,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    width: '40%',
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});