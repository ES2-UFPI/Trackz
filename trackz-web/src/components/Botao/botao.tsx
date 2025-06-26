import React from 'react';
import styles from './botao.module.css';

interface BotaoProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string; // Já havíamos adicionado esta
  disabled?: boolean; // 1. Adicione a prop 'disabled' aqui
}

class Botao extends React.Component<BotaoProps> {
  render() {
    const combinedClassName = `${styles.botao} ${this.props.className || ''}`.trim();

    return (
      <button
        className={combinedClassName}
        onClick={this.props.onClick}
        type={this.props.type || 'button'}
        disabled={this.props.disabled} // 2. Passe a prop para o botão HTML
      >
        {this.props.children}
      </button>
    );
  }
}

export default Botao;