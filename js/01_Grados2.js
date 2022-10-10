
// ---------------------------------------------------------- CAMARAS -------------------------------------------------
//Aqui guardaremos el stream globalmente
let stream;
// Declaramos elementos del DOM
const $video                = document.querySelector("#video"),
      $video2               = document.querySelector("#video2"),
      $canvas               = document.querySelector("#canvas"),
      $boton                = document.querySelector("#btnCapturar1"),
      $boton2               = document.querySelector("#btnCapturar2"),
      $foto                 = document.querySelector("#imgRefEstudiante"),
      $foto2                = document.querySelector("#imgRespopnsable"),
      $listaDeDispositivos  = document.querySelector("#listaDeDispositivos");

let visibleFotoEstudiante = false;
let visibleFotoResponsable = false;
//Modal de edicion de estudiante
const $video3                = document.querySelector("#video3"),
      $video4                = document.querySelector("#video4"),
      $botonE                = document.querySelector("#btnCapturar1E"),
      $boton2E               = document.querySelector("#btnCapturar2E"),
      $fotoE                 = document.querySelector("#imgRefEstudianteE"),
      $foto2E                = document.querySelector("#imgRespopnsableE"),
      $listaDeDispositivosE  = document.querySelector("#listaDeDispositivosE");
let visibleFotoEstudianteE = false;
let visibleFotoResponsableE = false;



//-------------------------------- FUNCIONES ---------------------------------
/**
 * @returns boolean si tiene soporte devuelve true si no false
 */
const tieneSoporteUserMedia = () =>
    !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
/**
 * @param  {...any} arguments json con las especificaciones del dispositipo a usar como el id o si reproduciremos audio o no
 * @returns obtiene el objeto (navigator) con los dispositivos y los argumentos que se le pasaron originalmete. 
 */
const _getUserMedia = (...arguments) =>
    (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);

const limpiarSelect = () => {
     //PARA CREACION DE ESTUDIANTE
    for (let x = $listaDeDispositivos.options.length - 1; x >= 0; x--)
        $listaDeDispositivos.remove(x);
    //PARA EDICION DE ESTUDIANTE
    for (let x = $listaDeDispositivosE.options.length - 1; x >= 0; x--)
        $listaDeDispositivosE.remove(x);
};
//Obtine todos los dispositipos disponibles, los de audio e video en forma de arreglo
const obtenerDispositivos = () => navigator
    .mediaDevices
    .enumerateDevices();
  
// La funcion que es llamada despues de que ya se dieron los permisos
// Lo que hace es llenar el select con los dispositivos obtenidos
const llenarSelectConDispositivosDisponibles = () => {
    limpiarSelect();
    obtenerDispositivos()
        .then(dispositivos => {
            const dispositivosDeVideo = [];
            dispositivos.forEach(dispositivo => {
                const tipo = dispositivo.kind;
                if (tipo === "videoinput") {
                    dispositivosDeVideo.push(dispositivo);
                }
            });
            // Vemos si encontramos algun dispositivo, y en caso de que si, entonces llamamos a la funcion
            if (dispositivosDeVideo.length > 0) {
                // Llenar el select
                dispositivosDeVideo.forEach(dispositivo => {
                    const option = document.createElement('option');
                    option.value = dispositivo.deviceId;
                    option.text = dispositivo.label;
                    $listaDeDispositivos.appendChild(option);
                    //PARA MODAL DE EDICION
                    $listaDeDispositivosE.appendChild(option);
                });
                // Mostrar Camara stream con el ID del primer dispositivo, luego el usuario puede cambiar
                mostrarStream(dispositivosDeVideo[0].deviceId);
            }
            
        });
}

//TOMAR FOTO Escuchar el click del boton para 
$boton.addEventListener("click", function() {
    if (!visibleFotoEstudiante) {
        //Pausar reproduccion
        $video.pause();
        //Obtener contexto del canvas y dibujar sobre el
        let contexto = $canvas.getContext("2d");
        $canvas.width = $video.videoWidth;
        $canvas.height = $video.videoHeight;
        contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);    
        let url = $canvas.toDataURL(); //Esta es la foto, en base 64  
        $foto.setAttribute('src', url);
        // MOSTRAR LA IMAGEN OCULTA Y OCULTAR EL VIDEO
        $("#video").hide();
        $("#imgRefEstudiante").show();
        // MOSTRAR OCULTAR BOTON CHECK
        $('#estDesh').addClass('hide');
        $('#estHabi').removeClass('hide');
        visibleFotoEstudiante = true;
        //Reanudar reproduccion
        $video.play();
    }    
});

