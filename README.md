# Flores Amarillas para Celia

Pagina romantica creada con React, TypeScript y Vite.

## Estructura

```text
src/
  app/                  Componente principal y sus estilos
  assets/
    photos/             Fotos de Celia usadas en la galeria
    illustrations/      Ilustraciones y recursos visuales
  styles/               Estilos globales
  main.tsx              Punto de entrada de React
public/
  audio/
    LEEME.txt           Instrucciones para agregar tu nota de voz
```

## Audio personal

Los audios usados por la pagina estan en `src/music/`, por lo que Vite los incluye automaticamente en el build de produccion.

## Comandos

```bash
npm run dev
npm run build
npm run lint
```

## Despliegue en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel, selecciona `Add New > Project` e importa el repositorio.
3. Confirma que la carpeta raiz sea `flores-amarillas` si el repositorio contiene la carpeta superior `Dia_amor`.
4. Vercel detectara Vite y usara `npm ci`, `npm run build` y la carpeta `dist`, definidos en `vercel.json`.
5. Pulsa `Deploy`.
