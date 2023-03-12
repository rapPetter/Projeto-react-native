
import { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import imagePay from '../../../assets/payLogin.gif'

import { API } from '../services/api'

export default function Login({ navigation }) {

  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')

  function navigateForHome() {
    if (!cpf) {
      alert('informar o cpf cadastrado')
    } else if (!password) {
      alert('informar a senha cadastrado')
    } else {
      fetch(API + '/users' + '?cpf=' + cpf + '&password=' + password)
        .then(async (response) => {
          const data = await response.json()
          if (data.length === 1) {
            await AsyncStorage.setItem('@pay:user', JSON.stringify(data[0]))
            navigation.navigate('HomeNavigator')
          } else {
            alert('Esse usuário não existe')
          }
        })
        .catch(() => alert('Houve um erro ao tentar logar.'))
    }
  }
  function nativeForRegistration() {
    navigation.navigate('Personal')
  }
  console.log(id)
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={imagePay} />
      <TextInput
        style={styles.input}
        placeholder='CPF'
        selectionColor="#3490dc"
        placeholderTextColor="#3490dc"
        maxLength={11}
        keyboardType='number-pad'
        onChangeText={setCpf}
        value={cpf}
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        selectionColor="#3490dc"
        placeholderTextColor="#3490dc"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={navigateForHome}>
        <Text style={styles.textButton}>Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={nativeForRegistration}>
        <Text style={styles.text}>Abrir conta gratuita</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get('screen').height * 0.4
  },
  text: {
    color: '#3490dc',
    fontWeight: 'bold'
  },
  input: {
    borderColor: 'Grey',
    borderWidth: 1,
    borderRadius: 10,
    width: '70%',
    height: 50,
    marginVertical: 10,
    padding: 10
  },
  button: {
    backgroundColor: '#3490dc',
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 25
  },
  textButton: {
    color: '#fff',
  }
});