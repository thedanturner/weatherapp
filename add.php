<?php
require_once 'connection.php';
$conn = new mysqli($hostname, $username, $password, $database);
if ($conn->connect_error) {
    exit('Could not connect');
}
 
$sql = "INSERT INTO history (location, temperature, icon, main) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
 
if ($stmt) {
    // Bind parameters and execute
    $stmt->bind_param("ssss", $_POST['location'], $_POST['temperature'], $_POST['icon'], $_POST['main']);
    $result = $stmt->execute();
    if ($result) {
        echo "Success";
    } else {
        echo "Failed: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "Failed to prepare statement: " . $conn->error;
}
 
$conn->close();
?>