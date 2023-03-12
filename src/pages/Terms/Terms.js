
import { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView, TouchableOpacity, Switch,StatusBar } from 'react-native';

import { API } from '../services/api'

import { commonStyles } from '../styles/CommonStyles'

export default function Terms({ navigation, route }) {

  const { personal } = route.params
  const { address } = route.params
  const { billing_day } = route.params
  const [check, setCheck] = useState(false)
  function navigateForHome() {
    if (check === false) {
      alert('Favor aceitar os termos para continuar.')
    } else {
      fetch(
        API + '/users',
        {
          body: JSON.stringify({
            fullname: personal.fullname,
            contact: personal.contact,
            email: personal.email,
            number_rg: personal.number_rg,
            cpf: personal.cpf,
            password: personal.password,
            address: {
              cep: address.cep,
              street: address.street,
              city: address.city,
              state: address.state,
              region: address.region,
              number: address.number,
              complement: address.complement
            },
            billing_day: billing_day
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(() => {
          navigation.navigate('Initial')
          alert('Conta cadastrada com sucesso.')})
        .catch(() => alert('Houve um erro ao efetuar o cadastrar.'))
    }
  }
  function navigateForDate(){
    navigation.navigate('Date',{
      personal:personal,
      address:address,
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={commonStyles.title}>TERMOS DE USO — PAY PAGAMENTOS</Text>
      <ScrollView>
        <Text>PAY PAGAMENTOS, pessoa jurídica de direito privado descreve, através deste documento, sua política de uso do www.paypagamentospay.com.br e qualquer outro site, loja ou aplicativo operado pelo proprietário.</Text>
        <Text>Ao navegar neste website, você está automaticamente de acordo com nossa política. Do contrário, orientamos a que suspenda a navegação no website e evite concluir o seu cadastro.
          A política  poderá ser editada a qualquer momento, mas, caso isso aconteça, publicaremos no website, com a data de revisão atualizada. Por outro lado, se as alterações forem substanciais, nós teremos o cuidado, além de divulgar no website, de informá-lo por meio das informações de contato que tivermos em nosso cadastro, ou por meio de notificações.
          A utilização deste website após as alterações significa que você aceitou a política revisada. Caso, após a leitura da nova versão, você não esteja de acordo com seus termos, favor encerrar o seu acesso.</Text>
        <Text>Capítulo 1 - Usuário</Text>
        <Text>
          A utilização deste website atribui de forma automática a condição de usuário e implica a plena aceitação de todas as diretrizes e condições incluídas nestes Termos.</Text>
        <Text>Capítulo 2 - Adesão em conjunto com a Política de Privacidade</Text><Text>
          A utilização deste website acarreta a adesão à presente Política de Uso e à versão mais atualizada da Política de Privacidade de PAY PAGAMENTOS.</Text>
        <Text>Capítulo 3 - Condições de acesso</Text>
        <Text>
          Em geral, o acesso ao website da PAY PAGAMENTOS possui caráter gratuito e não exige prévia inscrição ou registro. Contudo, para usufruir de algumas funcionalidades, o usuário poderá precisar efetuar um cadastro, criando uma conta de usuário com login e senha próprios para acesso.
          É de total responsabilidade do usuário fornecer apenas informações corretas, autênticas, válidas, completas e atualizadas, bem como não divulgar o seu login e senha para terceiros.
          Partes deste website oferecem ao usuário a opção de publicar comentários em campos dedicados. PAY PAGAMENTOS não consente com publicações discriminatórias, ofensivas ou ilícitas, ou ainda infrinjam direitos de autor ou quaisquer outros direitos de terceiros.
          A publicação de quaisquer conteúdos pelo usuário deste website, incluindo, mas não se limitando, a  mensagens e comentários, implica licença não-exclusiva, irrevogável e irretratável, para sua utilização, reprodução e publicação pela PAY PAGAMENTOS em seu website, plataformas e aplicações de internet, ou ainda em outras plataformas, sem qualquer restrição ou limitação.</Text>
        <Text>Capítulo 8 - Dados pessoais</Text>
        <Text>
          Durante a navegação, certos dados pessoais serão coletados e tratados por PAY PAGAMENTOS e/ou pelos Parceiros. As regras relacionadas ao tratamento de dados pessoais estão estipuladas em nossa Política de Privacidade.
        </Text>
        <Text>Capítulo 9 - Contato</Text><Text>
          Caso você tenha qualquer dúvida sobre esta Política de Uso, por favor, entre em contato pelo e-mail pay-pagamentos@paypagamentos.com.
        </Text>
      </ScrollView>
      <View style={styles.containerCheck}>
        <Switch
          trackColor={{ false: "#767577", true: "green" }}
          thumbColor={check ? "#FFF" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setCheck(previousState => !previousState)}
          value={check} />
        <Text style={styles.textCheck}>Aceito os termos</Text>
      </View>
      <View style={commonStyles.containerButton}>
        <TouchableOpacity style={commonStyles.button} onPress={navigateForDate}>
          <Text style={commonStyles.textButton}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.button} onPress={navigateForHome}>
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
    justifyContent: 'center',
  },
  containerCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20
  },
  textCheck: {
    fontSize: 16,
    marginLeft: 10
  }
});
