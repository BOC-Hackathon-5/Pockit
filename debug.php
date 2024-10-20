<?php

/**
 * Testing and Debuging Backend-Related Funtionality
 * */

require('db_manager.php');

// Set the content type to application/json and return the response
header('Content-Type: application/json');

// echo "Connection to Database: <br>";
// connectToDatabase();

// echo "Checking Connection: " . checkConnection() ."<br>";

// echo "<br>Pockets: " . getAllPockets();

// echo getAllAllocations();
// echo getAllAmounts();
// echo getAllRecommendations();
// echo getAllTransactions();

// echo getDataFromTableForPocketDESC("transaction", 1);

// echo insertAllocation(1, 0.25);
// echo insertAllocation(2, 0.25);
// echo insertAllocation(3, 0.25);
// echo insertAllocation(4, 0.25);

echo getDataFromTableDESCLimit("allocation", 4);


// echo getDataFromTableDESCLimit("allocation", 4);

// $totalResults = $data->Total;

// for ($i=0; $i < $totalResults; $i++) {
// 	$c_res = $data->Results[$i];

// 	switch ($c_res->pocket_id) {
// 	  case 1:
// 	    echo "<br>Emergency Savings: ";
// 	    echo $c_res->allocation;
// 	    break;
// 	  case 2:
// 	    echo "<br>Savings & Investments: ";
// 	    echo $c_res->allocation;
// 	    break;
// 	  case 3:
// 	    echo "<br>Splurge Money: ";
// 	    echo $c_res->allocation;
// 	    break;
// 	  case 4:
// 	    echo "<br>Living Expenses: ";
// 	    echo $c_res->allocation;
// 	    break;
// 	  default:
// 	    echo "Looking forward to the Weekend";
// 	}
// }


// foreach ($data->Results as $value) {
// 	echo $value;
// }

// foreach($data as $key => $value) {
//   echo $key . " => " . $value . "<br>";
// }

?>