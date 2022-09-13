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
    //var id = ""+ id_asistencia + "HS";
    var today = new Date();   
	//const horaSalida  = $(id).text();  
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

function crearAsistencias() {
    listaAsistencias = [];
    var url_php ="phpConsultas/crearAsistencias.php";
    var fecha = $("#fecha").val();
    if (fecha != "") {
        var datos ={
            "id_grado":id_grado_actual,
            "fecha":fecha
        };
        //console.log(datos);
        //console.log("ID_GRADO: "+ id_grado_actual );
        $.ajax({
            type: "POST",
            url: url_php,
            data: datos,
            dataType: "json",        
        })
        .done(function( data ) {
            //console.log("data recibido"+ data);
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
                                    <div class="col-auto mx-md-0 my-md-0 my-2  mx-auto  d-flex align-items-center justify-content-center  p-0">
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
                                    <div class="col-auto mx-md-0 my-md-0 my-2  mx-auto  d-flex align-items-center justify-content-center  p-0">
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