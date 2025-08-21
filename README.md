# Car Manager - Sistema de Gestão de Veículos

Um sistema web moderno para gerenciamento de veículos, desenvolvido com Next.js 15 e TypeScript.

## 🚗 Sobre o Projeto

A aplicação web que permite:

- **Cadastro e gestão de veículos**: Adicionar, editar e remover veículos da frota
- **Controle de status**: Ativar/desativar veículos conforme necessário
- **Dashboard interativo**: Visualização em tempo real do status da frota
- **Relatórios**: Histórico de atividades e movimentações dos veículos
- **Autenticação segura**: Sistema de login e registro de usuários

## 🌐 Acesso Online

**Visualize o projeto em:** [car-manager.vercel.app](car-manager-front.vercel.app)

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilização**: Tailwind CSS
- **UI Components**: Radix UI, Lucide React
- **Formulários**: React Hook Form + Zod
- **Notificações**: React Toastify
- **HTTP Client**: Axios

## 🚀 Como Executar Localmente

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd car-manager-front
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── (auth)/            # Rotas de autenticação
│   ├── (private)/         # Rotas privadas (dashboard, relatórios)
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── auth/             # Componentes de autenticação
│   ├── dashboard/        # Componentes do dashboard
│   ├── reports/          # Componentes de relatórios
│   └── ui/               # Componentes de interface
├── hooks/                # Custom hooks
├── lib/                  # Configurações e utilitários
├── services/             # Serviços de API
└── styles/               # Estilos globais
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 📝 Funcionalidades Principais

### Dashboard
- Visão geral da frota de veículos
- Resumo de status (ativos/inativos)
- Lista de veículos com ações rápidas

### Gestão de Veículos
- Cadastro de novos veículos
- Edição de informações (modelo, placa)
- Ativação/desativação de veículos
- Exclusão de veículos

### Relatórios
- Histórico de atividades
- Movimentações dos veículos
- Relatórios detalhados

### Autenticação
- Sistema de login e registro
- Proteção de rotas privadas
- Gerenciamento de sessão

## 🚀 Deploy

O projeto está configurado para deploy automático na Vercel. Qualquer push para a branch principal gera uma nova versão em produção.

---

Desenvolvido com ❤️ usando Next.js e TypeScript
