import { View,StyleSheet,Text} from 'react-native'
import React from 'react'

import {MaterialIcons} from '@expo/vector-icons'
const Active = () => {
  return (
<View style={styles.container}>
          <MaterialIcons name='cancel' size={150} color={'grey'} />
          <Text>No Active Bids</Text>
        </View>  )
}

export default Active

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center',
    flex:1
  }
})