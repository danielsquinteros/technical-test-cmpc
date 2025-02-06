# Technical Test CMPC - FullStack

Este proyecto consiste en una aplicación FullStack desarrollada como parte de una prueba técnica para el puesto de desarrollador FullStack. Incluye un backend construido con NestJS y un frontend desarrollado con React y TypeScript. 

## 🛠 Tecnologías Utilizadas

### Backend
- **NestJS** como framework principal.
- **Node.js** como entorno de ejecución.
- **PNPM** para la gestión de paquetes.
- **Memoria temporal** como almacenamiento de datos.

### Frontend
- **React** para la interfaz de usuario.
- **TypeScript** para tipado seguro.
- **Redux** para la gestión del estado.
- **ShadCN** para componentes estilizados.
- **Plotly** para visualización de métricas.

## 🚀 Instalación y Ejecución

### 🔧 Prerrequisitos
- [Node.js](https://nodejs.org/) (versión v18.18.0)
- [PNPM](https://pnpm.io/)

### 📦 Instalación de dependencias

Clona el repositorio y ejecuta:

```bash
pnpm install
```

### ▶️ Ejecutar el Backend

```bash
pnpm run start:dev
```
El servidor estará disponible en `http://localhost:3000`.

### ▶️ Ejecutar el Frontend

```bash
pnpm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

## 📡 Funcionalidades Principales

### 🔹 Backend
- **Gestión de productos:** CRUD de productos.
- **Métricas:** Análisis de productos basado en stock, márgenes de ganancia y etiquetas de agrupación.

### 🔹 Frontend
- **Interfaz** para la visualización y gestión de productos.
- **Visualización de métricas** mediante gráficos interactivos.
- **Manejo de estado global** con Redux.

## 📜 Licencia
Este proyecto está bajo la licencia MIT.