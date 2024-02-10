<?php
    //establishing connection to the database  
    $conn=mysqli_connect("localhost","root","");
    $myDb="nishith_shrestha_2408299"; //my database name
    $myTable="weatherapp"; //my table name

    if(!$conn){
        die("Connection error".mysqli_connect_error());//if connection failed
    }
    //query to check whether database is already created or not
    $sql="SHOW DATABASES";
    $dbnames=$conn->query($sql);
    $needToCreateDb=true;
    if($dbnames->num_rows>0){
        $dataDb=array();
        while($row=$dbnames->fetch_assoc()){
            array_push($dataDb,$row);
        }
        foreach($dataDb as $db){
            foreach($db as $value){
                if ($value==$myDb){
                    $needToCreateDb=false;
                }
        }
    }
    }
    
    //creating database if there isn't one
    if($needToCreateDb){
        
        $sql="CREATE DATABASE $myDb";
        $conn->query($sql);
        }
    //using the required database
    $sql="USE $myDb";
    $conn->query($sql);
    //checking whether there is already required table or not
    $sql="SHOW TABLES";
    $tableDb=$conn->query($sql);
    $needToCreateTable=true;
    if($tableDb->num_rows>0){
        $dataTable=array();
        while($row=$tableDb->fetch_assoc()){
            array_push($dataTable,$row);
        }
        foreach($dataTable as $table){
            foreach($table as $value){
                if ($value==$myTable){
                    $needToCreateTable=false;
                }
        }
    }
    
    }
    //creating table if there isn't one
    if($needToCreateTable){
        $sql="CREATE TABLE $myTable(
            city text,
            description text,
            main text,
            temp text,
            speed text,
            humidity text,
            pressure text,
            icon text,
            datecreated text,
            timecreated text
        );";
        $conn->query($sql);
    }
?>