//--FORMULARIOS
const formCreacioneEstu = document.getElementById('frmAddEstudiante');

// CRREACION DE ESTUDIANTES
formCreacioneEstu.addEventListener('submit', (e) => {
	e.preventDefault();
    const nombre            = formCreacioneEstu['txtCEstudiante'].value;
    const imgEstudiante     = formCreacioneEstu['txtCResponsable'].value;
    const responsable       = formCreacioneEstu['txtNombre'].value;
    const imgResponsable    = formCreacioneEstu['txtNombre'].value;
	
    
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