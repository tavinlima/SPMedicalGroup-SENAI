import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListagemPaciente() {
    const [listaConsultas, setListaConsultas] = useState([]);

    async function BuscarConsultas(){
        try {
            const resposta = await api('/Consultas/Paciente', {
                headers: {
                    Authorization: 'Bearer ' + AsyncStorage.getItem('userToken'),
                }
            })

            if (resposta.status == 200) {
                setListaConsultas(resposta.data);
                console.log(listaConsultas)
            }
        } catch (error) {
            console.warn(error)
        }
    }

    useEffect(BuscarConsultas, [])

    return (
        <View>
            <Text>Oi</Text>
            <Image
                // style={styles.imgLogo}
                source={require('../../assets/img/logospmed.png')} />
            <Text>Lista de consultas</Text>
            <View>
                <View>
                    <FlatList
                        data={listaConsultas}
                        keyExtractor={item => item.idConsulta}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </View>

    )
    function renderItem({ item }) {

    };
}