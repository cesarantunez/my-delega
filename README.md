# 🏪 MyDELEGA — PWA de Gestión de Tareas

> **El cerebro del proyecto.** Leer antes de cada sesión con Claude Code.

## 📋 Contexto de Negocio

**Cliente:** Supermercado Su Hogar  
**App:** MyDELEGA — Progressive Web App para gestión y delegación de tareas  
**Stack:** 100% offline-first, sin servidor, desplegable en Vercel (solo hosting estático)

### Problema que resuelve
El administrador del supermercado necesita:
- Asignar tareas diarias/semanales a empleados
- Monitorear el cumplimiento en tiempo real
- Generar reportes PDF para auditorías
- Funcionar sin internet en zonas con conectividad limitada

---

## 🎨 Paleta de Colores OBLIGATORIA

| Color | Hex | Uso |
|-------|-----|-----|
| Brand Yellow | `#FFE000` | Primario, botones principales, splash |
| Brand Pink | `#FF1F8E` | Secundario, alertas, badges urgentes |
| Brand Blue | `#1B4FD8` | Navegación, headers, links |
| Brand Red | `#E31E24` | Errores, eliminaciones, estados críticos |
| Brand White | `#FFFFFF` | Fondos, texto sobre colores oscuros |
| Brand Dark | `#2D2D2D` | Texto principal, fondos oscuros |

> ⛔ **VERDE PROHIBIDO** — No usar ningún tono de verde en ningún componente de la app.

---

## 🛠️ Stack Tecnológico Completo

```
Frontend:          React 18 + TypeScript + Vite 5
Styling:           Tailwind CSS v3 + @tailwindcss/forms
UI Components:     shadcn/ui (Radix UI primitives)
Icons:             lucide-react
Animations:        framer-motion
Routing:           react-router-dom v6
Forms:             react-hook-form + zod + @hookform/resolvers
State:             zustand
Database:          sql.js (SQLite WASM) + OPFS persistence
Auth:              bcryptjs (local password hashing)
PDF:               jsPDF + jspdf-autotable
Charts:            recharts
Date utils:        date-fns
PWA:               vite-plugin-pwa + workbox-window
```

---

## 👥 Roles de Usuario

### 🔑 Admin (Administrador)
- Crear/editar/eliminar tareas
- Asignar tareas a empleados
- Ver dashboard con métricas globales
- Generar reportes PDF
- Gestionar empleados (CRUD)
- Ver todas las tareas de todos los empleados

### 👷 Employee (Empleado)
- Ver **solo** sus tareas asignadas (`assigned_to = currentUser.id`)
- Marcar tareas como completadas
- Subir evidencia fotográfica (base64)
- Ver su propio dashboard de progreso
- Completar checklists semanales

> ⚠️ **CRÍTICO DE PRIVACIDAD:** Todo query de empleado DEBE filtrar `WHERE assigned_to = currentUser.id`

---

