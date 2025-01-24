    import React, { useState, useEffect } from "react";
    import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    } from "react-native";
    import GoBack from "@/components/GoBack";
    import { useRouter } from "expo-router";
    import * as Font from "expo-font";

    const PersonalDetails = () => {
    const router = useRouter();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [mothersFullName, setMothersFullName] = useState("");
    const [email, setEmail] = useState("");
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState("");
    const [showAddressScreen, setShowAddressScreen] = useState(false);

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
        return null; // Optionally, show a loading screen or placeholder
    }

    const handleSave = () => {
        console.log("Personal Details Saved:", {
        fullName,
        dob,
        gender,
        mothersFullName,
        email,
        });
    };
    const isFormValid = fullName && dob && gender && mothersFullName && email;
    const handleGenderConfirm = () => {
        setGender(selectedGender);
        setIsGenderModalVisible(false);
    };

    const handleNext = () => {
        setShowAddressScreen(true);
    }

    if (showAddressScreen) {
        return <AddressDetails />;
    }

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
            <TouchableOpacity>
            <GoBack />
            </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.content}>
                <Text style={styles.title}>Your Personal Details</Text>
                <Text style={styles.subText}>As per your PAN Account</Text>

                <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={fullName}
                    onChangeText={setFullName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={dob}
                    onChangeText={setDob}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Gender</Text>
                    <TouchableOpacity
                    style={styles.input}
                    onPress={() => setIsGenderModalVisible(true)}
                    >
                    <Text style={styles.inputText}>{gender || "Select gender"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Mother's Full Name</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Enter your mother's full name"
                    value={mothersFullName}
                    onChangeText={setMothersFullName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Personal Email ID</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    />
                </View>
                </View>
            </View>
            </ScrollView>

            <TouchableOpacity
            style={[styles.submitButton, !isFormValid && styles.disabledButton]}
            onPress={handleNext}
            disabled={!isFormValid}
            >
            <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>

        {/* Gender Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={isGenderModalVisible}
            onRequestClose={() => setIsGenderModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Gender</Text>
                <TouchableOpacity onPress={() => setIsGenderModalVisible(false)}>
                    <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedGender("Male")}
                >
                <Text style={styles.radioText}>Male</Text>
                <View style={styles.radioCircle}>
                    {selectedGender === "Male" && <View style={styles.radioFill} />}
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedGender("Female")}
                >
                <Text style={styles.radioText}>Female</Text>
                <View style={styles.radioCircle}>
                    {selectedGender === "Female" && (
                    <View style={styles.radioFill} />
                    )}
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedGender("Other")}
                >
                <Text style={styles.radioText}>Other</Text>
                <View style={styles.radioCircle}>
                    {selectedGender === "Other" && (
                    <View style={styles.radioFill} />
                    )}
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleGenderConfirm}
                >
                <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
        </SafeAreaView>
    );
    };

    const AddressDetails = () => {
        const handleNext = () => {
        console.log("Next clicked");
        };
    
        return (
            <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
            <TouchableOpacity>
                <GoBack />
            </TouchableOpacity>
            </View>
            <View style={styles.content}>
            <Text style={styles.title}>Your current home address</Text>
            <Text style={styles.subText}>Your email will be delivered to this address</Text>
            <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Address</Text>
                    <Text style={[styles.subText, styles.addressText]}>123 Example St, City, Country</Text>
                </View>
            </View>

            <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.changeButton}>
        <Text style={styles.changeButtonText}>Change Address</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
    </View>
        </SafeAreaView>
        );
    };

    export default PersonalDetails;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 6,
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
        marginBottom: 4,
    },
    subText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: "#929292",
        marginBottom: 10,
    },
    formContainer: {
        marginTop: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        color: "#929292",
        marginBottom: 4,
    },
    input: {
        height: 50,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        justifyContent: "center",
    },
    inputText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
    },
    disabledButton: {
        backgroundColor: "#C7C7C7",
    },
    submitButton: {
        backgroundColor: "#01615F",
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins-Medium",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 8,
        width: "80%",
        padding: 20,
        alignItems: "center",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
    },
    closeButton: {
        fontSize: 16,
        fontFamily: "Poppins-Medium",
        color: "#929292",
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
        width: "100%",
    },
    radioText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        flex: 1,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#01615F",
        alignItems: "center",
        justifyContent: "center",
    },
    radioFill: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "#01615F",
    },

    confirmButton: {
        backgroundColor: "#01615F",
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    confirmButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins-Medium",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between",  
    },
    addressContainer: {
        marginTop: 20,
    },
    addressTitle: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
    },
    addressText: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
    },
    buttonsContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",  
        marginBottom: 20,
    },
    changeButton: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#01615F",
        marginBottom: 10, 
    },
    changeButtonText: {
        color: "#01615F", 
        textAlign: "center",
        paddingHorizontal: 80,
        fontFamily: "Poppins-Medium",
    },
    nextButton: {
        backgroundColor: "#01615F",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 145,
    },

    });
