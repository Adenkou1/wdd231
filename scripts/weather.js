// Weather API Implementation
const weatherApiKey = 'YOUR_API_KEY'; // Replace with actual API key
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=YourTown&units=imperial&appid=${weatherApiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=YourTown&units=imperial&appid=${weatherApiKey}`;

// Current Weather
fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather:', error);
    });

// 3-Day Forecast
fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayForecast(data);
    })
    .catch(error => {
        console.error('Error fetching forecast:', error);
    });

function displayCurrentWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const currentTemp = document.getElementById('current-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    weatherIcon.alt = data.weather[0].description;
    
    currentTemp.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = Math.round(data.wind.speed);
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('.forecast-cards');
    // Get forecasts for noon each day
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    
    // Limit to 3 days
    dailyForecasts.slice(0, 3).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);
        const iconCode = forecast.weather[0].icon;
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <h4>${day}</h4>
            <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${forecast.weather[0].description}">
            <p>${temp}°F</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}