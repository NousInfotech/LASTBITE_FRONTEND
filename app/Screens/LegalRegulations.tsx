import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "@/components/GoBack";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

const LegalRegulations = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  // FAQs data
  const faqs = [
    {
      id: 1,
      question: "Where can I find the Terms & Conditions ?",
      answer: "General Issues"
    },
    {
      id: 2,
      question: "What is the refund policy ?",
      answer: "General Issues"
    },
    {
      id: 3,
      question: "How is my data protected ?",
      answer: "General Issues"
    },
  ];

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

  if (!fontsLoaded) {
    return null;
  }

  const toggleItem = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity>
          <Header />
        </TouchableOpacity>
        <Text allowFontScaling={false}  style={styles.headerTitle}>Legal Terms & Conditions</Text>
      </View>

      <ScrollView style={styles.content}>
        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleItem(faq.id)}
              activeOpacity={0.7}
            >
              <Text allowFontScaling={false}  style={styles.questionText}>{faq.question}</Text>
              <Ionicons
                name={expandedItem === faq.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
            
            {expandedItem === faq.id && (
              <View style={styles.answerContainer}>
                <Text allowFontScaling={false}  style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LegalRegulations;

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
    borderBottomColor: "#ECECEC",
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  faqItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: "hidden",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#333",
  },
  answerContainer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
  },
  answerText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    lineHeight: 20,
  },
});