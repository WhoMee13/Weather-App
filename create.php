<?php
    //include index.php $conn to connect to the database
    include("./index.php");
    error_reporting(0);
    //my api key
    $apikey="c7dc18da48e486946e12085c701c8234";
    //taking city name by get method
    $city=$_GET["cityName"];
    if(isset($city)){
        #fetching api data
        $response=file_get_contents("https://api.openweathermap.org/data/2.5/weather?q=$city&APPID=$apikey");
        $data=json_decode($response,true);
        if(isset($data)){
            #converting response into json format
            #storing necessary informations in variables
            date_default_timezone_set("Asia/Kathmandu");
            $description=$data["weather"][0]['description'];
            $main=$data["weather"][0]['main'];
            $temp=$data["main"]['temp'];
            $speed=$data['wind']['speed'];
            $humidity=$data["main"]["humidity"];
            $pressure=$data["main"]["pressure"];
            $icon=$data["weather"][0]['icon'];
            $currentTime=date("H");
            $currentDate=date("m/d/Y");
            //storing in database
            $sql="INSERT INTO weatherapp(city,description,main,temp,speed,humidity,pressure,icon,datecreated,timecreated) VALUES('$city','$description','$main','$temp','$speed','$humidity','$pressure','$icon','$currentDate','$currentTime')";
            $conn->query($sql);
            $msg=["error"=>false];
        }
        else{
            $msg=["error"=>true];
        }
    }
    $json_data=json_encode($msg,true);
    echo $json_data;
?>