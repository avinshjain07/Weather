🌐 WeatherSphere
A sleek, dark-themed weather web application that shows real-time weather data, 5-day forecasts, hourly breakdowns, AQI, humidity, wind, UV index, visibility, and pressure — all powered by the WeatherAPI.

📁 Project Structure
WeatherSphere/
├── index.html       # App markup and layout
├── style.css        # All styling, animations, and responsive design
├── script.js        # API calls, data processing, and DOM updates
└── README.md        # This file

✨ Features

Current Weather — Temperature, feels-like, condition, high/low, and local time
5-Day Forecast — Daily icons, description, max/min temps, and rain chance
Hourly Forecast — Scrollable today-only hourly strip with auto-scroll to current hour
Air Quality Index (AQI) — US EPA index (1–6) with color-coded label and fill bar
Humidity — Percentage with visual progress bar
Wind — Speed in km/h, direction label, and animated compass needle
UV Index — Numeric value, plain-English level, and gradient slider marker
Visibility — Distance in kilometres
Pressure — Atmospheric pressure in millibars
Live Clock — Updates every 30 seconds in the header
Responsive Design — Works on desktop, tablet, and mobile


🚀 Getting Started
Prerequisites

A modern web browser (Chrome, Firefox, Edge, Safari)
An active internet connection
A free API key from weatherapi.com

Setup

Download or clone all three files into the same folder:

   index.html
   style.css
   script.js

Add your API key — open script.js and replace the key at the top:

javascript   const API_KEY = "your_api_key_here";

Open index.html in your browser. No build tools or server needed.


🔑 API Key
This app uses the WeatherAPI free tier.
StepAction1Go to weatherapi.com2Sign up for a free account3Copy your API key from the dashboard4Paste it into script.js as const API_KEY = "..."


⚠️ Security Note: Never expose your API key in public repositories. For production, route API calls through a backend proxy or environment variable.


🎨 Tech Stack
LayerTechnologyMarkupHTML5StylingCSS3 (custom properties, grid, flexbox, animations)LogicVanilla JavaScript (ES2020+, async/await)FontsGoogle Fonts — Bebas Neue, DM Sans, Space MonoDataWeatherAPI REST API

📡 API Endpoints Used
https://api.weatherapi.com/v1/forecast.json
    ?key=YOUR_KEY
    &q=CITY_NAME
    &days=5
    &aqi=yes
    &alerts=no
Response data used
FieldUsed forcurrent.temp_cCurrent temperaturecurrent.feelslike_cFeels-like temperaturecurrent.conditionCondition text + icon codecurrent.humidityHumidity percentagecurrent.wind_kph / wind_dir / wind_degreeWind card + compasscurrent.uvUV indexcurrent.vis_kmVisibilitycurrent.pressure_mbPressurecurrent.air_quality["us-epa-index"]AQI index (1–6)forecast.forecastday[].day5-day forecast cardsforecast.forecastday[0].hourHourly strip

🌈 AQI Reference
IndexLabelColor1Good🟢 Teal2Moderate🟡 Yellow3Unhealthy for Sensitive Groups🟠 Orange4Unhealthy🔴 Red5Very Unhealthy🟣 Purple6Hazardous⚫ Dark Red

📱 Responsive Breakpoints
BreakpointLayout change> 720pxFull 3-column stats grid, 5-column forecast≤ 720px2-column stats, 3-column forecast, hero stacks vertically≤ 480pxSmaller temp font, 2-column stats

🛠️ Customisation
Change temperature unit to Fahrenheit
In script.js, replace all temp_c and feelslike_c references with temp_f and feelslike_f, and update the °C labels in index.html to °F.
Change accent colour
In style.css, update the --accent variable:
css:root {
  --accent: #4af0c4;  /* change to any colour */
}
Add more forecast days (up to 14 on paid plans)
Change days=5 to days=14 in the API URL inside script.js, and the forecast grid will automatically render all returned days.

📄 License
This project is open-source and free to use for personal and educational purposes.

Built with ❤️ using WeatherAPI · WeatherSphere © 2026
