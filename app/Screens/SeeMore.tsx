import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FriendInviteScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
  
  // Initialize friends with invited status - 12 unique names
  const [friends, setFriends] = useState([
    { id: '0', name: 'Oliver Harris', phone: '(038-273-1001)', invited: false },
    { id: '1', name: 'Niharika Patel', phone: '(038-273-2002)', invited: false },
    { id: '2', name: 'Miguel Rodriguez', phone: '(038-273-3003)', invited: false },
    { id: '3', name: 'Sarah Johnson', phone: '(038-273-4004)', invited: false },
    { id: '4', name: 'Wei Chen', phone: '(038-273-5005)', invited: false },
    { id: '5', name: 'Amara Okafor', phone: '(038-273-6006)', invited: false },
    { id: '6', name: 'James Wilson', phone: '(038-273-7007)', invited: false },
    { id: '7', name: 'Sophia Kim', phone: '(038-273-8008)', invited: false },
    { id: '8', name: 'Raj Sharma', phone: '(038-273-9009)', invited: false },
    { id: '9', name: 'Emma Thompson', phone: '(038-273-1010)', invited: false },
    { id: '10', name: 'Aiden Nguyen', phone: '(038-273-1111)', invited: false },
    { id: '11', name: 'Isabella Garcia', phone: '(038-273-1212)', invited: false },
  ]);

  // Filter friends based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFriends(friends);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = friends.filter(friend => 
        friend.name.toLowerCase().includes(lowercasedQuery) || 
        friend.phone.includes(searchQuery)
      );
      setFilteredFriends(results);
    }
  }, [searchQuery, friends]);

  const handleInvite = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, invited: !friend.invited } : friend
    ));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
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
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Friends List */}
      <FlatList
        data={filteredFriends}
        renderItem={renderFriendItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No friends found matching "{searchQuery}"</Text>
          </View>
        }
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
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
    flexGrow: 1,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});