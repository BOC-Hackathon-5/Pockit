<?php 

/**
 * 
 * Pockit Database Manager
 * 
 * */

require_once('config.php');

$conn=mysqli_connect($dbServername,$dbUsername,$dbPassword,$dbName);
$conn->set_charset("utf8");

/*
*	Checks if the connection was successfull.
*	Returns 0 in a successful connection, otherwise returns -1.
**/
function checkConnection(){
	//Access Connection Variable
	global $conn;

	// Check connection
	if ($conn->connect_error) {
		// Return not successful connection
		return -1;
	} 

	// Return successful connection
	return 0;
}

function connectToDatabase(){
	global $conn, $dbServername, $dbUsername, $dbPassword, $dbName;
	$conn=mysqli_connect($dbServername,$dbUsername,$dbPassword,$dbName);
	$conn->set_charset("utf8");
}

/**
 * Get all data records from given table
 *
 * @since 1.0.0
 *
 * @param table_name: string
 * @return JSON
 */
function getDataFromTable($table_name){
	global $conn;
	connectToDatabase();

	$query = "SELECT * FROM `".$table_name."`";

	$result = $conn->query($query);


	// $res_contents = array();
	$totalResults = 0;

	$returnObj = array("Total" => $totalResults, "Results" => array());

    // output data of each row
	while($row = $result->fetch_assoc()) {
		$totalResults++;
		array_push($returnObj["Results"], $row);
	}

	$returnObj["Total"] = $totalResults;

	// closing connection
	mysqli_close($conn);

	return json_encode($returnObj);
}

/**
 * Get all data records from given table in descending
 * order up to a given limit (e.g. top 4 records only)
 *
 * @since 1.0.0
 *
 * @param table_name: string
 * @param limit: integer
 * @return JSON
 */
function getDataFromTableDESCLimit($table_name, $limit){
	global $conn;
	connectToDatabase();

	$query = "SELECT * FROM `".$table_name."`"."ORDER BY timestamp DESC LIMIT ".$limit;

	$result = $conn->query($query);


	// $res_contents = array();
	$totalResults = 0;

	$returnObj = array("Total" => $totalResults, "Results" => array());

    // output data of each row
	while($row = $result->fetch_assoc()) {
		$totalResults++;
		array_push($returnObj["Results"], $row);
	}

	$returnObj["Total"] = $totalResults;

	// closing connection
	mysqli_close($conn);

	return json_encode($returnObj);
}

/**
 * Get all data records from given table in descending
 * order up to a given limit (e.g. top 4 records only)
 * for a given pocket based on its provided pocket_id.
 *
 * @since 1.0.0
 *
 * @param table_name: string
 * @param pocket_id: integer
 * @return JSON
 */
function getDataFromTableForPocketDESC($table_name, $pocket_id){
	global $conn;
	connectToDatabase();

	$query = "SELECT * FROM `".$table_name."`"." WHERE pocket_id=".$pocket_id." ORDER BY timestamp DESC";

	$result = $conn->query($query);

	// $res_contents = array();
	$totalResults = 0;

	$returnObj = array("Total" => $totalResults, "Results" => array());

    // output data of each row
	while($row = $result->fetch_assoc()) {
		$totalResults++;
		array_push($returnObj["Results"], $row);
	}

	$returnObj["Total"] = $totalResults;

	// closing connection
	mysqli_close($conn);

	return json_encode($returnObj);
}

/**
 * Get all data records from given table in descending
 * order up to a given limit for a given pocket based on its provided pocket_id.
 *
 * @since 1.0.0
 *
 * @param table_name: string
 * @param pocket_id: integer
 * @return JSON
 */
function getDataFromTableForPocketASC($table_name, $pocket_id){
	global $conn;
	connectToDatabase();

	$query = "SELECT * FROM `".$table_name."`"." WHERE pocket_id=".$pocket_id." ORDER BY timestamp ASC";

	$result = $conn->query($query);

	// $res_contents = array();
	$totalResults = 0;

	$returnObj = array("Total" => $totalResults, "Results" => array());

    // output data of each row
	while($row = $result->fetch_assoc()) {
		$totalResults++;
		array_push($returnObj["Results"], $row);
	}

	$returnObj["Total"] = $totalResults;

	// closing connection
	mysqli_close($conn);

	return json_encode($returnObj);
}

/**
 * Get all pockets
 *
 * @since 1.0.0
 *
 * @return JSON
 */
function getAllPockets(){
	return getDataFromTable("pocket");
}

/**
 * Get all allocations
 *
 * @since 1.0.0
 *
 * @return JSON
 */
function getAllAllocations(){
	return getDataFromTable("allocation");
}

/**
 * Get all allocations
 *
 * @since 1.0.0
 *
 * @return JSON
 */
function getAmountsOfPocket($pocket_id){
	return getDataFromTableForPocketASC("amount", $pocket_id);
}

/**
 * Get all pocket amounts
 *
 * @since 1.0.0
 *
 * @return JSON
 */
function getAllAmounts(){
	return getDataFromTable("amount");
}

/**
 * Get all recommendations
 *
 * @since 1.0.0
 *
 * @return JSON
 */
function getAllRecommendations(){
	return getDataFromTable("recommendation");
}

/**
 * Get all transactions
 *
 * @since 1.0.0
 *
 * @return JSON
 */
function getAllTransactions(){
	return getDataFromTable("transaction");
}

/**
 * Save Reccomendation
 *
 * @since 1.0.0
 *
 * @return JSON
 */
function saveRecommendation(){
	return 'DONE';
}

/**
 * Submit Allocations
 *
 * @since 1.0.0
 *
 * @return JSON
 */
function submitAllocations(){
	return 'DONE';
}

/*
* Database INSERT functions
*/

function insertAllocation($pocket_id, $allocation){
	global $conn;
	connectToDatabase();

	try{
		// Open the global mysqli prepared statement
		$stmt = $conn -> prepare('INSERT INTO `allocation` (`pocket_id`, `allocation`) VALUES (?,?)');

		// using prepared statement several times with different variables
		if (
			$stmt &&
			$stmt -> bind_param('id', $pocket_id, $allocation) &&
			$stmt -> execute()
		) {
			// closing connection 
			mysqli_close($conn);

		 	// new entry added
			$res = array('Success' => True);
			return json_encode($res);
		}

		// A problem occured
		$log ='['.date('d/m/Y H:i:s').'] Mysqli Error in db_manager.insertAllocation(): '. $conn->error . "\n Prepared statement: " . $stmt -> error . "\n";
		writeInLogFile($log);
		$res = array('Success' => False);
		return json_encode($res);
	} catch (Exception $e) {
		$log ='['.date('d/m/Y H:i:s').'] Caught exception in db_manager.insertAllocation(): '.$e->getMessage();
		writeInLogFile($log);

	    // A problem occured
		$res = array('Success' => False);
		return json_encode($res);
	}
}

/*
* Other Utilities
*/

/**
* Logs records in the corresponding logfile directory.
*
* @log string
*/
function writeInLogFile($log){
	//Save string to log, use FILE_APPEND to append.
	file_put_contents('logs/dbmanager/log_'.date("Y.m.d").'.log', $log, FILE_APPEND);
}

?>