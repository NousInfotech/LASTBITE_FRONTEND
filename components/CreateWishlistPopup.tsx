import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface CreateWishlistPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (listName: string) => void;
  itemImage: string;
  itemName: string;
}

const CreateWishlistPopup: React.FC<CreateWishlistPopupProps> = ({
  isVisible,
  onClose,
  onSave,
  itemImage,
  itemName
}) => {
  const [listName, setListName] = useState('');
  const slideAnimation = useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const handleSave = () => {
    if (listName.trim()) {
      onSave(listName);
      setListName('');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <Animated.View 
            style={[
              styles.container,
              { transform: [{ translateY }] }
            ]}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              <Image 
                source={typeof itemImage === 'string' ? { uri: itemImage } : itemImage} 
                style={styles.itemImage} 
              />
              
              <Text allowFontScaling={false}  style={styles.itemName}>{itemName}</Text>
              
             <TextInput allowFontScaling={false} 
                style={styles.input}
                placeholder="Name your list"
                placeholderTextColor="#999"
                value={listName}
                onChangeText={setListName}
                autoFocus={true}
              />
            </View>

            <TouchableOpacity 
              style={[styles.doneButton, !listName.trim() && styles.disabledButton]}
              onPress={handleSave}
              disabled={!listName.trim()}
            >
              <Text allowFontScaling={false}  style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 30,
    height: '50%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 8,
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  }
});

export default CreateWishlistPopup;






