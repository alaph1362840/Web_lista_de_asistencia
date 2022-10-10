//toltips - mensajes de ayuda
var listToltips = [];
var listObjToltips = [];

//COMUN A PAG 1 Y PAG 2 
listToltips["#btnAddLista"]=["Crear lista de asistencia en esta fecha.", "Create attendance list on this date."];
listToltips["#btnExportar"]=["Exportar lista de asistencia en excel.", "Export attendance list in excel."];
listToltips["#btnFinalizarDia"]=["Finalizar día.", "End day."];
//listToltips["#btnAddLista"]=["Cr", "Cr"];


/**
 * 
 * @param {int} n: es el numero que representa el idioma que se esta mostrando 0- espanol, 1- ingles 
 */
function crearToltips(n) {
    for (const property in listToltips) {
        if ($(property).length) {
            listObjToltips[property] = tippy(document.querySelector(property));
            listObjToltips[property].setContent(listToltips[property][n]);
        }       
    }
}

crearToltips(0);

