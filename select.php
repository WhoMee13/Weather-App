<?php
    include("./index.php");
  
    date_default_timezone_set("Asia/Kathmandu");
    $city=$_GET["cityName"];
    $dateToday=date("m/d/Y");
    $sql="SELECT * FROM weatherapp WHERE city='$city'";
    if(!$result=$conn->query($sql)){
        echo "Error while fetching data";
    }
    if($result->num_rows>0){
        $data=array();
        while($row=$result->fetch_assoc()){
            array_push($data,$row);
        }
    }
    else{
        $data=array();
    }
    $conn->close();
    $json_data=json_encode($data);
    header("Content-Type:application/json");
    echo $json_data;
?>
