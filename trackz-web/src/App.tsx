import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import Dashboard from './pages/dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import RotaPrivada from './routes/RotaPrivada';
import PaginaPerfil from './pages/perfil/PaginaPerfil';
import PaginaExplorar from './pages/explorar/Explorar';
import PaginaAlbum from './pages/album/PaginaAlbum';
import { NotificationProvider } from './contexts/NotificationContext';
// 1. Caminho de importação corrigido
import NotificationContainer from './components/NotificantionContainer/NotificationContainer';
import PaginaConfiguracoes from './pages/configuracoes/PaginaConfiguracoes';
import { SkeletonTheme } from 'react-loading-skeleton'; // 1. IMPORTE O SKELETONTHEME



function App() {
  return (
    // A ordem dos providers não importa aqui, mas eles devem envolver o Router
    <AuthProvider>
      <NotificationProvider>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Router>
          {/* 2. O NotificationContainer é renderizado aqui para aparecer em todas as páginas */}
          <NotificationContainer />
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
            
            {/* Rota de Detalhes do Álbum */}
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
                    </SkeletonTheme>

      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;