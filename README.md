<div align="center">

```
     ██╗██████╗ ███████╗██████╗ ██████╗       ██╗
     ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗     ██╔╝
     ██║██████╔╝█████╗  ██║  ██║██║  ██║    ██╔╝ 
██   ██║██╔══██╗██╔══╝  ██║  ██║██║  ██║   ██╔╝  
╚█████╔╝██║  ██║███████╗██████╔╝██████╔╝  ██╔╝   
 ╚════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═════╝  ╚═╝    
    ████████╗ ██████╗  ██████╗ █████╗ ███╗  ██╗████████╗██╗███╗  ██╗███████╗
       ██╔══╝██╔═══██╗██╔════╝██╔══██╗████╗ ██║╚══██╔══╝██║████╗ ██║██╔════╝
       ██║   ██║   ██║██║     ███████║██╔██╗██║   ██║   ██║██╔██╗██║███████╗
       ██║   ██║   ██║██║     ██╔══██║██║╚████║   ██║   ██║██║╚████║╚════██║
       ██║   ╚██████╔╝╚██████╗██║  ██║██║ ╚███║   ██║   ██║██║ ╚███║███████║
       ╚═╝    ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚══╝   ╚═╝   ╚═╝╚═╝  ╚══╝╚══════╝
```

# 🌿 JREDD+ Tocantins

**Plataforma integrada de rastreabilidade e democratização de créditos de carbono**

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF008F?style=for-the-badge&logo=framer)

</div>

---

## 🌱 Sobre o Projeto

A **JREDD+ Tocantins** é uma solução tecnológica integrada de ponta a ponta criada para **democratizar o acesso** e garantir **total rastreabilidade** aos fundos de créditos de carbono. Estruturada funcionalmente em **cinco módulos principais**, a plataforma unifica a jornada do recurso ambiental — do registro ao beneficiário final — com transparência, segurança e acessibilidade.

> 🌳 *Tecnologia a serviço da floresta. Inovação a serviço das pessoas.*

---

## 🏗️ Arquitetura & Tecnologias

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Framework** | Next.js | 16.2.6 |
| **UI Library** | React | 19.2.4 |
| **Linguagem** | TypeScript | ^5 |
| **Estilização** | Tailwind CSS | ^4 |
| **Animações** | Framer Motion | ^12.40.0 |
| **Notificações** | Sonner | ^2.0.7 |
| **Utilitários CSS** | clsx + tailwind-merge | latest |
| **Variantes de Classes** | class-variance-authority | ^0.7.1 |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

---

### Passo a Passo

**1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/jredd-plus-to-app.git
cd jredd-plus-to-app
```

**2. Instale as dependências**

```bash
# com npm
npm install

# com yarn
yarn install

# com pnpm
pnpm install
```

**3. Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

> ✏️ Edite o arquivo `.env.local` com as configurações do seu ambiente.

**4. Rode o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

**5. Acesse no navegador**

```
http://localhost:3000
```

---

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor em modo produção |
| `npm run lint` | Executa o linter no projeto |

---

## ✅ Checklist de Objetivos

### 🏛️ Módulos da Plataforma

- [ ] **Módulo 1** — Cadastro e autenticação de usuários (beneficiários, gestores, auditores)
- [ ] **Módulo 2** — Registro e validação de projetos REDD+
- [ ] **Módulo 3** — Rastreabilidade do ciclo de vida dos créditos de carbono
- [ ] **Módulo 4** — Distribuição transparente de fundos aos beneficiários
- [ ] **Módulo 5** — Painel de monitoramento, relatórios e auditoria

### ⚙️ Infraestrutura & Qualidade

- [ ] Configuração de CI/CD (GitHub Actions ou similar)
- [ ] Testes unitários com Jest / Testing Library
- [ ] Testes E2E com Playwright ou Cypress
- [ ] Documentação da API/endpoints
- [ ] Acessibilidade (WCAG 2.1 AA)
- [ ] Responsividade mobile-first

### 🌐 Funcionalidades Gerais

- [ ] Landing page institucional
- [ ] Dashboard do beneficiário
- [ ] Dashboard do gestor
- [ ] Sistema de notificações em tempo real
- [ ] Exportação de relatórios em PDF/CSV
- [ ] Suporte a múltiplos idiomas (i18n)

### 🔐 Segurança

- [ ] Autenticação JWT / OAuth2
- [ ] Controle de papéis e permissões (RBAC)
- [ ] Auditoria de logs de ações críticas
- [ ] Proteção contra CSRF e XSS

---

## 📁 Estrutura do Projeto

```
jredd-plus-to-app/
├── 📂 app/                  # App Router do Next.js
│   ├── layout.tsx
│   └── page.tsx
├── 📂 components/           # Componentes reutilizáveis
├── 📂 lib/                  # Utilitários e helpers
├── 📂 public/               # Assets estáticos
├── 📂 styles/               # Estilos globais
├── .env.example             # Template de variáveis de ambiente
├── next.config.ts           # Configuração do Next.js
├── tailwind.config.ts       # Configuração do Tailwind
└── tsconfig.json            # Configuração do TypeScript
```

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Para contribuir:

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/minha-feature`)
3. Faça o **commit** das suas alterações (`git commit -m 'feat: adiciona minha feature'`)
4. Faça o **push** para a branch (`git push origin feature/minha-feature`)
5. Abra um **Pull Request**

> 💡 Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) nas mensagens de commit.

---

## 📄 Licença

Este projeto está sob licença privada. Todos os direitos reservados © JREDD+ Tocantins.

---

<div align="center">

**Feito com 💚 para o Tocantins e para o planeta**

🌿 *Cada linha de código, um passo pela floresta.*

</div>