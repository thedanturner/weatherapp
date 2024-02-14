const mysql = require('mysql');
// Assuming you are using a MySQL database
// Create a connection to the database
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
});

// Function to insert data into the database
function insertData(data) {
    const query = 'INSERT INTO weather_data (location, temperature, main, description) VALUES (?, ?, ?, ?)';
    const values = [data.name, data.main.temp, data.weather[0].main, data.weather[0].description];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            return;
        }
        console.log('Data inserted successfully');
    });
}

// ...

// Inside the fetchWeather function, after retrieving the data
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Update the UI with the data
        // ...

        // Insert the data into the database
        insertData(data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        locationElement.textContent = 'Error fetching weather data';
    });

// ...

// Close the database connection when you're done
connection.end();
