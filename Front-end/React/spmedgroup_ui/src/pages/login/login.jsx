import { Component } from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/img/logospmed.png"

import "../../assets/css/login.css"

export default class login extends Component {
    render() {
        return (
            <div>
                <div className="conteudo_principal_login">
                    <section className="box_input">
                        <span>Login </span>
                        <div className="linha_login"></div>

                        <div className="input_login container">
                            <input type="email" placeholder="e-mail" />
                            <input type="password" placeholder="senha" />
                            <Link to="/">esqueci minha senha</Link>
                            <button type="submit" className="btn_login">entrar</button>
                        </div>
                    </section>
                    <div>
                        <div className="banner_login">
                            <span className="span_login">Bem vindo!</span>
                            <img src={logo} alt="logo_sp_med_group" class='logo_login'></img>
                            <span className="subtexto_banner_login">SP Medical Group</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}