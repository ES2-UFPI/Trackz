import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login/login'; //
import Cadastro from './pages/cadastro/cadastro'; //
import Dashboard from './pages/dashboard/Dashboard'; //
import { AuthProvider } from './contexts/AuthContext'; //
import RotaPrivada from './routes/RotaPrivada'; //
import Explorar from './pages/explorar/Explorar';

// --- Componentes Placeholder para novas rotas ---
// Você pode criar arquivos separados para eles em 'src/pages/' depois,
// mas por enquanto, podemos defini-los aqui para simplicidade.

const PaginaPerfil: React.FC = () => (
  <div>
    {/* Idealmente, aqui também teria o Navbar se for uma página autenticada */}
    {/* import Navbar from './components/Navbar/Navbar'; <Navbar /> */}
    <h1>Perfil do Usuário</h1>
    <p>Esta página exibirá e permitirá a edição do perfil do usuário.</p>
    <p><Link to="/dashboard">Voltar para o Dashboard</Link></p>
  </div>
);

const PaginaConfiguracoes: React.FC = () => (
  <div>
    {/* <Navbar /> */}
    <h1>Configurações</h1>
    <p>Esta página permitirá que o usuário ajuste as configurações da sua conta e da aplicação.</p>
    <p><Link to="/dashboard">Voltar para o Dashboard</Link></p>
  </div>
);
// --- Fim dos Componentes Placeholder ---


function App() {
  return (
    <AuthProvider> {/* O AuthProvider envolve todas as rotas */}
      <Router> {/* BrowserRouter como Router para gerenciar o histórico de navegação */}
        {/* Não há necessidade de um Navbar global aqui se cada página principal (como Dashboard) já o inclui */}
        <Routes> {/* Contêiner para todas as rotas individuais */}
          {/* Rota Inicial - Página de "Boas-vindas" ou redirecionamento */}
          <Route path="/" element={
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
              <h1>Bem-vindo ao TrackZ!</h1>
              <p>Sua bússola para o mundo da música.</p>
              <nav>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ margin: '10px' }}><Link to="/login" style={{ textDecoration: 'none', color: '#8a2be2', fontWeight: 'bold' }}>Login</Link></li>
                  <li style={{ margin: '10px' }}><Link to="/cadastro" style={{ textDecoration: 'none', color: '#8a2be2', fontWeight: 'bold' }}>Cadastro</Link></li>
                  {/* Opcional: Link direto para o dashboard, será protegido pela RotaPrivada */}
                  {/* <li style={{ margin: '10px' }}><Link to="/dashboard" style={{ textDecoration: 'none', color: '#1DB954', fontWeight: 'bold' }}>Dashboard</Link></li> */}
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
          <Route path="/explorar" element={<RotaPrivada><Explorar /></RotaPrivada>} />
          <Route path="/explorar" element={<RotaPrivada><Explorar /></RotaPrivada>} />
          <Route path="/configuracoes" element={<RotaPrivada><PaginaConfiguracoes /></RotaPrivada>} />

          {/* Opcional: Uma rota "Não Encontrado" (404) */}
          <Route path="*" element={
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
              <h1>404 - Página Não Encontrada</h1>
              <p>Oops! A página que você está procurando não existe.</p>
              <p><Link to="/" style={{ textDecoration: 'none', color: '#8a2be2', fontWeight: 'bold' }}>Voltar para a Página Inicial</Link></p>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;