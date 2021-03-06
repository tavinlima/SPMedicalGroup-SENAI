import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/login'
import ListarMedico from './src/screens/listagemMed'
import ListagemPaciente from './src/screens/listagemPaciente'

const AuthStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />
      <AuthStack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name='Login' component={Login}></AuthStack.Screen>
        <AuthStack.Screen name='ListagemMedico' component={ListarMedico}></AuthStack.Screen>
        <AuthStack.Screen name='ListagemPaciente' component={ListagemPaciente}></AuthStack.Screen>
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default App;
