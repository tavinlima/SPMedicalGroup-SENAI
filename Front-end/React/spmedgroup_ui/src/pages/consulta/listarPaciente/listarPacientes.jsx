import { Component } from "react";
import axios from 'axios';

import Header from "../../../components/header/header"
import MenuLateral from "../../../components/menu_lateral/menu_lateral";
import Footer from "../../../components/footer/footer";

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

    componentDidMount() {
        this.buscarMinhasConsultas();
    }

    render() {
        return (
            <div>
                <main>
                    <MenuLateral />

                    <Header />

                    <section className="container_consultas" id="container_consultas">
                        <h2>Consultas <hr></hr></h2>

                        <section className="container_fundo">
                            <h3>Lista de consultas</h3>

                            <div className="container_box_listagem">
                                {
                                    this.state.listaConsultas.map((consulta) => {
                                        return (
                                            <ul key={consulta.idConsulta} className="box_consulta">
                                                <li className="subtext_consulta">{Intl.DateTimeFormat("pt-BR",
                                                    {
                                                        year: 'numeric', month: 'numeric', day: 'numeric',
                                                        hour: 'numeric', minute: 'numeric'
                                                    }
                                                ).format(new Date(consulta.dataConsulta))}</li>
                                                <div className="separacao_consulta">
                                                    <li>paciente:
                                                        <p className="subtext_consulta">{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</p>
                                                    </li>
                                                </div>
                                                <div className="separacao_consulta">
                                                    <li>medico:
                                                        <p className="subtext_consulta">{consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</p>
                                                    </li>
                                                </div>
                                                <li>situação:
                                                    <p className="subtext_consulta">{consulta.idSituacaoNavigation.statusSituacao}</p>
                                                </li>
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
                                        );
                                    })
                                }

                            </div>

                        </section>
                    </section>
                </main>
                <Footer />
            </div>
        )
    }
}