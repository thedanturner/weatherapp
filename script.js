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
                    document.body.style.backgroundImage = 'url(https://www.publicdomainpictures.net/pictures/70000/velka/background-with-rain.jpg)';
                } else if (data.weather[0].main === 'Clear') {
                    document.body.style.backgroundImage = 'url(https://th.bing.com/th/id/OIP.cUJMV5xpK0w6B_CAPOwL6gHaEo?rs=1&pid=ImgDetMain)';  
                } else if (data.weather[0].main === 'Snow') {
                    document.body.style.backgroundImage = 'url(https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/rZJIMvhmliwmde8a6/videoblocks-snowfall-on-the-background-of-blurred-forest-slow-motion-snow-falling-down-against-blurred-background-winter-holidays-season_szhypw86q_thumbnail-1080_01.png)'; 
                } else if (data.weather[0].main === 'Mist') {
                    document.body.style.backgroundImage = 'url(https://freebigpictures.com/wp-content/uploads/2009/09/mist.jpg)'; 
                } else {
                    document.body.style.backgroundImage = 'url(https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/technology/apps/shutterstock_240459751.jpg)';
                }
            })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Error fetching weather data';
        });
    }

