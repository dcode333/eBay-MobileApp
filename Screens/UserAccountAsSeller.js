import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {MaterialIcons} from '@expo/vector-icons'

const UserAccountAsSeller = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name='cancel' size={150} color={'grey'} />
      <Text>No FeedBack</Text>
    </View>
  )
}


export default UserAccountAsSeller;

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center',
    flex:1
  }
})