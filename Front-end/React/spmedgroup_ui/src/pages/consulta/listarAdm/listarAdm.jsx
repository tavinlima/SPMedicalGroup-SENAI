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

    buscarConsultaPorId = async (consulta) => {
        await this.setState({
            idConsulta: consulta.idConsulta,
        })
        console.log('A consulta ' + this.state.idConsulta + ' foi selecionada ');
        console.log('idSituacao: ' + consulta.idSituacao + ' novo id: ' + this.state.idSituacao)
    }

    alterarSituacao = (consulta) => {
        console.log(consulta)
        consulta.preventDefault();

        console.log(this.state.idConsulta)
        axios.patch('http://localhost:5000/api/Consultas/situacao/' + this.state.idConsulta, {
            idSituacao: this.state.idSituacao
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((resposta) => {
            if (resposta.status === 204) {
                console.log('Situação alterada');

                this.setState({ idSituacao: 0 })

                console.log(this.state.idSituacao)
            }
        }).then(this.buscarConsultas)
            .catch(erro => console.log(erro))
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

                this.setState({
                    errorMessage: '',
                    isLoading: false
                });

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

    atualizaStateSituacao = async (opcao) => {
        console.log(this.state.idSituacao)
        await this.setState({
            idSituacao: opcao.target.value
        })
        console.log(this.state.idSituacao)
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
                                                <form onSubmit={this.alterarSituacao} key={consulta.idConsulta}>

                                                    <ul className="box_consulta">
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
                                                            <p className="subtext_consulta" value={consulta.idConsulta}>{consulta.idSituacaoNavigation.statusSituacao}</p>

                                                            <select  key={consulta.idConsulta} className="select_cadastro" onClick={() => this.buscarConsultaPorId(consulta)} onChange={this.atualizaStateSituacao} value={this.state.idSituacao} name="idSituacao">
                                                                <option aria-disabled="true" value="0" disabled>Selecione uma opção</option>
                                                                <option value='1'>Agendada</option>
                                                                <option value='2'>Realizada</option>
                                                                <option value='3'>Cancelada</option>

                                                            </select>


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

                                                        {
                                                            this.state.idSituacao !== 0 &&<button type="submit" className="btn_situacao" disabled={this.state.idConsulta !== consulta.idConsulta}>Salvar Alterações</button>
                                                        }

                                                    </ul>
                                                </form>
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