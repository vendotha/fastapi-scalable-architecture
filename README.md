# CryptoDesk: Scalable Trading Intelligence Platform

A high-performance, secure backend architecture designed for the Web3 trading space. Built with **FastAPI (Python)** for computational efficiency and **Next.js** for a reactive analyst dashboard.

## 🏗️ Architecture
- **Backend:** Python 3.11, FastAPI (Async), SQLAlchemy
- **Database:** PostgreSQL 15
- **Caching:** Redis (Infrastructure ready)
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **DevOps:** Docker & Docker Compose

## 🚀 Key Features (Assignment Deliverables)
1.  **JWT Authentication:** Secure, stateless access token handling with Bcrypt password hashing.
2.  **Role-Based Scope:** Data isolation ensures analysts only access their own strategies.
3.  **Full CRUD:** Create, Read, and Delete trading notes.
4.  **Auto-Documentation:** Swagger UI available at `/docs`.

## ⚡️ Quick Start
The entire stack is containerized.

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/vendotha/fastapi-scalable-architecture.git
    cd fastapi-scalable-architecture
    ```

2.  **Run with Docker:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the App:**
    - **Frontend:** `http://localhost:3000`
    - **API Docs:** `http://localhost:8000/docs`

## 🧪 Testing Credentials
You can register a new user, or use the pre-seeded flow:
- **Email:** `admin@test.com`
- **Password:** `password123`
