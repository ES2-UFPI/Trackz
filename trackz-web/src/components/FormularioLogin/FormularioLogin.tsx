import React, { useState } from 'react';
import Botao from '../Botao/botao';
import styles from './FormularioLogin.module.css';
import { login } from '../../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


const FormularioLogin = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState<{ usuario?: string; senha?: string }>({});
  const { login: loginContext } = useContext(AuthContext);


  const validarCampos = () => {
    const novosErros: { usuario?: string; senha?: string } = {};

    if (!usuario.trim()) {
      novosErros.usuario = 'Usuário é obrigatório.';
    }

    if (!senha) {
      novosErros.senha = 'Senha é obrigatória.';
    } else if (senha.length < 6) {
      novosErros.senha = 'Senha deve ter pelo menos 6 caracteres.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0; // sem erros?
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validarCampos()) return;
  
    try {
      const token = await login(usuario, senha); // << usa o serviço
  
      if (token) {
        loginContext(token); // ✅ atualiza o contexto e salva no localStorage
        alert('Login realizado com sucesso!');
        // Redirecionar aqui se quiser
      } else {
        alert('Usuário ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão. Verifique sua internet ou o servidor.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <div className={styles.campo}>
        <label htmlFor="usuario">Usuário</label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Digite seu usuário"
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
        />
        {erros.senha && <span className={styles.erro}>{erros.senha}</span>}
      </div>

      <Botao type="submit">Entrar</Botao>
    </form>
  );
};

export default FormularioLogin;
