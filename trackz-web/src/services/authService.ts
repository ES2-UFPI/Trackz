// src/services/authService.ts
const API_URL = 'http://localhost:3002'; // A URL do seu backend NestJS

// Interface para os dados de login, para consistência
interface LoginData {
  username: string;
  senha: string;
}

// Interface para os dados de cadastro
interface RegisterData {
  nome: string;
  email: string;
  username: string;
  senha: string;
}

// Função de Login
export const login = async (data: LoginData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Lança um erro com a mensagem vinda do backend para ser capturado no componente
    throw new Error(errorData.message || 'Falha no login');
  }

  return response.json(); // Retorna o { access_token }
};

// Nova Função de Cadastro
export const register = async (data: RegisterData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Lança um erro com a mensagem do backend (ex: "Email já cadastrado")
    throw new Error(errorData.message || 'Falha no cadastro');
  }

  return response.json(); // Retorna os dados do usuário criado (sem a senha)
};