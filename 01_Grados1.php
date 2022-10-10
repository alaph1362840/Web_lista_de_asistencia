<!-- PAGINA SIN DERECHOS DE ADMINISTRADOR -->
<?php 
    session_start();
    $_SESSION['pag'] = 1;
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
    <link rel="stylesheet" href="librerias/Tippy/tippy.css">

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
                
        <div id="cajaPrincipalGrados">
        </div>
        
    </div>

    <!-- CONTENIDO ASISTENCIA-->
    <div id="contenidoAsistencia" class="container contenido hide">
        <h3 id="btnAtrasA" class="text-center mt-3"><i class="fas fa-arrow-left btnAtras boton"></i></h3>
        <h1 class="text-center mb-0 mt-1 tituloPrincipal">NOMBRE DE GRADO</h1>
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
        <div id="cajaPrincipalAsistencias">
            
        </div>        
    </div>  

    <!-- LIBRERIAS JS-->
    <script src="librerias/jquery-3.6.0.min.js"></script>
    <script src="librerias/bootstrap-5.0.2/js/bootstrap.min.js"></script>
    <script src="librerias/Tippy/tippy.umd.min.js"></script>
    <script src="librerias/imgeSelet/js/dd.min.js"></script>
    <script src="librerias/alertifyjs/alertify.min.js"></script>
    <script src="librerias/sheetjs/xlsx.full.min.js"></script>
    <script src="librerias/FileSaver/FileSaver.min.js"></script>  
    <!-- MIS JS -->
    <!-- SOLO PARA ADMINISTRADORES -->
    <script src="js/01_Grados1.js"></script>
</body>

</html>