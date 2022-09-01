var listaUsuarios = [];
var idUserEdicion = 0;

$(document).ready(function () {
	cargarUsuarios();
});


//--FORMULARIOS
const formCreacionUser = document.getElementById('formCreacionUsuario');
const formEdicionUser = document.getElementById('formActualizarUsusario');

// CRREACION DE USUARIO
formCreacionUser.addEventListener('submit', (e) => {
	e.preventDefault();
    const usuario = formCreacionUser['txtUserC'].value;	
	const pass       = formCreacionUser['txtPassC'].value;    
	const autoridad  = formCreacionUser['tipoUserC'].value;
	const habilitado = formCreacionUser['habilitadoC'].value;

    var datos ={       
        "usuario":usuario,
        "pass":pass,
		"autoridad":autoridad,
		"habilitado":habilitado
    }
	//console.log(datos);
	$.ajax({
		type: "POST",
		url: "phpConsultas/crearUsuario.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {		
		if (data.se_ejecuto) {
			$('#ventanaModalCreacion').modal('hide');
            alertify.success("Usuario agregado con exito.");		
			cargarUsuarios();
		} else {
			alertify.error("Error, Al insertar usuario datos invalidos.");
		}				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});
    formCreacionUser.reset();
});

// OBTIENE LOS USUARIOS
function cargarUsuarios() {
    listaUsuarios = [];
    var url_php ="phpConsultas/obtenerUsuarios.php";
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
        var lista =[];
        $("#cuerpo_tabla").html("");
        var cadena =``;
        var habi="";
        if (data.se_ejecuto) {
            lista = data.datos;
            lista.forEach(element => {
                //var p = new Usuario(element.id_usuario, element.usuario, element.pass, element.nombre, element.habilitado, element.tipo_usuario);
                listaUsuarios.push(element); //anterior p               
                habi="";
                if (element.habilitado==1) {
                    habi='<i class="far fa-check-square"></i>';
                } else {
                    habi='<i class="fal fa-square"></i>';
                }                
                cadena += `
                    <tr>
                        <td>${element.usuario}</td>
                        <td>${element.pass}</td>
                        <td>${element.autoridad}</td>
                        <td class="text-center">${habi}</td>    
                        <td class="text-center">
                            <button onclick="cargarModalEdicion(${element.id_usuario})" type="button" class="btn boton btnTabla" data-bs-toggle="modal" data-bs-target="#ventanaModal" >
								<i class="fas fa-user-edit"></i>
                            </button>                        
                        </td>                    
                    </tr>
                `;
            });
            $("#cuerpo_tabla").html(cadena);
        } else {
            alertify.error("Ocurrio un error al obtener los usuarios.");
        }
		           
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        alertify.error("Error, la operacion fallo."+errorThrown);
    });
}

//EDICION DE USUARIO
formEdicionUser.addEventListener('submit', (e) => {
	e.preventDefault();
    const id_usuario       = idUserEdicion;
    const usuario          = formEdicionUser['txtUser'].value;	
	const pass             = formEdicionUser['txtPass'].value;    
	const autoridad     = formEdicionUser['tipoUser'].value;
	const habilitado       = formEdicionUser['habilitado'].value;
    var datos ={
        "id_usuario":id_usuario,      
        "usuario":usuario,
        "pass":pass,
		"autoridad":autoridad,
		"habilitado":habilitado
    }
	//console.log(datos);
	$.ajax({
		type: "POST",
		url: "phpConsultas/editarUsuario.php",
		data: datos,
		dataType: "json",        
	})
	.done(function( data ) {
        //console.log(data);        
		if (data.se_ejecuto) {
			$('#ventanaModal').modal('hide');
            alertify.success("Usuario editado con exito.");		
			cargarUsuarios();
		} else {
			alertify.error("Error, Al actualizar el usuario datos invalidos.");
		}        				          
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alertify.error("Error" + errorThrown);		
	});
    formEdicionUser.reset();
});

function obtenerUserID(id) {
    var resul = "";
    listaUsuarios.forEach(element => {
        if (element.id_usuario==id) {
            resul = element;
        }
    });
    return resul;
}

function cargarModalEdicion(id_user) {
    idUserEdicion = id_user;
    var user =  obtenerUserID(id_user);
    $('#ventanaModal').modal('show');
    //llenado de modal
    $("#txtUser").val(user.usuario);
    $("#txtPass").val(user.pass);
    if (user.autoridad == "alta") {
        $("#tipoUser option[value='alta']").prop("selected", true);
    } else {
        $("#tipoUser option[value='baja']").prop("selected", true);        
    }
    if (user.habilitado == 1) {
        $("#habilitado option[value=1]").attr("selected", true);
    } else {
        $("#habilitado option[value=0]").attr("selected", true);
    }
}


