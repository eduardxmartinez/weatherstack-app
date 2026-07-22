# Aplicación del clima con WeatherStack y Express

Aplicación web que consulta el clima actual de una localidad mediante la API de WeatherStack.

## Ejecutar localmente

1. Regístrate en [WeatherStack](https://weatherstack.com/signup/free) y copia tu **Access Key**.
2. Instala dependencias: `npm install`.
3. Copia el archivo de configuración: `cp .env.example .env`.
4. Sustituye `pega_aqui_tu_clave` por tu clave real en `.env`.
5. Inicia la aplicación: `npm start`.
6. Abre `http://localhost:3000`.

La ruta `GET /api/weather?location=Hermosillo` valida que exista una localidad y devuelve un mensaje controlado si la API no responde, la localidad no se encuentra o la clave no está configurada.