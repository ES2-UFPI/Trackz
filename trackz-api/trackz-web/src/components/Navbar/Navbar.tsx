// Em es2-ufpi/trackz/Trackz-dev/trackz-web/src/components/Navbar/Navbar.tsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'; // Import tipo correto
import Botao from '../Botao/botao';
import navStyles from './Navbar.module.css'; // Arquivo CSS Module para o Navbar

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate('/login');
  };

  return (
    <header className={navStyles.navbarHeader}>
      <nav className={navStyles.navbarNav}>
        <h1 className={navStyles.navbarBrand}>
          <Link to="/dashboard">TrackZ</Link>
        </h1>
        <ul className={navStyles.navbarLinks}>
          {isAuthenticated && (
            <>
              <li><Link to="/dashboard">Feed</Link></li>
              <li><Link to="/perfil">Perfil</Link></li>
              <li><Link to="/explorar">Explorar</Link></li>
              <li><Link to="/configuracoes">Configurações</Link></li>
              <li>
                <Botao onClick={handleLogout} className={navStyles.navbarLogoutButton}>
                  Logout
                </Botao>
              </li>
            </>
          )}
          {!isAuthenticated && ( // Exemplo se o navbar fosse usado fora de rotas protegidas
             <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;