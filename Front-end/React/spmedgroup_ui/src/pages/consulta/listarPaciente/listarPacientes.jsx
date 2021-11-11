import { Component } from "react";
// import axios from 'axios';

import Header from "../../../components/header/header"

import logo from "../../../assets/img/logo_white.png"
import perfil_foto from "../../../assets/img/perfilcebolateams.jpg"
import calendar from "../../../assets/img/calendar.png"

import "../../../assets/css/style.css"

export default class consultasPaciente extends Component {
    render() {
        return (
            <div>
                <Header/>
                <main>
                    <section className="menu_lateral">
                        <img src={logo} alt="logo_sp_med" className="logo_menu"></img>
                        <div className="div_icon">
                            <img src={perfil_foto} alt="imagem_perfil" className="imagem_perfil_consulta"></img>
                            <span>nome</span>
                        </div>
                        <div className="div_icon">
                            <img src={calendar} alt="icon_calendar"></img>
                            <span>consultas</span>
                        </div>
                    </section>

                    <section className="container_consultas container">
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
                                            <option value="valor2" selected>Cancelada</option>
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
                                            <option value="valor2" selected>Cancelada</option>
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
                                            <option value="valor2" selected>Cancelada</option>
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

                            <section className="box_cadastro_consulta">
                                <ul>
                                    <li className="subtext_consulta">Nova consulta</li>
                                    <hr></hr>
                                    <div className="separacao_consulta">
                                        <li>paciente: </li>
                                        <select>
                                            <option value="Adele">Adele Silva</option>
                                            <option value="TXT">TXT</option>
                                            <option value="Crisântemo">Crisântemo</option>
                                        </select>
                                    </div>
                                    <div className="separacao_consulta">
                                        <li>medico: </li>
                                        <select>
                                            <option value="Sarali">Sarali Passos</option>
                                            <option value="Lady_Gaga">Lady Gaga</option>
                                            <option value="Beyonce">Beyonce</option>
                                        </select>
                                    </div>
                                    <li>Data da Consulta: </li>
                                    <input type="datetime-local"></input>
                                    <button type="submit">Cadastrar consulta</button>
                                </ul>

                            </section>
                        </section>
                    </section>
                </main>
            </div>
        )
    }
}