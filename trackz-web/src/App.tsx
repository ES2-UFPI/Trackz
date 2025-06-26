import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import Dashboard from './pages/dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import RotaPrivada from './routes/RotaPrivada';
import PaginaPerfil from './pages/perfil/PaginaPerfil';
import PaginaExplorar from './pages/explorar/Explorar'; // Renomeado de 'Explorar' para 'PaginaExplorar' para consistência
import PaginaAlbum from './pages/album/PaginaAlbum';
import PaginaConfiguracoes from './pages/configuracoes/PaginaConfiguracoes'; // 1. IMPORTE O NOVO COMPONENTE



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota Inicial Pública */}
          <Route path="/" element={
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
              <h1>Bem-vindo ao TrackZ!</h1>
              <nav>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ margin: '10px' }}><Link to="/login">Login</Link></li>
                  <li style={{ margin: '10px' }}><Link to="/cadastro">Cadastro</Link></li>
                </ul>
              </nav>
            </div>
          } />

          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas Privadas (Protegidas) */}
          <Route path="/dashboard" element={<RotaPrivada><Dashboard /></RotaPrivada>} />
          <Route path="/perfil" element={<RotaPrivada><PaginaPerfil /></RotaPrivada>} />
          <Route path="/explorar" element={<RotaPrivada><PaginaExplorar /></RotaPrivada>} />
          <Route path="/configuracoes" element={<RotaPrivada><PaginaConfiguracoes /></RotaPrivada>} />
          <Route path="/perfil" element={<RotaPrivada><PaginaPerfil /></RotaPrivada>} />
          <Route path="/configuracoes" element={<RotaPrivada><PaginaConfiguracoes /></RotaPrivada>} />

          
          {/* ESTA É A ROTA CRÍTICA QUE DEVE EXISTIR */}
          <Route path="/album/:albumId" element={<RotaPrivada><PaginaAlbum /></RotaPrivada>} />

          {/* Rota "Não Encontrado" (404) */}
          <Route path="*" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>404 - Página Não Encontrada</h1>
              <p><Link to="/">Voltar para a Página Inicial</Link></p>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;