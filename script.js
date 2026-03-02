const cityName = document.querySelector(".cityName");
const form = document.querySelector("form");
const myLocation = document.querySelector(".myLocationBtn");

const temperature = document.querySelector(".temperature");
const weatherCity = document.querySelector(".weatherCity");
const climateImg = document.querySelector(".climateImg");
const climateDescription = document.querySelector(".climateDescription");
const weatherDate = document.querySelector(".weatherDate");
const humidityVal = document.querySelector(".humidityVal")
const windSpeedVal = document.querySelector(".windSpeedVal")
const visibilityVal = document.querySelector(".visibilityVal")

const API_KEY = '94dce2c6f5a5d344214f6a19e5c2a027';
const BASE = 'https://api.openweathermap.org/data/2.5';


function displayWeather(currentWeather) {
    temperature.innerHTML = `${Number(currentWeather.main.temp).toFixed(1)}°C`;
    weatherCity.innerHTML = `${currentWeather.name}, ${currentWeather.sys.country}`;
    climateImg.setAttribute('src', `./public/${currentWeather.weather[0].description}.png`);
    climateDescription.innerHTML = currentWeather.weather[0].description;
    weatherDate.innerHTML = "2 march, Monday";
    humidityVal.innerHTML = `${currentWeather.main.humidity}%`;
    windSpeedVal.innerHTML =  `${(Number(currentWeather.wind.speed) * 3.6).toFixed(1)}km/h`;
    visibilityVal.innerHTML = `${(Number(currentWeather.visibility) / 1000).toFixed(1)}km`;
}

async function fetchWeatherByCityName(city) {
    try {
        const response = await fetch(`${BASE}/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error", error);
        return error;
    }
}

async function displayWeatherAndForcast(cityName) {
    const currentWeather = await fetchWeatherByCityName(cityName);
    console.log(currentWeather)
    displayWeather(currentWeather);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(cityName.value === '') {
        alert("wrong input");
        return;
    }

    displayWeatherAndForcast(cityName.value);
})