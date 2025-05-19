import React from 'react';
import styles from './botao.module.css'; // Importando o CSS Module

interface BotaoProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

class Botao extends React.Component<BotaoProps> {
  render() {
    return (
      <button
        className={styles.botao} // Aplicando a classe do CSS Module
        onClick={this.props.onClick}
        type={this.props.type || 'button'}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Botao;
