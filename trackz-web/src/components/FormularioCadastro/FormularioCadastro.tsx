import React, { useState } from "react";
import styles from "./FormularioCadastro.module.css";
import Botao from "../Botao/botao";
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate para redirecionar


const FormularioCadastro = () => {

    interface IErros {
    nome?: string;
    email?: string;
    usuario?: string;
    senha?: string;
    confirmarSenha?: string;
    geral?: string; // Adicione 'geral' aqui também se for usá-lo
    }

    const navigate = useNavigate(); // Inicialize o useNavigate
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erros, setErros] = useState<IErros>({});

    const validarCampos = () => { {
    const novosErros: { [campo: string]: string } = {};

    if (!email.includes('@')) novosErros.email = 'E-mail inválido.';
    if (senha.length < 6) novosErros.senha = 'Senha precisa ter pelo menos 6 caracteres.';
    if (senha !== confirmarSenha) novosErros.confirmarSenha = 'Senhas não coincidem.';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
   };
    }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarCampos()) { // Adapte sua função validarCampos se necessário
        return;
    }

    setErros(prev => ({ ...prev, geral: undefined }));

    try {
        // A CORREÇÃO ESTÁ AQUI: a chave agora é 'username'
        const dadosParaCadastro = { nome, email, username: usuario, senha };
        
        const usuarioCriado = await register(dadosParaCadastro);
        
        console.log('Usuário cadastrado:', usuarioCriado);
        alert(`Usuário ${usuarioCriado.username} cadastrado com sucesso! Você será redirecionado para o login.`);

        navigate('/login');

    } catch (error: any) {
        console.error('Erro no cadastro:', error);
        setErros(prev => ({ ...prev, geral: error.message || 'Ocorreu um erro desconhecido.' }));
    }
};
    return (
        
        <form className={styles.form} onSubmit={handleSubmit}>
            {erros.geral && <span className={styles.errorGeral}>{erros.geral}</span>}
            <label>
                Nome Completo:
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={styles.input}
                    required
                    placeholder="Digite seu nome completo"/>
                    
                {erros.nome && <span className={styles.error}>{erros.nome}</span>}
            </label>

            <label>
                Email:
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                    placeholder="Digite um email válido"/>
                {erros.email && <span className={styles.error}>{erros.email}</span>} 
            </label>

            <label>
                Nome de Usuário:
                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className={styles.input}
                    required
                    placeholder="Digite um nome de usuário"/>
                    
                {erros.usuario && <span className={styles.error}>{erros.usuario}</span>}
            </label>

            <label>
                Senha:
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className={styles.input}
                    required
                    placeholder="Digite uma senha"/>
                    
                {erros.senha && <span className={styles.error}>{erros.senha}</span>}
            </label>
            
            <label>
                Confirmar Senha:
                <input
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className={styles.input}
                    required
                    placeholder="Confirme a senha digitada"/>
                    
                   
                {erros.confirmarSenha && <span className={styles.error}>{erros.confirmarSenha}</span>}   
            </label>
            <Botao type="submit"> Cadastrar </Botao>
            </form>
    )
    }
export default FormularioCadastro;