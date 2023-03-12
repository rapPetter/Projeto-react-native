import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, StatusBar } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { commonStyles } from '../styles/CommonStyles';

export default function Home({navigation}) {

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])

  const getResult = async () => {
    
    const values = await AsyncStorage.getItem('@pay:user')
    const parseValues = JSON.parse(values)
    setResult(parseValues)
  }


  getResult()

  useEffect(() => {
    setLoading(true)
  }, [setResult])

    function navigateForInitial(){
        navigation.navigate('Initial')
    }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
        <Text style={commonStyles.titleUser}>Dados da conta</Text>
        <View style={styles.containerUser}>
        {loading === true && <Text style={styles.textUser}>Nome:<Text style={{...styles.conteinerboleto,fontWeight:'bold'}}>{result.fullname}</Text> </Text> }
        {loading === true && <Text style={styles.textUser}>CPF: <Text style={{...styles.conteinerboleto,fontWeight:'bold'}}>{result.cpf}</Text></Text> }
        {loading === true &&<Text style={styles.textUser}>Telefone: <Text style={{...styles.conteinerboleto,fontWeight:'bold'}}>{result.contact}</Text></Text>}
        {loading === true &&<Text style={styles.textUser}>RG: <Text style={{...styles.conteinerboleto,fontWeight:'bold'}}>{result.number_rg}</Text></Text> }          
        </View>

      <TouchableOpacity style={commonStyles.buttonUser} onPress={navigateForInitial}>
      <Text style={commonStyles.textButtonUser}>SAIR DO APP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textUser:{
    fontSize:25,
    color:'#3490dc'
  },
  containerUser:{
    alignSelf:'flex-start',
    marginHorizontal:20
  }
});
