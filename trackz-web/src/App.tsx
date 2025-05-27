import React from 'react';
import RotaPrivada from './routes/RotaPrivada';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Botao from './components/Botao/botao';
import Dashboard from './pages/dashboard/Dashboard';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial com os botões */}
        <Route
          path="/"
          element={
            <div className="App" style={{ textAlign: 'center', paddingTop: '100px' }}>
              <h1>Bem-vindo ao TrackZ!</h1>
              <nav style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                <Link to="/login">
                  <Botao>Login</Botao>
                </Link>
                <Link to="/cadastro">
                  <Botao>Cadastro</Botao>
                </Link>
              </nav>
            </div>
          }
        />

        {/* Demais páginas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/dashboard"
          element={
            <RotaPrivada>
              <Dashboard />
            </RotaPrivada>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
