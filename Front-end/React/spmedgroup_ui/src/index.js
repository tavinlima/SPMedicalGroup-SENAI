import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import reportWebVitals from './reportWebVitals';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Login from './pages/login/login.jsx';
import consultasAdm from './pages/consulta/listarAdm/listarAdm';
import consultasMedico from './pages/consulta/listarMedicos/listarMedico';
import consultasPaciente from './pages/consulta/listarPaciente/listarPacientes';
import { parseJwt, usuarioAutenticado } from './services/auth';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoMedico = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoPaciente = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '3' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path='/login' component={Login} />
        <PermissaoAdm path='/consultas/adm' component={consultasAdm} />
        <PermissaoMedico path='/consultas/medico' component={consultasMedico} />
        <PermissaoPaciente path='/consultas/paciente' component={consultasPaciente} />
        <Redirect to='/login'></Redirect>
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