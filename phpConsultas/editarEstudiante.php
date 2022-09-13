<?php
    error_reporting (0);
    include 'Consulta.php';
    session_start();
    
    $tipo_consulta = 1;

    $imagenCodificadaLimpia1 = str_replace("data:image/png;base64,", "", $_POST['imgEstudiante']);
    $imagenCodificadaLimpia2 = str_replace("data:image/png;base64,", "", $_POST['imgResponsable']);

    $sql = '
        CALL actualizarEstudiatne('.$_POST['id_estudiante'].', "'.$_POST['nombre'].'", "'.$imagenCodificadaLimpia1.'" , "'.$_POST['responsable'].'"'.', "'.$imagenCodificadaLimpia2.'",  "'.$_POST['telefono'].'");
    ';
    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();             
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>