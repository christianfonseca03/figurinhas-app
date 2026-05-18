# Figurinhas Copa 2026 - App Compartilhado

Um aplicativo web para rastrear figurinhas do álbum da Copa do Mundo 2026 entre múltiplos usuários.

## Features

- 📸 Rastreie 48 seleções com 20 figurinhas cada
- 👥 Sistema de 3 usuários (chris, isa, pai)
- ✅ Marque quem tem cada figurinha
- 👀 Veja quem marcou que tem cada uma
- 📱 Design responsivo
- 💾 Sincronização automática via localStorage

## Estrutura do Projeto

```
figurinhas-app/
├── app/
│   ├── components/
│   │   ├── Figurinha.jsx
│   │   ├── Figurinha.module.css
│   │   ├── Selecao.jsx
│   │   └── Selecao.module.css
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── lib/
│   └── countries.js
├── package.json
├── next.config.js
└── .gitignore
```

## Instalação Local

```bash
# Clonar ou extrair o projeto
cd figurinhas-app

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

## Deploy na Vercel

### Opção 1: Via GitHub (Recomendado)

1. **Criar repositório no GitHub**
   - Crie um novo repositório (ex: figurinhas-copa-2026)
   - Clone o repositório localmente
   - Copie os arquivos do projeto
   - Faça push para o GitHub

```bash
cd figurinhas-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/figurinhas-copa-2026.git
git push -u origin main
```

2. **Deploy na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione o repositório do GitHub
   - Clique em "Deploy"
   - A Vercel detectará que é um projeto Next.js e fará o deploy automaticamente

### Opção 2: Deploy Direto (sem GitHub)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer deploy
vercel
```

Siga as instruções no terminal.

## Como Usar

1. **Selecionar Usuário**: Escolha entre chris, isa ou pai no topo da página
2. **Marcar Figurinhas**: Clique em uma figurinha para marcá-la com seu usuário
3. **Ver Donos**: Passe o mouse sobre uma figurinha para ver quem a marcou
4. **Buscar**: Use a barra de busca para encontrar países específicos
5. **Sincronização**: Os dados são salvos automaticamente no seu navegador

## Dados

Os dados são armazenados em `localStorage` e serão sincronizados quando você acessar em outro dispositivo com a mesma conta do navegador.

### Estrutura dos Dados

```javascript
{
  "MEX": {
    "1": ["chris"],
    "2": ["isa", "pai"],
    // ...
  },
  // ...
}
```

## Tecnologias

- **Next.js 14**: Framework React moderno
- **React 18**: Para componentes interativos
- **CSS Modules**: Para estilos isolados
- **localStorage**: Para persistência de dados

## Países Inclusos (48 seleções)

### Américas
- MEX, CAN, USA, BRA, ARG, URY, PAR, CHI, COL, ECU, PER, VEN, BOL

### Europa
- ENG, SCO, WAL, FRA, GER, ESP, POR, ITA, NED, BEL, CRO, SWE, DEN, NOR, POL, UKR, ROU, HUN, CZE, SVK, SVN, GRE, TUR, SRB, BIH, ALB, MKD, GEO, AZE

### África
- EGY, MAR, SEN, CMR, GHA

### Ásia/Oceania
- JPN, AUS

## Contribuições

Para sugerir melhorias, abra uma issue no GitHub.

## Licença

Livre para uso pessoal e compartilhado.
