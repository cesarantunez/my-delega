# 🚀 Sprint 1 — Shell PWA + Tailwind + Estructura + Splash

> **Metodología: Búcle Agéntico**
> DELIMITAR → INGENIERÍA INVERSA → PLANEAR → EJECUTAR ITERATIVAMENTE

---

## 📌 DELIMITAR: ¿Qué entregamos al final de este sprint?

Al completar Sprint 1, la app debe:

1. ✅ Cargar en `localhost:3000` sin errores
2. ✅ Mostrar Splash Screen con logo de MyDELEGA + colores de marca
3. ✅ Ser instalable como PWA (botón de instalación en Chrome/Edge)
4. ✅ Tener estructura de carpetas completa según README
5. ✅ Tailwind configurado con paleta de colores de marca
6. ✅ Service Worker registrado (PWA ready)
7. ✅ Manifest.json válido (verificable con DevTools → Application)
8. ✅ Sin verde en ningún componente (solo colores de marca)

**NO incluye:** Login, base de datos, autenticación, ni ninguna funcionalidad de negocio.

---

## 🔍 INGENIERÍA INVERSA: Dependencias por orden

```
1. Inicializar Vite + React + TypeScript ← prerequisito de todo
2. Instalar Tailwind CSS + configurar con paleta brand ← necesario para estilos
3. Configurar vite.config.ts con PWA + COOP/COEP headers ← necesario para PWA
4. Crear manifest.json con íconos ← necesario para instalación
5. Crear estructura de carpetas ← organización del código
6. Crear componente SplashScreen ← primera pantalla visible
7. Configurar React Router (solo ruta /) ← navegación básica
8. Verificar Service Worker en DevTools ← confirmación PWA
```

---

## ✅ PLANEAR: Checklist Ordenado

### Fase 1: Inicialización del Proyecto

- [ ] `npm create vite@latest . -- --template react-ts`
- [ ] Verificar que `npm run dev` funciona en localhost:5173 (default Vite)
- [ ] Instalar todas las dependencias del stack

```bash
npm install sql.js bcryptjs zustand react-router-dom react-hook-form zod @hookform/resolvers date-fns recharts framer-motion lucide-react jspdf jspdf-autotable workbox-window
npm install -D @types/sql.js @types/bcryptjs tailwindcss postcss autoprefixer vite-plugin-pwa @tailwindcss/forms @vitejs/plugin-react
```

### Fase 2: Configurar Tailwind

- [ ] `npx tailwindcss init -p` (genera tailwind.config.js + postcss.config.js)
- [ ] Actualizar tailwind.config.ts con colores de marca (ya en repo)
- [ ] Crear `src/styles/index.css` con directivas Tailwind
- [ ] Importar CSS en `src/main.tsx`

### Fase 3: Configurar Vite + PWA

- [ ] Actualizar `vite.config.ts` (ya en repo — COOP/COEP headers + PWA plugin)
- [ ] Copiar archivos WASM de sql.js a `public/sql-wasm/`
- [ ] Crear íconos placeholder en `public/icons/` (al menos icon-192x192.png)
- [ ] Verificar `public/manifest.json` (ya en repo)

### Fase 4: Estructura de Carpetas

Crear todos los directorios según README:

- [ ] `src/assets/`
- [ ] `src/components/ui/`
- [ ] `src/components/shared/`
- [ ] `src/components/admin/`
- [ ] `src/components/employee/`
- [ ] `src/pages/auth/`
- [ ] `src/pages/admin/`
- [ ] `src/pages/employee/`
- [ ] `src/lib/db/`
- [ ] `src/lib/repositories/`
- [ ] `src/lib/auth/`
- [ ] `src/lib/notifications/`
- [ ] `src/lib/pdf/`
- [ ] `src/stores/`
- [ ] `src/router/`
- [ ] `src/styles/`
- [ ] `public/sql-wasm/`
- [ ] `public/icons/`

### Fase 5: Splash Screen

- [ ] Crear `src/pages/auth/SplashScreen.tsx`
  - Logo MyDELEGA con animación framer-motion
  - Fondo brand-yellow (#FFE000)
  - Texto en brand-dark (#2D2D2D)
  - Duración: 2-3 segundos, luego navega a /login

### Fase 6: Router Básico

- [ ] Crear `src/router/index.tsx` con:
  - Ruta `/` → SplashScreen
  - Ruta `/login` → placeholder
- [ ] Actualizar `src/App.tsx` con RouterProvider
- [ ] Actualizar `src/main.tsx`

### Fase 7: Verificación Final

- [ ] `npm run dev` → localhost:3000 sin errores en consola
- [ ] Splash Screen aparece y tiene los colores correctos
- [ ] DevTools → Application → Service Workers → SW registrado
- [ ] DevTools → Application → Manifest → Sin errores
- [ ] DevTools → Console → Sin errores
- [ ] Verificar que NO hay verde en ningún componente

---

## 🎯 EJECUTAR: Prompt para Claude Code

Copia y pega este prompt al inicio de la sesión con Claude Code:

```
Lee el README.md completo del proyecto my-delega.

Estamos en el SPRINT 1: Shell PWA + Tailwind + Estructura + Splash.

Contexto del proyecto:
- App: MyDELEGA PWA para Supermercado Su Hogar
- Stack: React 18 + TypeScript + Vite + Tailwind + PWA
- Colores OBLIGATORIOS: brand-yellow(#FFE000), brand-pink(#FF1F8E), brand-blue(#1B4FD8), brand-red(#E31E24)
- VERDE PROHIBIDO en toda la UI

Antes de escribir código:
1. DELIMITAR: ¿Qué entregamos al final de Sprint 1?
2. INGENIERÍA INVERSA: ¿Qué archivos necesitamos crear/modificar?
3. PLANEAR: Muéstrame el checklist de tareas ordenadas por dependencia
4. Ejecuta el checklist iterativamente, verificando en localhost:3000 después de cada tarea

Herramientas disponibles:
- Los archivos de configuración ya están en el repo (vite.config.ts, tailwind.config.ts, package.json, public/manifest.json)
- Clona el repo: git clone https://github.com/cesarantunez/my-delega.git

Empieza con: npm install
```

---

## 📊 Criterios de Éxito

| Criterio | Verificación |
|----------|-------------|
| localhost:3000 funciona | npm run dev sin errores |
| Splash Screen visible | Ver pantalla amarilla con logo |
| PWA instalable | Chrome: botón instalar en URL bar |
| Service Worker activo | DevTools > Application > SW |
| Manifest válido | DevTools > Application > Manifest |
| Sin verde | Inspección visual de todos los componentes |
| Sin errores de consola | DevTools > Console vacía |

---

## 🔄 Al Completar Sprint 1

1. Actualizar README.md: cambiar ⬜ → ✅ para Sprint 1
2. Documentar cualquier error o decisión en sección "Errores Conocidos"
3. Hacer commit: `git commit -m "feat: Sprint 1 complete - PWA shell functional"`
4. Verificar una última vez en localhost:3000
5. Proceder a Sprint 2

---

*SPRINT_1.md | MyDELEGA PWA | Creado: 2026-03-31*
