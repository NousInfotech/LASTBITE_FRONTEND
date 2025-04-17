import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FriendInviteScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize friends with invited status
  const [friends, setFriends] = useState(
    Array(12).fill().map((_, index) => ({
      id: index.toString(),
      name: 'Oliver Harris',
      phone: '(0382739542)',
      invited: false
    }))
  );

  const handleInvite = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, invited: !friend.invited } : friend
    ));
  };

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.inviteButton, item.invited && styles.reinviteButton]} 
        onPress={() => handleInvite(item.id)}
      >
        <Text style={[styles.inviteButtonText, item.invited && styles.reinviteButtonText]}>
          {item.invited ? 'Reinvite' : 'Invite'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find your friends</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Find your friends"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>
      
      {/* Friends List */}
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 24,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  friendPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  inviteButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  inviteButtonText: {
    color: '#01615F',
    fontWeight: '700',
    fontSize: 14,
  },
  reinviteButtonText: {
    color: '#01615F',
    fontWeight: '700',
    fontSize: 14,
  },
});