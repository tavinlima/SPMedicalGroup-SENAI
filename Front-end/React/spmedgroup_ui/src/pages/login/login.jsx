import { Component } from "react";

import banner from "../../assets/img/imglogin.png"
import logo from "../../assets/img/logospmed.png"

import "../../assets/css/login.css"

export default class login extends Component {
    render(){
        return (
            <div>
                <main>
                    <a href="http://localhost:3000/">Home</a>
                    <section className="box_input">
                        <span>Login</span>
                        <div className="input_login container">
                            <input type="email" placeholder="e-mail" />
                            <input type="password" placeholder="senha" />
                            <a>esqueci minha senha</a>
                            <button type="submit">entrar</button>
                        </div>
                    </section>
                    <div>
                        <img src={banner} alt="banner" class="img_banner"></img>
                        <span>Bem vindo!</span>
                        <img src={logo} alt="logo_sp_med_group"></img>
                        <span>SP Medical Group</span>
                    </div>
                </main>
            </div>
        )
    }
}