
const formRegistro = document.getElementById('formRegistro');
const formIngreso = document.getElementById('formIngreso');


formRegistro.addEventListener('submit', (e) => {
	e.preventDefault();
	const nombreEmpresa = formRegistro['txtEmprReg'].value;
	const usuario       = formRegistro['txtUserReg'].value;
	const pass          = formRegistro['txtPassReg'].value;
	const correo        = formRegistro['txtCorreoReg'].value;
    var datos ={
        "nombreEmpresa":nombreEmpresa,
        "usuario":usuario,
        "pass":pass,
		"correo":correo
    }
	$.ajax({
		type: "POST",
		url: "phpConsultas/crearUsuarioEmpresa.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {		
		var lista =[];
		if (data.se_ejecuto) {		
			lista = data.datos;
			var p="";
			lista.forEach(element => {
				p = element;
			});
			if (p.id_usuario != -1) {
				alertify.success("Usuario ingresado con éxito");
				if (p.autoridad =="baja") {
					location.href ="01_Grados1.php";
				} else {
					location.href ="01_Grados2.php";
				}
			} else {
				alertify.error("Datos duplicados! Por favor cambie el nombre del usuario, y eso no funciona cambie el nombre de Empresa");
			}			               
			
		} else {
			alertify.error("Error, intentalo nuevamente");
		} 
		          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});
});


formIngreso.addEventListener('submit', (e) => {
	e.preventDefault();
	const usuario  = formIngreso['txt_user'].value;
	const pass     = formIngreso['txt_pass'].value;
    var datos ={
        "usuario":usuario,
        "pass":pass
    }
	$.ajax({
		type: "POST",
		url: "phpConsultas/login.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {
		if (data.se_ejecuto) {
			if (data.hay_datos) {
				lista = data.datos;
				var p="";
				lista.forEach(element => {
					p = element;
				});
				alertify.success("Usuario ingresado con éxito");
				if (p.autoridad =="baja") {
					location.href ="01_Grados1.php";
				} else {
					location.href ="01_Grados2.php";
				}			
			} else {
				alertify.error("Error! Usuario o contraseña incorrectas");
			} 	
		} else {
			alertify.error("Error, La consulta no se ejecuto intentalo nuevamente,");
		}           
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error"+errorThrown);
	});
});