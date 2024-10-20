<?php 
/**
 *  Returns formated transactions for a specific pocket fromt the database
 */

// Import Pockit DB Manager
require("../db_manager.php");

// Get parameters from query string or request body
$pocket_id = isset($_REQUEST['pocket_id']) ? (float)$_REQUEST['pocket_id'] : 0;

// Debug
// $pocket_id = 1;

// Set the content type to application/json and return the response
header('Content-Type: application/json');
echo getDataFromTableForPocketDESC("transaction", $pocket_id);
?>