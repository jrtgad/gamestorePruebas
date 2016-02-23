<?php

class BD {

    private $basedatos = 'a2121453_games';
    private $usuario = 'a2121453_games';
    private $contrasenya = 'pepe1234';
    private $equipo = 'mysql6.000webhost.com';
    protected static $bd = null;

    private function __construct() {
        try {
            self::$bd = new PDO("mysql:host=$this->equipo;"
                    . "dbname=$this->basedatos", $this->usuario, $this->contrasenya);
        } catch (PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
            die();
        }
    }

    public static function getConexion() {
        if (!self::$bd) {
            new BD();
        }
        return self::$bd;
    }

}
