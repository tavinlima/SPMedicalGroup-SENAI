import React from 'react'

import perfil_foto from "../../assets/img/perfilcebolateams.jpg"
 export default function Header(){
 
      return(
            <header>
                <div>
                    <img src={perfil_foto} alt="foto_de_perfil" className="imagem_perfil_consulta"></img>
                </div>
            </header>
      )
}