$botonE.addEventListener("click", function() {
    if (!visibleFotoEstudianteE) {
        //Pausar reproduccion
        $video3.pause();
        //Obtener contexto del canvas y dibujar sobre el
        let contexto = $canvas.getContext("2d");
        $canvas.width = $video.videoWidth;
        $canvas.height = $video.videoHeight;
        contexto.drawImage($video3, 0, 0, $canvas.width, $canvas.height);    
        let url = $canvas.toDataURL(); //Esta es la foto, en base 64  
        $fotoE.setAttribute('src', url);
        // MOSTRAR LA IMAGEN OCULTA Y OCULTAR EL VIDEO
        $("#video3").hide();
        $("#imgRefEstudianteE").show();
        // MOSTRAR OCULTAR BOTON CHECK
        $('#estDeshE').addClass('hide');
        $('#estHabiE').removeClass('hide');
        visibleFotoEstudianteE = true;
        //Reanudar reproduccion
        $video3.play();
    }    
});

$boton2.addEventListener("click", function() {
    if (!visibleFotoResponsable) {
        //Pausar reproduccion
        $video2.pause();
        //Obtener contexto del canvas y dibujar sobre el
        let contexto = $canvas.getContext("2d");
        $canvas.width = $video.videoWidth;
        $canvas.height = $video.videoHeight;
        contexto.drawImage($video2, 0, 0, $canvas.width, $canvas.height);
        let url = $canvas.toDataURL(); //Esta es la foto, en base 64  
        $foto2.setAttribute('src', url);
        // MOSTRAR LA IMAGEN OCULTA Y OCULTAR EL VIDEO
        $("#video2").hide();
        $("#imgRespopnsable").show();
        // MOSTRAR OCULTAR BOTON CHECK
        $('#resDesh').addClass('hide');
        $('#resHabi').removeClass('hide');
        visibleFotoResponsable = true;
        //Reanudar reproduccion
        $video2.play();
    }  
});

$boton2E.addEventListener("click", function() {
    if (!visibleFotoResponsableE) {
        //Pausar reproduccion
        $video4.pause();
        //Obtener contexto del canvas y dibujar sobre el
        let contexto = $canvas.getContext("2d");
        $canvas.width = $video.videoWidth;
        $canvas.height = $video.videoHeight;
        contexto.drawImage($video4, 0, 0, $canvas.width, $canvas.height);
        let url = $canvas.toDataURL(); //Esta es la foto, en base 64  
        $foto2E.setAttribute('src', url);
        // MOSTRAR LA IMAGEN OCULTA Y OCULTAR EL VIDEO
        $("#video4").hide();
        $("#imgRespopnsableE").show();
        // MOSTRAR OCULTAR BOTON CHECK
        $('#resDeshE').addClass('hide');
        $('#resHabiE').removeClass('hide');
        visibleFotoResponsableE = true;
        //Reanudar reproduccion
        $video4.play();
    }  
});

// Escuchar cuando seleccionen otra opcion y entonces llamar a esta funcion
$listaDeDispositivos.onchange = () => {
  // Detener el stream
  if (stream) {
      stream.getTracks().forEach(function(track) {
          track.stop();
      });
  }
  // Mostrar el nuevo stream con el dispositivo seleccionado
  mostrarStream($listaDeDispositivos.value);
}

$listaDeDispositivosE.onchange = () => {
    // Detener el stream
    if (stream) {
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }
    // Mostrar el nuevo stream con el dispositivo seleccionado
    mostrarStream($listaDeDispositivosE.value);
}

const mostrarStream = idDeDispositivo => {
  _getUserMedia({
        video: {
          width: 400, height: 400,
          // Justo aqui­ indicamos cual dispositivo usar
          deviceId: idDeDispositivo,
        }
    },
    (streamObtenido) => {
        // Simple asignacion
        stream = streamObtenido;
        // Mandamos el stream de la camara al elemento de video
        $video.srcObject = stream;
        $video2.srcObject = stream;
        $video.play();
        $video2.play();
        //PARA EDICION DE ESTUDIANTE
        $video3.srcObject = stream;
        $video4.srcObject = stream;
        $video3.play();
        $video4.play();          
    }, (error) => {
        console.log("Permiso denegado o error: ", error);
        //$estado.innerHTML = "No se puede acceder a la camara, o no diste permiso.";
    });
}

function activarCamara() {
  // Comenzamos viendo si tiene soporte, si no, nos detenemos
  if (!tieneSoporteUserMedia()) {
      alert("Lo siento. Tu navegador no soporta esta caracteristica");
      //$estado.innerHTML = "Parece que tu navegador no soporta esta caracteristica. Intenta actualizarlo.";
      return;
  }
  llenarSelectConDispositivosDisponibles();   
}

