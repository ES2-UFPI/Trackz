import FormularioCadastro from '../../components/FormularioCadastro/FormularioCadastro';
import styles from './cadastro.module.css';

export function Cadastro() {
  return (
    <div className={styles.container}>
        <h1 className={styles.header}>Cadastrar Usuário</h1>
        <FormularioCadastro />
    </div>
  );
}

export default Cadastro;
