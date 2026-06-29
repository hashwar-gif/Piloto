# HASHWAR: Rise of the Miners — Versión 5.6

🚀 **Estrategia en tiempo real donde la minería cripto se encuentra con la guerra táctica.**

## Stack técnico

| Componente | Tecnología |
|---|---|
| **Frontend** | HTML5 + CSS3 + JavaScript vanilla (Bootstrap 5.3, Font Awesome 6, Orbitron) |
| **Backend** | Node.js + Express 4 + Prisma 6 + JWT + bcrypt |
| **Base de datos** | PostgreSQL 18 (local) |
| **Autenticación** | JWT (Bearer token, 7 días de expiración) |

## Estructura del proyecto

```
Piloto/
├── index.html                     ← Landing page
├── blog.html / paquetes.html     ← Páginas del sitio (HTML estático)
├── gameplay.html                  ← Página informativa del juego
├── public/
│   ├── js/
│   │   ├── api.js                ← Cliente API REST (fetch + JWT)
│   │   ├── header.js             ← Header + login/register modal
│   │   └── footer.js             ← Footer dinámico
│   ├── academia/                 ← Plataforma educativa (6 módulos)
│   ├── gameplay/                 ← Juego RTS (grid-based, IA enemiga)
│   └── css/                      ← Estilos
└── backend/                      ← API REST + base de datos
    ├── src/
    │   ├── index.js              ← Entry point (Express)
    │   ├── routes/               ← 9 archivos de rutas
    │   ├── middleware/auth.js    ← JWT middleware
    │   └── lib/prisma.js         ← PrismaClient singleton
    └── prisma/
        ├── schema.prisma         ← 13 modelos
        └── seed.js               ← Datos iniciales
```

## Base de datos — 13 tablas

| Tabla | Función |
|---|---|
| `User` | Cuentas de usuarios, hashBalance, auth |
| `Module` | Módulos educativos de la Academia |
| `UserProgress` | Progreso de cada usuario en cada módulo |
| `Transaction` | Historial de transacciones de $HASH |
| `GameState` | Partidas guardadas del RTS (auto-save cada 30s) |
| `Post` / `Category` | Blog |
| `Package` / `UserSubscription` | Paquetes de suscripción |
| `Product` / `UserInventory` | Marketplace (merch, NFTs, equipos) |
| `ContactMessage` | Formulario de contacto |
| `RoadmapMilestone` | Hitos del roadmap |

## Cómo empezar (local)

```bash
# 1. Instalar PostgreSQL y crear la base de datos
# 2. Configurar backend/.env con tu contraseña
cd backend
npm install

# 3. Ejecutar migraciones y seed
npx prisma migrate dev
node prisma/seed.js

# 4. Iniciar servidor
npm start
# → HASHWAR API corriendo en http://localhost:3001

# 5. Abrir index.html en el navegador
```

Ver instrucciones detalladas en `backend/INSTRUCCIONES_BACKEND.txt`.

## Funcionalidades

### ✅ Activas
- Registro/login con JWT + bcrypt
- Academia: 6 módulos, respuestas, ranking
- Gameplay RTS: construcción, combate, IA enemiga, auto-save en BD
- Sincronización de $HASH entre gameplay y academia

### 🚧 En desarrollo / pendientes de conectar
- Blog, Paquetes, Marketplace, Contacto, Roadmap (API lista, frontend hardcodeado)
- PvP, clanes, torneos, eventos diarios

## Equipo

- **JOSE JOEL SANDI LARA** — CEO y Fundador
- **DIEGO SAMUEL YUCHINA LOPEZ** — Co-fundador y CTO

© 2024-2026 HASHWAR: Rise of the Miners
