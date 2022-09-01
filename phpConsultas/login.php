<?php
    error_reporting (0);
    include 'Consulta.php';
    session_start();

    $_SESSION['id_usuario']='';
    $_SESSION['usuario']='';
    $_SESSION['autoridad']='';
    $_SESSION['habilitado']=false;
    $_SESSION['id_empresa']='';
    $_SESSION['nombreEmpresa']='';
    
    $tipo_consulta = 2;
    $llave = 'En_busca_de_la_libertad_1521'; 

    $sql = '
        CALL login("'.$_POST['usuario'].'",  AES_ENCRYPT("'.$_POST['pass'].'", "'.$llave.'"));
    ';
    $consulta = new Consulta($sql, $tipo_consulta);
    $respuesta = $consulta->ejecutar_consulta();  
    if ($respuesta["se_ejecuto"]) {       
        if ($respuesta["hay_datos"]) {
            $_SESSION['id_usuario']=$respuesta["datos"][0]->id_usuario;
            $_SESSION['usuario']= $respuesta["datos"][0]->usuario;
            $_SESSION['autoridad']= $respuesta["datos"][0]->autoridad;
            $_SESSION['habilitado']= $respuesta["datos"][0]->habilitado;
            $_SESSION['id_empresa']= $respuesta["datos"][0]->id_empresa;
            $_SESSION['nombreEmpresa']= $respuesta["datos"][0]->nombreEmpresa;  
        }               
    }       
    echo json_encode($respuesta);
    $consulta->limpiarRecursos();   
?>