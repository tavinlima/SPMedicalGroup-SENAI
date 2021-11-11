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
            listaConsultas: [],
        }
    }

    buscarMinhasConsultas = () => {
        axios('http://localhost:5000/api/Consultas/Paciente', {
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

    componentDidMount(){
        this.buscarMinhasConsultas();
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

                                <section className="box_consulta">
                                    <ul>
                                        <li className="subtext_consulta">03/09/2021 às 14:00</li>
                                        <hr></hr>
                                        <div className="separacao_consulta">
                                            <li>paciente: </li>
                                            <p className="subtext_consulta">
                                                Adele Silva
                                            </p>
                                        </div>
                                        <div className="separacao_consulta">
                                            <li>medico: </li>
                                            <p className="subtext_consulta">
                                                Sarali Passos
                                            </p>
                                        </div>
                                        <li>situação: </li>
                                        <select>
                                            <option value="valor1">Agendada</option>
                                            <option value="valor2">Cancelada</option>
                                            <option value="valor3">Realizada</option>
                                        </select>
                                        <div className="separacao_consulta">
                                            <li>especialidade
                                                <p className="subtext_consulta">Dermatologia</p>
                                            </li>

                                        </div>

                                        <div className="separacao_consulta">
                                            <li>descrição
                                                <p className="subtext_consulta">Paciente Ok e feliz</p>
                                            </li>

                                        </div>
                                    </ul>

                                </section>

                                <section className="box_consulta">
                                    <ul>
                                        <li className="subtext_consulta">03/09/2021 às 14:00</li>
                                        <hr></hr>
                                        <div className="separacao_consulta">
                                            <li>paciente: </li>
                                            <p className="subtext_consulta">
                                                Adele Silva
                                            </p>
                                        </div>
                                        <div className="separacao_consulta">
                                            <li>medico: </li>
                                            <p className="subtext_consulta">
                                                Sarali Passos
                                            </p>
                                        </div>
                                        <li>situação: </li>
                                        <select>
                                            <option value="valor1">Agendada</option>
                                            <option value="valor2">Cancelada</option>
                                            <option value="valor3">Realizada</option>
                                        </select>
                                        <li>especialidade
                                            <p className="subtext_consulta">Dermatologia</p>
                                        </li>
                                        <li>descrição
                                            <p className="subtext_consulta">Paciente Ok e feliz</p>
                                        </li>
                                    </ul>

                                </section>

                                <section className="box_consulta">
                                    <ul>
                                        <li className="subtext_consulta">03/09/2021 às 14:00</li>
                                        <hr></hr>
                                        <div className="separacao_consulta">
                                            <li>paciente: </li>
                                            <p className="subtext_consulta">
                                                Adele Silva
                                            </p>
                                        </div>
                                        <div className="separacao_consulta">
                                            <li>medico: </li>
                                            <p className="subtext_consulta">
                                                Sarali Passos
                                            </p>
                                        </div>
                                        <li>situação: </li>
                                        <select>
                                            <option value="valor1">Agendada</option>
                                            <option value="valor2">Cancelada</option>
                                            <option value="valor3">Realizada</option>
                                        </select>
                                        <li>especialidade
                                            <p className="subtext_consulta">Dermatologia</p>
                                        </li>
                                        <li>descrição
                                            <p className="subtext_consulta">Paciente Ok e feliz</p>
                                        </li>
                                    </ul>

                                </section>
                            </div>

                        </section>
                    </section>
                </main>
            </div>
        )
    }
}