import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'

import { useNavigation } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    async function RealizarLogin() {
        try {

            const resposta = await api.post('/login', {
                email: email,
                senha: senha,
            })

            const token = resposta.data.token;

            setErrorMessage('');

            await AsyncStorage.setItem('userToken', token);

            const permissao = await jwtDecode(token).role

            if (permissao == 2) {

                if (resposta.status == 200) {
                    navigation.navigate('ListagemMedico');
                }

            }

            if (permissao == 3) {

                if (resposta.status == 200) {
                    navigation.navigate('ListagemPaciente');
                }

            }

        } catch (error) {
            setErrorMessage('Email ou senha incorretos')
            console.warn(error)
        }
    }


    return (
        <ImageBackground
            style={StyleSheet.absoluteFillObject}
            source={require('../../assets/img/imglogin.png')}>
            <Image
                style={styles.imgLogo}
                source={require('../../assets/img/logosmall.png')} />
            <View
                style={styles.main}>
                <Text style={styles.tituloTela}>Login</Text>
                <TextInput
                    style={styles.inputLogin}
                    placeholderTextColor='white'
                    placeholder='email'
                    keyboardType="email-address"
                    onChangeText={email => setEmail(email)}
                    value={email}
                >
                    {/* ricardo.lemos@spmedicalgroup.com.br */}
                    {/* ligia@gmail.com */}
                </TextInput>
                <TextInput
                    style={styles.inputLogin}
                    placeholderTextColor='white'
                    placeholder='senha'
                    secureTextEntry={true}
                    onChangeText={senha => setSenha(senha)}
                    value={senha}
                >
                    {/* 11111111 */}
                    {/* 44444444 */}
                </TextInput>
                {
                    errorMessage != ''? <Text style={styles.errorMessage}>{errorMessage}</Text>:StyleSheet.none
                }  

                <TouchableOpacity
                    onPress={() => RealizarLogin()}>
                    <Text style={styles.btnLogar}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    imgLogo: {
        marginTop: 20,
        marginLeft: 20,
    },
    errorMessage: {
        padding: 5,
        // height: 30,
        fontFamily: 'Exo-Medium',
        backgroundColor: 'white',
        borderRadius: 50,
        color: 'red'
    },
    tituloTela: {
        fontFamily: 'Exo-Medium',
        fontSize: 35,
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 10,
        marginTop: 30,
    },
    inputLogin: {
        width: '60%',
        height: 50,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 50,
        color: 'white',
        fontFamily: 'Exo-Medium',
    },
    btnLogar: {
        fontFamily: 'Exo-Medium',
        marginTop: 25,
        textTransform: 'uppercase',
        color: '#83BEDF',
        fontSize: 35,
    },
})