<?php
require_once 'connection.php';
$conn = new mysqli($hostname, $username, $password, $database);
if($conn->connect_error) {
    exit('Could not connect');
}
$query = "SELECT * FROM history";
$result = $conn->query($query);
if($result->num_rows > 0) {
        echo "<table>";
        echo "<tr>";
        echo "<th>Location</th>";
        echo "<th>Temperature</th>";
        echo "<th>Weather</th>";
        echo "<th>Sky</th>";
        echo "<th>Search Date</th>";
        echo "</tr>";
        while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["location"] . "</td>";
                echo "<td>" . $row["temperature"] . "</td>";
                $iconUrl = "http://openweathermap.org/img/wn/" . $row["icon"] . ".png";
                echo "<td><img src='" . $iconUrl . "'></td>";
                echo "<td>" . $row["main"] . "</td>";
                echo "<td>" . $row["date"] . "</td>";
                echo "</tr>";
        }
        echo "</table>";
}