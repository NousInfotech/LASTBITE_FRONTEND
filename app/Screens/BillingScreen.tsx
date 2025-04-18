import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import GoBack from "@/components/GoBack";
import DeliveryTypeSelection from "@/components/DeliveryTypeSelector";
import DeliveryPopup from "@/components/DeliveryPopup";
import * as Font from "expo-font";
import DelieveryInstruction from "@/components/DeliveryInstructions";
import { MaterialIcons } from "@expo/vector-icons";
import CouponModal from "@/components/Coupon";
import { RFPercentage } from "react-native-responsive-fontsize";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

const BillingScreen = () => {
  const router = useRouter();
  const { cart, restaurantName, restaurantId } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedInstructions, setSelectedInstructions] = useState<string[]>(
    []
  );
  const [deliveryFee, setDeliveryFee] = useState<number>(50); // Example fee
  const [platformFee, setPlatformFee] = useState<number>(30); // Example fee
  const [gstPercentage, setGstPercentage] = useState<number>(5); // GST as a percentage
  const [restaurantCharges, setRestaurantCharges] = useState<number>(20);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const calculateGST = (amount: number) => (amount * gstPercentage) / 100;

  const calculateTotal = () => {
    const gstAmount = calculateGST(totalAmount);
    return (
      totalAmount + deliveryFee + platformFee + gstAmount + restaurantCharges
    );
  };

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("./../../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("./../../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("./../../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };
    loadFonts();
  }, []);
  useEffect(() => {
    if (cart) {
      try {
        const cartString = Array.isArray(cart) ? cart[0] : cart;
        const cartData: CartItem[] = JSON.parse(cartString);
        setCartItems(cartData);

        const total = cartData.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, [cart]);
  const navigateToAddMoreItems = () => {
    router.push({
      pathname: "./AddMoreItems",
      params: {
        restaurantId: restaurantId || "default-id",
        restaurantName: restaurantName || "default-name",
      },
    });
  };

  useEffect(() => {
    if (cart) {
      try {
        const cartString = Array.isArray(cart) ? cart[0] : cart;
        const cartData: CartItem[] = JSON.parse(cartString);
        setCartItems(cartData);

        const total = cartData.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, [cart]);

  const handleQuantityChange = (
    index: number,
    action: "increment" | "decrement"
  ) => {
    const updatedCartItems = [...cartItems];
    const item = updatedCartItems[index];

    if (action === "increment") {
      item.quantity += 1;
    } else if (action === "decrement") {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        updatedCartItems.splice(index, 1);
      }
    }

    setCartItems(updatedCartItems);
    updateTotalAmount(updatedCartItems);

    if (updatedCartItems.length === 0) {
      router.back();
    }
  };

  const updateTotalAmount = (updatedCartItems: CartItem[]) => {
    const total = updatedCartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const renderCartItem = ({
    item,
    index,
  }: {
    item: CartItem;
    index: number;
  }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemText}>{item.name}</Text>

      <View style={styles.quantityControls}>
        <QuantityButton
          onPress={() => handleQuantityChange(index, "decrement")}
          label="-"
        />
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <QuantityButton
          onPress={() => handleQuantityChange(index, "increment")}
          label="+"
        />
      </View>

      <Text style={styles.cartItemPrice}>
        ${(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  const QuantityButton = ({
    onPress,
    label,
  }: {
    onPress: () => void;
    label: string;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const SavingsCorner = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCouponApplied, setIsCouponApplied] = useState(false);

    const handleApplyCoupon = () => {
      setIsCouponApplied(true);
    };

    return (
      <View style={styles.savingsCornerContainer}>
        <Text style={styles.savingsCornerText}>SAVINGS CORNER</Text>

        <TouchableOpacity style={styles.applyCouponContainer}>
          <Image
            source={require("./../../assets/images/coupon.png")}
            style={styles.couponImage}
          />

          <View style={styles.textContainer}>
            <Text style={styles.applyCouponText}>Save $150 on this order</Text>
            <TouchableOpacity onPress={() => router.push("./ApplyCoupon")}>
              <View style={styles.viewAllContainer}>
                <Text style={styles.viewAllText}>View all coupons</Text>
                <MaterialIcons name="chevron-right" size={16} color="#01615F" />
              </View>
            </TouchableOpacity>
          </View>

          {!isCouponApplied ? (
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.applyButtonText}>APPLY</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.appliedContainer}>
              <MaterialIcons name="check-circle" size={20} color="#01615F" />
              <Text style={styles.appliedText}>APPLIED</Text>
            </View>
          )}
        </TouchableOpacity>

        <CouponModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onApply={handleApplyCoupon}
        />
      </View>
    );
  };

  const AddMoreButton = () => {
    const router = useRouter();
    return (
      <TouchableOpacity
        style={styles.addMoreButton}
        onPress={navigateToAddMoreItems}
      >
        <Text style={styles.addMoreButtonText}>+ Add More Items</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{restaurantName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cartListContainer}>
          <ScrollView>
            {cartItems.map((item, index) => (
              <View key={`${item.name}-${index}`}>
                {renderCartItem({ item, index })}
              </View>
            ))}
          </ScrollView>

          <AddMoreButton />
        </View>

        {/* <View style={styles.simpleContainer}>
          <Text style={styles.completeMealText}>COMPLETE YOUR MEAL</Text>
        </View> */}

        <SavingsCorner />

        {/* Delivery Type Section */}
        <View style={styles.Delivery}>
          <Text style={styles.DelieveryText}>Delivery Type</Text>
          <Text style={styles.DelieverySubText}>
            Your food will always be fresh!
          </Text>
        </View>
        <DeliveryTypeSelection />
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>Delivery Instructions</Text>
          <DelieveryInstruction />
        </View>
        <View style={styles.billSection}>
          <Text style={styles.billTitle}>Bill Details</Text>
        </View>
        <View style={styles.billContainer}>
          <View style={styles.billItem}>
            <Text style={styles.billText}>Item Total</Text>
            <Text style={styles.billText}>${totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.billText}>Delivery Fee || 11.0 Kms</Text>
            <Text style={styles.billText}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.billText}>Platform Fee</Text>
            <Text style={styles.billText}>${platformFee.toFixed(2)}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.billText}>GST ({gstPercentage}%)</Text>
            <Text style={styles.billText}>
              ${calculateGST(totalAmount).toFixed(2)}
            </Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.billText}>Restaurant Charges</Text>
            <Text style={styles.billText}>${restaurantCharges.toFixed(2)}</Text>
          </View>
          <View style={styles.billTotal}>
            <Text style={styles.totaltoText}>To Pay</Text>
            <Text style={styles.totaltoText}>
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.billSection}>
          <Text style={styles.billTitle}>
            Review your order and address details to avoid cancellations
          </Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.noteText}>
            <Text style={styles.boldText}>Note:</Text> Please ensure your
            address and order details are correct. This order, if cancelled, is
            non-refundable.
          </Text>
        </View>
      </ScrollView>
      {showPopup && <DeliveryPopup />}
    </SafeAreaView>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 15,
    marginLeft: 10,
    fontFamily: "Poppins-SemiBold",
  },
  cartListContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    // marginTop: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cartItemText: {
    fontSize: RFPercentage(2),
    flex: 2,
    fontFamily: "Poppins-Medium",
  },
  cartItemPrice: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    flex: 1,
    textAlign: "right",
  },
  quantityControls: {
    marginLeft: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  quantityText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
  },
  button: {
    backgroundColor: "#01615F",
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 20,
  },
  totalText: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  addMoreButton: {
    marginLeft: 10,
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  addMoreButtonText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
  },
  simpleContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },

  completeMealText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 2,
  },

  savingsCornerContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  savingsCornerText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
    color: "#000",
  },
  applyCouponContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
  },
  couponImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  applyCouponText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
    // color: '#01615F',
    marginBottom: 4,
  },
  viewAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: RFPercentage(1.3),
    fontFamily: "Poppins-Medium",
    color: "#7a7a7a",
    marginRight: 2,
  },
  applyButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#01615F",
    marginLeft: 12,
  },
  applyButtonText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
  appliedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  appliedText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    marginLeft: 4,
  },
  Delivery: {
    marginTop: 10,
    marginLeft: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  DelieveryText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  DelieverySubText: {
    fontSize: RFPercentage(1.3),
    marginTop: 4,
    color: "#7a7a7a",
    fontFamily: "Poppins-Regular",
  },
  instructionsSection: {
    marginLeft: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginTop: 4,
  },
  instructionsTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 0,
    marginTop: 7,
  },
  optionContainer: {
    width: 75,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    margin: 2,
    padding: 7,
  },
  optionSelected: {
    borderColor: "#01615F",
    borderWidth: 2,
  },
  optionImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 8,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  billSection: {
    marginLeft: 2,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 6,
  },
  billTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  billContainer: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2, // marginBottom: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  billItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  billText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
  },
  billTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
  },
  totaltoText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
  reviewContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  noteText: {
    fontSize: RFPercentage(2),
    color: "#333",
    lineHeight: 20,
    fontFamily: "Poppins-Medium",
  },
  boldText: {
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  linkText: {
    fontSize: 14,
    color: "#01615F",
    fontFamily: "Poppins-Medium",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});
