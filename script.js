// Selecting elements from HTML
const cityName = document.querySelector(".cityName");
const form = document.querySelector("form");
const myLocation = document.querySelector(".myLocationBtn");
const timeAndDate = document.querySelector(".timeAndDate");

const dropdown = document.querySelector(".dropdown");
const weatherSection = document.querySelector('.weatherSection');
const weatherBackground = document.querySelector("#weatherBackground");
const weatherGlow = document.querySelector("#weatherGlow2")
const temperature = document.querySelector(".temperature");
const weatherCity = document.querySelector(".weatherCity");
const climateImg = document.querySelector(".climateImg");
const climateDescription = document.querySelector(".climateDescription");
const weatherDate = document.querySelector(".weatherDate");
const humidityVal = document.querySelector(".humidityVal");
const windSpeedVal = document.querySelector(".windSpeedVal");
const visibilityVal = document.querySelector(".visibilityVal");
const celciusToggle = document.querySelector('.celcius');
const fahernheitToggle = document.querySelector(".fahernheit");
const emptyStateSection = document.querySelector(".emptyStateSection");
const forecastCard = document.querySelector(".forecastCard");
const forecastSection = document.querySelector(".forecastSection");
const alert = document.querySelector("#alert");

// API configuration
const API_KEY = '94dce2c6f5a5d344214f6a19e5c2a027';

// Base API URL
const BASE = 'https://api.openweathermap.org/data/2.5';

// Variables to store fetched weather data and forecast data
let currentWeather = [], currentForecast = [];

// Weather colors object according to weather description
const weatherColors = {
  thunderstorm: "#8b5cf6",
  showerRain: "#22d3ee",
  rain: "#3b82f6",
  snow: "#e0f2fe",
  mist: "#67e8f9",
  clearSky: "#facc15",
  overcastClouds: "#60a5fa", 
  brokenClouds: "#93c5fd"   
}

// Function to update clock
function updateClock() {

    // Get current time
    const now = new Date();

    // Display time + date
    timeAndDate.innerHTML =
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' . ' +
      now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

updateClock();

// Update clock every second
setInterval(updateClock, 1000);



// Function to display weather
function displayWeather() {
    // console.log(currentForecast, currentWeather);
    
    // Show weather section and hide empty state
    weatherSection.style.display = "flex";
    emptyStateSection.style.display = "none";

    // Check for weather alerts for extreme temperatures
    if(Number(currentWeather.main.temp) > 40) {
        alert.innerHTML =  `⚠ Extreme heat warning ${currentWeather.main.temp}°C detected`;
        alert.style.display = "block";
    } else if(Number(currentWeather.main.temp) < 0) {
        alert.innerHTML =  `⚠ Extreme cold warning ${currentWeather.main.temp}°C detected`;
        alert.style.display = "block";
    } else {
        alert.style.display = "none";
    }

    // Display temperature depending on selected unit
    if(celciusToggle.value === "active") {
        temperature.innerHTML = `${Number(currentWeather.main.temp).toFixed(1)}°C`;
    } else {
         temperature.innerHTML = `${(Number(currentWeather.main.temp) * 9 / 5 + 32).toFixed(1)}°F`;
    }

    // Display city and country
    weatherCity.innerHTML = `${currentWeather.name}, ${currentWeather.sys.country}`;

    // Set weather image based on description
    const weatherIcon = getWeatherIcon(currentWeather.weather[0].id);
    climateImg.setAttribute('src', `./public/${weatherIcon}.png`);

    // Display weather description
    climateDescription.innerHTML = currentWeather.weather[0].description;

    // Set weather background 
    weatherBackground.style.display = "block";
    // weatherGlow.style.backgroundColor = weatherColors[weatherIcon];
    weatherBackground.style.backgroundColor = weatherColors[weatherIcon];

    // Display today's date
    weatherDate.innerHTML =  new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

    // Display humidity
    humidityVal.innerHTML = `${currentWeather.main.humidity}%`;

    // Convert wind speed from m/s to km/h
    windSpeedVal.innerHTML =  `${(Number(currentWeather.wind.speed) * 3.6).toFixed(1)}km/h`;

    // Convert visibility from meters to km
    visibilityVal.innerHTML = `${(Number(currentWeather.visibility) / 1000).toFixed(1)}km`;

    // Display 5 day forecast
    forecastSection.style.display = "flex"; 
    forecastCard.innerHTML = "";
    let count = 1;
    const today = new Date();
    currentForecast.list.forEach((data) => {

        // Only take date at 12:00 PM
        if(data.dt_txt.split(' ')[1] == "12:00:00") {
            // console.log(data);
            
            // Calculate next date
            const nextDay = new Date();
            nextDay.setDate(today.getDate() + count);

            // Format date (Fri, 6 Mar)
            const formatted = nextDay.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short"
            });

            const forecastIcon = getWeatherIcon(data.weather[0].id);

            // Create forecast card
            const forecastFeature = document.createElement("div");
            forecastFeature.className = "forecastFeature";

            // Add forecast data
            forecastFeature.innerHTML = `
                <p class="forecastDate">${formatted}</p>
               <div> <img src="./public/${forecastIcon}.png" alt="forecastIcon" class="forecastIcon" height="22px"></div>
                <p class="forecastTemp">${Number(data.main.temp).toFixed(1)}°C</p>
                <p class="forecastHumidity">
                     💧 <span class="forecastHumidityVal">${data.main.humidity}%</span>
                </p>
                 <p class="forecastWind">
                      💨 <span class="forecastWindVal">${(Number(data.wind.speed) * 3.6).toFixed(1)}</span>
                </p>
            `;

            // Add forecast card to UI
            forecastCard.appendChild(forecastFeature);
            count++;
        }
    })
}

