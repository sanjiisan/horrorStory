<?php
$pdo = new PDO("mysql:host=localhost;dbname=horrorstory", "pudel","Kupa1234!");
$stmt = $pdo->query('SELECT * FROM horror');

	foreach($stmt as $row){
		
		$tmp = $row["whostart"]; 
		echo $tmp;
	}


?>