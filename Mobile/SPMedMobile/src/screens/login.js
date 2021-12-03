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
    const navigation = useNavigation();

    async function RealizarLogin() {
        try {
            console.warn(email + senha)

            const resposta = await api.post('/login', {
                email: email,
                senha: senha,
            })

            const token = resposta.data.token;

            await AsyncStorage.setItem('userToken', token);

            await console.warn(jwtDecode(token))
            console.warn(token)

            if (resposta.status == 200) {
                navigation.navigate('ListagemPaciente')
            }


        } catch (error) {
            console.warn(error);
        }
    }
    useEffect(() => RealizarLogin, []);


    return (
        <ImageBackground
            style={StyleSheet.absoluteFillObject}
            source={require('../../assets/img/imglogin.png')}>
            <Image
                style={styles.imgLogo}
                source={require('../../assets/img/logospmed.png')} />
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
                </TextInput>

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
        width: '20.6%',
        height: '15%',
    },
    tituloTela: {
        fontFamily: '',
        fontSize: 35,
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 10,
    },
    inputLogin: {
        width: '60%',
        height: 50,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 50,
        color: 'white',
    },
    btnLogar: {
        marginTop: 25,
        textTransform: 'uppercase',
        color: '#83BEDF',
        fontSize: 35,
        fontFamily: 'Exo'
    },
})