import { Component } from "react";
import axios from 'axios';

import Header from "../../../components/header/header"

import logo from "../../../assets/img/logo_white.png"
import perfil_foto from "../../../assets/img/perfilcebolateams.jpg"
import calendar from "../../../assets/img/calendar.png"

import "../../../assets/css/style.css"

export default class consultasMedico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
        }
    }

    buscarConsultasMedico = () => {
        axios('http://localhost:5000/api/Consultas/Medico', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ listaConsultas: response.data });
                console.log(this.state.listaConsultas);
            }
        }).catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.buscarConsultasMedico();
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
                                            <section className="box_consulta">
                                                <ul key={consulta.idConsulta}>
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
                                                    <p className="subtext_consulta">{consulta.idSituacaoNavigation.statusSituacao}</p>
                                                    <div className="separacao_consulta">
                                                        <li>especialidade
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
                                        );
                                    })
                                }

                            </div>

                        </section>
                    </section>
                </main>
            </div>
        )
    }
}