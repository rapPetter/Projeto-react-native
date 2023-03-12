

import {Calendar} from 'react-native-calendars'
import { useState } from 'react';

import {format} from 'date-fns'

import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';

import { commonStyles } from '../styles/CommonStyles'

export default function Datecalendar({navigation, route}) {

   const { personal } = route.params
   const { address } = route.params

  const dataAtual = format(new Date(), 'yyyy-MM-dd')

  const [billing_day, setBilling_day] = useState('')


  function navigateForTerms(){
    if(!billing_day){
      alert('Escolher uma data para a primeira cobrança!')

    }else{
    navigation.navigate('Termns',{
      personal:personal,
      address:address,
      billing_day:billing_day,
    })
  }
  }
  function navigateForAddress(){
    navigation.navigate('Address',{
      personal:personal,
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={commonStyles.title}>Qual data da Cobrança?</Text>


      <Calendar
      
        minDate={dataAtual}
        style={styles.calendar}

        markedDates={{
          [dataAtual]:{
            selected: true,
            selectedColor:'#3490dc',
            selectedTextColor:"blue"
          },
          [billing_day]: {
            selected: true,
            marked: true,
            selectedColor: '#FFF',
            dotColor: 'red'
          },

        }
      }
        onDayPress={(currentDate) => setBilling_day(currentDate.dateString)}
        theme={{
          selectedDayTextColor: 'green',
          todayTextColor: '#FFF',
    
          calendarBackground: '#3490dc', // cor do calendario em si
          dayTextColor: '#FFF', // cores dos dia 
          arrowColor: '#FFF', // cores do avançar e voltar
          monthTextColor: '#FFF' // cor do mês selecionado
        }}
      />
          <View style={commonStyles.containerButton}>
        <TouchableOpacity style={commonStyles.button} onPress={navigateForAddress}>
          <Text style={commonStyles.textButton}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.button} onPress={navigateForTerms}>
          <Text style={commonStyles.textButton}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  calendar:{
    backgroundColor: 'blue',
    borderRadius: 10,
    marginVertical: 20,
    width: Dimensions.get('screen').width * 0.85,
    height :Dimensions.get('screen').width * 0.85
  },
});
