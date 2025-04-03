import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#01615F',
      
        tabBarStyle: {
          paddingVertical: 5,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: RFPercentage(1.3),, 
        },
        tabBarIconStyle: {
          marginBottom: 0,
      marginTop: 5, 
        },
        tabBarLabel: ({ focused, color }) => (
          <View style={[styles.labelContainer, focused && styles.activeTabUnderline]}>
            <Text
              style={[styles.tabLabel, { color }]}
              numberOfLines={1} 
              ellipsizeMode="tail" 
            >
              {getTabLabel(route.name)}
            </Text>
          </View>
        ),

      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="archive-edit-outline" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="wallet" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="people-circle-outline" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}

const getTabLabel = (routeName: string): string => {
  switch (routeName) {
    case 'home':
      return 'Home';
    case 'orders':
      return 'Orders';
    case 'menu':
        return 'Menu';
    case 'payment':
      return 'Payment';
    case 'profile':
      return 'Profile';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: RFPercentage(1.3),, 
    textAlign: 'center',
  },
  activeTabUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: '#01615F',
    paddingBottom: 2,
  },
});
