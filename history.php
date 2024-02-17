<?php
require_once 'connection.php';
 
header('Content-Type: application/json');
 
$conn = new mysqli($hostname, $username, $password, $database);
if ($conn->connect_error) {
    echo json_encode(['error' => 'Could not connect to the database']);
    exit;
}
 
// Assuming $location is safely retrieved and sanitized from a GET or POST parameter
// For example, using a GET request
$location = isset($_GET['location']) ? $conn->real_escape_string($_GET['location']) : '';
 
$query = "SELECT * FROM history WHERE location = '$location'";
$result = $conn->query($query);
 
if ($result && $result->num_rows > 0) {
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode(['error' => 'No data found for the specified location']);
}
 
$conn->close();
?>