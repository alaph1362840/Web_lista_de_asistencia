// ------------------------------ VARIABLES -----------------------
//Aqui guardaremos el stream globalmente
let stream;
// Declaramos elementos del DOM
const $video               = document.querySelector("#video"),
      $video2              = document.querySelector("#video2"),
      $canvas              = document.querySelector("#canvas"),
      $boton               = document.querySelector("#btnCapturar1"),
      $boton2               = document.querySelector("#btnCapturar2"),
      $foto               = document.querySelector("#imgRefEstudiante"),
      $foto2               = document.querySelector("#imgRespopnsable"),
      $listaDeDispositivos = document.querySelector("#listaDeDispositivos");

let visibleFotoEstudiante = false;
let visibleFotoResponsable = false;


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
  for (let x = $listaDeDispositivos.options.length - 1; x >= 0; x--)
    $listaDeDispositivos.remove(x);
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

const mostrarStream = idDeDispositivo => {
  _getUserMedia({
        video: {
          width: 200, height: 200,
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
    $("#imgRefEstudiante").hide();
    $("#imgRespopnsable").hide();
    $("#hi1").addClass('hide');
    $("#hi2").addClass('hide'); 
});

$("#btnRefrescar02").click(function (e) { 
    e.preventDefault();
    if (visibleFotoResponsable) {
        $("#video2").show();
        $("#imgRespopnsable").hide();
        visibleFotoResponsable = false;
        $('#resHabi').addClass('hide');
        $('#resDesh').removeClass('hide');
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