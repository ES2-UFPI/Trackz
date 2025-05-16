import React, { useState } from "react";
import styles from "./FormularioCadastro.module.css";
import Botao from "../Botao/botao";

const FormularioCadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erros, setErros] = useState<{ [campo: string]: string }>({});

    const validarCampos = () => { {
    const novosErros: { [campo: string]: string } = {};

    if (!email.includes('@')) novosErros.email = 'E-mail inválido.';
    if (senha.length < 6) novosErros.senha = 'Senha precisa ter pelo menos 6 caracteres.';
    if (senha !== confirmarSenha) novosErros.confirmarSenha = 'Senhas não coincidem.';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
   };
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validarCampos()) {
            alert("Por favor, corrija os erros no formulário.");
            return; 
        }
        console.log('Cadastro enviado:', { nome, email, usuario, senha });
        setTimeout(() => {
        alert(`Usuário cadastrado com sucesso!`);
        // Aqui você pode simular navegação também
    }, 1000); // 1 segundo de simulação
    };
    return (
        <form className={styles.form} onSubmit={handleSubmit}>

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