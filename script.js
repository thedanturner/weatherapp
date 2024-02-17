const apiKey = 'd8ab63bd9e5758217288b4ee51244e67';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const mainElement = document.getElementById('main');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('icon');

searchButton.addEventListener('click', async() => {
    const location = locationInput.value;
    if (location) {
        const weatherData = await fetchWeather(location);
        updateHistory(weatherData);
        console.log(weatherData);
        console.log(location);
        renderHistory(location);

    } else {
        locationElement.textContent = 'Please enter a location';
        temperatureElement.textContent = '';
        descriptionElement.textContent = '';
        iconElement.src = '';
    }
});

function renderHistory(location) {
    fetch(`history.php?location=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const historyElement = document.getElementById('history');
            historyElement.innerHTML = '';
            data.forEach(historyData => {
                const historyItem = document.createElement('div');
                historyItem.innerHTML = `
                    <img src="http://openweathermap.org/img/wn/${historyData.icon}.png" alt="${historyData.main}">
                    <h3>${historyData.location}</h3>
                    <p>${historyData.temperature}°C</p>
                    <p>${historyData.main}</p>
                    <p>${historyData.date}</p>
                `;
                historyElement.appendChild(historyItem);
            });
        });
    }

function updateHistory(historyData) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "add.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 
    const params = `location=${encodeURIComponent(historyData.name)}&temperature=${encodeURIComponent(historyData.main.temp)}&icon=${encodeURIComponent(historyData.weather[0].icon)}&main=${encodeURIComponent(historyData.weather[0].main)}`;
 
    console.log(params); // To see the formatted request
    xmlhttp.send(params);
}


//To change displayed details see - https://openweathermap.org/current#current_JSON

async function fetchWeather(location) {
    try {
        const url = `${apiUrl}?q=${location}&APPID=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Update your UI elements here
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            mainElement.textContent = data.weather[0].main;
            descriptionElement.textContent = data.weather[0].description;
            iconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
     
            // Background image logic
            if (data.weather[0].main === 'Clouds') {
                document.body.style.backgroundImage = 'url(https://images.freeimages.com/images/large-previews/294/partly-cloudy-1173077.jpg)';
            } else if (data.weather[0].main === 'Rain') {
                document.body.style.backgroundImage = 'url(https://www.publicdomainpictures.net/pictures/70000/velka/background-with-rain.jpg)';
            } else if (data.weather[0].main === 'Clear') {
                document.body.style.backgroundImage = 'url(https://www.photos-public-domain.com/wp-content/uploads/2011/02/bright-sun-in-blue-sky.jpg)';  
            } else if (data.weather[0].main === 'Snow') {
                document.body.style.backgroundImage = 'url(https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/rZJIMvhmliwmde8a6/videoblocks-snowfall-on-the-background-of-blurred-forest-slow-motion-snow-falling-down-against-blurred-background-winter-holidays-season_szhypw86q_thumbnail-1080_01.png)'; 
            } else if (data.weather[0].main === 'Mist') {
                document.body.style.backgroundImage = 'url(https://freebigpictures.com/wp-content/uploads/2009/09/mist.jpg)'; 
            } else {
                document.body.style.backgroundImage = 'url(https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/technology/apps/shutterstock_240459751.jpg)';
            }
     
            return data; // This will still return a Promise, but you can use await when calling fetchWeather
        } catch (error) {
        console.error('Error fetching weather data:', error);
        locationElement.textContent = 'Error fetching weather data';
        throw error; // This allows the error to be caught by the caller of fetchWeather
    }
}