$(document).ready(function () {
    //OCULTAR IMAGENES CAPTURA CREACION ESTUDIANTE
    $("#imgRefEstudiante").hide();
    $("#imgRespopnsable").hide();
    //OCULTAR IMAGENES CAPTURA EDICION ESTUDIANTE
    $("#imgRefEstudianteE").hide();
    $("#imgRespopnsableE").hide();
});

$("#btnRefrescar02").click(function (e) { 
    e.preventDefault();
    if (visibleFotoResponsable) {
        $("#video2").show();
        $("#imgRespopnsable").hide();
        visibleFotoResponsable = false;
        $('#resHabi').addClass('hide');
        $('#resDesh').removeClass('hide');
        $foto2.setAttribute('src', 'img/asistencia/Usuario.png');
    }    
});

$("#btnRefrescar02E").click(function (e) { 
    e.preventDefault();
    if (visibleFotoResponsableE) {
        $("#video4").show();
        $("#imgRespopnsableE").hide();
        visibleFotoResponsableE = false;
        $('#resHabiE').addClass('hide');
        $('#resDeshE').removeClass('hide');
        $foto2E.setAttribute('src', 'img/asistencia/Usuario.png');
    }    
});

$("#btnRefrescar01").click(function (e) { 
    e.preventDefault();
    if (visibleFotoEstudiante) {
        $("#video").show();
        $("#imgRefEstudiante").hide();
        visibleFotoEstudiante = false;
        $('#estHabi').addClass('hide');
        $('#estDesh').removeClass('hide');
        $foto.setAttribute('src', 'img/asistencia/Usuario.png');
    }    
});

$("#btnRefrescar01E").click(function (e) { 
    e.preventDefault();
    if (visibleFotoEstudianteE) {
        $("#video3").show();
        $("#imgRefEstudianteE").hide();
        visibleFotoEstudianteE = false;
        $('#estHabiE').addClass('hide');
        $('#estDeshE').removeClass('hide');
        $fotoE.setAttribute('src', 'img/asistencia/Usuario.png');
    }    
});

$("#switchFoto").change(function (e) { 
    e.preventDefault();
    if( $(this).prop('checked') ) {
        $("#hi1").removeClass('hide');
        $("#hi2").removeClass('hide');
        activarCamara();
    }else{
        $("#hi1").addClass('hide');
        $("#hi2").addClass('hide');
    }
});

$("#switchFotoE").change(function (e) { 
    e.preventDefault();
    if( $(this).prop('checked') ) {
        $("#hi3").removeClass('hide');
        $("#hi4").removeClass('hide');
        activarCamara();
    }else{
        $("#hi3").addClass('hide');
        $("#hi4").addClass('hide');
    }
});



// ------------------------------------------------------------------------ GRADOS ------------------------------------------------------------------
var listaGrados      = [];
var id_grado_eliminar= -1;
var id_grado_actual  = -1;

//--FORMULARIOS
const formCreacionGrado = document.getElementById('frmAddGrado');

