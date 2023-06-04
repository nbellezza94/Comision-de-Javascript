
let turnos = [];


function solicitarNombre() {
    let nombre = prompt("Ingrese su nombre");
    while (nombre === null || nombre.trim() === "") {
        alert("Debe ingresar un nombre válido.");
        nombre = prompt("Ingrese su nombre");
    }
    return nombre;
}
function solicitarOpcionTurno() {
    let opcionTurno = prompt("Seleccione una opción de turno:\n1. Consulta general\n2. Consulta especialista\n3. Consulta profesional");
    while (opcionTurno !== "1" && opcionTurno !== "2" && opcionTurno !== "3") {
        alert("Opción de turno inválida. Por favor, seleccione una opción válida.");
        opcionTurno = prompt("Seleccione una opción de turno:\n1. Consulta general\n2. Consulta especialista\n3. Consulta profesional");
    }
    return opcionTurno;
}

function coordinarTurno() {
    let nombre = solicitarNombre();
    alert("Bienvenido " + nombre);

    let opcionTurno = solicitarOpcionTurno();
    let nombreTurno = "";
    let tipoTurno = "";

    switch (opcionTurno) {
        case "1":
            nombreTurno = "Consulta general";
            tipoTurno = "General";
            break;
        case "2":
            nombreTurno = "Consulta especialista";
            tipoTurno = "Especialista";
            break;
        case "3":
            nombreTurno = "Consulta profesional";
            tipoTurno = "Profesional";
            break;
    }

    let horaTurno = prompt("Ingrese la hora para el turno de " + nombreTurno + ":");
    while (horaTurno === null || horaTurno.trim() === "") {
        alert("Debe ingresar una hora válida.");
        horaTurno = prompt("Ingrese la hora para el turno de " + nombreTurno + ":");
    }

    let turnoCompleto = {
        nombre: nombre,
        tipo: tipoTurno,
        hora: horaTurno
    };
    turnos.push(turnoCompleto);
    alert("Turno coordinado: " + nombreTurno + " a las " + horaTurno + "hs");

    let solicitarOtroTurno = prompt("¿Desea solicitar otro turno? SI/NO");
    if (solicitarOtroTurno.toLowerCase() === "si") {
        coordinarTurno();
    }
}

coordinarTurno();

function buscarTurnoPorNombre(nombre) {
    return turnos.find(function (turno) {
        return turno.nombre.toLowerCase() === nombre.toLowerCase();
    });
}

function mostrarTurnos() {
    let mensaje = "Lista de turnos:\n\n";

    turnos.forEach(function (turno, index) {
        mensaje += "Turno " + (index + 1) + ": " + turno.nombre + " - " + turno.tipo + " a las " + turno.hora + "\n";
    });

    alert(mensaje);
}

mostrarTurnos();
