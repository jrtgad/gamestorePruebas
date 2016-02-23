<?php

    //session_start();

    $_COOKIE[] = setcookie("GameStore", time(), null, "/", null, null, null);

    function replaceCharacters($string) {
        $replaced = array("á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "ñ", "À", "Ã", "Ì",
            "Ò", "Ù", "Ã™", "Ã ", "Ã¨", "Ã¬", "Ã²", "Ã¹", "ç", "Ç", "Ã¢", "ê",
            "Ã®", "Ã´", "Ã»", "Ã‚", "ÃŠ", "ÃŽ", "Ã”", "Ã›", "ü", "Ã¶", "Ã–",
            "Ã¯", "Ã¤", "«", "Ò", "Ã", "Ã„", "Ã‹", " ", "ñ");
        $toReplace = array("a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "n", "N", "A", "E", "I",
            "O", "U", "a", "e", "i", "o", "u", "c", "C", "a", "e", "i", "o", "u", "A",
            "E", "I", "O", "U", "u", "o", "O", "i", "a", "e", "U", "I", "A", "E", "_", "ng");
        $string = str_replace($replaced, $toReplace, $string);
        return $string;
    }

    if (isset($_POST['data'])) {
        $data = $_POST['data'];
        //$msg = "Su información ha sido guardada";

        $string = "Usuario: " .          $data['userName'] .    "\n";
        $string .= "E-mail: " .          $data['userMail'] .    "\n";
        $string .= "Contraseña: " . sha1($data['pass']) .       "\n";
        $string .= "URL: " .             $data['url'] .         "\n";
        $string .= "Direccion: " .       $data['address'] .     "\n";
        $string .= "Pais: " .            $data['country'] .     "\n";
        $string .= "Codigo postal: " .   $data['postalCode'] .  "\n";
        $string .= "Comentarios: " .     $data['comments'];
        $fp = fopen(replaceCharacters(   $data['userName']) . time() . '.txt', 'w');
        fwrite($fp, $string);
        fclose($fp);

        include '../html/index.html';
    } else {
        if (isset($_POST["registro"])) {
            include '../html/registro.html';
        } else {
            include '../html/index.html';
        }
    }
?>