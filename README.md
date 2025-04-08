# academic-finance

Primeira vez

```
# Subir o container do MySQL
docker-compose up -d db

# Aplicar migrações (apenas na primeira vez ou após alterações no schema)
npx prisma migrate dev --name init
```

Comandos úteis:

```
# Iniciar o banco de dados
docker-compose start db

# Parar o banco de dados
docker-compose stop db

# Reconstruir o container (se necessário)
docker-compose up -d --build db

# Visualizar logs do banco
docker-compose logs -f db
```

```
# Instalar dependências
npm install

# Iniciar a API com hot-reload
npm run dev
```

Prisma Studio (Visualizador de banco de dados):

```
npx prisma studio

Acesse: http://localhost:5555
```
