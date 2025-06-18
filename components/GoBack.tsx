import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, Href } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

interface HeaderProps {
  // Title configuration
  title?: string;
  
  // Button configuration
  buttonText?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  onButtonPress?: () => void;
  buttonRoute?: Href;
  
  // Custom back handler
  onBackPress?: () => void;
  
  // Layout configuration
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  buttonText,
  buttonBackgroundColor = "#EFFFF4",
  buttonTextColor = "#01615F",
  onButtonPress,
  buttonRoute,
  onBackPress,
  showBackButton = true,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else if (buttonRoute) {
      router.push(buttonRoute);
    }
  };

  return (
    <View style={styles.header}>
      {/* Left side - Back button and title */}
      <View style={[
        styles.leftSection,
        // Only take flex: 1 if there's a title, otherwise just fit content
        !title && styles.leftSectionNoTitle
      ]}>
        {showBackButton && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
        )}
        {title && (
          <Text allowFontScaling={false} style={styles.headerTitle}>
            {title}
          </Text>
        )}
      </View>

      {/* Right side - Optional button */}
      {buttonText && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: buttonBackgroundColor }
          ]}
          onPress={handleButtonPress}
        >
          <Text 
            allowFontScaling={false}
            style={[styles.buttonText, { color: buttonTextColor }]}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  leftSectionNoTitle: {
    flex: 0, // Don't take up flex space when there's no title
  },
  backButton: {
    padding: 8,
    marginRight: 4,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: RFPercentage(2.2),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginLeft: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: RFPercentage(2),
  },
});

export default Header;