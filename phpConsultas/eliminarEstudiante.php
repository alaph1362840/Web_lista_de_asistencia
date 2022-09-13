<?php
    error_reporting (0);
    include 'Consulta.php';
    
    $tipo_consulta = 1;

    $sql = '
        CALL eliminarEstudiante('.$_POST['id_estudiante'].');
    ';
    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();             
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>