# Backend - Technical Test CMPC

Este proyecto es un backend desarrollado con NestJS que proporciona funcionalidades para el análisis de métricas y gestión de productos. Utiliza una memoria temporal para el almacenamiento de datos.

Es parte de una prueba técnica para el puesto de desarrollador FullStack.

## 📂 Estructura del Proyecto

```
backend/
│── src/
│   ├── database/            # Módulo de almacenamiento en memoria
│   ├── metrics/             # Módulo de métricas
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── metrics.controller.ts  # Controlador de métricas
│   │   ├── metrics.module.ts      # Módulo de métricas
│   ├── products/            # Módulo de productos
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entities/        # Entidades del dominio
│   │   ├── products.controller.ts  # Controlador de productos
│   │   ├── products.module.ts      # Módulo de productos
│   │   ├── products.service.ts     # Servicio de productos
│   ├── app.controller.ts     # Controlador principal
│   ├── app.module.ts         # Módulo raíz
│   ├── app.service.ts        # Servicio principal
│   ├── main.ts               # Punto de entrada
│── dist/                     # Archivos compilados
│── node_modules/             # Dependencias
│── package.json              # Configuración del proyecto
│── tsconfig.json             # Configuración de TypeScript
```

---

## 🚀 Instalación y Ejecución

### 🔧 Prerrequisitos

- [Node.js](https://nodejs.org/) (versión v18.18.0)
- [NestJS CLI](https://docs.nestjs.com/) instalado globalmente (opcional)
- pnpm

### 📦 Instalación de dependencias

Clona el repositorio y ejecuta:

```bash
pnpm install
```

### ▶️ Ejecutar el Servidor

Para iniciar el backend en modo desarrollo:

```bash
pnpm run start:dev
```

El servidor se ejecutará en `http://localhost:3000` por defecto.


## 📡 Endpoints Principales

### 🔹 Métricas
- POST `/metrics/products/total` → Retorna la cantidad total de productos.
- POST `/metrics/products/profit-margin` → Obtiene los productos con mayor y menor margen de ganancia según su porcentaje de utilidad. Los productos con menos del 30% se resaltarán en rojo, y aquellos con más del 50% en verde.
- POST `/metrics/products/critical-stock` → Lista todos los productos, mostrando el stock actual y el stock mínimo.
- POST `/metrics/products/group-tag` → Agrupa los productos por etiqueta, indicando la categoría correspondiente y su porcentaje respecto al total de productos.

### 🔹 Productos
- `GET /products` → Lista los productos disponibles.
- `POST /products` → Crea un nuevo producto.
- `GET /products/:id` → Obtiene detalles de un producto.
- `DELETE /products/:id` → Elimina un producto.
- `PATCH /products/:id` → Actualiza un producto.

---

## 📜 Licencia
Este proyecto está bajo la licencia MIT.

---
