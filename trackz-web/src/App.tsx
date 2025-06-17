import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import Dashboard from './pages/dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import RotaPrivada from './routes/RotaPrivada';
import PaginaExplorar from './pages/explorar/Explorar'; // Renomeado de 'Explorar' para 'PaginaExplorar' para consistência
import PaginaAlbum from './pages/album/PaginaAlbum';

// --- Componentes Placeholder para futuras páginas ---
const PaginaPerfil: React.FC = () => (
  <div>
    <h1>Perfil do Usuário (Em construção)</h1>
    <p><Link to="/dashboard">Voltar para o Dashboard</Link></p>
  </div>
);

const PaginaConfiguracoes: React.FC = () => (
  <div>
    <h1>Configurações (Em construção)</h1>
    <p><Link to="/dashboard">Voltar para o Dashboard</Link></p>
  </div>
);
// --- Fim dos Componentes Placeholder ---


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