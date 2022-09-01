var listaGrados=[];

//--FORMULARIOS
const formCreacionGrado = document.getElementById('frmAddGrado');

// CRREACION DE USUARIO
formCreacionGrado.addEventListener('submit', (e) => {
	e.preventDefault();
    const nombre    = formCreacionGrado['txtNombre'].value;
    //console.log("IMG "+ formCreacionGrado['listImg'].value );	
    //console.log("IMG "+ $("#listImg").val());
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
    formCreacionGrado.reset();
});



$(document).ready(function () {
    cargarGrados();
});

function mostrarGrado(id_grado) {
    console.log("ID_GRADO"+id_grado);
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
                                <div class="col-lg-2 col CtIma2 boton d-flex align-items-center" onclick="mostrarGrado(${element.id_grado})">
                                    <div class="contImagen2 mx-auto ">
                                        <img class="imgen" src="img/grados/FlechaGrado.svg" alt="" srcset="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            $("#cajaPrincipalGrados").html(cadena);
        } else {
            alertify.error("Ocurrio un error al obtener los usuarios.");
        }
		           
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        alertify.error("Error, la operacion fallo."+errorThrown);
    });
}


