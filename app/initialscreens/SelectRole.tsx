// import React, { useState, useEffect } from "react";
// import { View, Text, SafeAreaView, Animated, TouchableOpacity } from "react-native";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import Button from "@/components/ButtoN";
// import * as Font from "expo-font";
// import { RFPercentage } from "react-native-responsive-fontsize";

// const SelectRole = () => {
//   const [activeOption, setActiveOption] = useState<string>("User");
//   const [fadeAnim] = useState(new Animated.Value(1)); // For image transition
//   const [fontsLoaded, setFontsLoaded] = useState(false); // state for font loading
//   const options: string[] = ["User", "Restaurant", "Rider"];

//   const images: Record<string, any> = {
//     User: require("../../assets/images/Order food.gif"),
//     Restaurant: require("../../assets/images/Coffee shop.gif"),
//     Rider: require("../../assets/images/TakeAway.gif"),
//   };

//   const router = useRouter();
//   useEffect(() => {
//     async function loadFonts() {
//       await Font.loadAsync({
//         "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
//         "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
//         "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
//       });
//       setFontsLoaded(true);
//     }

//     loadFonts();
//   }, []); // Only run once on mount

//   const handleOptionChange = (option: string) => {
//     // Fade out the image
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setActiveOption(option); // Change the active option
//       // Fade in the new image
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   const handleGetStarted = () => {
//     if (activeOption === "User") {
//       // router.push("./onboarding");
//       router.push('/auth/NumberLogin/otpScreen')
//     } else if (activeOption === "Rider") {
//       router.push("./RidersWelcome");
//     } else if (activeOption === "Restaurant") {
//       router.push("./RestaurantScreen");
//       // router.push('/auth/NumberLogin/otpScreen')
//       // router.push("/(tabstwo)/home");
//     }
//      else {
//       router.push({
//         pathname: "./onboarding",
//         params: { role: activeOption },
//       });
//     }
//   };
  

//   if (!fontsLoaded) {
//     return null; // Optionally, show a loading screen or placeholder while fonts are loading
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <View
//         style={{
//           flex: 1,
//           paddingHorizontal: 24,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <View
//           style={{
//             width: "100%",
//             aspectRatio: 1,
//             marginBottom: 32,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Animated.View style={{ opacity: fadeAnim }}>
//             <Image
//               source={images[activeOption]} 
//               style={{ width: 400, height: 400, resizeMode: "contain" }}
//             />
//           </Animated.View>
//         </View>

//         {/* Logo and Text */}
//         <View style={{ alignItems: "center", marginBottom: 32 }}>
//           <View style={{ flexDirection: "row", marginTop: 32, marginBottom: 8 }}>
//             <Image
//               source={require("../../assets/images/logo2.png")}
//               style={{ width: 300, height: 50, resizeMode: "contain" }}
//             />
//           </View>

//           <Text
//             style={{
//               color: "#929292",
//               textAlign: "center",
//               fontSize: RFPercentage(2),
//               fontFamily: "Poppins-Regular", // Use loaded font
//             }}
//           >
//             Select your role to get started
//           </Text>
//         </View>

//         {/* Role Options */}
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//             marginBottom: 40,
//             gap: 8,
//           }}
//         >
//           {options.map((option) => (
//             <TouchableOpacity
//               key={option}
//               onPress={() => handleOptionChange(option)} // User selects option manually
//               style={{
//                 flex: 1,
//                 height: 80,
//                 borderWidth: 1,
//                 borderColor: activeOption === option ? "#01615F" : "#E5E5E5",
//                 borderRadius: 8,
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 paddingVertical: 12,
//                 backgroundColor: activeOption === option ? "#EFFFF4" : "white",
//               }}
//             >
//               <View style={{ marginBottom: 8 }}>
//                 {option === "User" && (
//                   <Image
//                     source={
//                       activeOption === option
//                         ? require("../../assets/images/Fast Moving Consumer Goods-1.png")
//                         : require("../../assets/images/Fast Moving Consumer Goods.png")
//                     }
//                     style={{ width: 24, height: 24 }}
//                   />
//                 )}
//                 {option === "Restaurant" && (
//                   <Image
//                     source={
//                       activeOption === option
//                         ? require("../../assets/images/Restaurant Building.png")
//                         : require("../../assets/images/Restaurant Building-1.png")
//                     }
//                     style={{ width: 24, height: 24 }}
//                   />
//                 )}
//                 {option === "Rider" && (
//                   <Image
//                     source={
//                       activeOption === option
//                         ? require("../../assets/images/Delivery Scooter.png")
//                         : require("../../assets/images/Delivery Scooter-1.png")
//                     }
//                     style={{ width: 24, height: 24 }}
//                   />
//                 )}
//               </View>
//               <Text
//                 style={{
//                   fontFamily: activeOption === option ? "Poppins-Regular" : "Poppins-Medium",
//                   fontSize: 14,
//                   color: activeOption === option ? "#01615F" : "#4a4a4a",
//                 }}
//               >
//                 {option}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Button
//           buttonContent="Get Started"
//           onPress={handleGetStarted}
//           backgroundColor="#01615F"
//         />
//       </View>   
//     </SafeAreaView>
//   );
// };

// export default SelectRole;









import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Animated, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Button from "@/components/ButtoN";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

const SelectRole = () => {
  const [activeOption, setActiveOption] = useState<string>("User");
  const [fadeAnim] = useState(new Animated.Value(1)); // For image transition
  const [fontsLoaded, setFontsLoaded] = useState(false); // state for font loading
  const options: string[] = ["User", "Restaurant", "Rider"];

  const images: Record<string, any> = {
    User: require("../../assets/images/Order food.gif"),
    Restaurant: require("../../assets/images/Coffee shop.gif"),
    Rider: require("../../assets/images/TakeAway.gif"),
  };

  const router = useRouter();
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
  }, []); // Only run once on mount

  const handleOptionChange = (option: string) => {
    // Fade out the image
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setActiveOption(option); // Change the active option
      // Fade in the new image
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleGetStarted = () => {
    if (activeOption === "User") {
      router.push('/auth/NumberLogin/otpScreen');
    } else if (activeOption === "Rider") {
      router.push("./RidersWelcome");
    } else if (activeOption === "Restaurant") {
      // Pass the role parameter to the NumberLogin screen
      router.push({
        pathname: '/auth/NumberLogin/otpScreen',
        params: { role: "Restaurant" }
      });
    } else {
      router.push({
        pathname: "./onboarding",
        params: { role: activeOption },
      });
    }
  };
  
  if (!fontsLoaded) {
    return null; // Optionally, show a loading screen or placeholder while fonts are loading
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            aspectRatio: 1,
            marginBottom: 32,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={images[activeOption]} 
              style={{ width: 400, height: 400, resizeMode: "contain" }}
            />
          </Animated.View>
        </View>

        {/* Logo and Text */}
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <View style={{ flexDirection: "row", marginTop: 32, marginBottom: 8 }}>
            <Image
              source={require("../../assets/images/logo2.png")}
              style={{ width: 300, height: 50, resizeMode: "contain" }}
            />
          </View>

          <Text
            style={{
              color: "#929292",
              textAlign: "center",
              fontSize: RFPercentage(2),
              fontFamily: "Poppins-Regular", // Use loaded font
            }}
          >
            Select your role to get started
          </Text>
        </View>

        {/* Role Options */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 40,
            gap: 8,
          }}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionChange(option)} // User selects option manually
              style={{
                flex: 1,
                height: 80,
                borderWidth: 1,
                borderColor: activeOption === option ? "#01615F" : "#E5E5E5",
                borderRadius: 8,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                backgroundColor: activeOption === option ? "#EFFFF4" : "white",
              }}
            >
              <View style={{ marginBottom: 8 }}>
                {option === "User" && (
                  <Image
                    source={
                      activeOption === option
                        ? require("../../assets/images/Fast Moving Consumer Goods-1.png")
                        : require("../../assets/images/Fast Moving Consumer Goods.png")
                    }
                    style={{ width: 24, height: 24 }}
                  />
                )}
                {option === "Restaurant" && (
                  <Image
                    source={
                      activeOption === option
                        ? require("../../assets/images/Restaurant Building.png")
                        : require("../../assets/images/Restaurant Building-1.png")
                    }
                    style={{ width: 24, height: 24 }}
                  />
                )}
                {option === "Rider" && (
                  <Image
                    source={
                      activeOption === option
                        ? require("../../assets/images/Delivery Scooter.png")
                        : require("../../assets/images/Delivery Scooter-1.png")
                    }
                    style={{ width: 24, height: 24 }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontFamily: activeOption === option ? "Poppins-Regular" : "Poppins-Medium",
                  fontSize: 14,
                  color: activeOption === option ? "#01615F" : "#4a4a4a",
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          buttonContent="Get Started"
          onPress={handleGetStarted}
          backgroundColor="#01615F"
        />
      </View>   
    </SafeAreaView>
  );
};

export default SelectRole;