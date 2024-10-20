<?php

// Import Pockit DB Manager
require("../db_manager.php");

// Initialize Variables
$living_expenses = 0;
$emergency_savings = 0;
$savings_and_investments = 0;
$splurge_money = 0;


// Get data from database
$data = json_decode(getDataFromTableDESCLimit("amount", 4));
$totalResults = $data->Total;

for ($i=0; $i < $totalResults; $i++) {
    $c_res = $data->Results[$i];

    switch ($c_res->pocket_id) {
        case 1:
        // Pocket: Emergency Savings
        $emergency_savings = $c_res->amount;
        break;
        case 2:
        // Pocket: Savings & Investments
        $savings_and_investments = $c_res->amount;
        break;
        case 3:
        // Pocket: Splurge Money
        $splurge_money = $c_res->amount;
        break;
        case 4:
        // Pocket: Living Expenses
        $living_expenses = $c_res->amount;
        break;
        default:
            // do nothing
    }
}

// TODO - Retrieve ammounts in each pocket from database
// $living_expenses = 2342;
// $emergency_savings = 500;
// $savings_and_investments = 4062;
// $splurge_money = 300;

// Prepare the response as a JSON object
$response = array(
    "living_expenses_amount" => $living_expenses,
    "emergency_savings_amount" => $emergency_savings,
    "savings_and_investments_amount" => $savings_and_investments,
    "splurge_money_amount" => $splurge_money
);

// Set the content type to application/json and return the response
header('Content-Type: application/json');
echo json_encode($response);
?>