<?php

  $severname = "localhost";
  $username = "root";
  $password = "";
  $dbname = "shoping";

  $stmt = mysqli_connect($severname,$username,$password,$dbname);

  if(!$stmt) {
    die("Connection failed" . mysqli_connect_error());
  } 

?>