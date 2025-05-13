# Trackz
# 🎵 TrackZ

**TrackZ** é uma aplicação social onde usuários podem interagir através de músicas, comentando, postando e se conectando com outros ouvintes. O sistema utiliza a API do Spotify para buscar faixas e álbuns.

---

## 🚀 Tecnologias

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Banco de Dados:** PostgreSQL + Prisma ORM
- **API Externa:** Spotify Web API
- **Autenticação:** JWT
- **CI/CD:** GitHub Actions

---

## 📁 Estrutura do Projeto

trackz/
├── backend/ # Código do servidor e API
│ ├── src/
│ └── prisma/
├── frontend/ # Aplicação React (interface)
├── .github/workflows/ # Workflows de CI
├── README.md



## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL
- npm ou yarn
- Conta no Spotify Developer (para gerar token)

### Passos

# Clonar o repositório
git clone https://github.com/seu-usuario/trackz.git
cd trackz

Este projeto utiliza GitHub Actions para:

Build e testes automáticos do backend e frontend

Integração contínua a cada push na branch main

Workflows definidos em: .github/workflows/ci.yml

👥 Equipe
Marcos Vinicius: Backend

Antonio Anderson: Frontend

Gabriel Leonardo: Infraestrutura e suporte