## 🗄️ Esquema de Base de Datos (SQLite)

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin', 'employee')) NOT NULL,
  avatar_url TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Tabla de tareas
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  priority TEXT CHECK(priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK(status IN ('pending', 'in_progress', 'completed', 'overdue')) DEFAULT 'pending',
  assigned_to INTEGER REFERENCES users(id),
  created_by INTEGER REFERENCES users(id),
  due_date TEXT,
  completed_at TEXT,
  evidence_url TEXT,
  evidence_notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Tabla de checklists semanales
CREATE TABLE checklists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  week_number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  assigned_to INTEGER REFERENCES users(id),
  created_by INTEGER REFERENCES users(id),
  status TEXT CHECK(status IN ('active', 'completed', 'archived')) DEFAULT 'active',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Items de checklist
CREATE TABLE checklist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  checklist_id INTEGER REFERENCES checklists(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  is_completed INTEGER DEFAULT 0,
  completed_at TEXT,
  completed_by INTEGER REFERENCES users(id),
  order_index INTEGER DEFAULT 0
);

-- Historial de actividad
CREATE TABLE activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id INTEGER,
  details TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
```

---

## 📱 Estructura de Pantallas

### Auth Flow
- `/` → Splash Screen (logo + animación entrada)
- `/login` → Login form
- `/` → Redirect según rol

### Admin Routes (`/admin/*`)
- `/admin/dashboard` → Métricas, gráficos, resumen
- `/admin/tasks` → Lista completa de tareas
- `/admin/tasks/new` → Crear tarea
- `/admin/tasks/:id` → Detalle/editar tarea
- `/admin/employees` → Lista de empleados
- `/admin/employees/new` → Crear empleado
- `/admin/employees/:id` → Perfil empleado
- `/admin/checklists` → Gestión de checklists
- `/admin/reports` → Reportes + exportar PDF

### Employee Routes (`/employee/*`)
- `/employee/dashboard` → Mis métricas personales
- `/employee/tasks` → Mis tareas asignadas
- `/employee/tasks/:id` → Detalle tarea + subir evidencia
- `/employee/checklists` → Mis checklists de la semana
- `/employee/profile` → Mi perfil

---

## 📁 Estructura de Carpetas

```
my-delega/
├── public/
│   ├── manifest.json
│   ├── icons/
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── sql-wasm/
│       ├── sql-wasm.js
│       └── sql-wasm.wasm
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── shared/      # Layout, Navbar, ProtectedRoute
│   │   ├── admin/       # Admin-specific components
│   │   └── employee/    # Employee-specific components
│   ├── pages/
│   │   ├── auth/        # Login, Splash
│   │   ├── admin/       # All admin pages
│   │   └── employee/    # All employee pages
│   ├── lib/
│   │   ├── db/          # SQLite WASM init + migrations
│   │   ├── repositories/ # Data access layer (CRUD per entity)
│   │   ├── auth/        # Login logic, bcrypt, session
│   │   ├── notifications/ # Toast + Push notifications
│   │   └── pdf/         # jsPDF report generation
│   ├── stores/          # Zustand state stores
│   ├── router/          # React Router configuration
│   └── styles/          # Global CSS, Tailwind base
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md            # ← ESTE ARCHIVO (el cerebro)
```

---

## ⚙️ Requisitos PWA

| Requisito | Detalle |
|-----------|---------|
| Instalable | iOS Safari 16.4+, Android Chrome, Desktop |
| Offline | Service Worker con Workbox |
| Persistencia | SQLite WASM + OPFS (Origin Private File System) |
| COOP/COEP | Necesario para SharedArrayBuffer (sql.js) |
| Manifest | name, icons, display:standalone, orientation:portrait |
| Splash | Usando colores de la paleta, logo animado |

---

## 🚀 Plan de 7 Sprints

| Sprint | Enfoque | Estado |
|--------|---------|--------|
| Sprint 1 | Shell PWA + Tailwind + estructura + Splash | ⬜ |
| Sprint 2 | SQLite WASM + OPFS + migraciones + seed | ⬜ |
| Sprint 3 | Auth local + rutas protegidas por rol | ⬜ |
| Sprint 4 | Admin Dashboard + CRUD tareas + empleados | ⬜ |
| Sprint 5 | Employee Dashboard + mis tareas + evidencia | ⬜ |
| Sprint 6 | Checklists semanales + reportes + PDF export | ⬜ |
| Sprint 7 | Notificaciones + UX polish + deploy Vercel | ⬜ |

### Reglas de los Sprints
1. Cada sprint debe estar **100% funcional** en `localhost:3000` antes de avanzar
2. No mezclar sprints — el scope está fijo
3. Cada sesión con Claude Code comienza leyendo este README
4. Al terminar cada sprint, actualizar el estado en la tabla ⬜→✅

---

## 🔄 Metodología: Búcle Agéntico

```
DELIMITAR → INGENIERÍA INVERSA → PLANEAR → EJECUTAR ITERATIVAMENTE
```

### Cómo usar Claude Code por sprint:

**Prompt de inicio de sprint:**
```
Lee el README.md completo del proyecto my-delega.
Estamos en el [SPRINT N]: [nombre del sprint].
Objetivo: [descripción del objetivo].
Antes de escribir código:
1. DELIMITAR: ¿Qué entregamos al final de este sprint?
2. INGENIERÍA INVERSA: ¿Qué archivos necesitamos crear/modificar?
3. PLANEAR: Crea el checklist de tareas ordenadas por dependencia.
4. Ejecuta el checklist iterativamente, verificando en localhost:3000 después de cada tarea.
```

---

## 🧠 Memoria: Errores Conocidos y Decisiones

> Esta sección se actualiza conforme avanza el desarrollo.
> Sirve como memoria persistente entre sesiones de Claude Code.

### Decisiones de Arquitectura

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2026-03-31 | SQLite WASM + OPFS para persistencia | Zero server dependency, offline-first |
| 2026-03-31 | bcryptjs para auth local | No hay servidor de auth, todo local |
| 2026-03-31 | VERDE PROHIBIDO en toda la UI | Identidad de marca del Supermercado Su Hogar |
| 2026-03-31 | COOP/COEP headers en Vite | Requerido por SharedArrayBuffer para sql.js |
| 2026-03-31 | Filtro assigned_to = currentUser.id | Privacidad de datos entre empleados |

### Errores Conocidos y Soluciones

| Sprint | Error | Solución |
|--------|-------|----------|
| - | - | - |

### Configuraciones Críticas Recordadas

```typescript
// vite.config.ts — CRÍTICO: sin esto sql.js no funciona
server: {
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  }
}

// vite.config.ts — CRÍTICO: excluir sql.js de optimización
optimizeDeps: {
  exclude: ['sql.js']
}
```

---

## 📦 Comandos del Proyecto

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## 🔐 Credenciales de Prueba (Seed)

```
Admin:    admin@suhogar.com    / Admin123!
Employee: maria@suhogar.com   / Employee123!
Employee: jose@suhogar.com    / Employee123!
```

---

*README generado el 2026-03-31 | Versión 1.0 | MyDELEGA PWA*
