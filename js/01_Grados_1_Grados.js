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

