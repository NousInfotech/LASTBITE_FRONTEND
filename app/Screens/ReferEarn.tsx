import React, { useState } from "react";
import ShareModal from "@/components/ShareModal";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/GoBack";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { RFPercentage } from "react-native-responsive-fontsize";

// Type definitions
interface Contact {
  id: string;
  name: string;
  phone: string;
  invited: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function ReferEarn() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "Where will I receive my cashback & how can I use it?",
      answer: "General Issues",
    },
    {
      id: "2",
      question:
        "Can I club other offers with Last Bites cashback while placing an order?",
      answer: "General Issues",
    },
    {
      id: "3",
      question: "Is there any expiry date for the Last Bites cashback?",
      answer: "General Issues",
    },
    {
      id: "4",
      question: "What is the reward for my friend & how can they receive it?",
      answer: "General Issues",
    },
    {
      id: "5",
      question: "Who should I reach out to in case of any issue?",
      answer: "General Issues",
    },
  ];

  const toggleFaq = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleInviteToggle = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? { ...contact, invited: !contact.invited }
          : contact
      )
    );
  };

  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Oliver Harris", phone: "9382754321", invited: false },
    { id: "2", name: "Sarah Jones", phone: "9234567890", invited: false },
    { id: "3", name: "Emily White", phone: "9876543210", invited: false },
  ]);
  
  const handleInvite = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, invited: true } : contact
      )
    );
  };
  
  const renderContact: ListRenderItem<Contact> = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text allowFontScaling={false}  style={styles.contactName}>{item.name}</Text>
        <Text allowFontScaling={false}  style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity
        style={[styles.inviteButton, item.invited && styles.reinviteButton]}
        onPress={() => handleInvite(item.id)}
      >
        <Text allowFontScaling={false} 
          style={[
            styles.inviteButtonText,
            item.invited && styles.reinviteButtonText,
          ]}
        >
          {item.invited ? "Reinvite" : "Invite"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToSeeMore = () => {
    router.push('/Screens/SeeMore')
  }

  const renderFaq: ListRenderItem<FAQ> = ({ item }) => (
    <TouchableOpacity style={styles.faqItem} onPress={() => toggleFaq(item.id)}>
      <View style={styles.faqQuestion}>
        <Text allowFontScaling={false}  style={styles.faqQuestionText}>{item.question}</Text>
        <AntDesign
          name={expanded === item.id ? "up" : "down"}
          size={16}
          color="#757575"
        />
      </View>
      {expanded === item.id && (
        <Text allowFontScaling={false}  style={styles.faqAnswer}>{item.answer}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Header />
          </TouchableOpacity>
          <Text allowFontScaling={false}  style={styles.headerTitle}>Refer friends & Earn ₹2500</Text>
        </View>

        {/* Referral Info Card */}
        <View style={styles.referralCard}>
          <View style={styles.stepsContainer}>
            <View style={styles.stepLineContainer}>
              <View style={styles.stepDot} />
              <View style={styles.stepLine} />
              <View style={styles.stepDot} />
              <View style={styles.stepLine} />
              <View style={styles.stepDot} />
            </View>

            <View style={styles.stepsTextContainer}>
              <Text allowFontScaling={false}  style={styles.stepText}>
                You get ₹50 cashback when friend places their first order
              </Text>
              <Text allowFontScaling={false}  style={styles.stepText}>
                Friend gets ₹150 off + free delivery on their first order
              </Text>
              <Text allowFontScaling={false}  style={styles.stepText}>
                You can get a maximum of ₹2500 cashback
              </Text>
            </View>
          </View>

          <Image
            source={require("../../assets/images/refer.png")}
            style={styles.deliveryImage}
            resizeMode="cover"
          />
        </View>

        {/* Rewards Section */}
        <View style={styles.rewardsSection}>
          <Text allowFontScaling={false} >Get rewards by inviting your</Text>
          <Text allowFontScaling={false}  style={styles.rewardsText}>friends to order food</Text>

          <View style={styles.shareLinkRow}>
            <Text allowFontScaling={false}  style={styles.shareLinkText}>Share link in a group</Text>
            <TouchableOpacity style={styles.shareButton} onPress={() => setShowShareModal(true)}>
              <Feather name="share-2" size={18} color="#01615F" />
            </TouchableOpacity>
            <ShareModal
              visible={showShareModal}
              onClose={() => setShowShareModal(false)}
              address="https://lastbites.com/referral?code=YOURCODE"
            />
            <Image
              source={require("../../assets/images/coins.png")}
              style={styles.coinsImage}
              resizeMode="cover"
            />
          </View>
        </View>
        
        <View style={styles.subContainer}>
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#757575" />
            <TouchableOpacity onPress={navigateToSeeMore}>
              <Text allowFontScaling={false}  style={styles.placeholderText}>Find your friends</Text>
            </TouchableOpacity>
          </View>

          {/* Contacts List */}
          <FlatList
            data={contacts}
            renderItem={renderContact}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />

          <TouchableOpacity style={styles.seeMoreButton} onPress={navigateToSeeMore}>
            <Text allowFontScaling={false}  style={styles.seeMoreText}>See More</Text>
          </TouchableOpacity> 

          {/* FAQs Section */}
          <Text allowFontScaling={false}  style={styles.faqTitle}>FAQs</Text>
          <FlatList
            data={faqs}
            renderItem={renderFaq}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    marginTop: RFPercentage(1.5),
    fontWeight: "700",
  },
  referralCard: {
    backgroundColor: "#01615F",
    margin: 16,
    borderRadius: 8,
    padding: 16,
    position: "relative",
  },
  stepsContainer: {
    flexDirection: "row",
    paddingRight: 100, // Make room for the image
  },
  stepLineContainer: {
    alignItems: "center",
    marginRight: 8,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 9,
    backgroundColor: "#fff",
  },
  stepLine: {
    width: 1,
    height: 40,
    backgroundColor: "#fff",
  },
  stepsTextContainer: {
    flex: 1,
  },
  stepText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 18,
    lineHeight: 16,
  },
  deliveryImage: {
    position: "absolute",
    right: 12,
    bottom: 16,
    width: 80,
    height: 80,
  },
  rewardsSection: {
    paddingHorizontal: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    margin: 20,
  },
  subContainer: {
    paddingHorizontal: 18,
  },
  rewardsText: {
    fontSize: 14,
    marginBottom: 16,
    fontWeight: "500",
  },
  shareLinkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  shareLinkText: {
    fontSize: 14,
    color: "#01615F",
    fontWeight: "500",
  },
  shareButton: {
    marginLeft: 8,
  },
  coinsImage: {
    position: "absolute",
    right: 0,
    width: 50,
    height: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  placeholderText: {
    color: '#757575',
    fontSize: 16,  
    fontStyle: 'normal', 
    opacity: 0.6,  
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "700",
  },
  contactPhone: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2,
  },
  inviteButton: {
    backgroundColor: "#01615F",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  reinviteButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#01615F",
  },
  reinviteButtonText: {
    color: "#01615F",
  },
  seeMoreButton: {
    paddingVertical: 12,
  },
  seeMoreText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  faqItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestionText: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    paddingRight: 8,
    color: "#333",
  },
  faqAnswer: {
    fontSize: 14,
    color: "#757575",
    marginTop: 8,
    lineHeight: 20,
  },
});