import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

const FaceVerification = () => {
  const router = useRouter();
  const cameraRef = useRef<typeof Camera | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);

        // Request camera permission
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");

        // Start verification animation
        setIsVerifying(true);
        startProgressAnimation();
      } catch (err) {
        console.error("Error in initialization:", err);
      }
    })();
  }, []);

  const startProgressAnimation = () => {
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  if (!fontsLoaded || hasPermission === null) {
    return null;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Face Verification</Text>
      </View>

      <Text style={styles.instruction}>
        Face the camera and hold your position
      </Text>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <Camera ref={cameraRef} style={styles.camera} type={CameraType.front} />

        {/* Overlay Frame */}
        <View style={styles.overlay}>
          <View style={styles.frame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>
      </View>

      {/* Verifying Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>Verifying...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#333",
  },
  instruction: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  cameraContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 1.3,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: 280,
    height: 340,
    borderRadius: 8,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#fff",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  progressContainer: {
    padding: 20,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#01615F",
    borderRadius: 2,
  },
  progressText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});

export default FaceVerification;
