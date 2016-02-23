<?php
require('BD.php');

function sendGame($product) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($product);
    exit();
}

function sendArrayJSON($data) {
    header('Content-type: application/json; charset=utf-8');
    echo "[";
    foreach($data as $key => $product) {
         echo json_encode($product, JSON_FORCE_OBJECT);
        if(count($data) !== $key + 1) {
            echo ",";
        }
    }
    echo "]";
    exit();
}
if(isset($_GET)) {
    $conexion = BD::getConexion();
    if(isset($_GET["q"])) {
        $search = $_GET["q"];
        $query = "Select id, name, prize, discount, imgMin
                from games
                where name like %" . %search . "% LIMIT 0 , 5";
        $select = $conexion->prepare($query);
        $select->setFetchMode(PDO::FETCH_ASSOC);
        $select->execute();
        $products = $select->fetchAll();
        sendArrayJSON($products);
     } else {
        if(isset($_GET["dataset"])) {
            $search = $_GET["dataset"];
            $query = "Select name from games where name like %" . %search . "% LIMIT 0 , 5";
            $select = $conexion->prepare($query);
            $select->setFetchMode(PDO::FETCH_ASSOC);
            $select->execute();
            $products = $select->fetchAll();
            sendArrayJSON($products);
        } else {
            if(isset($_GET["description"])) {
                $id = $_GET["description"];
                $query = "Select * from games where id = ".$id;
                $select = $conexion->prepare($query);
                $select->setFetchMode(PDO::FETCH_ASSOC);
                $select->execute();
                $product = $select->fetch();
                sendGame($product);
            }
        }
    }
}
?>