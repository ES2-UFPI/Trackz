import { useState } from 'react';
import Botao from '../../components/Botao/botao';
import styles from './login.module.css'; // Caminho relativo, correto
import FormularioLogin from '../../components/FormularioLogin/FormularioLogin';


export function Login() {
  return (
    <div className={styles.container}>
        <h1 className={styles.header}>Login</h1>
        <FormularioLogin />
    </div>
  );
}
export default Login;