import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { API } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useIsFocused } from '@react-navigation/native'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { useState, useEffect } from 'react';

import { commonStyles } from '../styles/CommonStyles';

import Icon from '@expo/vector-icons/MaterialIcons'

export default function Paids() {
  const telaFocada = useIsFocused()
  const [result, setResult] = useState([])
  const [paids, setPaids] = useState([])


  const getResult = async () => {

    const values = await AsyncStorage.getItem('@pay:user')
    const parseValues = JSON.parse(values)
    setResult(parseValues)
  }
  getResult()




  useEffect(() => {
    if (telaFocada === true) {
      att()
    }
  }, [telaFocada])

  function att() {

    fetch(API + '/invoices' + '?user_id=' + result.id)

      .then(async (response) => {
        const data = await response.json()
        if (!data) {
          alert('nenhum boleto pago por esse usuario ainda!')
        } else {
          setPaids(data)
        }
      })
      .catch(() => alert('Houve um erro ao carregar a lista'))
  }

  return (
    <SafeAreaView style={styles.container}>
            <StatusBar />
        <Text style={commonStyles.titleUser}>Boletos pagos</Text>

      {paids.length === 0 ?
        <View style={styles.container}>
          <Text style={commonStyles.titleUser}>Nenhum Boleto pago ainda!</Text>
          <TouchableOpacity onPress={att}>
            <Icon name="update" size={Dimensions.get('screen').width * 0.8} color='#3490dc' />
            <Text style={{ alignSelf: 'center' }}>Clique aqui para atualizar.</Text>
          </TouchableOpacity>
        </View>
        :
        <ScrollView style={commonStyles.scrol}>
          {
            paids.map((task) => (
              <View style={styles.conteinerboleto}
                key={task.id}
              >
                <View style={styles.conte}>
                  <Text >{task.date}</Text>
                  <Text >R$: {task.amount}</Text>
                </View>
                <Text >{task.recipient}</Text>
              </View>
            ))

          }
        </ScrollView>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  conte: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  conteinerboleto: {
    backgroundColor: '#FFF',
    width: '80%',
    borderWidth: 1,
    borderColor: 'Grey',
    borderRadius: 10,
    padding: 10,
    marginVertical: '5%',
    alignSelf: 'center'
  },
});
