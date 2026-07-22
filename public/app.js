const form = document.querySelector('#weather-form');
const input = document.querySelector('#location');
const feedback = document.querySelector('#feedback');
const result = document.querySelector('#weather-result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = input.value.trim();
  result.classList.add('hidden');

  if (!location) {
    feedback.textContent = 'Escribe una localidad para continuar.';
    input.focus();
    return;
  }

  feedback.textContent = 'Consultando condiciones actuales…';
  form.querySelector('button').disabled = true;

  try {
    const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    renderWeather(data);
    feedback.textContent = '';
  } catch (error) {
    feedback.textContent = error.message || 'Ocurrió un error inesperado.';
  } finally {
    form.querySelector('button').disabled = false;
  }
});

function renderWeather({ location, current }) {
  const place = [location.name, location.region, location.country].filter(Boolean).join(', ');
  result.innerHTML = `
    <div class="weather-heading">
      <p class="place">${escapeHtml(place)}</p>
      <p class="updated">Hora local: ${escapeHtml(location.localtime)}</p>
    </div>
    <div class="main-weather">
      ${current.icon ? `<img src="${escapeHtml(current.icon)}" alt="${escapeHtml(current.description)}" />` : ''}
      <div><strong>${current.temperature}°</strong><span>C</span></div>
      <p>${escapeHtml(current.description)}<br /><small>Sensación térmica: ${current.feelslike} °C</small></p>
    </div>
    <dl>
      <div><dt>Humedad</dt><dd>${current.humidity}%</dd></div>
      <div><dt>Viento</dt><dd>${current.windSpeed} km/h ${escapeHtml(current.windDir)}</dd></div>
      <div><dt>Presión</dt><dd>${current.pressure} mb</dd></div>
    </dl>`;
  result.classList.remove('hidden');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}
