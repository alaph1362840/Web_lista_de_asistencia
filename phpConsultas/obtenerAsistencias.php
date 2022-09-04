<?php
    error_reporting (0);
    include 'Consulta.php';
    $tipo_consulta = 2; 
    $sql = '
        CALL obtenerAsistencias('.$_SESSION['id_grado'].');
    ';
    //echo "sql: ".$sql;

    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();
    //echo $respuesta["datos"];
    //print_r($respuesta);
     
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>