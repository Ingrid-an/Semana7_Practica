# SoundWave · Catálogo de Música y Podcasts

Práctica Semana 07 · Desarrollo de Aplicaciones Web (IS093A) · UNCP
React Hooks: useState, useReducer, useEffect, useContext, useMemo, useCallback, useRef y hooks personalizados.

## Ejecutar
npm install
npm run dev

## Dónde está cada hook
| Paso | Funcionalidad en la app | Archivo |
|---|---|---|
| 1 · useReducer | Control de volumen del reproductor | src/sections/Reproductor.jsx |
| 2 · useEffect + AbortController | Novedades (cargar, conexión, error 404, limpiar) | src/sections/Novedades.jsx |
| 3 · useContext | Modo Estudio / Modo Concierto | src/context/ThemeContext.jsx |
| 4 · useMemo / useCallback / useRef | Buscador, géneros y playlist | src/sections/Catalogo.jsx |
| 5 · useFetch | Artistas destacados | src/hooks/useFetch.js |
