import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Dimensions, Button} from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native'
import { API } from '../services/api'

import { commonStyles } from '../styles/CommonStyles';

import LottieView from 'lottie-react-native'
import Scann from '../../../assets/scann.json'

export default function Payment({navigation}) {

    const telaFocada = useIsFocused()
    const [hasPermission, setHasPermission] = useState(false)
    const [scanned, setScanned] = useState(false)
    
    const getPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted' ? true : false)
      }

     
      useEffect(() => {
        if (telaFocada === false) {
          setHasPermission(false)
        }
    
      }, [telaFocada])


      function getResult({ data }) {
        setScanned(true)
        console.log(data)
    
        fetch(API + '/debts?id=' + data)
        .then(async (response) => {
          const data = await response.json()
          if(data.length === 1) {
            navigation.navigate('Details',{
                amount: data[0].amount,
                recipient:data[0].recipient,
                id:data[0].id   
            })
          } else {
            alert('BOLETO INVALIDO')
          }
        })
        .catch(() => alert('Houve ao tentar scannear'))
      }

      function openCamera() {
        setScanned(false)
        getPermission()
      }
  return (
    <SafeAreaView style={styles.container}>
        <Text style={commonStyles.titleUser}>Pagar Boleto</Text>

        {
        hasPermission === false &&       <LottieView
        autoPlay
        style={{ height: Dimensions.get('screen').height * 0.4}}
        source={Scann}
      />
      }

      {
        (hasPermission === true && scanned === false) &&
        <BarCodeScanner
          onBarCodeScanned={getResult}
          style={{
            width: Dimensions.get('screen').width * 0.8,
            height: Dimensions.get('screen').height * 0.6,
          }}
          barCodeTypes={['code39']}
        />
      }
      <TouchableOpacity style={commonStyles.buttonUser} onPress={openCamera}>
      <Text style={commonStyles.textButtonUser}>Scannear</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

});
