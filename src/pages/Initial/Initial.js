import { StyleSheet, Text, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';

import LottieView from 'lottie-react-native'

import Pay from '../../../assets/initialPay.json'

export default function Initial({navigation}) {

    function navigateForLogin(){
        navigation.navigate('Login')
    }
    function navigateForRegistration(){
        navigation.navigate('Personal')
    }

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        autoPlay
        style={{ height: Dimensions.get('screen').height * 0.5 }}
        source={Pay}
      />
      <TouchableOpacity style={styles.button} onPress={navigateForRegistration}>
      <Text style={styles.textButton}>Abrir conta gratuita</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateForLogin}>
      <Text style={styles.textButton}>Fazer login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:'#3490dc',
    height:50,
    width:'50%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    marginBottom:25
  },
  textButton:{
    color:'#fff',
  }
});
