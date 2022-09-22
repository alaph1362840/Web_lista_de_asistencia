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
