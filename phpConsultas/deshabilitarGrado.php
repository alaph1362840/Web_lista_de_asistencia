<?php
    error_reporting (0);
    include 'Consulta.php';
    
    $tipo_consulta = 1;

    $sql = '
        CALL deshabilitarGrado('.$_POST['id_grado'].');
    ';
    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();             
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>