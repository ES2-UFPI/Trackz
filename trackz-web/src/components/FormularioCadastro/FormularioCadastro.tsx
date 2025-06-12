import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./FormularioCadastro.module.css";
import Botao from "../Botao/botao";
import { register } from '../../services/authService'; // Importando a função de cadastro

interface IFormulario {
  nome: string;
  email: string;
  username: string; // Usando 'username' para consistência com o DTO do backend
  senha: string;
  confirmarSenha: string;
}

interface IErros {
  nome?: string;
  email?: string;
  username?: string;
  senha?: string;
  confirmarSenha?: string;
  geral?: string;
}

const FormularioCadastro: React.FC = () => {
    const [formulario, setFormulario] = useState<IFormulario>({
      nome: "",
      email: "",
      username: "",
      senha: "",
      confirmarSenha: "",
    });
    const [erros, setErros] = useState<IErros>({});
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormulario(prev => ({ ...prev, [name]: value }));
      if (erros[name as keyof IErros]) {
        setErros(prev => ({ ...prev, [name]: undefined }));
      }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let novosErros: IErros = {};

        // Validações
        if (!formulario.nome.trim()) novosErros.nome = "Nome completo é obrigatório.";
        if (!formulario.email.trim()) {
            novosErros.email = "E-mail é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(formulario.email)) {
            novosErros.email = 'E-mail inválido.';
        }
        if (!formulario.username.trim()) novosErros.username = "Nome de usuário é obrigatório.";
        if (!formulario.senha) {
            novosErros.senha = 'Senha é obrigatória.';
        } else if (formulario.senha.length < 6) {
            novosErros.senha = 'Senha precisa ter pelo menos 6 caracteres.';
        }
        if (formulario.senha !== formulario.confirmarSenha) {
            novosErros.confirmarSenha = 'As senhas não coincidem.';
        }

        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros);
            return;
        }

        setErros({});

        try {
            // Prepara os dados para a API (sem o campo de confirmar senha)
            const dadosParaApi = {
                nome: formulario.nome,
                email: formulario.email,
                username: formulario.username,
                senha: formulario.senha
            };

            await register(dadosParaApi);
            alert(`Usuário ${formulario.username} cadastrado com sucesso! Você será redirecionado.`);
            navigate('/login');

        } catch (error: any) {
            console.error('Erro no cadastro:', error);
            setErros(prev => ({ ...prev, geral: error.message || 'Ocorreu um erro desconhecido.' }));
        }
    };

    // A CORREÇÃO ESTÁ NO JSX ABAIXO:
    return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* ... (local para erro geral, se houver) ... */}

      {/* Campo Nome Completo */}
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="cadastro-nome">
          Nome Completo:
          <input
            id="cadastro-nome" // ID para o Cypress encontrar
            type="text"
            name="nome"
            value={formulario.nome}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Digite seu nome completo"
          />
          {erros.nome && <span className={styles.error}>{erros.nome}</span>}
        </label>
      </div>

      {/* Campo Email */}
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="cadastro-email">
          Email:
          <input
            id="cadastro-email" // ID para o Cypress encontrar
            type="email"
            name="email"
            value={formulario.email}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Digite um email válido"
          />
          {erros.email && <span className={styles.error}>{erros.email}</span>}
        </label>
      </div>

      {/* Campo Usuário */}
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="cadastro-usuario">
          Usuário:
          <input
            id="cadastro-usuario" // ID para o Cypress encontrar
            type="text"
            name="username" // Usando 'username' para consistência
            value={formulario.username}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Digite um nome de usuário"
          />
          {erros.username && <span className={styles.error}>{erros.username}</span>}
        </label>
      </div>

      {/* Campo Senha */}
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="cadastro-senha">
          Senha:
          <input
            id="cadastro-senha" // ID para o Cypress encontrar
            type="password"
            name="senha"
            value={formulario.senha}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Digite uma senha (mín. 6 caracteres)"
          />
          {erros.senha && <span className={styles.error}>{erros.senha}</span>}
        </label>
      </div>

      {/* Campo Confirmar Senha */}
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="cadastro-confirmar-senha">
          Confirmar Senha:
          <input
            id="cadastro-confirmar-senha" // ID para o Cypress encontrar
            type="password"
            name="confirmarSenha"
            value={formulario.confirmarSenha}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Confirme a senha digitada"
          />
          {erros.confirmarSenha && <span className={styles.error}>{erros.confirmarSenha}</span>}   
        </label>
      </div>
      
      <Botao type="submit"> Cadastrar </Botao>
    </form>
);
};

export default FormularioCadastro;