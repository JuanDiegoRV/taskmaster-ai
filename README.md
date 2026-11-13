# TaskMaster AI

Plataforma colaborativa académica para gestionar proyectos, tareas, usuarios y comentarios con React, TypeScript y Supabase.

## Estado actual

Sprint 2 — cliente Supabase y servicios tipados. `useTasks`, Realtime y la interfaz funcional se reservan para sprints posteriores. La conexión remota no está configurada ni verificada.

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior.
- Un proyecto Supabase para los sprints de backend (todavía no configurado).

## Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
```

## Configuración manual para Supabase

1. Crea .env.local a partir de .env.example.
2. Define VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.
3. Aplica las migraciones localmente o desde el flujo autorizado de Supabase.
4. Configura Auth Email/Password y registra usuarios de prueba.
5. Ejecuta npm run dev y abre la URL mostrada por Vite.

Sin esas variables la aplicación muestra un estado controlado de configuración y no finge una sesión ni datos persistidos.

## Variables de entorno

Usa un archivo `.env.local` basado en `.env.example`. Se prefiere `VITE_SUPABASE_PUBLISHABLE_KEY`; `VITE_SUPABASE_ANON_KEY` se admite solo como compatibilidad legacy documentada. Nunca se debe usar una clave `service_role` en el cliente.

## Estructura

```text
src/
  components/   # Componentes React
  config/       # Configuración y cliente Supabase
  hooks/        # Hooks reutilizables, incluido useTasks(projectId)
  services/     # Acceso a datos y operaciones de dominio
  types/        # Tipos TypeScript compartidos
  test/         # Pruebas unitarias y de integración
supabase/
  migrations/   # Migraciones SQL versionadas, no ejecutadas remotamente
docs/           # Plan, bitácora, arquitectura y rúbrica
```

Consulta `docs/PROJECT_PLAN.md` para el alcance por sprint.
