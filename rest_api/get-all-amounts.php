<?php 

// Import Pockit DB Manager
require("../db_manager.php");

// Set the content type to application/json and return the response
header('Content-Type: application/json');

$series = array(
    "emergency_savings" => array(),
    "savings_and_investments" => array(),
    "splurge_money" => array(),
    "living_expenses" => array()
);

// Get data from database
$data = json_decode(getAmountsOfPocket(1));

for ($i=0; $i<$data->Total; $i++){
    array_push($series['emergency_savings'], $data->Results[$i]);
}

// Savings & Investments
$data = json_decode(getAmountsOfPocket(2));

for ($i=0; $i<$data->Total; $i++){
    array_push($series['savings_and_investments'], $data->Results[$i]);
}

// Splurge Money
$data = json_decode(getAmountsOfPocket(3));

for ($i=0; $i<$data->Total; $i++){
    array_push($series['splurge_money'], $data->Results[$i]);
}

// Living Expenses
$data = json_decode(getAmountsOfPocket(4));

for ($i=0; $i<$data->Total; $i++){
    array_push($series['living_expenses'], $data->Results[$i]);
}

echo json_encode($series);

?>