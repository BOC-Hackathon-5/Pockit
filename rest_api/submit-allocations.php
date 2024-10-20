<?php

// Set the content type to application/json and return the response
header('Content-Type: application/json');

// Import Pockit DB Manager
require("../db_manager.php");

// Get parameters from query string or request body
$new_living_expenses = isset($_REQUEST['living_expenses']) ? (float)$_REQUEST['living_expenses'] : 0;
$new_emergency_savings = isset($_REQUEST['emergency_savings']) ? (float)$_REQUEST['emergency_savings'] : 0;
$new_savings_and_investments = isset($_REQUEST['savings_and_investments']) ? (float)$_REQUEST['savings_and_investments'] : 0;
$new_splurge_money = isset($_REQUEST['splurge_money']) ? (float)$_REQUEST['splurge_money'] : 0;

// Debug
// $new_living_expenses = 0.80;
// $new_emergency_savings = 0.05;
// $new_savings_and_investments = 0.05;
// $new_splurge_money = 0.10;

// Log the new values (for server-side logging)
// error_log("LE: $new_living_expenses, ES: $new_emergency_savings, SI: $new_savings_and_investments, SP: $new_splurge_money");

// Todo - Actually add to database
insertAllocation(1, $new_emergency_savings/100);
insertAllocation(2, $new_savings_and_investments/100);
insertAllocation(3, $new_splurge_money/100);
insertAllocation(4, $new_living_expenses/100);

// Prepare the response as a JSON object
$response = array(
    "living_expenses" => $new_living_expenses,
    "emergency_savings" => $new_emergency_savings,
    "savings_and_investments" => $new_savings_and_investments,
    "splurge_money" => $new_splurge_money,
    "message" => "Reallocation completed"
);

echo json_encode($response);
?>