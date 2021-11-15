import React from 'react'
import { parseJwt } from '../../services/auth';

import perfil_foto from "../../assets/img/perfilcebolateams.jpg"

export default function Header() {

    return (
        <header>
            <nav className="container">
                <img src={perfil_foto} alt="foto_de_perfil" className="imagem_perfil_header"></img>
                <p>{parseJwt().name}</p>
            </nav>
        </header>
    )
}