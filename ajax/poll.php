<?php
if(!empty($_POST)){
	$move = $_POST['move'];
}
$time=time();
while((time()-$time) < 3){
$pdo = new PDO("mysql:host=localhost;dbname=horrorstory", "pudel","Kupa1234!");
		$stmt = $pdo->query('SELECT p1move FROM horror');
		
		$tmp = $stmt -> fetch();
	

		if($move != $tmp[0]){			
			echo $tmp[0];
			break;
		}
      
	
	//usleep(250000);
}
?>