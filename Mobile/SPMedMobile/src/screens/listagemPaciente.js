import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react';

export default class ListagemPaciente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
        }
    }

    BuscarConsultas = async () => {
        try {
            const resposta = await api('/Consultas/Paciente', {
                headers: {
                    Authorization: 'Bearer ' + await AsyncStorage.getItem('userToken'),
                }
            })

            if (resposta.status == 200) {
                const dadosApi = resposta.data
                this.setState({ listaConsultas: dadosApi });
            }
        } catch (error) {
            console.warn(error)
        }
    }

    fazerLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Login');

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
                <TouchableOpacity
                    onPress={this.fazerLogout}>
                    <Text style={styles.btnLogoutText}>Sair</Text>
                </TouchableOpacity>
                <View style={styles.titulo_logo}>
                    <Image
                        style={styles.imgLogo}
                        source={require('../../assets/img/logo_white.png')} />
                    <Text style={styles.titulo}>Lista de consultas</Text>
                </View>
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
            <Text style={styles.dateConsulta}>{Intl.DateTimeFormat("pt-BR",
                {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: 'numeric', minute: 'numeric'
                }
            ).format(new Date(item.dataConsulta))}</Text>
            <Text style={styles.infoConsulta}>Médico: </Text>
            <Text style={styles.textConsulta}>{item.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</Text>
            <Text style={styles.infoConsulta}>Paciente: </Text>
            <Text style={styles.textConsulta}>{item.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</Text>
            <Text style={styles.infoConsulta}>Situação: </Text>
            <Text style={styles.textConsulta}>{item.idSituacaoNavigation.statusSituacao}</Text>
            <Text style={styles.infoConsulta}>Especialidade: </Text>
            <Text style={styles.textConsulta}>{item.idMedicoNavigation.idEspecialidadeNavigation.tituloEspecialidade}</Text>
            <Text style={styles.infoConsulta}>Descrição: </Text>
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
    btnLogoutText: {
        textTransform: 'uppercase',
        fontFamily: 'Exo-Medium',
        color: 'red',
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    titulo_logo: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    imgLogo: {
        tintColor: 'black',
        marginTop: 10,
        marginRight: 10,
    },
    titulo: {
        fontFamily: 'Exo-Medium',
        fontSize: 25,
        marginBottom: 20,
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
        height: 380,
        borderRadius: 30,
        backgroundColor: '#079DF0',
        marginTop: 20,
        marginBottom: 10,
    },
    dateConsulta: {
        borderBottomWidth: 1,
        fontFamily: 'Exo-Medium',
        color: 'white',
        marginTop: 20,
        fontSize: 20,
        alignSelf: 'center',
    },
    infoConsulta: {
        fontFamily: 'Exo-Medium',
        textTransform: 'uppercase',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
    },
    textConsulta: {
        textTransform: 'uppercase',
        fontFamily: 'Exo-Medium',
        color: 'white',
        marginLeft: 40,
        marginTop: 10,
    },
})