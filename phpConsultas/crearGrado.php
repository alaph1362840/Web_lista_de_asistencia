<?php
    error_reporting (0);
    include 'Consulta.php';
    session_start();
    
    $tipo_consulta = 1;

    $sql = '
        CALL crearGrado('.$_SESSION['id_empresa'].', "'.$_POST['nombre'].'" , "'.$_POST['img'].'"'.');
    ';
    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();             
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>