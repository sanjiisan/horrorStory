<?php
$player = $_POST["player"];

	$pdo = new PDO("mysql:host=localhost;dbname=horrorstory", "pudel","Kupa1234!");
	$stmt = $pdo->query('SELECT * FROM xio');

	foreach($stmt as $row){
		
		$tmp = $row["player"]; 

		if($tmp != $player){
			echo $row["pos"];
		}
	}

?>