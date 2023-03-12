
import { StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity, View, ScrollView, StatusBar } from 'react-native';
import { useState } from 'react'

import { commonStyles } from '../styles/CommonStyles'

export default function Personal({ navigation }) {

  const [fullname, setFullname] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [number_rg, setNumber_rg] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  function navigateForInitial() {
    navigation.navigate('Initial')
  }

  function navigateForAddress() {
    if (fullname.length <= 8 || fullname.length >= 120) {
      setErrorMessage(' deve ter entre 8 á 120 caracteres.')
      alert('O campo nome completo deve ter entre 8 á 120 caracteres.')
    } else if (!contact) {
      setErrorMessage(' Telefone é obrigatório.')
      alert('O campo Telefone deve ser preenchido')
    } else if (!email) {
      setErrorMessage(' O campo Email é obrigatório.')
      alert('O campo Email deve ser preenchido')
    } else if (!number_rg) {
      setErrorMessage(' O campo Nº do RG é obrigatório.')
      alert('O campo RG deve ser preenchido')
    } else if (!cpf) {
      setErrorMessage(' O campo CPF é obrigatório.')
      alert('O campo CPF deve ser preenchido')
    } else if (password.length < 8 || password.length > 16) {
      setErrorMessage(' A senha deve ter entre 8 á 16 caracteres.')
      alert('O campo Senha deve ter entre 8 á 16 caracteres.')
    } else {
      setErrorMessage('')
      navigation.navigate('Address', {
        personal: {
          fullname: fullname,
          contact: contact,
          email: email,
          number_rg: number_rg,
          cpf: cpf,
          password: password
        }
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={commonStyles.title}>NOVA CONTA</Text>
      <ScrollView style={commonStyles.scrol}>
        <View style={commonStyles.containerInputs}>

          <Text style={commonStyles.textSubInput}>Nome completo{errorMessage.length === 35 && <Text style={commonStyles.textError}>{errorMessage}</Text>} </Text>
          <TextInput
            style={commonStyles.input}
            placeholder='Nome completo'
            selectionColor="#3490dc"
            placeholderTextColor="#3490dc"
            maxLength={120}
            value={fullname}
            onChangeText={setFullname}
          />
          <Text style={commonStyles.textSubInput}>Telefone {errorMessage.length === 24 && <Text style={commonStyles.textError}>{errorMessage}</Text>}</Text>
          <TextInput
            style={commonStyles.input}
            placeholder='Telefone'
            selectionColor="#3490dc"
            placeholderTextColor="#3490dc"
            keyboardType='phone-pad'
            value={contact}
            onChangeText={setContact}
          />
          <Text style={commonStyles.textSubInput}>Email {errorMessage.length === 29 && <Text style={commonStyles.textError}>{errorMessage}</Text>} </Text>
          <TextInput
            style={commonStyles.input}
            placeholder='Email'
            selectionColor="#3490dc"
            placeholderTextColor="#3490dc"
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <Text style={commonStyles.textSubInput}>RG {errorMessage.length === 32 && <Text style={commonStyles.textError}>{errorMessage}</Text>} </Text>
          <TextInput
            style={commonStyles.input}
            placeholder='RG'
            selectionColor="#3490dc"
            placeholderTextColor="#3490dc"
            keyboardType='number-pad'
            value={number_rg}
            onChangeText={setNumber_rg}
          />
          <Text style={commonStyles.textSubInput}>CPF {errorMessage.length === 27 && <Text style={commonStyles.textError}>{errorMessage}</Text>} </Text>
          <TextInput
            style={commonStyles.input}
            placeholder='CPF'
            selectionColor="#3490dc"
            placeholderTextColor="#3490dc"
            maxLength={11}
            keyboardType='number-pad'
            value={cpf}
            onChangeText={setCpf}
          />
          <Text style={commonStyles.textSubInput}>Senha {errorMessage.length === 42 && <Text style={commonStyles.textError}>{errorMessage}</Text>} </Text>
          <TextInput
            style={commonStyles.input}
            placeholder='Password'
            selectionColor="#3490dc"
            placeholderTextColor="#3490dc"
            maxLength={16}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={commonStyles.containerButton}>
            <TouchableOpacity style={commonStyles.button} onPress={navigateForInitial}>
              <Text style={commonStyles.textButton}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={commonStyles.button} onPress={navigateForAddress}>
              <Text style={commonStyles.textButton}>Avançar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
});
