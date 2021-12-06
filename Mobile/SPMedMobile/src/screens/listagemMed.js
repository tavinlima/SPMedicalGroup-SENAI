import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    FlatList,
    ScrollView,
} from 'react-native';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react';

export default class ListagemMedico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
        }
    }

    BuscarConsultas = async () => {
        try {
            const resposta = await api('/Consultas/Medico', {
                headers: {
                    Authorization: 'Bearer ' + await AsyncStorage.getItem('userToken'),
                }
            })

            if (resposta.status == 200) {
                const dadosApi = resposta.data
                console.warn(dadosApi)
                this.setState({ listaConsultas: dadosApi });
                console.warn(this.state.listaConsultas)
            }
        } catch (error) {
            console.warn(error)
        }
    }

    componentDidMount() {
        this.BuscarConsultas();
    }

    render() {
        return (
            <View
                style={styles.main}>
                <Image
                    style={styles.imgLogo}
                    source={require('../../assets/img/logo_white.png')} />
                    <Text style={styles.titulo}>Lista de consultas</Text>
                <View style={styles.containerConsulta}>
                    <View >
                        <FlatList
                            data={this.state.listaConsultas}
                            keyExtractor={item => item.idConsulta}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </View>
        );
    }

    renderItem = ({ item }) => (
        <View style={styles.boxConsulta}>
            <Text style={styles.textConsulta}>{Intl.DateTimeFormat("pt-BR",
                                                            {
                                                                year: 'numeric', month: 'numeric', day: 'numeric',
                                                                hour: 'numeric', minute: 'numeric'
                                                            }
                                                        ).format(new Date(item.dataConsulta))}</Text>
            <Text style={styles.textConsulta}>Médico: {item.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</Text>
            <Text style={styles.textConsulta}>Paciente: {item.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</Text>
            <Text style={styles.textConsulta}>Situação: {item.idSituacaoNavigation.statusSituacao}</Text>
            <Text style={styles.textConsulta}>Especialidade: </Text>
            <Text style={styles.textConsulta}>{item.idMedicoNavigation.idEspecialidadeNavigation.tituloEspecialidade}</Text>
            <Text style={styles.textConsulta}>Descrição: </Text>
            <Text style={styles.textConsulta}>{item.descricao}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#DFFBFF',
        alignItems: 'center',
        height: '100%',
    },
    imgLogo: {
        tintColor: 'black',
    },
    titulo: {
        fontSize: 25,
        color: 'black',
    },
    containerConsulta: {
        flex: 4,
        width: 320,
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    boxConsulta: {
        width: 240,
        height: 300,
        borderRadius: 30,
        backgroundColor: '#079DF0',
        marginTop: 20,
        marginBottom: 10,
    },
    textConsulta: {
        color: 'white',
        marginLeft: 40,
        marginTop: 10,
    },
})