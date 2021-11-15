import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from "../../../components/header/header"
import MenuLateral from "../../../components/menu_lateral/menu_lateral"
import Footer from "../../../components/footer/footer";

import "../../../assets/css/style.css"

export default function ConsultasMedico() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [idConsulta, setidConsulta] = useState(0);
    const [novadescricao, setNovaDescricao] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    function buscarConsultasMedico() {

        axios('http://localhost:5000/api/Consultas/Medico', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setListaConsultas(response.data)
            }
        }).catch(erro => console.log(erro))
    }

    useEffect(buscarConsultasMedico, []);

    function limparCampos() {
        setNovaDescricao('');
    }

    function alterarDescricao(event) {
        event.preventDefault();

        setIsLoading(true);

        axios.patch('http://localhost:5000/api/Consultas/descricao/' + idConsulta, {
            descricao: novadescricao
        },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                }
            }).then(response => {
                if (response.status === 200) {
                    console.log("descrição atualizada!");

                    setIsLoading(false);
                }
            })
            .then(buscarConsultasMedico)
            .then(limparCampos)
            .catch(erro => console.log(erro), setNovaDescricao(''), setIsLoading(false));
    }

    return (
        <div>
            <main>
                <MenuLateral />
                <Header />

                <section className="container_consultas" id="container_consultas">
                    <h2>Consultas <hr></hr></h2>

                    <section className="container_fundo">
                        <h3>Lista de consultas</h3>
                        <div className="container_box">
                            <div className="container_box_listagem">
                                {
                                    listaConsultas.map((consulta) => {
                                        return (
                                            <section className="box_consulta" key={consulta.idConsulta}>
                                                <ul>
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
                                                    <li>situação: </li>
                                                    <p className="subtext_consulta">{consulta.idSituacaoNavigation.statusSituacao}</p>
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
                                            </section>
                                        );
                                    })
                                }

                            </div>
                            <section className="box_cadastro_consulta">
                                <form onSubmit={alterarDescricao}>
                                    <ul>
                                        <li className="subtext_consulta">Buscar Consulta</li>
                                        <hr></hr>
                                        <div className="separacao_consulta">

                                            <select
                                                className="select_descricao"
                                                name="idConsulta"
                                                onChange={(campo) => setidConsulta(campo.target.value)}
                                                value={idConsulta}>
                                                <option aria-disabled="true" value="0" disabled>Selecione uma consulta</option>
                                                {
                                                    listaConsultas.map((consulta) => {
                                                        return (
                                                            <option key={consulta.idConsulta} value={consulta.idConsulta}>{Intl.DateTimeFormat("pt-BR",
                                                                {
                                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                                    hour: 'numeric', minute: 'numeric'
                                                                }
                                                            ).format(new Date(consulta.dataConsulta))}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>
                                        <div className="descricao_consulta">
                                            <span>Descrição
                                            </span>
                                            <input
                                                required
                                                type='text'
                                                name='novadescricao'
                                                value={novadescricao}
                                                onChange={(campo) => setNovaDescricao(campo.target.value)}>
                                            </input>
                                        </div>
                                        {
                                            !isLoading ? <button type="submit" className="btn_consulta" disabled={novadescricao === ''}>Adicionar Descricao</button> : <button type="submit" className="btn_consulta" disabled>Carregando...</button>
                                        }
                                    </ul>
                                </form>

                            </section>
                        </div>


                    </section>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}