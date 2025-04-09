// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const ProductDetail = () => {
//   const { name, price, image } = useLocalSearchParams();

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Back Icon */}
//       <TouchableOpacity style={styles.backIcon}>
//         <Icon name="arrow-left" size={24} color="#000" />
//       </TouchableOpacity>

//       {/* Product Image */}
//       <Image source={image as any} style={styles.image} />

//       <View style={styles.infoContainer}>
//         {/* Product Name */}
//         <Text style={styles.name}>{name}</Text>

//         {/* Price and Quantity */}
//         <View style={styles.row}>
//           <Text style={styles.price}>{price}</Text>
          
//           <View style={styles.quantityContainer}>
//   <Text style={styles.description}>
//     Lorem ipsum dolor sit amet consectetur.
//   </Text>

//   <View style={styles.row}>
//     <Text style={styles.quantityText}>Quantity (kg)</Text>
//     <TouchableOpacity style={styles.addButton}>
//       <Text style={styles.addButtonText}>Add</Text>
//     </TouchableOpacity>
//   </View>
// </View>
//         </View>
        
        
    

//         {/* Product Details */}
//         <Text style={styles.sectionHeader}>Product details</Text>

//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Category:</Text>
//           <Text style={styles.detailValue}>Fruits</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Seller:</Text>
//           <Text style={styles.detailValue}>Fresh Farm Organics</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Country of Origin:</Text>
//           <Text style={styles.detailValue}>India</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Storage:</Text>
//           <Text style={styles.detailValue}>
//             Keep in a cool, dry place or refrigerate for extended freshness.
//           </Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Delivery Time:</Text>
//           <Text style={styles.detailValue}>1-2 days</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ProductDetail;

// const styles = StyleSheet.create({
//   // container: {
//   //   padding: 16,
//   //   paddingBottom: 40,
//   //   backgroundColor: '#fff',
//   //   position: 'relative',
//   // },
//   // backIcon: {
//   //   position: 'absolute',
//   //   top: 20,
//   //   left: 16,
//   //   zIndex: 10,
//   // },
//   // image: {
//   //   width: '100%',
//   //   height: 230,
//   //   resizeMode: 'contain',
//   //   marginTop: 24,
//   //   marginBottom: 20,
//   //   alignSelf: 'center',
//   // },
//   // infoContainer: {
//   //   flex: 1,
//   // },
//   // name: {
//   //   fontSize: 18,
//   //   fontWeight: '600',
//   //   marginBottom: 10,
//   //   color: '#000',
//   // },
//   // row: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-between',
//   //   alignItems: 'flex-start',
//   //   marginBottom: 12,
//   // },
//   // price: {
//   //   fontSize: 18,
//   //   color: '#00A676',
//   //   fontWeight: 'bold',
//   // },
//   // quantityContainer: {
//   //   alignItems: 'flex-end',
//   // },
//   // description: {
//   //   fontSize: 14,
//   //   color: '#444',
//   //   marginBottom: 16,
//   // },

//   // sectionHeader: {
//   //   fontSize: 16,
//   //   fontWeight: '600',
//   //   marginBottom: 8,
//   //   color: '#000',
//   // },
//   // detailRow: {
//   //   flexDirection: 'row',
//   //   marginBottom: 6,
//   //   flexWrap: 'wrap',
//   // },
//   // detailLabel: {
//   //   width: 140,
//   //   fontSize: 14,
//   //   color: '#666',
//   //   fontWeight: '500',
//   // },
//   // detailValue: {
//   //   fontSize: 14,
//   //   color: '#000',
//   //   flex: 1,
//   // },
//   // topRow: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-between',
//   //   alignItems: 'flex-start',
//   //   marginBottom: 20,
//   // },
//   // leftInfo: {
//   //   flex: 1,
//   //   marginRight: 12,
//   // },
//   // quantityContainer: {
//   //   alignItems: 'flex-end',
//   // },
//   // quantityText: {
//   //   fontSize: 12,
//   //   color: '#666',
//   //   marginBottom: 6,
//   // },
//   // addButton: {
//   //   backgroundColor: '#00A676',
//   //   paddingHorizontal: 14,
//   //   paddingVertical: 6,
//   //   borderRadius: 6,
//   // },
//   // addButtonText: {
//   //   color: '#fff',
//   //   fontWeight: '500',
//   //   fontSize: 14,
//   // },

//   container: {
//     padding: 16,
//     paddingBottom: 40,
//     backgroundColor: '#fff',
//     position: 'relative',
//   },
//   backIcon: {
//     position: 'absolute',
//     top: 20,
//     left: 16,
//     zIndex: 10,
//   },
//   image: {
//     width: '100%',
//     height: 230,
//     resizeMode: 'contain',
//     marginTop: 24,
//     marginBottom: 20,
//     alignSelf: 'center',
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#000',
//   },
//   price: {
//     fontSize: 18,
//     color: '#00A676',
//     fontWeight: 'bold',
//   },

//   /** ✅ ADDED for new layout **/
//   description: {
//     fontSize: 13,
//     color: '#444',
//     marginBottom: 6,
//   },
//   quantityContainer: {
//     marginTop: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   quantityText: {
//     fontSize: 13,
//     color: '#555',
//   },
//   addButton: {
//     backgroundColor: '#00A676',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: 14,
//   },

//   /** Existing Details **/
//   sectionHeader: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#000',
//   },
//   detailRow: {
//     flexDirection: 'row',
//     marginBottom: 6,
//     flexWrap: 'wrap',
//   },
//   detailLabel: {
//     width: 140,
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   detailValue: {
//     fontSize: 14,
//     color: '#000',
//     flex: 1,
//   },
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 20,
//   },
//   leftInfo: {
//     flex: 1,
//     marginRight: 12,
//   },
// });















import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetail() {
  const {name, price, image} = useLocalSearchParams();
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
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
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
    color: '#333',
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
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
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