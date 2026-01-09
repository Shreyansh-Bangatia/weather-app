const searchBox = document.querySelector('#city-search');
const searchBtn = document.querySelector('#search-button');

const weatherIcon = document.querySelector('.weather-icon');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const descElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const weatherDetails = document.querySelector('.weather-details');


weatherDetails.style.display = 'none';


const cities = {
    delhi: { lat: 28.6139, lon: 77.2090 },
    mumbai: { lat: 19.0760, lon: 72.8777 },
    london: { lat: 51.5072, lon: -0.1276 },
    newyork: { lat: 40.7128, lon: -74.0060 }
};

async function checkWeather(city) {
    city = city.toLowerCase().replace(/\s+/g, '');

    if (!cities[city]) {
        alert('City not supported (Delhi, Mumbai, London, New York)');
        weatherDetails.style.display = 'none';
        return;
    }

    const { lat, lon } = cities[city];
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API Error');

        const data = await response.json();
        const weather = data.current_weather;

       
        weatherDetails.style.display = 'block';

        
        cityElement.textContent = city.toUpperCase();
        tempElement.textContent = `${Math.round(weather.temperature)}°C`;
        windElement.textContent = `${weather.windspeed} km/h`;
        humidityElement.textContent = 'N/A';

        
        const code = weather.weathercode;

        if (code === 0) {
            descElement.textContent = 'Clear';
            weatherIcon.src = 'assets/sunny.svg';
        } else if (code >= 1 && code <= 3) {
            descElement.textContent = 'Cloudy';
            weatherIcon.src = 'assets/reshot-icon-sunny-weather-5SZXMBGK6T.svg';
        } else if (code >= 45 && code <= 48) {
            descElement.textContent = 'Fog';
            weatherIcon.src = 'assets/reshot-icon-sunny-weather-5SZXMBGK6T.svg';
        } else if (code >= 51 && code <= 67) {
            descElement.textContent = 'Rain';
            weatherIcon.src = 'assets/rain.svg';
        } else if (code >= 71 && code <= 77) {
            descElement.textContent = 'Snow';
            weatherIcon.src = 'assets/reshot-icon-sunny-weather-5SZXMBGK6T.svg';
        } else if (code >= 80 && code <= 99) {
            descElement.textContent = 'Storm';
            weatherIcon.src = 'assets/rain.svg';
        } else {
            descElement.textContent = 'Unknown';
            weatherIcon.src = 'assets/reshot-icon-sunny-weather-5SZXMBGK6T.svg';
        }

    } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data');
        weatherDetails.style.display = 'none';
    }
}


searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value.trim());
});


searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value.trim());
    }
});
