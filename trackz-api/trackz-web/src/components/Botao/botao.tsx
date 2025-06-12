// Em es2-ufpi/trackz/Trackz-dev/trackz-web/src/components/Botao/botao.tsx
import React from 'react';
import styles from './botao.module.css';

interface BotaoProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string; // <--- ADICIONADO AQUI
}

class Botao extends React.Component<BotaoProps> {
  render() {
    const combinedClassName = `${styles.botao} ${this.props.className || ''}`.trim(); // <--- MODIFICADO AQUI
    return (
      <button
        className={combinedClassName} // <--- USAR A CLASSE COMBINADA
        onClick={this.props.onClick}
        type={this.props.type || 'button'}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Botao;