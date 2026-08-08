import { StyleSheet, Text, View } from 'react-native';

export default function Footer(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>All rights reserved</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:"#B57ECD",
        
    },
    title:{
        color:"#170112",
        fontSize:18,
        fontWeight:"bold"
    }

})