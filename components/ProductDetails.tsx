import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function ProductDetails() {
  const router = useRouter();
  const { name, price, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Image source={{ uri: image as string }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>₹{price}</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit.
      </Text>

      <View style={styles.details}>
        <Text style={styles.detailTitle}>Product details</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Category:</Text> Fruits</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Seller:</Text> Fresh Farm Organics</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Country:</Text> India</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Storage:</Text> Keep in a cool, dry place.</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Delivery:</Text> 1-2 days</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  back: { marginBottom: 10 },
  backText: { fontSize: RFPercentage(3), color: '#000' },
  image: { width: '100%', height: 200, resizeMode: 'contain', borderRadius: 12 },
  name: { fontSize: RFPercentage(3), fontWeight: '600', marginTop: 12 },
  price: { fontSize: RFPercentage(2.5), color: '#01615F', marginVertical: 4 },
  description: { fontSize: RFPercentage(2), color: '#666' },
  details: { marginTop: 20 },
  detailTitle: { fontSize: RFPercentage(2.2), fontWeight: '600', marginBottom: 8 },
  detail: { fontSize: RFPercentage(2), marginBottom: 6 },
  bold: { fontWeight: '600' },
});
