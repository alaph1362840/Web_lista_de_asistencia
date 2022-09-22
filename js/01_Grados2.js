
//----------------------------------------PARA GRADOS ---------------------------------
var listaGrados      = [];
var id_grado_actual  = -1;

$(document).ready(function () {
    cargarGrados();
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

function mostrarGrado(id_grado) {
    //console.log("ID_GRADO"+id_grado);
    id_grado_actual = id_grado;
    //Ocultar lista de grados
    $("#contenidoGrado").addClass('hide');
    //mostrar asistencias.
    $("#contenidoAsistencia").removeClass('hide');
    cargarAsistencias();
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
                                        <img class="imgen" src="${element.img}">
                                    </div>
                                </div>
                                <div class="col-lg-8 col-7 contText d-flex align-items-center align-content-center">
                                    <h1 class="text-center mx-auto">${element.nombre}</h1>
                                </div>
                                <!-- FLECHA GRADO -->
                                <div class="flechaGrado col-lg-2 col CtIma2 boton d-flex align-items-center" onclick="mostrarGrado(${element.id_grado})">
                                    <div class="contImagen2 mx-auto ">
                                        <img class="imgen" src="img/grados/FlechaGrado.svg">
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                `;
            });
            $("#cajaPrincipalGrados").html(cadena);            
            //comprobarOcultos();
        } else {
            alertify.error("Ocurrio un error al obtener los usuarios.");
        }		           
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        alertify.error("Error, la operacion fallo."+errorThrown);
    });
}


//----------------------------------- AREA DE ASISTENCIAS -----------------------------------
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
    console.log("HOLA DESDE CREAR ASISTENCIAS")
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
                //verificarEdicionEstudiantes();            
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
                //verificarEdicionEstudiantes();            
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

$("#btnAtrasA").click(function (e) { 
    e.preventDefault();
    $("#contenidoAsistencia").addClass('hide');
    $("#contenidoGrado").removeClass('hide');
});

$("#btnAddLista").click(function (e) { 
    e.preventDefault();
    crearAsistencias();
});

$("#fecha").change(function (e) { 
    e.preventDefault();
    cargarAsistencias();
});

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
