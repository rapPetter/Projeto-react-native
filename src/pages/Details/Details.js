import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { API } from '../services/api'

import { commonStyles } from '../styles/CommonStyles';

export default function Detailspay({ navigation, route }) {

 

  const { amount } = route.params
  const { recipient } = route.params
  const { id } = route.params

  const [cashback, setCashback] = useState('')
  const [result, setResult] = useState([])

  const getResult = async () => {
    
    const values = await AsyncStorage.getItem('@pay:user')
    const parseValues = JSON.parse(values)
    setResult(parseValues)
    
  }

  useEffect(() => {
    const conta = (amount *0.1).toFixed(2)
    setCashback(conta)
    getResult()
  }, [amount])

  function savePayment() {
    const date = format(new Date(), 'dd/MM/yyyy HH:m',{locale: ptBR })
    fetch(
      API + '/invoices',
      {
        body: JSON.stringify({
          recipient: recipient,
          amount: amount,
          date: date,
          code: id,
          user_id:result.id ,
          cashback: cashback ,
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(() => {
        alert('Boleto pago com sucesso')
        navigation.navigate('Payments')
      })
      .catch(() => alert('Houve um erro ao tentar pagar o boleto.'))
  }
  function cancel() {
    navigation.navigate('Payments')
  }
  return (
    <SafeAreaView style={styles.container}>
            <StatusBar />
      <View style={styles.conteinerInf}>
        <View>
          <Text style={styles.titleUser}>PARA</Text>
          <Text style={styles.textUser}>{recipient} </Text>
        </View>
        <View>
          <Text style={styles.titleUser}>VALOR</Text>
          <Text style={styles.textUser}>R$:{amount} </Text>
        </View>
        <View>
          <Text style={styles.titleUser}>CODIGO DO BOLETO</Text>
          <Text style={styles.textUser}>{id} </Text>
        </View>
        <View>
          <Text style={styles.titleUser}>CashBack</Text>
          <Text style={styles.textUser}>R$: {cashback} </Text>
        </View>
      </View>
      <TouchableOpacity style={commonStyles.buttonUser} onPress={savePayment}>
        <Text style={commonStyles.textButtonUser}>Pagar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{...commonStyles.buttonUser,backgroundColor:'red'}} onPress={cancel}>
        <Text style={commonStyles.textButtonUser}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  conteinerInf: {
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    height: '60%',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 15,
    backgroundColor: '#fff'
  },
  textUser: {
    color: '#3490dc',
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  },
  titleUser: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey'
  }
});