// Toast notification function
function showToast(msg) {
    const t = document.querySelector('.toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

// Save searched city to localStorage
function saveCity() {
    const data = JSON.parse(localStorage.getItem("Weather")) || [];
    // console.log(data.includes(currentWeather.name))
    if(!data.includes(currentWeather.name))  data.push(currentWeather.name);
    localStorage.setItem('Weather', JSON.stringify(data));
}

// Display saved cities in dropdown
function displayCityNameInDropDown() {

    const data = JSON.parse(localStorage.getItem('Weather')) || [];
    if(data.length === 0) return false;
    dropdown.innerHTML = "";
    data.forEach((d) => {
        const div = document.createElement('div');
        div.className = "item";
        div.innerHTML = `${d}`;
        dropdown.appendChild(div);
    })

    const allItem = document.querySelectorAll(".item")

    // Add click event to each dropdown item
    allItem.forEach((item) => {
        item.addEventListener("click", (e) => {
            cityName.value = e.target.innerHTML;
            // Submit form automatically
            form.requestSubmit();
        })
    })
    return true;
}

function getWeatherIcon(code) {
    if (code >= 200 && code < 300) return "thunderstorm";
    if (code >= 300 && code < 400) return "showerRain";
    if (code >= 500 && code < 600) return "rain";
    if (code >= 600 && code < 700) return "snow";
    if (code >= 700 && code < 800) return "mist"
    if (code === 800) return "clearSky";
    if (code === 801 || code === 802 || code === 804) return "overcastClouds";
    return "brokenClouds";
}



// Fetch weather and forecast by city name
async function fetchWeatherByCityName(city) {
    try {
        const [weather, forecast] = await Promise.all([
        fetch(`${BASE}/weather?q=${city}&appid=${API_KEY}&units=metric`).then(r => r.json()),
        fetch(`${BASE}/forecast?q=${city}&appid=${API_KEY}&units=metric`).then(r => r.json())
      ]);
        return {weather, forecast};
    } catch(error) {
        showToast('Failed to fetch weather data');
    }
}

// Fetch weather and forecast using coordinates
async function fetchWeatherByCordinates(lat, long) {
    try {
        const [weather, forecast] = await Promise.all([
        fetch(`${BASE}/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`).then(r => r.json()),
        fetch(`${BASE}/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`).then(r => r.json())
      ]);
        return {weather, forecast};
    } catch(error) {
        showToast('Failed to fetch weather data');
    }
}


// Form submit event
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Validate city input
    if(cityName.value === '') {
        showToast("Please enter a city name");
        return;
    }

    // Fetch weather
    const {weather, forecast} =  await fetchWeatherByCityName(cityName.value);

    currentWeather = weather;
    currentForecast = forecast

    // Check if API returned error
    if(currentWeather.cod !== 200) {
        showToast("City not found? Try again")
    } else  {
        // Display weather data
        displayWeather();

        // Save city to history
        saveCity();
    }

})

// Get weather using current location
myLocation.addEventListener("click", () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const {weather, forecast} =  await fetchWeatherByCordinates(lat, long);
            currentWeather = weather;
            currentForecast = forecast
            if(currentWeather.cod !== 200) {
                showToast("Location error")
            } else  {
                cityName.value = currentWeather.name
                displayWeather();
                saveCity();
            }
        })
    }
})

// Show dropdown when input clicked
cityName.addEventListener("click", () => {
  const isTrue = displayCityNameInDropDown();
  if(isTrue) {
    dropdown.style.display = "block";
  }
});

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
  if(!event.target.closest(".cityName")) {
    dropdown.style.display = "none";
  }
});

// Celsius toggle
celciusToggle.addEventListener('click', () => {

    celciusToggle.value = "active";

    celciusToggle.style.backgroundColor = "#7eb8f7"
    fahernheitToggle.style.backgroundColor = "rgba(255,255,255,0.04)"

    celciusToggle.style.color = "black"
    fahernheitToggle.style.color = " #6b7280"

    displayWeather();
})

// Fahrenheit toggle
fahernheitToggle.addEventListener('click', () => {

    celciusToggle.value = "notActive";

    celciusToggle.style.backgroundColor = "rgba(255,255,255,0.04)"
    fahernheitToggle.style.backgroundColor = "#7eb8f7"

    celciusToggle.style.color = "#6b7280"
    fahernheitToggle.style.color = "black"

    displayWeather();
})