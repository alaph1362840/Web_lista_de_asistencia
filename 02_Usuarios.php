<?php 
    session_start();
    include 'phpConsultas/verificarUsuario.php';     
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de asistencia</title>
    <!-- Establece el icono de la pagina -->
    <link rel="icon" type="image/png" href="img/Escuela.png" />
    <!-- LIBRERIAS CSS-->
    <link rel="stylesheet" href="librerias/bootstrap-5.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="librerias/fontawesome-5.13.0/css/all.min.css">
    <link rel="stylesheet" href="librerias/tipografia/tipografia.css">
    <link rel="stylesheet" href="librerias/imgeSelet/css/dd.css">
    <link rel="stylesheet" href="librerias/alertifyjs/css/alertify.min.css">

    <!-- MIS CSS -->    
    <link rel="stylesheet" href="css/generales.css">
    <link rel="stylesheet" href="css/02_Usuarios.css">

</head>

<body class="d-flex align-items-center">
    <!-- BARRA DE NAVEGACION -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top menuSuperior">
        <div class="container-fluid">
            <!-- Brand/logo -->
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="img/LogoNavbar.svg" class="mr-2" alt="logo" style="width:40px;">&nbsp; BDAC SOFTWARE
            </a>
            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Links -->
            <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul class="navbar-nav ">
                    <li class="nav-item ">
                        <a class="nav-link " href="01_Grados.php">
                            <i class="fas fa-school"></i>&nbsp; GRADOS
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                            <i class="fas fa-users"></i>&nbsp; USUARIOS
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php"><i class="fad fa-sign-out-alt"></i>&nbsp; SALIR</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <!-- CONTENIDO -->
    <div class="container contenido">        
        <h5 class="text-center mb-0 mt-2" id="pag3Titulo">Administracion de Usuarios.</h5>
        <h6 class="text-center fst-italic"><?php echo $_SESSION['nombreEmpresa']; ?></h6>
        <div class="row">
            <div class="col-lg-3 form-group">
                <button id="btnCUM" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ventanaModalCreacion"><i class="fas fa-user-plus"></i> <i class="inav" id="btnCUMl">Crear Usuario</i></button>
            </div>            
        </div>
        <hr>        
        <!-- tabla -->
        <table class="table table-hover table-bordered table-hover">
            <thead class="" style="background-color: rgb(204, 169, 130);">
                <tr>
                    <th scope="col" id="tblUser">Usuario</th>
                    <th scope="col" id="tblPass">Pass</th>
                    <th scope="col" id="tblTUser">Nivel de Autoridad</th>
                    <th scope="col" id="tblHabi" class="text-center">Habi</th>
                    <th scope="col" id="tblEdit" class="text-center">Edit</th>                    
                </tr>
            </thead>
            <tbody id="cuerpo_tabla">
                
            </tbody>
        </table> 
    </div>

    <!-- ********************** MODALES *************************** -->
    <!-- MODAL EDICION USUARIO-->
    <div class="modal fade" id="ventanaModal" tabindex="-1" aria-labelledby="p3MATitulo" aria-hidden="true">
        <div class="modal-dialog">
            <form class="modal-content" id="formActualizarUsusario">
                <div class="modal-header barraModalE text-white">
                    <h5 class="modal-title" id="p3MATitulo">Edición de usuario.</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row form-group mt-1 pe-lg-2">
                        <label class="col-lg-3 col-sm-12 col-form-label" for="txtUser" id="txtUserl">Usuario:</label>
                        <div class="col-lg-9 col-sm-12 pe-lg-0">
                            <input pattern="[^='\x22!]+" title="CARACTERES NO VÁLIDOS: [ = ' ! '' ]" id="txtUser" class="form-control" type="text" maxlength="40" minlength="4" required>    
                        </div>                
                    </div>
                    <div class="row form-group mt-2 pe-lg-2">
                        <label class="col-lg-3 col-sm-12 col-form-label" for="txtPass" id="txtPassl">Contraseña:</label>
                        <div class="col-lg-9 col-sm-12 pe-lg-0">
                            <input pattern="[^='\x22!]+" title="CARACTERES NO VÁLIDOS: [ = ' ! '' ]" id="txtPass" class="form-control" type="text" maxlength="40" minlength="5" required>    
                        </div>                 
                    </div>                    
                    <div class="row form-group mt-2 pe-lg-2">
                        <label class="col-lg-3 col-sm-12 col-form-label" for="tipoUser" id="tipoUserl">Nivel de autoridad:</label>
                        <div class="col-lg-9 col-sm-12 pe-lg-0">
                            <select class="form-select" id="tipoUser"  required>
                                <option value="baja" id="bajaMl" selected>Baja</option>
                                <option value="alta" id="altaMl">Alta</option>
                            </select>   
                        </div>                
                    </div>
                    <div class="row form-group mt-2 pe-lg-2">
                        <label class="col-lg-3 col-sm-12 col-form-label" for="habilitado" id="habilitadol">Habilitado:</label>
                        <div class="col-lg-9 col-sm-12 pe-lg-0">
                            <select class="form-select" id="habilitado">
                                <option value="1" id="sil">SI</option>
                                <option value="0" id="nol">NO</option>
                            </select>    
                        </div>                
                    </div>
                    
                </div>
                <div class="modal-footer barraModalE">
                    <button id="btnCancelmG" type="button" class="btn boton btnCancelar" data-bs-dismiss="modal"><i class="fas fa-times"></i> <i class="inav" id="btnCancelmGl">Cancelar</i></button>
                    <button id="btnActualizarUsuario" type="submit" class="btn boton btnConfirmacion"><i class="fad fa-save"></i> <i class="inav" id="btnActualizarUsuariol">Guardar cambios.</i></button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL CREACION USUARIO-->
    <div class="modal fade" id="ventanaModalCreacion" tabindex="-1" aria-labelledby="creaUsuariol" aria-hidden="true">
        <div class="modal-dialog">
            <form class="modal-content" id="formCreacionUsuario">
                <div class="modal-header barraModal text-white">
                    <h5 class="modal-title" id="creaUsuariol">Creación de usuario.</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <div class="row form-group mt-1 pe-lg-2">
                        <label class="col-lg-3 col-sm-12 col-form-label" for="txtUserC" id="txtUserCl">Usuario:</label>
                        <div class="col-lg-9 col-sm-12 pe-lg-0">
                            <input pattern="[^='\x22!]+" title="CARACTERES NO VÁLIDOS: [ = ' ! '' ]" id="txtUserC" class="form-control" type="text" maxlength="40" minlength="4" required>    
                        </div>                
                    </div>
                    <div class="row form-group mt-2 pe-lg-2">
                        <label class="col-lg-3 col-sm-12 col-form-label" for="txtPassC" id="txtPassCl">Contraseña:</label>
                        <div class="col-lg-9 col-sm-12 pe-lg-0">
                            <input pattern="[^='\x22!]+" title="CARACTERES NO VÁLIDOS: [ = ' ! '' ]" id="txtPassC" class="form-control" type="text" maxlength="40" minlength="5" required>    
                        </div>                
                    </div>
                    
                    <div class="row form-group mt-2 pe-lg-2">
                        <label class="col-lg-3 col-sm-12 col-form-label" for="tipoUserC" id="tipoUserCl">Nivel de Autoridad:</label>
                        <div class="col-lg-9 col-sm-12 pe-lg-0">
                            <select id="tipoUserC" class="form-select" name="" required>
                                <option id="bajal" value="baja" selected>baja</option>
                                <option id="altal" value="alta">alta</option>
                            </select>   
                        </div>                
                    </div>
                    <div class="row form-group mt-2 pe-lg-2">
                        <label class="col-lg-3 col-sm-12 col-form-label" for="habilitadoC" id="habilitadoCl">Habilitado:</label>
                        <div class="col-lg-9 col-sm-12 pe-lg-0">
                            <select id="habilitadoC" class="form-select" name="">
                                <option id="sill" value="1">SI</option>
                                <option id="noll" value="0">NO</option>
                            </select>   
                        </div>                
                    </div>
                    
                </div>
                <div class="modal-footer barraModal">
                    <button id="cancelarCUl" type="button" class="btn btn-secondary btnCancelar" data-bs-dismiss="modal"><i class="fas fa-times"></i> <i class="inav" id="cancelarCUll">Cancelar</i></button>
                    <button id="btnCrearUsuario" type="submit" class="btn boton btnConfirmacion"><i class="fad fa-save"></i> <i class="inav" id="btnCrearUsuario">Crear usuario.</i></button>
                </div>
            </form>
        </div>
    </div>

    <!-- LIBRERIAS JS-->
    <script src="librerias/jquery-3.6.0.min.js"></script>
    <script src="librerias/bootstrap-5.0.2/js/bootstrap.min.js"></script>
    <script src="librerias/imgeSelet/js/dd.min.js"></script>
    <script src="librerias/alertifyjs/alertify.min.js"></script>
    <!-- MIS JS -->
    <!-- SOLO PARA ADMINISTRADORES -->
    <script src="js/02_Usuarios.js"></script>
</body>

</html>