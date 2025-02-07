# Frontend - Technical Test CMPC

Este proyecto es un frontend desarrollado con:
- React
- Typescript
- Redux 
- Schadcn
- Plotly

Ayuda a la gestión de productos y analisis de métricas. Es parte de una prueba técnica para el puesto de desarrollador FullStack.

# Estructura del Proyecto

```plaintext
frontend/

├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── data-table/     # Componentes relacionados con tablas de datos
│   ├── domains/            # Módulos funcionales organizados por dominio
│   │   ├── metrics/        # Módulo de métricas
│   │   │   ├── api/        # Llamadas a la API relacionadas con métricas
│   │   │   ├── components/ # Componentes específicos de métricas
│   │   │   ├── types/      # Definiciones de tipos para métricas
│   │   ├── products/       # Módulo de gestión de productos
│   │   │   ├── api/        # Llamadas a la API de productos
│   │   │   ├── components/ # Componentes de productos
│   │   │   ├── types/      # Definiciones de tipos de productos
│   ├── hooks/              # Hooks personalizados
│   │   ├── use-toast.ts    # Manejo de notificaciones
│   ├── store/              # Configuración de Redux
│   │   ├── hooks/          # Hooks para acceder a Redux
│   │   ├── slices/         # Slices de Redux
│   │   ├── index.tsx       # Configuración global de Redux
│   ├── lib/                # Librerías auxiliares
│   ├── App.tsx             # Componente principal
│   ├── App.css             # Estilos globales

├── public/                 # Archivos estáticos
├── node_modules/           # Dependencias
├── package.json            # Configuración del proyecto
├── tsconfig.json           # Configuración de TypeScript
```


---

## 🚀 Instalación y Ejecución

### 🔧 Prerrequisitos

- [Node.js](https://nodejs.org/) (versión v18.18.0)
- pnpm

### 📦 Instalación de dependencias

Clona el repositorio y ejecuta:

```bash
pnpm install
```

### ▶️ Ejecutar el Servidor

Para iniciar el backend en modo desarrollo:

```bash
pnpm run dev
```

El servidor se ejecutará en `http://localhost:5173` por defecto.



## 📜 Licencia
Este proyecto está bajo la licencia MIT.

---