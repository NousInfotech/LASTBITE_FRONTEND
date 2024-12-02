import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LocationHeader from '@/components/LocationHeader'
import SearchBarVoice from '@/components/SearchBarVoice'


const Home = () => {
  return (
    <View>
   <LocationHeader/>
   <SearchBarVoice/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})