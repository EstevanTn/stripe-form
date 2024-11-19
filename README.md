# Proyecto de Pagos con Stripe

Este proyecto incluye un frontend en React y un backend en Node.js para procesar pagos utilizando Stripe.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Configuración del Backend

1. Clona el repositorio y navega al directorio del backend:

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Crea un archivo `.env` en el directorio `backend` con el siguiente contenido:

   ```env
   STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe
   ```

4. Inicia el servidor:

   ```sh
   npm run dev
   ```

   El servidor se ejecutará en `http://localhost:3001`.

## Configuración del Frontend

1. Navega al directorio del frontend:

   ```sh
   cd ../frontend/stripe-app
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Crea un archivo [.env](http://_vscodecontentref_/1) en el directorio [stripe-app](http://_vscodecontentref_/2) con el siguiente contenido:

   ```env
   REACT_APP_STRIPE_PUBLIC_KEY=tu_clave_publica_de_stripe
   ```

4. Inicia la aplicación de React:

   ```sh
   npm start
   ```

   La aplicación se ejecutará en `http://localhost:3000`.

## Tarjetas de prueba

https://docs.stripe.com/testing
