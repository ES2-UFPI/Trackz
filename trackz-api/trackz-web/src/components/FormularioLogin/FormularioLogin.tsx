import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import Botao from '../Botao/botao'; //
import styles from './FormularioLogin.module.css'; //
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'; //
import { login } from '../../services/authService'; // 1. ADICIONE A IMPORTAÇÃO DA FUNÇÃO 'login'

interface ErrosLogin {
  usuario?: string;
  senha?: string;
  geral?: string;
}

const FormularioLogin: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState<ErrosLogin>({});
  const navigate = useNavigate();
  const authContext = useContext(AuthContext) as AuthContextType;

  const validarCampos = () => {
    const novosErros: ErrosLogin = {};
    if (!usuario) novosErros.usuario = 'Usuário é obrigatório.';
    if (!senha) novosErros.senha = 'Senha é obrigatória.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validarCampos()) return;

    setErros(prev => ({ ...prev, geral: undefined }));

    try {
      const dadosParaLogin = { username: usuario, senha };
      // 2. USE A FUNÇÃO 'login' DIRETAMENTE
      const data = await login(dadosParaLogin);

      if (authContext && data.access_token) {
        authContext.login(data.access_token);
        navigate('/dashboard');
      } else {
        throw new Error('Não foi possível obter o token de acesso.');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      setErros(prev => ({ ...prev, geral: error.message || 'Ocorreu um erro.' }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
        {erros.geral && <span className={styles.errorGeral}>{erros.geral}</span>}
      <div className={styles.campo}>
        <label htmlFor="usuario">Usuário</label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Digite seu usuário"
          className={styles.input} // Garanta que a classe de estilo do input está aqui
        />
        {erros.usuario && <span className={styles.erro}>{erros.usuario}</span>}
      </div>
      <div className={styles.campo}>
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          className={styles.input} // Garanta que a classe de estilo do input está aqui
        />
        {erros.senha && <span className={styles.erro}>{erros.senha}</span>}
      </div>
      <Botao type="submit">Entrar</Botao>
    </form>
  );
};

export default FormularioLogin;