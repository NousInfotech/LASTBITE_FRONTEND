import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBarVoice = () => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Initializing the Voice module
    console.log('Initializing Voice module');
    
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
  
    console.log('Voice module initialized');
  
    return () => {
      Voice.destroy().then(() => {
        Voice.removeAllListeners();
        console.log('Voice module cleaned up');
      });
    };
  }, []);
  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone for voice search.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
  
    if (!hasPermission) {
      console.warn('Microphone permission denied');
      return;
    }
  
    if (!Voice) {
        console.error('Voice module is not available');
        return;
      }
      
      try {
        await Voice.start('en-US');
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition', error);
      }
      
  };
  console.log('Voice module:', Voice); // This should not be null or undefined

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onSpeechStart = () => {
    setIsListening(true);
    console.log('Speech recognition started');
  };

  const onSpeechEnd = () => {
    setIsListening(false);
    console.log('Speech recognition ended');
  };

  const onSpeechResults = (event: SpeechResultsEvent) => {
    if (event.value && event.value[0]) {
      setSearchText(event.value[0]); // Update search text dynamically
      console.log('Speech results: ', event.value[0]);
    }
  };

  const onSpeechError = (error: SpeechErrorEvent) => {
    console.error('Speech recognition error: ', error);
    setIsListening(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#757575" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Dishes, restaurants & more"
          placeholderTextColor="#757575"
          value={searchText}
          onChangeText={setSearchText}
          className='font-medium '
        />
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={isListening ? stopListening : startListening}
        >
          <Icon
            name={isListening ? 'mic' : 'mic-none'}
            size={24}
            color={isListening ? '#4285F4' : '#757575'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 55,
    borderWidth: 1,
    borderColor: '#929292',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 9, // Adjust font size as needed
    color: '#929292',
    paddingVertical: 8,
  },
  voiceButton: {
    padding: 4,
  },
});

export default SearchBarVoice;
