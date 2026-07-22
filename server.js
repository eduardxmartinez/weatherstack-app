require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/weather', async (req, res) => {
  const location = (req.query.location || '').trim();

  if (!location) {
    return res.status(400).json({ error: 'Escribe una localidad antes de consultar el clima.' });
  }

  if (!process.env.WEATHERSTACK_API_KEY || process.env.WEATHERSTACK_API_KEY === 'pega_aqui_tu_clave') {
    return res.status(503).json({ error: 'Falta configurar WEATHERSTACK_API_KEY en el servidor.' });
  }

  try {
    const url = new URL('http://api.weatherstack.com/current');
    url.search = new URLSearchParams({
      access_key: process.env.WEATHERSTACK_API_KEY,
      query: location,
      units: 'm'
    }).toString();

    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(422).json({
        error: data.error?.info || 'No fue posible obtener el clima para esa localidad.'
      });
    }

    return res.json({
      location: {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
        localtime: data.location.localtime
      },
      current: {
        temperature: data.current.temperature,
        feelslike: data.current.feelslike,
        description: data.current.weather_descriptions?.[0] || 'Sin descripción',
        icon: data.current.weather_icons?.[0],
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        windDir: data.current.wind_dir,
        pressure: data.current.pressure,
        observationTime: data.current.observation_time
      }
    });
  } catch (error) {
    console.error('WeatherStack request failed:', error.message);
    return res.status(502).json({ error: 'No se pudo conectar con el servicio meteorológico. Inténtalo de nuevo.' });
  }
});

app.listen(port, () => console.log(`Aplicación disponible en http://localhost:${port}`));
