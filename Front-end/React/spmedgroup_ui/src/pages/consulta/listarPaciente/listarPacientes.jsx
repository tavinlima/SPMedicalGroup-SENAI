import { Component } from "react";
// import axios from 'axios';

import logo from "../../../assets/img/logo_white.png"
import perfil from "../../../assets/img/perfilcebolateams.jpg"

import "../../../assets/css/style.css"


export default class consultasPaciente extends Component {
    render() {
        return (
            <div>
                <main>
                    <section className="menu_lateral">
                        <img src={logo} alt="logo_sp_med" className="logo_menu"></img>
                        <div>
                            <img src={perfil} alt="imagem_perfil" className="imagem_perfil_consulta"></img>
                            <span>nome</span>
                        </div>
                        <span>consultas</span>
                    </section>

                    <section className="container_consultas container">
                        <h2>Consultas <hr></hr></h2>

                        <section className="container_fundo">
                            <input type="search"></input>
                            <h3>Lista de consultas</h3>
                            <section className="box_consulta">
                                <ul>
                                    <li>03/09/2021</li>
                                    <hr></hr>
                                    <li>paciente</li>
                                    <li>medico</li>
                                    <li>situação</li>
                                    <li>especialidade</li>
                                    <li>descrição</li>
                                </ul>

                            </section>
                        </section>
                    </section>
                </main>
            </div>
        )
    }
}