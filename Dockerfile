FROM node:18-alpine

WORKDIR /app

# 1. Copia os arquivos de configuração
COPY package.json package-lock.json tsconfig.json ./

# 2. Instala dependências incluindo ts-node como dependência de desenvolvimento
RUN npm install --include=dev

# 3. Copia o código fonte
COPY . .

# 4. Compila o TypeScript para JavaScript
RUN npm run build

# 5. Define o comando de execução
CMD ["node", "dist/server.js"]