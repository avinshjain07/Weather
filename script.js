const API_KEY = "c894f55bb4f54be188b94946260503";
const BASE    = "https://api.weatherapi.com/v1";
function updateClock() {
  const el = document.getElementById("headerTime");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true
  });
}
updateClock();
setInterval(updateClock, 30000);
document.getElementById("cityInput").addEventListener("keypress", e => {
  if (e.key === "Enter") getWeather();
});
function showLoading(show) {
  document.getElementById("loading").classList.toggle("show", show);
}
function showError(msg) {
  const el = document.getElementById("error");
  document.getElementById("errorMsg").textContent = msg;
  el.classList.add("show");
}
function clearError() {
  document.getElementById("error").classList.remove("show");
}
function showWeather(show) {
  document.getElementById("weatherMain").classList.toggle("show", show);
}
function conditionIcon(code, isDay) {
  const map = {
    1000: isDay ? "☀️" : "🌙",
    1003: isDay ? "⛅" : "🌥️",
    1006: "☁️", 1009: "☁️",
    1030: "🌫️", 1135: "🌫️", 1147: "🌫️",
    1063: "🌦️", 1180: "🌦️", 1183: "🌧️", 1186: "🌧️",
    1189: "🌧️", 1192: "🌧️", 1195: "🌧️",
    1198: "🌨️", 1201: "🌨️",
    1066: "❄️", 1114: "❄️", 1117: "❄️",
    1069: "🌨️", 1072: "🌨️",
    1087: "⛈️",
    1210: "🌨️", 1213: "🌨️", 1216: "🌨️", 1219: "🌨️",
    1222: "❄️", 1225: "❄️",
    1237: "🌨️",
    1240: "🌦️", 1243: "🌧️", 1246: "🌧️",
    1249: "🌨️", 1252: "🌨️",
    1255: "🌨️", 1258: "❄️",
    1261: "🌨️", 1264: "🌨️",
    1273: "⛈️", 1276: "⛈️",
    1279: "⛈️", 1282: "⛈️",
  };
  return map[code] || "🌡️";
}
const AQI_INFO = [
  { max: 1, label: "Good",             cls: "aqi-good",     pct: 15 },
  { max: 2, label: "Moderate",         cls: "aqi-moderate", pct: 30 },
  { max: 3, label: "Unhealthy (Sens)", cls: "aqi-usg",      pct: 50 },
  { max: 4, label: "Unhealthy",        cls: "aqi-unhealthy",pct: 65 },
  { max: 5, label: "Very Unhealthy",   cls: "aqi-very",     pct: 82 },
  { max: 6, label: "Hazardous",        cls: "aqi-hazard",   pct: 100 },
];
function aqiInfo(index) {
  return AQI_INFO[Math.min(index, 6) - 1] || AQI_INFO[5];
}
function uvLabel(v) {
  if (v <= 2)  return "Low";
  if (v <= 5)  return "Moderate";
  if (v <= 7)  return "High";
  if (v <= 10) return "Very High";
  return "Extreme";
}
function dayName(dateStr, index) {
  if (index === 0) return "Today";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short" });
}
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) { showError("Please enter a city name."); return; }

  clearError();
  showWeather(false);
  showLoading(true);

  try {
    const res = await fetch(
      `${BASE}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=5&aqi=yes&alerts=no`
    );
    if (!res.ok) throw new Error("not_found");
    const d = await res.json();
    populateUI(d);
    showWeather(true);
  } catch (err) {
    if (err.message === "not_found") {
      showError("City not found 😕  Please check the spelling and try again.");
    } else {
      showError("Something went wrong. Please try again.");
    }
  } finally {
    showLoading(false);
  }
}

