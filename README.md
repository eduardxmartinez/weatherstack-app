# Aplicación del clima con WeatherStack y Express

Aplicación web que consulta el clima actual de una localidad mediante la API de WeatherStack. La clave nunca se expone al navegador: Express realiza la petición al proveedor.

## Ejecutar localmente

1. Regístrate en [WeatherStack](https://weatherstack.com/signup/free) y copia tu **Access Key**.
2. Instala dependencias: `npm install`.
3. Copia el archivo de configuración: `cp .env.example .env`.
4. Sustituye `pega_aqui_tu_clave` por tu clave real en `.env`.
5. Inicia la aplicación: `npm start`.
6. Abre `http://localhost:3000`.

La ruta `GET /api/weather?location=Hermosillo` valida que exista una localidad y devuelve un mensaje controlado si la API no responde, la localidad no se encuentra o la clave no está configurada.

## Git y GitHub

```bash
git init
git add .
git commit -m "Aplicación del clima con Express y WeatherStack"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/clima-weatherstack.git
git push -u origin main
```

`.env` está en `.gitignore`; nunca publiques la clave. Sube solo `.env.example`.

## Despliegue en Heroku

> Nota: Heroku retiró sus planes gratuitos. Actualmente el plan Eco cuesta USD $5/mes; el proyecto queda compatible con Heroku, pero para una entrega sin costo utiliza un proveedor alternativo o consulta las condiciones vigentes del curso.

1. Crea una aplicación en Heroku y conéctala al repositorio de GitHub (o usa `heroku create`).
2. En **Settings → Config Vars**, agrega `WEATHERSTACK_API_KEY` con tu clave real.
3. Verifica que el `Procfile` contenga `web: node server.js`.
4. Despliega la rama `main` desde GitHub o ejecuta `git push heroku main`.

Heroku asigna el puerto en `PORT`; la aplicación ya lo usa automáticamente.
