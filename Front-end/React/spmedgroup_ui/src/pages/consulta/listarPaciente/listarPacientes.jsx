import { Component } from "react";
import axios from 'axios';

import logo from "../../../assets/img/logospmed.png"


export default class consultasPaciente extends Component {
    render() {
        return (
            <div>
                <main>
                    <aside>
                        <img src={logo}></img>
                        <span>nome</span>
                        <span>consultas</span>
                    </aside>
                    <section>
                        <h2>Consultas</h2>
                        <hr></hr>
                        <section>
                            <input type="search"></input>
                            <h3>Lista de consultas</h3>
                            <section>
                                <ul>
                                    <il>03/09/2021</il>
                                    <hr></hr>
                                    <li>paciente</li>
                                </ul>
                                
                        </section>
                        </section>
                    </section>
                </main>
            </div>
        )
    }
}