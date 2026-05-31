<div align="center">

```
███████╗ ██████╗ ██████╗ ██╗   ██╗███████╗██████╗ ████████╗██╗ ██████╗███████╗
██╔════╝██╔════╝██╔═══██╗██║   ██║██╔════╝██╔══██╗╚══██╔══╝██║██╔════╝██╔════╝
█████╗  ██║     ██║   ██║██║   ██║█████╗  ██████╔╝   ██║   ██║██║     █████╗  
██╔══╝  ██║     ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗   ██║   ██║██║     ██╔══╝  
███████╗╚██████╗╚██████╔╝ ╚████╔╝ ███████╗██║  ██║   ██║   ██║╚██████╗███████╗
╚══════╝ ╚═════╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝
    ████████╗ ██████╗  ██████╗ █████╗ ███╗  ██╗████████╗██╗███╗  ██╗███████╗
       ██╔══╝██╔═══██╗██╔════╝██╔══██╗████╗ ██║╚══██╔══╝██║████╗ ██║██╔════╝
       ██║   ██║   ██║██║     ███████║██╔██╗██║   ██║   ██║██╔██╗██║███████╗
       ██║   ██║   ██║██║     ██╔══██║██║╚████║   ██║   ██║██║╚████║╚════██║
       ██║   ╚██████╔╝╚██████╗██║  ██║██║ ╚███║   ██║   ██║██║ ╚███║███████║
       ╚═╝    ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚══╝   ╚═╝   ╚═╝╚═╝  ╚══╝╚══════╝
```

# 🌿 EcoVertice Tocantins

**Plataforma integrada de rastreabilidade e democratização de créditos de carbono**

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF008F?style=for-the-badge&logo=framer)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet)

</div>

---

## 🌱 Sobre o Projeto

A **EcoVertice Tocantins** é uma solução tecnológica integrada de ponta a ponta criada para **democratizar o acesso** e garantir **total gestão** aos processos que geram fundos de créditos de carbono. Estruturada funcionalmente em **cinco módulos principais**, a plataforma unifica a jornada do recurso ambiental do registro ao beneficiário final com transparência, segurança e acessibilidade.

> 🌳 *Tecnologia a serviço da floresta. Inovação a serviço das pessoas.*

---

## 🏗️ Arquitetura & Tecnologias

### Dependências de Produção

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| **next** | 16.2.6 | Framework principal (App Router) |
| **react** | 19.2.4 | Biblioteca de UI |
| **react-dom** | 19.2.4 | Renderização DOM do React |
| **typescript** | ^5 | Superset tipado de JavaScript |
| **tailwindcss** | ^4 | Framework de estilização utility-first |
| **framer-motion** | ^12.40.0 | Animações declarativas |
| **motion** | ^12.40.0 | Engine de animação (companion do Framer Motion) |
| **leaflet** | ^1.9.4 | Mapas interativos |
| **react-leaflet** | ^5.0.0 | Integração do Leaflet com React |
| **sonner** | ^2.0.7 | Notificações toast |
| **clsx** | ^2.1.1 | Utilitário para composição de classes CSS |
| **tailwind-merge** | ^3.6.0 | Merge inteligente de classes Tailwind |
| **class-variance-authority** | ^0.7.1 | Variantes de componentes com CVA |
| **tw-animate-css** | ^1.4.0 | Animações CSS via Tailwind |

### Dependências de Desenvolvimento

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| **@tailwindcss/postcss** | ^4 | Plugin PostCSS para Tailwind |
| **@types/leaflet** | ^1.9.21 | Tipos TypeScript para Leaflet |
| **@types/node** | ^20 | Tipos TypeScript para Node.js |
| **@types/react** | ^19 | Tipos TypeScript para React |
| **@types/react-dom** | ^19 | Tipos TypeScript para React DOM |
| **eslint** | ^9 | Linter de código |
| **eslint-config-next** | 16.2.6 | Configuração ESLint para Next.js |

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
git clone https://github.com/caioalexandredev/JREDD-PLUS-TO-APP.git
cd JREDD-PLUS-TO-APP
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

