<?php
    error_reporting (0);
    include 'Consulta.php';
    session_start();
    
    $tipo_consulta = 1;
    //al ejecutar la funcion decodeUrl quita los + y los combierte en espacios lo que arruin
    //$imagenCodificadaLimpia1 = str_replace("data:image/png;base64,", "", urldecode($_POST['imgEstudiante']));
    $imagenCodificadaLimpia1 = str_replace("data:image/png;base64,", "", $_POST['imgEstudiante']);
    //$imagenCodificadaLimpia1 = str_replace(" ", "+", $imagenCodificadaLimpia1);
    $imagenCodificadaLimpia2 = str_replace("data:image/png;base64,", "", $_POST['imgResponsable']);
    
    
    //$imagenDecodificada1= base64_decode($imagenCodificadaLimpia1);
    //$imagenDecodificada2= base64_decode($imagenCodificadaLimpia2);
    
    //las imagenes deben estar en base64 para guardarlas en el campo logblob mysql
    $sql = '
        CALL crearEstudiante( '.$_POST['id_grado'].', "'.$_POST['nombre'].'", "'.$imagenCodificadaLimpia1.'" , "'.$_POST['responsable'].'"'.', "'.$imagenCodificadaLimpia2.'",  "'.$_POST['telefono'].'");
    ';
    //echo "Sql: ".$sql;

    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();  
    //echo "respuesta: ".$respuesta;           
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>