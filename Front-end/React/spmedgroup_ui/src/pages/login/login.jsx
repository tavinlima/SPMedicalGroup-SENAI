import { Component } from "react";
import { Link } from "react-router-dom";
import { parseJwt, usuarioAutenticado } from '../../services/auth';

import logo from "../../assets/img/logospmed.png"

import "../../assets/css/login.css"

import axios from "axios";

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'adm@adm.com',
            senha: '12121212',
            errorMessage: '',
            isLoading: false,
        };
    }

    efetuaLogin = (evento) => {
        evento.preventDefault();

        this.setState({ errorMessage: '', isLoading: true });

        axios.post('http://localhost:5000/api/Login', {
            email: this.state.email,
            senha: this.state.senha,
        }

        ).then((response => {
            if (response.status === 200) {
                localStorage.setItem('usuario-login', response.data.token);

                this.setState({ isLoading: false });

                let base64 = localStorage.getItem('usuario-login').split('.')[1];

                console.log(base64);

                if (parseJwt().role === '3') {
                    this.props.history.push('/consultas/paciente');
                    console.log('estou logado: ' + usuarioAutenticado());
                }
                else if (parseJwt().role === '2') {
                    this.props.history.push('/consultas/medicos');
                    console.log('estou logado: ' + usuarioAutenticado());
                }
                else if (parseJwt().role === '1') {
                    this.props.history.push('/consultas/adm');
                    console.log('estou logado: ' + usuarioAutenticado());
                }
                else {
                    this.props.history.push('/');
                    console.log('estou logado: ' + usuarioAutenticado());
                }
            }
        }
        )
        ).catch(() => {
            this.setState({
                errorMessage: 'Email e/ou senha incorretos!',
                isLoading: false,
            })
        })
    }

    atualizaState = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    }

    render() {
        return (
            <div>
                <div className="conteudo_principal_login">
                    <section className="box_input">
                        <span>Login </span>
                        <div className="linha_login"></div>

                        <form onSubmit={this.efetuaLogin}>
                            <div className="input_login container">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="e-mail"
                                    value={this.state.email}
                                    onChange={this.atualizaState} />

                                <input
                                    type="password"
                                    name="senha"
                                    placeholder="senha"
                                    value={this.state.senha}
                                    onChange={this.atualizaState} />
                                <p className="error_message">{this.state.errorMessage}</p>
                                <Link to="/">esqueci minha senha</Link>
                                {
                                    !this.state.isLoading ? <button type="submit" className="btn_login" disabled={this.state.email === '' || this.state.senha === ''}>entrar</button> : <button type="submit" className="btn_login" disabled>Carregando...</button>
                                }
                            </div>
                        </form>
                    </section>
                    <div>
                        <div className="banner_login">
                            <span className="span_login">Bem vindo!</span>
                            <img src={logo} alt="logo_sp_med_group" className='logo_login'></img>
                            <span className="subtexto_banner_login">SP Medical Group</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}