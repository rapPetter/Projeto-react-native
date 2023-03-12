import 'react-native-gesture-handler';

import Icon from '@expo/vector-icons/MaterialIcons'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Initial from './src/pages/Initial/Initial';
import Address from './src/pages/AddressRegistration/AddressRegistration';
import CollectionDate from './src/pages/CollectionDate/CollectionDate'
import Login from './src/pages/Login/Login';
import PersonalRegistration from './src/pages/PersonalRegistration/PersonalRegistration';
import Termns from './src/pages/Terms/Terms';
import Home from './src/pages/Home/Home'
import Paids from './src/pages/Tickets/TicketsPaids'
import Payments from './src/pages/Payments/Payments'
import Details from './src/pages/Details/Details'


const StackApp = createStackNavigator()
const Tab = createBottomTabNavigator()
const StackDetails = createStackNavigator()

export default function App() {

  function HomeNavigator() {
    return (
      <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor:'blue'
      }}>
        <Tab.Screen name="PaymentStack" component={PayNavigator}
            options={{
              headerShown:false,
              tabBarLabel:'Scanner',
              tabBarIcon: ({color})=>(
                <Icon name='flip' size={30} color={color} />
              )
            }} />
        <Tab.Screen name="Paids" component={Paids} 
            options={{
              headerShown:false,
              tabBarLabel:'Pagos',
              tabBarIcon: ({color})=>(
                <Icon name='padding' size={30} color={color} />
              )
            }}/>
        <Tab.Screen name="Home" component={Home}
        options={{
          headerShown:false,
          tabBarLabel:'incial',
          tabBarIcon: ({color})=>(
            <Icon name='portrait' size={30} color={color} />
          )
        }} />
        
      </Tab.Navigator>
    )
  }

  function PayNavigator() {
    return (
      <StackDetails.Navigator>
        <StackDetails.Screen
          name="Payments"
          component={Payments}
          options={{ headerShown: false }}
        />
        <StackDetails.Screen name="Details" component={Details} 
        options={{ headerShown: false }}/>
      </StackDetails.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName='Initial'>
      <StackApp.Screen name="HomeNavigator" component={HomeNavigator}
          options={{
            headerShown: false
          }} />
        <StackApp.Screen
          name="Initial"
          component={Initial}
          options={{ headerShown: false }}
        />
        <StackApp.Screen name="Address" component={Address} options={{ headerShown: false }}/>
        <StackApp.Screen name="Date" component={CollectionDate} options={{ headerShown: false }}/>
        <StackApp.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <StackApp.Screen name="Personal" component={PersonalRegistration}  options={{ headerShown: false }}/>
        <StackApp.Screen name="Termns" component={Termns} options={{ headerShown: false }} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
