<?php
    error_reporting (0);
    include 'Consulta.php';
    $tipo_consulta = 2; 
    $sql = '
        CALL obtenerAsistencias('.$_POST['id_grado'].', "'.$_POST['fecha'].'");
    ';

    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>