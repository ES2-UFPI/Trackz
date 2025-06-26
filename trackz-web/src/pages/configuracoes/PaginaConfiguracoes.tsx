import React, { useState, FormEvent } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Botao from '../../components/Botao/botao';
import styles from './PaginaConfiguracoes.module.css';

const PaginaConfiguracoes: React.FC = () => {
  const [email, setEmail] = useState('antonio.anderson@email.com'); // Email mockado
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`(Simulação) E-mail seria alterado para: ${email}`);
  };
  
  const handleSenhaSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (novaSenha !== confirmarNovaSenha) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }
    alert('(Simulação) A senha seria alterada.');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarNovaSenha('');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.contentContainer}>
        <h1 className={styles.header}>Configurações da Conta</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Alterar E-mail</h2>
          <form onSubmit={handleEmailSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Endereço de e-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            <Botao type="submit">Salvar E-mail</Botao>
          </form>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Alterar Senha</h2>
          <form onSubmit={handleSenhaSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="senha-atual">Senha Atual</label>
              <input
                id="senha-atual"
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="nova-senha">Nova Senha</label>
              <input
                id="nova-senha"
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className={styles.input}
                placeholder="Pelo menos 6 caracteres"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmar-nova-senha">Confirmar Nova Senha</label>
              <input
                id="confirmar-nova-senha"
                type="password"
                value={confirmarNovaSenha}
                onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                className={styles.input}
              />
            </div>
            <Botao type="submit">Alterar Senha</Botao>
          </form>
        </section>
      </main>
    </div>
  );
};

export default PaginaConfiguracoes;