import { Component } from "react";
import axios from 'axios';

import Header from "../../../components/header/header"

import logo from "../../../assets/img/logo_white.png"
import perfil_foto from "../../../assets/img/perfilcebolateams.jpg"
import calendar from "../../../assets/img/calendar.png"

import "../../../assets/css/style.css"

export default class consultasPaciente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idConsulta: 0,
            idPaciente: 0,
            idMedico: 0,
            descricao: '',
            dataConsulta: new Date(),
            idSituacao: 0,

            listaConsultas: [],
            listaPacientes: [],
            listaMedicos: [],

            isLoading: false,
        };
    }

    buscarConsultas = () => {
        axios('http://localhost:5000/api/Consultas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({ listaConsultas: response.data });
                console.log(this.state.listaConsultas);
            }
        }).catch(erro => console.log(erro))
    }

    buscarPacientes = () => {
        axios('http://localhost:5000/api/Pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({ listaPacientes: response.data });
                console.log(this.state.listaPacientes);
            }
        }).catch(erro => console.log(erro))
    }

    buscarMedicos = () => {
        axios('http://localhost:5000/api/Medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((response) => {
            if (response.status === 200) {
                this.setState({ listaMedicos: response.data });
                console.log(this.state.listaMedicos);
            }
        }).catch(erro => console.log(erro))
    }

    alterarSituacao = (consulta) => {
        consulta.preventDefault();
        console.log(consulta.idConsulta)
        axios.patch('http://localhost:5000/api/Consultas/situacao/' + consulta.idConsulta, consulta.idSituacao, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((resposta) => {
            if (resposta.status === 200) {
                console.log('Situação alterada');
            }
        }).catch(erro => console.log(erro))
    }

    cadastrarConsulta = (event) => {
        event.preventDefault();

        let consulta = {
            idPaciente: this.state.idPaciente,
            idMedico: this.state.idMedico,
            dataConsulta: new Date(this.state.dataConsulta),
            idSituacao: 0
        }

        console.log(consulta)

        axios.post('http://localhost:5000/api/Consultas', consulta, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((response) => {
            if (response.status === 201) {
                console.log('Consulta cadastrada com sucesso!')
            }
        }).then(this.buscarConsultas)
            .catch(erro => console.log(erro))
    }

    atualizaState = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    }

    componentDidMount() {
        this.buscarConsultas();
        this.buscarPacientes();
        this.buscarMedicos();
    }

    render() {
        return (
            <div>
                <Header />
                <main>
                    <section className="menu_lateral">
                        <div className="conteudo_menu">
                            <img src={logo} alt="logo_sp_med" className="logo_menu"></img>
                            <div className="div_icon">
                                <img src={perfil_foto} alt="imagem_perfil" className="imagem_perfil_consulta"></img>
                                <span>Gustavo</span>
                            </div>
                            <a className="div_icon" href='#container_consultas'>
                                <img src={calendar} alt="icon_calendar" className="calendar_menu"></img>
                                <span>consultas</span>
                            </a>
                        </div>
                    </section>


                    <section className="container_consultas" id="container_consultas">
                        <h2>Consultas <hr></hr></h2>

                        <section className="container_fundo">
                            <input type="search"></input>
                            <h3>Lista de consultas</h3>

                            <div className="container_box">
                                {
                                    this.state.listaConsultas.map((consulta) => {
                                        return (
                                            <section className="box_consulta" key={consulta.idConsulta}>
                                                <ul>
                                                    <li className="subtext_consulta">{Intl.DateTimeFormat("pt-BR",
                                                        {
                                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                                            hour: 'numeric', minute: 'numeric'
                                                        }
                                                    ).format(new Date(consulta.dataConsulta))}</li>
                                                    <div className="separacao_consulta">
                                                        <li>paciente: </li>
                                                        <p className="subtext_consulta">{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</p>
                                                    </div>
                                                    <div className="separacao_consulta">
                                                        <li>medico: </li>
                                                        <p className="subtext_consulta">{consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</p>
                                                    </div>
                                                    <li>situação: </li>
                                                    <form onSubmit={() => this.alterarSituacao(consulta)}>
                                                        <select onChange={this.atualizaState}>
                                                            <option key={consulta.idSituacao} value={consulta.idSituacao}>{consulta.idSituacaoNavigation.statusSituacao}</option>
                                                            <option value='1'>Agendada</option>
                                                            <option value='2'>Cancelada</option>
                                                            <option value='3'>Realizada</option>
                                                        </select>
                                                        <button type="submit">Salvar Alterações</button>
                                                    </form>
                                                    <div className="separacao_consulta">
                                                        <li>especialidade:
                                                            <p className="subtext_consulta">{consulta.idMedicoNavigation.idEspecialidadeNavigation.tituloEspecialidade}</p>
                                                        </li>

                                                    </div>

                                                    <div className="separacao_consulta">
                                                        <li>descrição
                                                            <p className="subtext_consulta">{consulta.descricao}</p>
                                                        </li>

                                                    </div>
                                                </ul>
                                            </section>
                                        )
                                    })
                                }

                            </div>

                            <section className="box_cadastro_consulta">
                                <form onSubmit={this.cadastrarConsulta}>
                                    <ul>
                                        <li className="subtext_consulta">Nova consulta</li>
                                        <hr></hr>
                                        <div className="separacao_consulta">
                                            <li>paciente: </li>
                                            <select
                                                name="idPaciente"
                                                onChange={this.atualizaState}
                                                value={this.state.idPaciente}>
                                                <option value="0">Selecione um paciente</option>
                                                {
                                                    this.state.listaPacientes.map((paciente) => {
                                                        return (
                                                            <option key={paciente.idPaciente} value={paciente.idPaciente}>{paciente.idUsuarioNavigation.nomeUsuario}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>
                                        <div className="separacao_consulta">
                                            <li>medico: </li>
                                            <select
                                                name="idMedico"
                                                onChange={this.atualizaState}
                                                value={this.state.idMedico}>
                                                <option value="0">Selecione um médico</option>
                                                {
                                                    this.state.listaMedicos.map((medico) => {
                                                        return (
                                                            <option key={medico.idPaciente} value={medico.idMedico}>{medico.idUsuarioNavigation.nomeUsuario}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <li>Data da Consulta: </li>
                                        <input
                                            name="dataConsulta"
                                            type="datetime-local"
                                            onChange={this.atualizaState}></input>
                                        <button type="submit">Cadastrar consulta</button>
                                    </ul>
                                </form>

                            </section>
                        </section>
                    </section>
                </main>
            </div>
        )
    }
}