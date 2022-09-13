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
    <link rel="stylesheet" href="css/01_Grados.css">
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
                        <a class="nav-link active" href="#">
                            <i class="fas fa-school"></i>&nbsp; GRADOS
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="02_Usuarios.php">
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

    <!-- CONTENIDO GRADOS-->
    <div id="contenidoGrado" class="container contenido">
        <h1 class="text-center mb-0 mt-3 tituloPrincipal"><?php echo $_SESSION['nombreEmpresa']; ?></h1>
        <h5 class="text-center mt-0 subTituloPrincipal"><u>LISTA DE GRADOS.</u></h5>
        <!-- BOTON DE HABILITAR EDICION GRADOS-->
        <div class="row mt-2 mb-4">
            <div class="col-auto mx-auto">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="habiEdicionG">
                    <label class="form-check-label" for="habiEdicionG" id="habiEdicionGl">EDICION DE GRADOS</label>
                </div>
            </div>            
        </div>
        <div class="row mb-4">
            <div id="btnAgregarGrado" data-bs-toggle="modal" data-bs-target="#modalAddGrado" class="col-auto p-2 boton mx-auto">&nbsp;&nbsp;<i class="fas fa-plus-circle"></i> AGREGAR NIVEL &nbsp;&nbsp;</div>
        </div>
        <div id="cajaPrincipalGrados">
        </div>
        
    </div>

    <!-- CONTENIDO ASISTENCIA-->
    <div id="contenidoAsistencia" class="container contenido hide">
        <h3 id="btnAtrasA" class="text-center mt-3"><i class="fas fa-arrow-left btnAtras boton"></i></h3>
        <h1 class="text-center mb-0 mt-1 tituloPrincipal"> NOMBRE DE GRADO</h1>
        <!-- FECHA -->
        <div class="row my-2">
            <div class="col-lg-4 col-md-6 col-sm-8 col-10  mx-auto">
                <div class="input-group ">
                    <span id="fechal" class="input-group-text">FECHA:</span>
                    <input id="fecha" class="form-control border-dark" type="date">                    
                    <span id="btnAddLista" class="input-group-text boton"><i class="fas fa-calendar-plus"></i></span>
                    <span id="btnExportar" class="input-group-text boton"><i class="fas fa-file-excel"></i></span>
                </div>
            </div>            
        </div>
        
        <!-- BOTON ADD ESTUDIANTE -->
        <div class="row mt-1">
            <div id="btnAddEstudiante" data-bs-toggle="modal" data-bs-target="#modalAddEstudiante" class="col-auto p-2 boton mx-auto">&nbsp;&nbsp;<i class="fas fa-user-plus"></i><i id="btnModalAddEstu" class="sinFormato">AGREGAR ESTUDIANTE</i> &nbsp;&nbsp;</div>
        </div>
        <!-- BOTON DE HABILITAR EDICION USUARIOS-->
        <div class="row mt-2 mb-4">
            <div class="col-auto mx-auto">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="habiEdicionU">
                    <label class="form-check-label" for="habiEdicionU" id="habiEdicionUl">EDICION DE ESTUDIANTES</label>
                </div>
            </div>            
        </div>
        <div id="cajaPrincipalAsistencias">
            
        </div>        
    </div>

    <!-- ***** MODALES ***** -->
    <!-- MODAL ADD ESTUDIANTE -->
    <div class="modal fade" id="modalAddEstudiante" tabindex="-1" aria-labelledby="tituloMD1" aria-hidden="true">
        <div class="modal-dialog">
            <form id="frmAddEstudiante" class="modal-content">
                <div class="modal-header barrasModal">
                    <h5 class="modal-title" id="tituloMD1">Agregar Estudiante:</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- ESTUDIANTE -->
                    <div class="row">
                        <label for="txtCEstudiante" class="form-label col-md-3 col-4 my-auto txtCEstudiantel" id="">Estudiante:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-child mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <input type="text" name="txtCEstudiante" id="txtCEstudiante" class="form-control" required>
                        </div>
                    </div>
                    <!--RESPONSABLE -->
                    <div class="row mt-2">
                        <label for="txtCResponsable" class="form-label col-md-3 col-4 my-auto txtCResponsablel" id="">Responsable:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-male mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <input type="text" name="txtCResponsable" id="txtCResponsable" class="form-control" required>
                        </div>
                    </div>
                    <!--TELEFONO -->
                    <div class="row mt-2">
                        <label for="txtCtelefono" class="form-label col-md-3 col-4 my-auto txtCTelefonol" id="">Telefono:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-phone mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <input type="text" name="txtCtelefono" id="txtCtelefono" class="form-control" required>
                        </div>
                    </div>
                    <!-- DESICION DE FOTO -->
                    <div class="row mt-2">
                        <div class="col-lg-7">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="switchFoto">
                                <label class="form-check-label switchFotol" for="switchFoto" id="">Tomar fotografias.</label>
                            </div>
                        </div>                        
                    </div>
                    <!--SELECCION DE CAMARA -->
                    <div id="hi1" class="hide row mt-2">
                        <label for="listaDeDispositivos" class="form-label col-md-3 col-4 my-auto listaDeDispositivosl" >CAMARA:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-list mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <select class="form-control form-select" name="listaDeDispositivos" id="listaDeDispositivos">
                                <option>Seleccione camara.</option>
                            </select>
                        </div>
                    </div>                    
                    <!-- FOTOS -->
                    <div id="hi2" class="hide row my-3 d-flex justify-content-center align-items-center h-auto" >
                        <canvas id="canvas" class="d-none"></canvas>
                        <!-- FOTO DE ESTUDIANTE -->
                        <div class=" col-auto cajaFoto me-1">
                            <video id="video" playsinline autoplay class="videoC m-0"></video>
                            <img id="imgRefEstudiante" class="videoC" src="data:image/png;base64,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" >
                            <div class="row my-0">
                                <h6 class="text-center my-auto tituloFoto tfestudiante">Estudiante</h6>
                            </div>
                            <div class="row my-0">
                                <div id="estDesh" class="col-lg-3 d-flex align-items-center rdInfo p-1">
                                    <i class="far fa-circle mx-auto"></i>
                                </div>
                                <div id="estHabi" class="col-lg-3 d-flex align-items-center rdInfo rdInfoA p-1 hide">
                                    <i class="fas fa-check-circle mx-auto"></i>
                                </div>
                                <div id="btnCapturar1" class="col-lg-5 d-flex align-items-center btnCapturar p-1 boton">
                                    <i class="fas fa-camera-retro mx-auto"></i>
                                </div>
                                <div id="btnRefrescar01" class="col-lg-4 d-flex align-items-center btnRefrescar p-1 boton">
                                    <i class="fas fa-sync mx-auto"></i>
                                </div>
                            </div>                            
                        </div>
                        <!-- FOTO DE RESPONSABLE-->
                        <div class=" col-auto cajaFoto">
                            <video id="video2" playsinline autoplay class="videoC m-0"></video>
                            <img id="imgRespopnsable" class="videoC" src="data:image/png;base64,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">
                            <div class="row my-0">
                                <h6 class="text-center my-auto tituloFoto tfResponsable">Responsable</h6>
                            </div>
                            <div class="row my-0">
                                <div id="resDesh" class="col-lg-3 d-flex align-items-center rdInfo p-1">
                                    <i class="far fa-circle mx-auto"></i>
                                </div>
                                <div id="resHabi" class="col-lg-3 d-flex align-items-center rdInfo rdInfoA p-1 hide">
                                    <i class="fas fa-check-circle mx-auto"></i>
                                </div>
                                <div id="refHabi" class="col-lg-3 d-flex align-items-center rdInfo rdInfoA p-1 hide">
                                    <i class="fas fa-check-circle mx-auto"></i>
                                </div>
                                <div id="btnCapturar2" class="col-lg-5 d-flex align-items-center btnCapturar p-1 boton">
                                    <i class="fas fa-camera-retro mx-auto"></i>
                                </div>
                                <div id="btnRefrescar02" class="col-lg-4 d-flex align-items-center btnRefrescar p-1 boton">
                                    <i class="fas fa-sync mx-auto"></i>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer barrasModal">
                    <button id="" type="button" class="btn boton me-1 btnModalCerrar" data-bs-dismiss="modal">
                        <i class="far fa-times"></i> <i class="sinFormato btnCancelModal" id="">Cancelar</i>
                    </button>
                    <button id="btnAddEse" type="submit" class="btn boton ms-0 btnModalConfirmar">
                        <i class="fas fa-check"></i> <i class="sinFormato" id="btnGuardarEstu">Guardar</i>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL EDIT USER -->
    <div class="modal fade" id="modalEditEstu" tabindex="-1" aria-labelledby="tituloMD3" aria-hidden="true">
        <div class="modal-dialog">
            <form id="frmEditEstudiante" class="modal-content">
                <div class="modal-header barrasModal2">
                    <h5 class="modal-title" id="tituloMD3">Editar Estudiante:</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- ESTUDIANTE -->
                    <div class="row">
                        <label for="txtNombreE" class="form-label col-md-3 col-4 my-auto txtCEstudiantel">Estudiante:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-child mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <input type="text" name="txtNombreE" id="txtNombreE" class="form-control" required>
                        </div>
                    </div>
                    <!--RESPONSABLE -->
                    <div class="row mt-2">
                        <label for="txtNombreER" class="form-label col-md-3 col-4 my-auto txtCResponsablel">Responsable:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-male mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <input type="text" name="txtNombreER" id="txtNombreER" class="form-control" required>
                        </div>
                    </div>
                    <!--TELEFONO -->
                    <div class="row mt-2">
                        <label for="txtEtelefono" class="form-label col-md-3 col-4 my-auto txtCtelefonol" id="">Telefono:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-phone mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <input type="text" name="txtEtelefono" id="txtEtelefono" class="form-control" required>
                        </div>
                    </div>
                    <!-- DESICION DE FOTO -->
                    <div class="row mt-2">
                        <div class="col-lg-7">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="switchFotoE">
                                <label class="form-check-label switchFotol" for="switchFotoE">Tomar fotografias.</label>
                            </div>
                        </div>                        
                    </div>
                    <!--SELECCION DE CAMARA -->
                    <div id="hi3" class="row mt-2 hide">
                        <label for="listaDeDispositivosE" class="form-label col-md-3 col-4 my-auto listaDeDispositivosl">CAMARA:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-list mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <select class="form-control form-select" name="listaDeDispositivosE" id="listaDeDispositivosE">
                                <option>Seleccione camara.</option>
                            </select>
                        </div>
                    </div>                    
                    <!-- FOTOS -->
                    <div id="hi4" class="hide row my-3 d-flex justify-content-center align-items-center h-auto" >
                        <!-- FOTO DE ESTUDIANTE -->
                        <div class=" col-auto cajaFoto me-1">
                            <video id="video3" playsinline autoplay class="videoC m-0"></video>
                            <img id="imgRefEstudianteE" class="videoC" src="img/asistencia/Usuario.png">
                            <div class="row my-0">
                                <h6 class="text-center my-auto tituloFoto tfestudiante">Estudiante</h6>
                            </div>
                            <div class="row my-0">
                                <div id="estDeshE" class="col-lg-3 d-flex align-items-center rdInfo p-1">
                                    <i class="far fa-circle mx-auto"></i>
                                </div>
                                <div id="estHabiE" class="col-lg-3 d-flex align-items-center rdInfo rdInfoA p-1 hide">
                                    <i class="fas fa-check-circle mx-auto"></i>
                                </div>
                                <div id="btnCapturar1E" class="col-lg-5 d-flex align-items-center btnCapturar p-1 boton">
                                    <i class="fas fa-camera-retro mx-auto"></i>
                                </div>
                                <div id="btnRefrescar01E" class="col-lg-4 d-flex align-items-center btnRefrescar p-1 boton">
                                    <i class="fas fa-sync mx-auto"></i>
                                </div>
                            </div>                            
                        </div>
                        <!-- FOTO DE RESPONSABLE-->
                        <div class=" col-auto cajaFoto">
                            <video id="video4" playsinline autoplay class="videoC m-0"></video>
                            <img id="imgRespopnsableE" class="videoC" src="img/asistencia/Usuario.png" alt="" srcset="">
                            <div class="row my-0">
                                <h6 class="text-center my-auto tituloFoto tfResponsable">Responsable</h6>
                            </div>
                            <div class="row my-0">
                                <div id="resDeshE" class="col-lg-3 d-flex align-items-center rdInfo p-1">
                                    <i class="far fa-circle mx-auto"></i>
                                </div>
                                <div id="resHabiE" class="col-lg-3 d-flex align-items-center rdInfo rdInfoA p-1 hide">
                                    <i class="fas fa-check-circle mx-auto"></i>
                                </div>
                                <div id="refHabiE" class="col-lg-3 d-flex align-items-center rdInfo rdInfoA p-1 hide">
                                    <i class="fas fa-check-circle mx-auto"></i>
                                </div>
                                <div id="btnCapturar2E" class="col-lg-5 d-flex align-items-center btnCapturar p-1 boton">
                                    <i class="fas fa-camera-retro mx-auto"></i>
                                </div>
                                <div id="btnRefrescar02E" class="col-lg-4 d-flex align-items-center btnRefrescar p-1 boton">
                                    <i class="fas fa-sync mx-auto"></i>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer barrasModal2">
                    <button id="" type="button" class="btn boton me-1 btnModalCerrar" data-bs-dismiss="modal">
                        <i class="far fa-times"></i> <i class="sinFormato btnCancelModal" id="">Cancelar</i>
                    </button>
                    <button id="btnEditEstudent" type="submit" class="btn boton ms-0 btnModalConfirmar">
                        <i class="fas fa-check"></i> <i class="sinFormato" id="btnActualizarEstu">Actualizar</i>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL DELET USER -->
    <div class="modal fade" id="modalDeletEstu" tabindex="-1" aria-labelledby="tituloMD4" aria-hidden="true">
        <div class="modal-dialog">
            <form id="frmAddCita" class="modal-content">
                <div class="modal-header barrasModal3">
                    <h5 class="modal-title" id="tituloMD4">Eliminar Estudiante:</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4 id="txtEliminar">Deseas eliminar el estudiante de la lista?</h4>
                </div>
                <div class="modal-footer barrasModal3">
                    <button type="button" class="btn boton me-1 btnModalCerrar2" data-bs-dismiss="modal">
                        <i class="far fa-times"></i> <i class="sinFormato btnCancelModal" id="">Cancelar</i>
                    </button>
                    <button id="btnEliminarEse" type="submit" class="btn boton ms-0 btnModalConfirmar2">
                        <i class="fas fa-check"></i> <i class="sinFormato" id="btnEliminarEstud">Eliminar</i>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL ADD GRADO -->
    <div class="modal fade" id="modalAddGrado" tabindex="-1" aria-labelledby="tituloMD2" aria-hidden="true">
        <div class="modal-dialog">
            <form id="frmAddGrado" class="modal-content">
                <div class="modal-header barrasModal">
                    <h5 class="modal-title" id="tituloMD2">Agregar Nivel:</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- NOMBRE -->
                    <div class="row">
                        <label for="txtNombre" class="form-label col-3 my-auto" id="txtNombrel">GRADO:</label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-signature mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <input type="text" name="txtNombre" id="txtNombre" class="form-control" placeholder="Ej. Primero A 2022" required >
                        </div>
                    </div>
                    <!-- IMAGENE DESCRIPCION -->
                    <div class="row mt-2">
                        <label for="listImg" class="form-label col-3 my-auto" id="listImgl">
                            IMAGEN:
                        </label>
                        <div class="col-1 px-0 iconoM d-flex align-items-center">
                            <i class="fas fa-image mx-auto"></i>
                        </div>
                        <div class="ms-0 ps-0 col-7">
                            <select name="listImg" id="listImg" class="selectpicker" is="ms-dropdown" required>
                                <option value = "SinImagen" data-image="img/select/SinImagen.png" selected> Sin imagen</option>
                                <option value = "SalaCuna25" data-image="img/select/SalaCuna25.png"> Bebes</option>
                                <option value = "Infantes25" data-image="img/select/Infantes25.png"> Infantes</option>
                                <option value = "Kinder25" data-image="img/select/Kinder25.png"> Kinder</option>
                                <option value = "Preparatoria25" data-image="img/select/Preparatoria25.png"> Preparatoria</option>
                                <option value = "01" data-image="img/select/01.png"> Primero</option>
                                <option value = "02" data-image="img/select/02.png"> Segundo</option>
                                <option value = "03" data-image="img/select/03.png"> Tercero</option>
                                <option value = "04" data-image="img/select/04.png"> Cuarto</option>
                                <option value = "05" data-image="img/select/05.png"> Quinto</option>
                                <option value = "06" data-image="img/select/06.png"> Sexto</option>
                                <option value = "07" data-image="img/select/07.png"> Septimo</option>
                                <option value = "08" data-image="img/select/08.png"> Octavo</option>
                                <option value = "09" data-image="img/select/09.png"> Noveno</option>
                                <option value = "10" data-image="img/select/10.png"> Decimo</option>
                                <option value = "11" data-image="img/select/11.png"> Onceavo</option>                                
                            </select>
                        </div>
                    </div>                    

                </div>
                <div class="modal-footer barrasModal">
                    <button type="button" class="btn boton me-1 btnModalCerrar2" data-bs-dismiss="modal">
                        <i class="far fa-times"></i> <i class="sinFormato btnCancelModal" id="">Cancelar</i>
                    </button>
                    <button id="btnAddGrupo" type="submit" class="btn btn- ms-0 btnModalConfirmar">
                        <i class="fas fa-check"></i> <i class="sinFormato" id="btnAddGrupol">Guardar</i>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL DELETE GRADO -->
    <div class="modal fade" id="modalDeletGrado" tabindex="-1" aria-labelledby="tituloMD2" aria-hidden="true">
        <div class="modal-dialog">
            <div id="" class="modal-content">
                <div class="modal-header barrasModal">
                    <h5 class="modal-title" id="tituloMD2">Agregar Nivel:</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4 class="alert alert-danger">Realmente deseas deshabilitar el grado?</h4>
                </div>
                <div class="modal-footer barrasModal">
                    <button type="button" class="btn boton me-1 btnModalCerrar2" data-bs-dismiss="modal">
                        <i class="far fa-times"></i> <i class="sinFormato btnCancelModal" id="">Cancelar</i>
                    </button>
                    <button id="btnDeleteGrupo" type="" class="btn ms-0 btnModalConfirmar">
                        <i class="fas fa-ban"></i> <i class="sinFormato" id="btnAddGrupol" onclick="deshabilitarGrado()">Deshabilitar</i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- LIBRERIAS JS-->
    <script src="librerias/jquery-3.6.0.min.js"></script>
    <script src="librerias/bootstrap-5.0.2/js/bootstrap.min.js"></script>
    <script src="librerias/imgeSelet/js/dd.min.js"></script>
    <script src="librerias/alertifyjs/alertify.min.js"></script>
    <!-- MIS JS -->
    <!-- SOLO PARA ADMINISTRADORES -->
    <script src="js/01_Grados_0_Camaras.js"></script>
    <script src="js/01_Grados_1_Grados.js"></script>
    <script src="js/01_Grados_1_GradosAdmin.js"></script>
    <script src="js/01_Grados_2_Estudiantes.js"></script>
</body>

</html>