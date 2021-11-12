import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import reportWebVitals from './reportWebVitals';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from './App';
import Login from './pages/login/login.jsx';
import consultasAdm from './pages/consulta/listarAdm/listarAdm';
import consultasMedico from './pages/consulta/listarMedicos/listarMedico';
import consultasPaciente from './pages/consulta/listarPaciente/listarPacientes';


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path='/login' component={Login}/>
        <Route path='/consultas/adm' component={consultasAdm}/>
        <Route path='/consultas/medico' component={consultasMedico}/>
        <Route path='/consultas/paciente' component={consultasPaciente}/>
        <Redirect to ='/'></Redirect>
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
