<?php 

// Import Pockit DB Manager
require("../db_manager.php");

// Initialize Variables
$living_expenses = 0;
$emergency_savings = 0;
$savings_and_investments = 0;
$splurge_money = 0;


// Get data from database
$data = json_decode(getDataFromTableDESCLimit("allocation", 4));
$totalResults = $data->Total;

for ($i=0; $i < $totalResults; $i++) {
    $c_res = $data->Results[$i];

    switch ($c_res->pocket_id) {
        case 1:
        // Pocket: Emergency Savings
        $emergency_savings = $c_res->allocation;
        break;
        case 2:
        // Pocket: Savings & Investments
        $savings_and_investments = $c_res->allocation;
        break;
        case 3:
        // Pocket: Splurge Money
        $splurge_money = $c_res->allocation;
        break;
        case 4:
        // Pocket: Living Expenses
        $living_expenses = $c_res->allocation;
        break;
        default:
            // do nothing
    }
}

// DEBUG
// $living_expenses = 0.32;
// $emergency_savings = 0.16;
// $savings_and_investments = 0.12;
// $splurge_money = 0.40;

// Prepare the response as a JSON object
$response = array(
    "living_expenses" => $living_expenses,
    "emergency_savings" => $emergency_savings,
    "savings_and_investments" => $savings_and_investments,
    "splurge_money" => $splurge_money
);

// Set the content type to application/json and return the response
header('Content-Type: application/json');
echo json_encode($response);

?>