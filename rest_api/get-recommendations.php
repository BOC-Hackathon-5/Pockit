<?php 
	// TODO Retrieve the latest X recommendations from the database

// Import Pockit DB Manager
require("../db_manager.php");

// Get data from database
return getDataFromTableDESCLimit("recommendation", 3);
?>