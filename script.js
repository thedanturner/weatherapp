const apiKey = 'd8ab63bd9e5758217288b4ee51244e67';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const mainElement = document.getElementById('main');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('icon');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        locationElement.textContent = 'Please enter a location';
        temperatureElement.textContent = '';
        descriptionElement.textContent = '';
        iconElement.src = '';
    }
});

//To change displayed details see - https://openweathermap.org/current#current_JSON

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&APPID=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            mainElement.textContent = data.weather[0].main;
            descriptionElement.textContent = data.weather[0].description;
            iconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            if (data.weather[0].main === 'Clouds') {
                document.body.style.backgroundImage = 'url(https://images.freeimages.com/images/large-previews/294/partly-cloudy-1173077.jpg)';
            } else if (data.weather[0].main === 'Rain') {
                document.body.style.backgroundImage = 'url(https://images.freeimages.com/images/large-previews/9f6/rain-1381186.jpg)';
            } else {
                document.body.style.backgroundImage = 'url(https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/technology/apps/shutterstock_240459751.jpg)';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Error fetching weather data';
        });
    }

