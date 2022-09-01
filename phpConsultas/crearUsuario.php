<?php
    error_reporting (0);
    include 'Consulta.php';
    session_start();
    
    $tipo_consulta = 1;
    $llave = 'En_busca_de_la_libertad_1521'; 

    $sql = '
        CALL crearUsuario('.$_SESSION['id_empresa'].', "'.$_POST['usuario'].'" , AES_ENCRYPT("'.$_POST['pass'].'", "'.$llave.'"), "'.$_POST['autoridad'].'", '.$_POST['habilitado'].');
    ';
    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();             
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();  
?>