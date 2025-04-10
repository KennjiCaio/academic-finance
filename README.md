# Academic Finance API

API for student financing management with JWT authentication and installment simulations.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Node.js](https://nodejs.org/) (v18+)

## Configuration

1. **Clone the repository**:

```bash
git clone https://github.com/KennjiCaio/academic-finance.git
cd academic-finance
```

2. **Configure environment variables:**:

- Create a .env file in the root project containing:

```bash
DATABASE_URL="mysql://root:root123@localhost:3306/academic_finance?schema=public"
JWT_SECRET="key_with_min_32_chars"
```

- Note: You can use the .env.example file by renaming it to .env

## Running with Docker (Recommended)

1. **Start Docker**

```bash
# Start MySQL container
docker-compose up -d db

# Apply migrations (first time or after schema changes)
npx prisma migrate dev --name init
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the API:**

```bash
npm run dev
```

**Available endpoints:**

- http://localhost:3000/api/

## Main Routes

| Method | Route              | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | `/api/register`    | Student registration       |
| POST   | `/api/login`       | Login (generates JWT)      |
| GET    | `/api/me/:id`      | Get student information    |
| PUT    | `/api/me/:id`      | Update student information |
| GET    | `/api/simulations` | List simulations           |
| POST   | `/api/simulations` | Create new simulation      |

## Useful Commands

```bash
# Run migrations manually
npx prisma migrate dev

# Run prisma studio
npx prisma studio

# To stop:
docker-compose down
```

## Technologies Used

- Backend: Node.js, Express, TypeScript
- Database: MySQL + Prisma ORM
- Authentication: JWT
- Containerization: Docker
