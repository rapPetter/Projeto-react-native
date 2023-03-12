
import { StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity, View, ScrollView, StatusBar } from 'react-native';
import { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'

import { commonStyles } from '../styles/CommonStyles'

export default function Address({ navigation, route }) {

  const { personal } = route.params

  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [region, setRegion] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

 

  useEffect(() => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(async (response) => {
          const data = await response.json()
          console.log(data)
          setCity(data.localidade)
          setComplement(data.complemento)
          setRegion(data.bairro)
          setState(data.uf)
          setStreet(data.logradouro)
        })
        .catch(() => alert('Houve um erro ao tentar logar.'))
    }
  }, [cep])



  function navigateForDate() {
    if (!cep) {
      setErrorMessage('O campo CEP é obrigatorio')
      alert('O campo CEP deve ser preenchido.')
    } else if (!street) {
      setErrorMessage('O campo RUA é obrigatório.')
      alert('O campo Rua deve ser preenchido.')
    } else if (!city) {
      setErrorMessage('O campo CIDADE é obrigatório.')
      alert('O campo CIDADE deve ser preenchido.')
    } else if (!state) {
      setErrorMessage('É obrigatório selecionar um estado.')
      alert('É obrigatório selecionar um estado.')
    } else if (!region) {
      setErrorMessage('O campo Bairro é obrigatório.')
      alert('O campo Bairro deve ser preenchido.')
    } else if (!number) {
      setErrorMessage('O campo Número da residencia é obrigatório.')
      alert('O campo Número da residencia deve ser preenchido.')
    } else {
      setErrorMessage('')
      navigation.navigate('Date',{
        personal: personal,
        address:{
          cep: cep,
          street: street,
          city: city,
          state: state,
          region: region,
          number: number,
          complement:complement
          }
        }
      )
    }
  }
 function navigateForPersonal(){
  navigation.navigate('Personal')
 }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <Text style={commonStyles.title}>ENDEREÇO</Text>

      <ScrollView style={commonStyles.scrol}>
        <View style={commonStyles.containerInputs}>
      <Text style={commonStyles.textSubInput}>CEP {errorMessage === 'O campo CEP é obrigatorio' && <Text style={commonStyles.textError}>{errorMessage}</Text> } </Text>
      <TextInput
        style={commonStyles.input}
        placeholder='CEP'
        maxLength={8}
        selectionColor="#3490dc"
        placeholderTextColor="#3490dc"
        keyboardType='number-pad'
        value={cep}
        onChangeText={setCep}
      />
      <Text style={commonStyles.textSubInput}>Rua {errorMessage === 'O campo RUA é obrigatório.' && <Text style={commonStyles.textError}>{errorMessage}</Text> } </Text>
      <TextInput
        style={commonStyles.input}
        placeholder='Rua'
        selectionColor="#3490dc"
        placeholderTextColor="#3490dc"
        value={street}
        onChangeText={setStreet}
      />
      <Text style={commonStyles.textSubInput}>Cidade {errorMessage === 'O campo CIDADE é obrigatório.' && <Text style={commonStyles.textError}>{errorMessage}</Text> } </Text>
      <TextInput
        style={commonStyles.input}
        placeholder='Cidade'
        selectionColor="#3490dc"
        placeholderTextColor="#3490dc"
        value={city}
        onChangeText={setCity}
      />
      <Text style={commonStyles.textSubInput}>Estado {errorMessage === 'É obrigatório selecionar um estado.' && <Text style={commonStyles.textError}>{errorMessage}</Text> } </Text>
      <View style={styles.boxSelect}>
      <Picker
        selectedValue={state}
        onValueChange={(value) => setState(value)}
        style={styles.select}
      >
        <Picker.Item label="Selecione um Estado" value="" />
        <Picker.Item label="AC" value="AC" />
        <Picker.Item label="AL" value="AL" />
        <Picker.Item label="AP" value="AP" />
        <Picker.Item label="AM" value="AM" />
        <Picker.Item label="BA" value="BA" />
        <Picker.Item label="CE" value="CE" />
        <Picker.Item label="DF" value="DF" />
        <Picker.Item label="ES" value="ES" />
        <Picker.Item label="GO" value="GO" />
        <Picker.Item label="MA" value="MA" />
        <Picker.Item label="MG" value="MG" />
        <Picker.Item label="MS" value="MS" />
        <Picker.Item label="MT" value="MT" />
        <Picker.Item label="PA" value="PA" />
        <Picker.Item label="PB" value="PB" />
        <Picker.Item label="PE" value="PE" />
        <Picker.Item label="PI" value="PI" />
        <Picker.Item label="PR" value="PR" />
        <Picker.Item label="RJ" value="RJ" />
        <Picker.Item label="RO" value="RO" />
        <Picker.Item label="RR" value="RR" />
        <Picker.Item label="RS" value="RS" />
        <Picker.Item label="SC" value="SC" />
        <Picker.Item label="SE" value="SE" />
        <Picker.Item label="SP" value="SP" />
        <Picker.Item label="TO" value="TO" />
      </Picker>
      </View>
      <Text style={commonStyles.textSubInput}>Bairro {errorMessage === 'O campo Bairro é obrigatório.' && <Text style={commonStyles.textError}>{errorMessage}</Text> } </Text>
      <TextInput
        style={commonStyles.input}
        placeholder='Bairro'
        selectionColor="#3490dc"
        placeholderTextColor="#3490dc"
        value={region}
        onChangeText={setRegion}
      />
       <Text style={commonStyles.textSubInput}>Nº da residência {errorMessage === 'O campo Número da residencia é obrigatório.' && <Text style={commonStyles.textError}>{errorMessage}</Text> } </Text>
      <TextInput
        style={commonStyles.input}
        placeholder='Nº da residência'
        selectionColor="#3490dc"
        placeholderTextColor="#3490dc"
        keyboardType='number-pad'
        value={number}
        onChangeText={setNumber}
      />
      <Text style={commonStyles.textSubInput}>Complemento</Text>
      <TextInput
        style={commonStyles.input}
        placeholder='Complemento'
        selectionColor="#3490dc"
        placeholderTextColor="#3490dc"
        value={complement}
        onChangeText={setComplement}
      />

      <View style={commonStyles.containerButton}>
        <TouchableOpacity style={commonStyles.button}  onPress={navigateForPersonal}>
          <Text style={commonStyles.textButton}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.button} onPress={navigateForDate}>
          <Text style={commonStyles.textButton}>Continuar</Text>
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
  select:{
    height: 50,
    width: "80%",
    marginVertical: 10,

  },
  boxSelect:{
    borderWidth: 1, 
    borderColor: 'Grey', 
    borderRadius: 10, 
    width:'80%', 
    height: 50, 
    justifyContent:'center',

  }
});
