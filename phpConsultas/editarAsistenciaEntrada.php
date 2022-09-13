<?php
    error_reporting (0);
    include 'Consulta.php';
    session_start();
    
    $tipo_consulta = 1;

    $sql = '
        CALL actualizarAsistenciaIN('.$_POST['id_asistencia'].', "'.$_POST['horaEntrada'].'" );
    ';
    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();             
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>