// CRREACION DE grado
formCreacionGrado.addEventListener('submit', (e) => {
	e.preventDefault();
    const nombre    = formCreacionGrado['txtNombre'].value;
	const img       = "img/select/" + $("#listImg").val() + ".svg";
    
    var datos ={       
        "nombre":nombre,
        "img":img
    }
	//console.log(datos);
	$.ajax({
		type: "POST",
		url: "phpConsultas/crearGrado.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {		
		if (data.se_ejecuto) {
			$('#modalAddGrado').modal('hide');
            alertify.success("Grado agregado con exito.");		
			cargarGrados();
		} else {
			alertify.error("Error, Al insertar usuario datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});
    //formCreacionGrado.reset();
    $("#txtNombre").val("");
});

$(document).ready(function () {
    cargarGrados();
});

$("#habiEdicionG").change(function (e) { 
    e.preventDefault();
    comprobarOcultos();
});

// OBTIENE LOS GRADOS
function cargarGrados() {
    listaGrados = [];
    var url_php ="phpConsultas/obtenerGrados.php";
    var datos ={
        "no_unidad":""
    };
    $.ajax({
        type: "POST",
        url: url_php,
        data: datos,
        dataType: "json",        
    })
    .done(function( data ) {
        listaGrados = [];        
        var lista =[];
        $("#cajaPrincipalGrados").html("");
        var cadena =``;
        if (data.se_ejecuto) {
            lista = data.datos;
            lista.forEach(element => {                
                listaGrados.push(element);                                
                cadena += `
                    <div class="row mt-2 texGrado">
                        <div class="col-lg-10 mx-auto border">
                            <div class="row">
                                <div class="col-lg-2 col CtIma1 d-flex align-items-center">
                                    <div class="contImagen2 mx-auto">
                                        <img class="imgen" src="${element.img}" alt="" srcset="">
                                    </div>
                                </div>
                                <div class="col-lg-8 col-7 contText d-flex align-items-center align-content-center">
                                    <h1 class="text-center mx-auto">${element.nombre}</h1>
                                </div>
                                <!-- FLECHA GRADO -->
                                <div class="flechaGrado col-lg-2 col CtIma2 boton d-flex align-items-center" onclick="mostrarGrado(${element.id_grado})">
                                    <div class="contImagen2 mx-auto ">
                                        <img class="imgen" src="img/grados/FlechaGrado.svg" alt="" srcset="">
                                    </div>
                                </div>
                                <!-- DESHABILITAR GRADO -->
                                <div class="deshabiGrado hide col-lg-2 col CtIma2 boton d-flex align-items-center" onclick="eliminarGrado(${element.id_grado})">
                                    <div class="contImagen2 mx-auto ">
                                        <img class="imgen" src="img/grados/deshaGrado.svg" alt="" srcset="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            $("#cajaPrincipalGrados").html(cadena);            
            comprobarOcultos();
        } else {
            alertify.error("Ocurrio un error al obtener los usuarios.");
        }
		           
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        alertify.error("Error, la operacion fallo."+errorThrown);
    });
}

function comprobarOcultos() {
    if( $("#habiEdicionG").prop('checked') ) {
        $(".deshabiGrado").removeClass('hide');
        $(".flechaGrado").addClass('hide');
        console.log("Hola desde clases");
    }else{
        $(".flechaGrado").removeClass('hide');
        $(".deshabiGrado").addClass('hide');
    }
}

function deshabilitarGrado() {    
    var datos ={       
        "id_grado":id_grado_eliminar
    }
	//console.log(datos);
	$.ajax({
		type: "POST",
		url: "phpConsultas/deshabilitarGrado.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {		
		if (data.se_ejecuto) {
			$('#modalDeletGrado').modal('hide');
            alertify.success("Grado deshabilitado con exito.");		
			cargarGrados();
		} else {
			alertify.error("Error, Al insertar usuario datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});    
}

function mostrarGrado(id_grado) {
    //console.log("ID_GRADO"+id_grado);
    id_grado_actual = id_grado;
    //Ocultar lista de grados
    $("#contenidoGrado").addClass('hide');
    //mostrar asistencias.
    $("#contenidoAsistencia").removeClass('hide');
    cargarAsistencias();
}

function eliminarGrado(id_grado) {
    id_grado_eliminar = id_grado;
    $('#modalDeletGrado').modal('show');
}

//------------------------------------------------------------------------------ GRADOS ADMIN -----------------------------------------------------------------------------
$("#habiEdicionG").change(function (e) { 
    e.preventDefault();
    comprobarOcultos();
});

function comprobarOcultos() {
    if( $("#habiEdicionG").prop('checked') ) {
        $(".deshabiGrado").removeClass('hide');
        $(".flechaGrado").addClass('hide');
        console.log("Hola desde clases");
    }else{
        $(".flechaGrado").removeClass('hide');
        $(".deshabiGrado").addClass('hide');
    }
}

function deshabilitarGrado() {    
    var datos ={       
        "id_grado":id_grado_eliminar
    }
	$.ajax({
		type: "POST",
		url: "phpConsultas/deshabilitarGrado.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {		
		if (data.se_ejecuto) {
			$('#modalDeletGrado').modal('hide');
            alertify.success("Grado deshabilitado con exito.");		
			cargarGrados();
		} else {
			alertify.error("Error, Al insertar usuario datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});    
}

//----------------------------------------------------------------------GRADOS ESTUDIANTES ----------------------------------------------------------
var listaAsistencias = [];
var id_estudiante_actualizar = -1;
var id_estudiante_eliminar = -1;

//--FORMULARIOS
const frmAddEstudiante = document.getElementById('frmAddEstudiante');
const frmEditEstudiante = document.getElementById('frmEditEstudiante');

// CRREACION DE ESTUDIANTES frmAddEstudiante
frmAddEstudiante.addEventListener('submit', (e) => {
	e.preventDefault();
	//txtCResponsable
    const nombre            = frmAddEstudiante['txtCEstudiante'].value;
    const imgEstudiante     = $("#imgRefEstudiante").attr("src");    
    const responsable       = frmAddEstudiante['txtCResponsable'].value;
	const imgResponsable    = $("#imgRespopnsable").attr("src");    
	const telefono          = frmAddEstudiante['txtCtelefono'].value;	
    
    var datos ={       
        "nombre":nombre,
        "imgEstudiante":imgEstudiante,
		"responsable":responsable,
		"imgResponsable":imgResponsable,
		"telefono":telefono,
		"id_grado":id_grado_actual
    }
    
	$.ajax({
		type: "POST",
		url: "phpConsultas/crearEstudiante.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {		
		if (data.se_ejecuto) {
			$('#modalAddEstudiante').modal('hide');
            alertify.success("Estudiante agregado con exito.");
		} else {
			alertify.error("Error, Al insertar usuario datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});
});

// EDICION DE ESTUDIANTES frmAddEstudiante
frmEditEstudiante.addEventListener('submit', (e) => {
	e.preventDefault();
	//txtCResponsable
    const nombre            = frmEditEstudiante['txtNombreE'].value;
    const imgEstudiante     = $("#imgRefEstudianteE").attr("src");    
    const responsable       = frmEditEstudiante['txtNombreER'].value;
	const imgResponsable    = $("#imgRespopnsableE").attr("src");    
	const telefono          = frmEditEstudiante['txtEtelefono'].value;	
    
    var datos ={       
        "nombre":nombre,
        "imgEstudiante":imgEstudiante,
		"responsable":responsable,
		"imgResponsable":imgResponsable,
		"telefono":telefono,
		"id_estudiante":id_estudiante_actualizar        
    }
    
	$.ajax({
		type: "POST",
		url: "phpConsultas/editarEstudiante.php",
		data: datos,
		dataType: "json"        
	})
	.done(function( data ) {
        //console.log(data);		
		if (data.se_ejecuto) {
			$('#modalEditEstu').modal('hide');
            alertify.success("Estudiante editado con exito.");
            cargarAsistencias();
		} else {
			alertify.error("Error, Al editar usuario datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);
        // console.log("error:" + errorThrown);
        // console.log("textStatus:" + textStatus);
        // console.log(jqXHR);

	});
});

function actualizarAsistenciaEntrada(id_asistencia) {
    var today = new Date();
    const horaEntrada = today.getHours() +" : "+ today.getMinutes();
    var datos ={
        "id_asistencia":id_asistencia,
		"horaEntrada":horaEntrada
    }
	$.ajax({
		type: "POST",
		url: "phpConsultas/editarAsistenciaEntrada.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {
        //console.log(data);		
		if (data.se_ejecuto) {
            alertify.success("Hora ingresada con exito.");
            cargarAsistencias();
		} else {
			alertify.error("Error, Al insertar hora datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});
}

function actualizarAsistenciaSalida(id_asistencia) {
    var today = new Date();   
    const horaSalida  = today.getHours() +" : "+ today.getMinutes();   
    var datos ={
        "id_asistencia":id_asistencia,
		"horaSalida":horaSalida
    }
	$.ajax({
		type: "POST",
		url: "phpConsultas/editarAsistenciaSalida.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {		
		if (data.se_ejecuto) {
            alertify.success("Hora ingresada con exito.");
            cargarAsistencias();
		} else {
			alertify.error("Error, Al insertar hora datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});
    
}

function crearAsistencias() {
    listaAsistencias = [];
    var url_php ="phpConsultas/crearAsistencias.php";
    var fecha = $("#fecha").val();
    if (fecha != "") {
        var datos ={
            "id_grado":id_grado_actual,
            "fecha":fecha
        };
        $.ajax({
            type: "POST",
            url: url_php,
            data: datos,
            dataType: "json",        
        })
        .done(function( data ) {
            listaAsistencias = [];        
            var lista =[];
            $("#cajaPrincipalAsistencias").html("");
            var cadena =``;
            if (data.se_ejecuto) {
                lista = data.datos;            
                lista.forEach(element => {
                    var colocar = ``;
                    if (element.horaEntrada == "-- : --" && element.horaSalida == "-- : --") {
                        colocar = `
                            <div class="contImagen2 ">
                                <img class="imgen2" src="img/asistencia/IN01.png">
                                <h5 id="${element.id_asistencia}HE" class="hora2 horaE1 ">--:--</h5>                            
                            </div>
                            <div class="contImagen2">
                                <img class="imgen2" src="img/asistencia/IN03.png">
                                <h5 id="${element.id_asistencia}HS" class="hora2 horaE1 ">--:--</h5>
                            </div>
                            <div class="contImagen3 ms-1" onclick="actualizarAsistenciaEntrada(${element.id_asistencia})"></div>
                        `;
                    } else {
                        if (element.horaEntrada != "-- : --" && element.horaSalida == "-- : --") {
                            colocar = `
                                <div class="contImagen2 ">
                                    <img class="imgen2" src="img/asistencia/IN02.png">
                                    <h5 id="${element.id_asistencia}HE" class="hora2 horaE2 ">${element.horaEntrada}</h5>                            
                                </div>
                                <div class="contImagen2">
                                    <img class="imgen2" src="img/asistencia/IN03.png">
                                    <h5 id="${element.id_asistencia}HS" class="hora2 horaE1 ">--:--</h5>
                                </div>
                                <div class="contImagen4 ms-1" onclick="actualizarAsistenciaSalida(${element.id_asistencia})"></div>
                            `;
                        } else {
                            colocar = `
                                <div class="contImagen2 ">
                                    <img class="imgen2" src="img/asistencia/IN02.png">
                                    <h5 id="${element.id_asistencia}HE" class="hora2 horaE2 ">${element.horaEntrada}</h5>                            
                                </div>
                                <div class="contImagen2">
                                    <img class="imgen2" src="img/asistencia/IN04.png">
                                    <h5 id="${element.id_asistencia}HS" class="hora2 horaE3">${element.horaSalida}</h5>
                                </div>
                                <div class="contImagen5 ms-1"></div>
                            `;
                        }
                    }                
                    listaAsistencias.push(element);                                
                    cadena += `
                        <div class="row mb-2  mx-1">
                            <div class="col-lg-10 mx-auto">
                                <div class="row boxAsis px-1">
                                    <!-- IMAGENES DE PADRE E HIJO -->
                                    <div id="${element.id_asistencia}" class="col-auto mx-md-0 my-md-0 my-2  mx-auto  d-flex align-items-center justify-content-center  p-0">
                                        <div class="contImagen">
                                            <img class="imgen" src="data:image/png;base64,${element.imgEstudiante}">
                                        </div>
                                        <div class="contImagen">
                                            <img class="imgen" src="data:image/png;base64,${element.imgResponsable}">
                                        </div>
                                    </div>
                                    <!-- TEXTO -->
                                    <div class="col-lg-7 col-md-7 col-sm-12 contText ">
                                        <h3 class="text-md-start text-center"><strong class="cAlumno"> ALUMNO: </strong> ${element.nombre}</h3>
                                        <h3 class="text-md-start text-center"><strong class="cPadre"> PADRE: </strong> ${element.responsable}</h1>
                                    </div>
                                    <!-- EDICION DE USUARIO -->
                                    <div id="" class=" UserEditDelet hide col-auto d-flex align-items-center p-0 ms-md-auto mx-auto mb-md-0 mb-2">
                                        <div class="contImagenEdit" data-bs-toggle="modal" data-bs-target="#modalEditEstu" onclick="cargarEstudianteActualizar(${element.id_estudiante})">                          
                                        </div>
                                        <div class="contImagenDelet" data-bs-toggle="modal" data-bs-target="#modalDeletEstu" onclick="eliminarEstudiante(${element.id_estudiante})" >
                                        </div>
                                    </div>                    
                                    <!-- HORA DE ENTRADA Y SALIDA -->
                                    <div id="" class=" horaInOut col-auto  d-flex align-items-center p-0 ms-md-auto mx-auto mb-md-0 mb-2">
                                        ${colocar}
                                    </div>                    
                                </div>
                            </div>            
                        </div>
                    `;
                });
                $("#cajaPrincipalAsistencias").html(cadena);
                zoomImagenes();
                verificarEdicionEstudiantes();            
                //comprobarOcultos();
            } else {
                alertify.error("Ocurrio un error al crear las asistencias, posibles datos duplicados, intenta cambiar la fecha para crear nuevos datos");
            }                       
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alertify.error("Error, la operacion fallo."+errorThrown);
        }); 
    } else {
        alertify.error("Error, Debes ingresar una fecha valido para obtener la informacion");
    }    
}

function cargarAsistencias() {
    //console.log("Hola desde carga asistencias");
    listaAsistencias = [];
    var url_php ="phpConsultas/obtenerAsistencias.php";
    var fecha = $("#fecha").val();
    if (fecha != "") {
        var datos ={
            "id_grado":id_grado_actual,
            "fecha":fecha
        };
        //console.log("Fecha: " + fecha);
        $.ajax({
            type: "POST",
            url: url_php,
            data: datos,
            dataType: "json",        
        })
        .done(function( data ) {
            //console.log(data);
            listaAsistencias = [];        
            var lista =[];
            $("#cajaPrincipalAsistencias").html("");
            var cadena =``;
            if (data.se_ejecuto) {
                lista = data.datos;            
                lista.forEach(element => {
                    var colocar = ``;
                    if (element.horaEntrada == "-- : --" && element.horaSalida == "-- : --") {
                        colocar = `
                            <div class="contImagen2 ">
                                <img class="imgen2" src="img/asistencia/IN01.png">
                                <h5 id="${element.id_asistencia}HE" class="hora2 horaE1 ">--:--</h5>                            
                            </div>
                            <div class="contImagen2">
                                <img class="imgen2" src="img/asistencia/IN03.png">
                                <h5 id="${element.id_asistencia}HS" class="hora2 horaE1 ">--:--</h5>
                            </div>
                            <div class="contImagen3 ms-1" onclick="actualizarAsistenciaEntrada(${element.id_asistencia})"></div>
                        `;
                    } else {
                        if (element.horaEntrada != "-- : --" && element.horaSalida == "-- : --") {
                            colocar = `
                                <div class="contImagen2 ">
                                    <img class="imgen2" src="img/asistencia/IN02.png">
                                    <h5 id="${element.id_asistencia}HE" class="hora2 horaE2 ">${element.horaEntrada}</h5>                            
                                </div>
                                <div class="contImagen2">
                                    <img class="imgen2" src="img/asistencia/IN03.png">
                                    <h5 id="${element.id_asistencia}HS" class="hora2 horaE1 ">--:--</h5>
                                </div>
                                <div class="contImagen4 ms-1" onclick="actualizarAsistenciaSalida(${element.id_asistencia})"></div>
                            `;
                        } else {
                            colocar = `
                                <div class="contImagen2 ">
                                    <img class="imgen2" src="img/asistencia/IN02.png">
                                    <h5 id="${element.id_asistencia}HE" class="hora2 horaE2 ">${element.horaEntrada}</h5>                            
                                </div>
                                <div class="contImagen2">
                                    <img class="imgen2" src="img/asistencia/IN04.png">
                                    <h5 id="${element.id_asistencia}HS" class="hora2 horaE3">${element.horaSalida}</h5>
                                </div>
                                <div class="contImagen5 ms-1"></div>
                            `;
                        }
                    }               
                    listaAsistencias.push(element);                                
                    cadena += `
                        <div class="row mb-2  mx-1">
                            <div class="col-lg-10 mx-auto">
                                <div class="row boxAsis px-1">
                                    <!-- IMAGENES DE PADRE E HIJO -->
                                    <div id="${element.id_asistencia}" class="col-auto mx-md-0 my-md-0 my-2  mx-auto  d-flex align-items-center justify-content-center  p-0">
                                        <div class="contImagen">
                                            <img class="imgen" src="data:image/png;base64,${element.imgEstudiante}">
                                        </div>
                                        <div class="contImagen">
                                            <img class="imgen" src="data:image/png;base64,${element.imgResponsable}">
                                        </div>
                                    </div>
                                    <!-- TEXTO -->
                                    <div class="col-lg-7 col-md-7 col-sm-12 contText ">
                                        <h3 class="text-md-start text-center"><strong class="cAlumno"> ALUMNO: </strong> ${element.nombre}</h3>
                                        <h3 class="text-md-start text-center"><strong class="cPadre"> PADRE: </strong> ${element.responsable}</h1>
                                    </div>
                                    <!-- EDICION DE USUARIO -->
                                    <div id="" class=" UserEditDelet hide col-auto d-flex align-items-center p-0 ms-md-auto mx-auto mb-md-0 mb-2">
                                        <div class="contImagenEdit" data-bs-toggle="modal" data-bs-target="#modalEditEstu" onclick="cargarEstudianteActualizar(${element.id_estudiante})">                          
                                        </div>
                                        <div class="contImagenDelet" data-bs-toggle="modal" data-bs-target="#modalDeletEstu" onclick="eliminarEstudiante(${element.id_estudiante})">
                                        </div>
                                    </div>                    
                                    <!-- HORA DE ENTRADA Y SALIDA -->
                                    <div id="" class=" horaInOut col-auto  d-flex align-items-center p-0 ms-md-auto mx-auto mb-md-0 mb-2">
                                        ${colocar}
                                    </div>                    
                                </div>
                            </div>            
                        </div>
                    `;
                });
                $("#cajaPrincipalAsistencias").html(cadena);
                zoomImagenes();
                verificarEdicionEstudiantes();            
                //comprobarOcultos();
            } else {
                alertify.error("Ocurrio un error al obtener los asistencias.");
            }
                       
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alertify.error("Error, la operacion fallo."+errorThrown);
        }); 
    } else {
        alertify.error("Error, Debes ingresar una fecha valido para obtener la informacion");
    }    
}
//CARRUSEL DE IMAGENES DE ESTUDIANTE O REPRESENTANTE
function zoomImagenes() {
    // delete all templates
    $.magnificPopup.instance.popupsCache = {};
    listaAsistencias.forEach(element => {
        $('#'+element.id_asistencia).magnificPopup({
            items: [
                {
                    src: "data:image/png;base64,"+element.imgEstudiante,
                    type: 'image' 
                },
                {
                    src: "data:image/png;base64,"+element.imgResponsable,
                    type: 'image' 
                }
            ],
            closeBtnInside: true,
            gallery: {
                enabled: true
            }
        });
    });
}

$("#btnAddLista").click(function (e) { 
    e.preventDefault();
    crearAsistencias();
});

$("#btnAtrasA").click(function (e) { 
    e.preventDefault();
    $("#contenidoAsistencia").addClass('hide');
    //mostrar asistencias. 
    $("#contenidoGrado").removeClass('hide');
    //cargarAsistencias();
});

$("#fecha").change(function (e) { 
    e.preventDefault();
    cargarAsistencias();
});

$(document).ready(function () {
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if(dia<10)
        dia='0'+dia; //agrega cero si el menor de 10
    if(mes<10)
        mes='0'+mes //agrega cero si el menor de 10
    document.getElementById('fecha').value=ano+"-"+mes+"-"+dia;

});

function cargarEstudianteActualizar(id) {
    id_estudiante_actualizar = id;
    var centinela = "";
    listaAsistencias.forEach(element => {
        if (element.id_estudiante == id) {
            centinela = element;
        }
    });
    console.log("Centinela:");
    console.log(centinela);
    if (typeof centinela.nombre != 'undefined') {
        $("#txtNombreE").val(centinela.nombre);
        $("#txtNombreER").val(centinela.responsable);
        $("#txtEtelefono").val(centinela.telefono);
        //$("#imgRefEstudianteE").attr("src");
        var urlImgEstu = "data:image/png;base64," + centinela.imgEstudiante; 
        $("#imgRefEstudianteE").attr("src", urlImgEstu);
        var urlImgRespo = "data:image/png;base64," + centinela.imgResponsable; 
        $("#imgRespopnsableE").attr("src", urlImgRespo);        
    }
}

function eliminarEstudiante(id) {
    id_estudiante_eliminar = id;
}

$("#btnEliminarEstud").click(function (e) { 
    e.preventDefault();
    var datos ={       
        "id_estudiante":id_estudiante_eliminar
    }
	//console.log(datos);
	$.ajax({
		type: "POST",
		url: "phpConsultas/eliminarEstudiante.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {		
		if (data.se_ejecuto) {
			$('#modalDeletEstu').modal('hide');
            alertify.success("Estudiante eliminado con exito.");		
			cargarAsistencias();
		} else {
			alertify.error("Error, Al eliminar estudiante datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	}); 
});

//Habilitar edidciones de estudiantes
$("#habiEdicionU").change(function (e) { 
    e.preventDefault();
    verificarEdicionEstudiantes();
});

function verificarEdicionEstudiantes() {
    if( $("#habiEdicionU").prop('checked') ) {
        $(".UserEditDelet").removeClass('hide');
        $(".horaInOut").addClass('hide');
    }else{
        $(".horaInOut").removeClass('hide');
        $(".UserEditDelet").addClass('hide');
    }
}

// --------------------------------------------CREACION DE EXCEL -------------------------------------------
$("#btnExportar").click(function (e) { 
    e.preventDefault();
    exportarExcel();    
});

function exportarExcel() {
    var gradoActual = "";
    listaGrados.forEach(element => {
        if (element.id_grado ==  id_grado_actual) {
            gradoActual = element;
        }
    });
    //EXPORTACION ASISTENCIAS
    //creacion de libro
    var wb = XLSX.utils.book_new();
    //modificar atributos
    wb.Props = {
        Title: gradoActual.nombre,
        Subject: "Lista de Asistencia",
        Author: "Brayan",
        CreatedDate: new Date()
    };
    //creacion de hoja de trabajo
    wb.SheetNames.push("Asistencia");
    //asigancion de datos:
    //preparacion de arreglo
    var arrOarr = [];
    arrOarr.push(["ESTUDIANTE", "RESPONSABLE", "TELEFONO", "HORA DE ENTRADA", "HORA DE SALIDA"]);
    listaAsistencias.forEach(element => {
        var centi = [element.nombre, element.responsable, element.telefono, element.horaEntrada, element.horaSalida];
        arrOarr.push(centi);
    });
    var ws = XLSX.utils.aoa_to_sheet(arrOarr);
    //agregamos el arreglo a la hoja de trabajo
    //IMPORTANTE HAY QUE COLOCAR EL MISMO NOMBRE DE LA HOJA QUE SE CREO ANTERIORMENTE
    wb.Sheets["Asistencia"] = ws;
    //funcion de escritura en binario
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), gradoActual.nombre + ' Asistencias '+$("#fecha").val()+'.xlsx');

}

//convertir binario a octeto
function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;   
}

//----------------- funcion de cerrar dia.-------
function cerrarDia() {
    var today = $("#fecha").val();
    console.log("Hola desde :" + today);
    //$('#modalCloseDia').modal('hide');      
    var datos ={
        "fecha":today
    }
	$.ajax({
		type: "POST",
		url: "phpConsultas/cerrarDia.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {
        //console.log(data);		
		if (data.se_ejecuto) {
            alertify.success("Fecha bloqueada con exito.");
            //cargarAsistencias();
		} else {
			alertify.error("Error, Al bloquear asistencias.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});    
}
