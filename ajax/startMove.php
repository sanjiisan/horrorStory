<?php
if(!empty($_POST)){
	$dir = $_POST['dir'];
}
print_r($_POST);
$pdo = new PDO("mysql:host=localhost;dbname=horrorstory", "pudel","Kupa1234!");
try {
	$pdo->exec("UPDATE horror SET id=1, whostart='', p1move='$dir', p2move='', p1coords=0, p2coords=0 WHERE id=1");
} catch (Exception $e) {
	echo 'Blad: ',  $e->getMessage(), "\n";
}

echo "wyslano ruch";


?>