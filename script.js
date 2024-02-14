import mysql from 'mysql';
const apiKey = 'd8ab63bd9e5758217288b4ee51244e67';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weatherapp'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

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
            fetchWeather(location)
                .then(data => {
                    insertData(data);
                })
                .catch(err => {
                    console.error('Error fetching weather data:', err);
                    locationElement.textContent = 'Error fetching weather data';
                });
        } else {
            locationElement.textContent = 'Please enter a location';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            iconElement.src = '';
        }
    });

    //To add/change displayed details see - https://openweathermap.org/current#current_JSON for available API results

    function fetchWeather(location) {
        const url = `${apiUrl}?q=${location}&APPID=${apiKey}&units=metric`;

        return fetch(url)
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
                    document.body.style.backgroundImage = 'url(https://www.photos-public-domain.com/wp-content/uploads/2011/02/bright-sun-in-blue-sky.jpg)';
                } else if (data.weather[0].main === 'Snow') {
                    document.body.style.backgroundImage = 'url(https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/rZJIMvhmliwmde8a6/videoblocks-snowfall-on-the-background-of-blurred-forest-slow-motion-snow-falling-down-against-blurred-background-winter-holidays-season_szhypw86q_thumbnail-1080_01.png)';
                } else if (data.weather[0].main === 'Mist') {
                    document.body.style.backgroundImage = 'url(https://freebigpictures.com/wp-content/uploads/2009/09/mist.jpg)';
                } else if (data.weather[0].main === 'Drizzle') {
                    document.body.style.backgroundImage = 'url(https://www.publicdomainpictures.net/pictures/70000/velka/background-with-rain.jpg)';
                } else {
                    document.body.style.backgroundImage = 'url(https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/technology/apps/shutterstock_240459751.jpg)';
                }
                return data;
            });
    }

    function insertData(data) {
        const query = "INSERT INTO `history` (`location`, `temperature`, `main`, `description`, `icon`) VALUES ";
        const values = [[data.name, data.main.temp, data.weather[0].main, data.weather[0].description, data.weather[0].icon]];

        connection.query(query, [values], (err) => {
            if (err) {
                console.error('Error inserting data into the database:', err);
                return;
            }
            console.log('Data inserted successfully');
        });
    }

    connection.end();
});
