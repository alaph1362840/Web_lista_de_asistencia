<?php
    error_reporting (0);
    include 'Consulta.php';
    session_start();
    
    $tipo_consulta = 2; 

    $sql = '
        CALL crearAsistencias('.$_POST['id_grado'].', "'.$_POST['fecha'].'");
    ';
    //echo "sql: ".$sql;
    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();
    //echo $respuesta["datos"];
    //print_r($respuesta);             
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>