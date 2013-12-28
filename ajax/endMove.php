<?php
$pdo = new PDO("mysql:host=localhost;dbname=horrorstory", "pudel","Kupa1234!");
try {
	$pdo->exec("UPDATE horror SET id=1, whostart='', p1move='' WHERE id=1");
} catch (Exception $e) {
	echo 'Blad: ',  $e->getMessage(), "\n";
}
?>