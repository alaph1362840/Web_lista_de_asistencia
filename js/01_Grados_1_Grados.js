var listaGrados = [];
var listaAsistencias = [];
var id_grado_eliminar=-1;

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

function mostrarGrado(id_grado) {
    console.log("ID_GRADO"+id_grado);
    //Ocultar lista de grados
    $("#contenidoGrado").addClass('hide');
    //mostrar asistencias.
    $("#contenidoAsistencia").removeClass('hide');

}

function eliminarGrado(id_grado) {
    id_grado_eliminar = id_grado;
    $('#modalDeletGrado').modal('show');
}

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
        //console.log("HOLA MUNDO DESDE DATOS:");
        //console.log(data);
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

// OBTIENE LAS ASISTENCIAS
function cargarAsistencias(id_grado) {
    listaAsistencias = [];
    var url_php ="phpConsultas/obtenerAsistencias.php";
    var datos ={
        "id_grado":id_grado
    };
    $.ajax({
        type: "POST",
        url: url_php,
        data: datos,
        dataType: "json",        
    })
    .done(function( data ) {
        //console.log("HOLA MUNDO DESDE DATOS:");
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
                            <img class="imgen2" src="img/asistencia/IN01.png" alt="" srcset="">
                            <h5 class="hora2 horaE1 ">--:--</h5>                            
                        </div>
                        <div class="contImagen2">
                            <img class="imgen2" src="img/asistencia/IN03.png" alt="" srcset="">
                            <h5 class="hora2 horaE1 ">--:--</h5>
                        </div>
                        <div class="contImagen3 ms-1"></div>
                    `;
                } else {
                    if (element.horaEntrada != "-- : --" && element.horaSalida == "-- : --") {
                        colocar = `
                            <div class="contImagen2 ">
                                <img class="imgen2" src="img/asistencia/IN02.png" alt="" srcset="">
                                <h5 class="hora2 horaE2 ">--:--</h5>                            
                            </div>
                            <div class="contImagen2">
                                <img class="imgen2" src="img/asistencia/IN03.png" alt="" srcset="">
                                <h5 class="hora2 horaE1 ">--:--</h5>
                            </div>
                            <div class="contImagen4 ms-1"></div>
                        `;
                    } else {
                        colocar = `
                            <div class="contImagen2 ">
                                <img class="imgen2" src="img/asistencia/IN02.png" alt="" srcset="">
                                <h5 class="hora2 horaE2 ">--:--</h5>                            
                            </div>
                            <div class="contImagen2">
                                <img class="imgen2" src="img/asistencia/IN04.png" alt="" srcset="">
                                <h5 class="hora2 horaE3">--:--</h5>
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
                                <div class="col-auto mx-md-0 my-md-0 my-2  mx-auto  d-flex align-items-center justify-content-center  p-0">
                                    <div class="contImagen">
                                        <img class="imgen" src="${element.imgEstudiante}" alt="" srcset="">
                                    </div>
                                    <div class="contImagen">
                                        <img class="imgen" src="${element.imgResponsable}" alt="" srcset="">
                                    </div>
                                </div>
                                <!-- TEXTO -->
                                <div class="col-lg-7 col-md-7 col-sm-12 contText ">
                                    <h3 class="text-md-start text-center"><strong class="cAlumno"> ALUMNO: </strong> ${element.nombre}</h3>
                                    <h3 class="text-md-start text-center"><strong class="cPadre"> PADRE: </strong> ${element.responsable}</h1>
                                </div>
                                <!-- EDICION DE USUARIO -->
                                <div id="" class=" UserEditDelet hide col-auto d-flex align-items-center p-0 ms-md-auto mx-auto mb-md-0 mb-2">
                                    <div id="idEstudiante" class="contImagenEdit" data-bs-toggle="modal" data-bs-target="#modalEditEstu">                          
                                    </div>
                                    <div class="contImagenDelet" data-bs-toggle="modal" data-bs-target="#modalDeletEstu">
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
            //comprobarOcultos();
        } else {
            alertify.error("Ocurrio un error al obtener los asistencias.");
        }		           
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        alertify.error("Error, la operacion fallo."+errorThrown);
    });
}




