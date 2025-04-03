import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import GoBack from "@/components/GoBack";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

const AddCard = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    validThrough: "",
    cvv: "",
    nameOnCard: "",
    cardNickname: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  const handleInputChange = (key: string, value: string) => {
    setCardDetails((prev) => ({ ...prev, [key]: value }));
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Card Number */}
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Card Number"
          value={cardDetails.cardNumber}
          onChangeText={(text) => handleInputChange("cardNumber", text)}
        />

        {/* Valid Through and CVV */}
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Valid Through (MM/YY)</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={cardDetails.validThrough}
              onChangeText={(text) => handleInputChange("validThrough", text)}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter CVV"
              value={cardDetails.cvv}
              secureTextEntry
              onChangeText={(text) => handleInputChange("cvv", text)}
            />
          </View>
        </View>

        {/* Name on Card */}
        <Text style={styles.label}>Name on Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the name on card"
          value={cardDetails.nameOnCard}
          onChangeText={(text) => handleInputChange("nameOnCard", text)}
        />

        {/* Card Nickname */}
        <Text style={styles.label}>Card Nickname  (For easy identification)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the card nickname"
          value={cardDetails.cardNickname}
          onChangeText={(text) => handleInputChange("cardNickname", text)}
        />

        {/* Secure Card Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsChecked(!isChecked)}
        >
          <View
            style={[
              styles.checkbox,
              { backgroundColor: isChecked ? "#01615F" : "#fff" },
            ]}
          >
            {isChecked && <Text style={styles.tickMark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>
            Secure this card.{" "}
            <Text style={styles.link}>Why is it important?</Text>
          </Text>
        </TouchableOpacity>

        {/* Proceed Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Object.values(cardDetails).every((val) => val)
                ? "#01615F"
                : "#ccc",
            },
          ]}
          disabled={!Object.values(cardDetails).every((val) => val)}
          onPress={() => alert("Card Details Saved")}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 14,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "black",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tickMark: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  link: {
    color: "#01615F",
    textDecorationLine: "underline",
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
});
