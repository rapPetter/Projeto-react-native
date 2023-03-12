import {StyleSheet} from 'react-native'

export const commonStyles = StyleSheet.create({
    title: {
        color: '#3490dc',
        fontWeight: 'bold',
        fontSize: 18
      },
      input: {
        borderColor: 'Grey',
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        height: 50,
        padding: 10,
        marginBottom:10,
      },
      button: {
        backgroundColor: '#3490dc',
        height: 50,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical:10
      },
      textButton: {
        color: '#fff',
      },
      containerButton:{
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'space-around'
      },
      containerInputs:{
        justifyContent:'center',
        alignItems:'center'
      },
      textError:{
        color:'red'
      },
      textSubInput:{
        color:'#3490dc',
        alignSelf:'flex-start',
        marginHorizontal:'10%',
        marginTop:10
      },
      scrol:{
        felx:1,
        width:'100%',
        marginVertical:15
      },
      buttonUser:{
        backgroundColor:'#3490dc',
        height:50,
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginBottom:25
      },
      textButtonUser:{
        color:'#fff',
      },
      titleUser:{
        fontSize:30,
        color:'#3490dc',
        fontWeight:'bold'
      },
})
