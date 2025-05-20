export async function login(usuario: string, senha: string): Promise<string | null> {
  try {
    const response = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Erro no serviço de login:', error);
    return null;
  }
}