function populateUI(d) {
  const cur  = d.current;
  const loc  = d.location;
  const fc   = d.forecast.forecastday;

  document.getElementById("cityName").textContent    = loc.name;
  document.getElementById("countryName").textContent = loc.country;
  document.getElementById("tempValue").textContent   = Math.round(cur.temp_c);
  document.getElementById("conditionText").textContent = cur.condition.text;
  document.getElementById("feelsLike").textContent   = Math.round(cur.feelslike_c);
  document.getElementById("localTime").textContent   = new Date(loc.localtime).toLocaleString("en-US", {
    weekday: "short", hour: "2-digit", minute: "2-digit", hour12: true
  });
  document.getElementById("weatherIconLarge").textContent = conditionIcon(cur.condition.code, cur.is_day);
  document.getElementById("maxTemp").textContent = Math.round(fc[0].day.maxtemp_c);
  document.getElementById("minTemp").textContent = Math.round(fc[0].day.mintemp_c);
  const aqiIndex = cur.air_quality?.["us-epa-index"] || 1;
  const ai = aqiInfo(aqiIndex);
  const aqiVal = document.getElementById("aqiValue");
  aqiVal.textContent = aqiIndex;
  aqiVal.className = "stat-value " + ai.cls;
  document.getElementById("aqiLabel").textContent = ai.label;
  document.getElementById("aqiBarFill").style.width = ai.pct + "%";
  document.getElementById("aqiBarFill").style.background =
    ai.cls === "aqi-good" ? "#4af0c4" :
    ai.cls === "aqi-moderate" ? "#f0e24a" :
    ai.cls === "aqi-usg" ? "#f0a44a" :
    ai.cls === "aqi-unhealthy" ? "#f04a4a" :
    ai.cls === "aqi-very" ? "#b44af0" : "#7e0000";
  const hum = cur.humidity;
  document.getElementById("humidityValue").textContent = hum + "%";
  document.getElementById("humidityBarFill").style.width = hum + "%";
  document.getElementById("windValue").textContent = Math.round(cur.wind_kph);
  document.getElementById("windDir").textContent   = cur.wind_dir;
  const windDeg = cur.wind_degree || 0;
  document.getElementById("compassNeedle").style.transform =
    `translateX(-50%) rotate(${windDeg}deg)`;
  const uv = cur.uv;
  document.getElementById("uvValue").textContent = uv;
  document.getElementById("uvLabel").textContent = uvLabel(uv);
  document.getElementById("uvMarker").style.left = Math.min((uv / 11) * 100, 100) + "%";
  document.getElementById("visibilityValue").textContent = cur.vis_km;
  document.getElementById("pressureValue").textContent = cur.pressure_mb;
  const grid = document.getElementById("forecastGrid");
  grid.innerHTML = "";
  fc.forEach((day, i) => {
    const icon = conditionIcon(day.day.condition.code, 1);
    const card = document.createElement("div");
    card.className = "forecast-card" + (i === 0 ? " today" : "");
    card.innerHTML = `
      <div class="fc-day">${dayName(day.date, i)}</div>
      <div class="fc-icon">${icon}</div>
      <div class="fc-desc">${day.day.condition.text}</div>
      <div class="fc-temps">
        <span class="fc-max">${Math.round(day.day.maxtemp_c)}°</span>
        <span class="fc-min">${Math.round(day.day.mintemp_c)}°</span>
      </div>
      <div class="fc-rain">
        💧 ${day.day.daily_chance_of_rain}%
      </div>
    `;
    grid.appendChild(card);
  });
  const hourlyContainer = document.getElementById("hourlyScroll");
  hourlyContainer.innerHTML = "";
  const nowHour = new Date(loc.localtime).getHours();
  const hours = fc[0].hour;
  hours.forEach((h) => {
    const hDate = new Date(h.time);
    const hHour = hDate.getHours();
    const isCurrent = hHour === nowHour;
    const label = hDate.toLocaleString("en-US", { hour: "numeric", hour12: true });
    const icon  = conditionIcon(h.condition.code, h.is_day);
    const card  = document.createElement("div");
    card.className = "hourly-card" + (isCurrent ? " current-hour" : "");
    card.innerHTML = `
      <div class="hc-time">${label}</div>
      <div class="hc-icon">${icon}</div>
      <div class="hc-temp">${Math.round(h.temp_c)}°</div>
      <div class="hc-rain">💧${h.chance_of_rain}%</div>
    `;
    hourlyContainer.appendChild(card);
    if (isCurrent) {
      setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }), 400);
    }
  });
}