- [x] **Módulo 1** — Cadastro e autenticação de usuários (beneficiários, gestores, auditores)
- [x] **Módulo 2** — Registro e validação de projetos REDD+
- [x] **Módulo 3** — Rastreabilidade do ciclo de vida dos créditos de carbono
- [x] **Módulo 4** — Distribuição transparente de fundos aos beneficiários
- [x] **Módulo 5** — Painel de monitoramento, relatórios e auditoria

### ⚙️ Infraestrutura & Qualidade

- [ ] Configuração de CI/CD (GitHub Actions ou similar)
- [ ] Testes unitários com Jest / Testing Library
- [x] Documentação da API/endpoints
- [x] Responsividade mobile-first

### 🌐 Funcionalidades Gerais

- [x] Landing page institucional
- [x] Dashboard do beneficiário
- [x] Dashboard do gestor

### 🔐 Segurança

- [x] Autenticação JWT / OAuth2
- [x] Controle de papéis e permissões (RBAC)
- [x] Auditoria de logs de ações críticas
- [x] Proteção contra CSRF e XSS

---

## 📁 Estrutura do Projeto

```
ecovertice-tocantins/
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

Este projeto está sob licença privada. Todos os direitos reservados © EcoVertice Tocantins.

---

## 🤖 Uso de Inteligência Artificial no Desenvolvimento

> Este projeto foi desenvolvido com o auxílio de múltiplas ferramentas de **Inteligência Artificial generativa**, cada uma com papel específico na construção da plataforma EcoVertice Tocantins.

### 🛠️ Ferramentas Utilizadas

| Ferramenta | Papel no Projeto |
|------------|-----------------|
| **[Lovable](https://lovable.dev/)** | Geração dos layouts e interfaces visuais da plataforma — componentes, páginas e design system |
| **[OpenAI Codex](https://openai.com/codex)** | Implantação e integração da API no frontend, automação de lógica de negócio e refatoração de código |
| **[Google Gemini](https://gemini.google.com/)** | Orientações de arquitetura de software, estratégias de componentização e estruturação da documentação técnica |
| **[Claude (Anthropic)](https://claude.ai/)** | Revisão de código, geração de trechos específicos e suporte à documentação |

### 💬 Exemplos de Prompts Utilizados

Abaixo alguns exemplos representativos dos prompts empregados durante o desenvolvimento:

**Lovable — Geração de Interface**
```
Crie uma dashboard para beneficiários de créditos de carbono com:
- Cards de resumo (créditos disponíveis, distribuições recebidas, projetos vinculados)
- Tabela de histórico de transações com filtro por período
- Mapa interativo com os projetos REDD+ do Tocantins
- Paleta verde sustentável, tipografia moderna, responsivo mobile-first
```

**Codex — Integração de API**
```
Implemente no frontend Next.js a integração com o endpoint POST /api/projetos/registrar.
Use fetch com tratamento de erro, loading state, e exiba notificação toast de sucesso/erro via Sonner.
Valide os campos obrigatórios antes do envio e use TypeScript com tipagem estrita.
```

**Gemini — Arquitetura e Componentização**
```
Estou construindo uma plataforma Next.js com App Router para rastreabilidade de créditos de carbono.
Tenho 3 perfis de usuário (beneficiário, gestor, auditor) com dashboards distintos.
Como devo estruturar as pastas, layouts e rotas para máxima reutilização de componentes,
mantendo separação clara de responsabilidades e facilitando a adição futura de novos módulos?
```

**Claude — Documentação Técnica**
```
Com base nessa estrutura de projeto Next.js com os módulos: cadastro, registro de projetos,
rastreabilidade, distribuição de fundos e auditoria, gere uma documentação técnica
dos endpoints da API incluindo parâmetros, tipos, exemplos de request/response
e códigos de erro possíveis.
```

### ⚠️ Supervisão Humana

Todo o conteúdo gerado por IA foi supervisionado pela equipe de desenvolvimento, que manteve responsabilidade pelas decisões arquiteturais, revisão crítica do código e adequação ao contexto e missão da plataforma.

O uso de IA tem como objetivo **acelerar a entrega de valor**, mantendo os padrões de qualidade, segurança e o compromisso socioambiental da EcoVertice Tocantins.

---

---

<div align="center">

**Feito com 💚 para o Tocantins e para o planeta**

🌿 *Cada linha de código, um passo pela floresta.*

</div>