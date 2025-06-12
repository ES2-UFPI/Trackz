// es2-ufpi/trackz/Trackz-dev/trackz-web/src/pages/dashboard/Dashboard.tsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import dashStyles from './Dashboard.module.css'; // CSS Module para o Dashboard

const Dashboard: React.FC = () => {
  return (
    <div className={dashStyles.dashboardLayout}>
      <Navbar />
      <main className={dashStyles.dashboardMainContent}>
        <h2>Seu Feed de Músicas</h2>
        <p>
          Aqui você verá as publicações e atividades relacionadas às suas músicas
          e artistas favoritos. (Conteúdo a ser implementado nas próximas issues!)
        </p>
      </main>
      <footer className={dashStyles.dashboardFooter}>
        <p>&copy; {new Date().getFullYear()} TrackZ. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Dashboard;