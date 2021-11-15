import { Component } from "react";
import axios from 'axios';

import Header from "../../../components/header/header"
import Footer from "../../../components/footer/footer"
import MenuLateral from "../../../components/menu_lateral/menu_lateral";

import "../../../assets/css/style.css"

export default class consultasAdm extends Component {
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
            errorMessage: '',
        };
    }

    buscarConsultas = () => {
        axios('http://localhost:5000/api/Consultas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((response) => {
            if (response.status === 200) {

                console.log(response.data)
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

    buscarSituacaoPorId = async (consulta) => {
        await this.setState({ idSituacao: consulta.idSituacao })
        console.log('idSituacao: ' + consulta.idSituacao + ' novo id: ' + this.state.idSituacao)
    }

    alterarSituacao = (consulta) => {
        // consulta.preventDefault();

        // console.log(this.setState({ idSituacao: consulta.idSituacao }))

        console.log(this.state.idSituacao)
        axios.patch('http://localhost:5000/api/Consultas/situacao/' + this.state.idConsulta, {
            idSituacao: consulta.idSituacao
        }, {
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

        this.setState({ isLoading: true });

        let consulta = {
            idPaciente: this.state.idPaciente,
            idMedico: this.state.idMedico,
            descricao: this.state.descricao,
            idSituacao: 1,
            dataConsulta: new Date(this.state.dataConsulta),
        }

        console.log(consulta)

        axios.post('http://localhost:5000/api/Consultas', consulta, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((response) => {
            if (response.status === 201) {

                this.setState({ isLoading: false });

                console.log('Consulta cadastrada com sucesso!')
            }
        }).then(this.buscarConsultas)
            .catch(() => {
                this.setState({ errorMessage: 'médico e/ou paciente inválidos!!!' })
                this.setState({ isLoading: false });
            });
    }

    atualizaState = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    }

    atualizaStateSituacao = (idConsulta) => {
        console.log(idConsulta)
        this.setState({ idSituacao: idConsulta.value })
        console.log(idConsulta.idSituacao)
    }

    componentDidMount() {
        this.buscarConsultas();
        this.buscarPacientes();
        this.buscarMedicos();
    }

    render() {
        return (
            <div>
                <main>
                    {/* <section className="menu_lateral">
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
                    </section> */}

                    <MenuLateral />

                    <Header />

                    <section className="container_consultas" id="container_consultas container">
                        <h2>Consultas</h2>

                        <section className="container_fundo container">
                            <h3>Lista de consultas</h3>

                            <div className="container_box">

                                <div className="container_box_listagem">
                                    {
                                        this.state.listaConsultas.map((consulta) => {
                                            return (
                                                <ul className="box_consulta" key={consulta.idConsulta}>
                                                    <li className="subtext_consulta">{Intl.DateTimeFormat("pt-BR",
                                                        {
                                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                                            hour: 'numeric', minute: 'numeric'
                                                        }
                                                    ).format(new Date(consulta.dataConsulta))}</li>
                                                    <li>paciente:
                                                        <p className="subtext_consulta">{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</p>
                                                    </li>
                                                    <div className="separacao_consulta">
                                                        <li>medico:
                                                            <p className="subtext_consulta">{consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</p>
                                                        </li>
                                                    </div>
                                                    <li>situação:
                                                        <p className="subtext_consulta" value={consulta.idSituacao}>{consulta.idSituacaoNavigation.statusSituacao}</p>
                                                        <form onSubmit={this.alterarSituacao}>
                                                            <select className="select_cadastro" key={consulta.idConsulta} onChange={() => this.atualizaStateSituacao(consulta)} value={this.state.idSituacao}>
                                                                <option value='0'>Selecione uma opção</option>
                                                                <option value='1'>Agendada</option>
                                                                <option value='2'>Realizada</option>
                                                                <option value='3'>Cancelada</option>

                                                            </select>
                                                            {
                                                                this.state.idSituacao !== 0 && <button type="submit" onClick={() => this.buscarSituacaoPorId(consulta)}>Salvar Alterações</button>
                                                            }

                                                        </form>

                                                    </li>
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
                                            )
                                        })
                                    }

                                </div>

                                <form onSubmit={this.cadastrarConsulta}>
                                    <ul className="box_cadastro_consulta">
                                        <li className="subtext_consulta">Nova consulta</li>
                                        <div className="separacao_cadastro">
                                            <li>paciente:
                                                <select
                                                    required
                                                    className="select_cadastro"
                                                    name="idPaciente"
                                                    onChange={this.atualizaState}
                                                    value={this.state.idPaciente}>
                                                    <option aria-disabled="true" value="0" disabled>Selecione um paciente</option>
                                                    {
                                                        this.state.listaPacientes.map((paciente) => {
                                                            return (
                                                                <option key={paciente.idPaciente} value={paciente.idPaciente}>{paciente.idUsuarioNavigation.nomeUsuario}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </li>

                                        </div>
                                        <div className="separacao_cadastro">
                                            <li>medico:
                                                <select
                                                    required
                                                    className="select_cadastro"
                                                    name="idMedico"
                                                    onChange={this.atualizaState}
                                                    value={this.state.idMedico}>
                                                    <option aria-disabled="true" value="0" disabled>Selecione um médico</option>
                                                    {
                                                        this.state.listaMedicos.map((medico) => {
                                                            return (
                                                                <option key={medico.idMedico} value={medico.idMedico}>{medico.idUsuarioNavigation.nomeUsuario}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </li>
                                        </div>
                                        <li>Data da Consulta: </li>
                                        <input
                                            required
                                            name="dataConsulta"
                                            type="datetime-local"
                                            onChange={this.atualizaState}></input>
                                        {
                                            <p className="error_message">{this.state.errorMessage}</p>
                                        }
                                        {
                                            !this.state.isLoading ? <button type="submit" className="btn_consulta">Cadastrar consulta</button> : <button type="submit" className="btn_consulta" disabled>Carregando...</button>
                                        }

                                    </ul>
                                </form>

                            </div>

                        </section>
                    </section>
                </main >
                <Footer></Footer>
            </div >
        )
    }
}