import React, {useState} from 'react'
import {View, Text,StyleSheet, FlatList} from 'react-native'
import {spacing} from '../utils/sizes'
import {colors} from '../utils/colors'

export const FocusHistory = ({history}) => {
 

  const renderItem = ({item}) => <Text style={styles.item}>-  {item}</Text>

  return (
      <View style={styles.container}>
       {(!history || !history.length) ? (<Text style={styles.title}>we haven't focus on anything yet! </Text> ):(
<>
        <Text style={styles.title}>Things we've focus on: </Text>
        <FlatList 
   
          data={history}
          renderItem={renderItem}
        />
        </>
       )}
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:spacing.lg,
   flex:1
  },
  title:{
     color:colors.white,
     fontSize:spacing.md,
     paddingTop:spacing.lg
     
  },

  item:{
        color:colors.white,
     fontSize:spacing.md,
        paddingTop:spacing.md
  }

})