import logo from "../../../src/assets/img/logo_white.png"
import perfil_foto from "../../../src/assets/img/perfilcebolateams.jpg"
import calendar from "../../../src/assets/img/calendar.png"

import { parseJwt } from '../../services/auth';

export default function MenuLateral() {
    return (
        <section className="menu_lateral">
            <div className="conteudo_menu">
                <img src={logo} alt="logo_sp_med" className="logo_menu"></img>
                <div className="div_icon">
                    <img src={perfil_foto} alt="imagem_perfil" className="imagem_perfil_consulta"></img>
                    <p>{parseJwt().name}</p>
                </div>
                <a className="div_icon" href='#container_consultas'>
                    <img src={calendar} alt="icon_calendar" className="calendar_menu"></img>
                    <span>consultas</span>
                </a>
            </div>
        </section>
    )
}