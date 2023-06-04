
let turnos = [];

let formulario = document.getElementById("formularioTurno");
let inputNombre = document.getElementById("nombre");
let selectOpcionTurno = document.getElementById("opcionTurno");
let selectHoraTurno = document.getElementById("horaTurno");
let listaTurnos = document.getElementById("listaTurnos");

cargarTurnosAlmacenados();

function coordinarTurno(event) {
    event.preventDefault();

    let nombre = inputNombre.value.trim();
    let opcionTurno = selectOpcionTurno.value;
    let horaTurno = selectHoraTurno.value;

    if (nombre === "" || opcionTurno === "" || horaTurno === "") {
        mostrarAlerta("Por favor, complete todos los campos.");
        return;
    }

    let nombreTurno = "";
    let tipoTurno = "";

    switch (opcionTurno) {
        case "general":
            nombreTurno = "Consulta general";
            tipoTurno = "General";
            break;
        case "especialista":
            nombreTurno = "Consulta especialista";
            tipoTurno = "Especialista";
            break;
        case "profesional":
            nombreTurno = "Consulta profesional";
            tipoTurno = "Profesional";
            break;
    }

    let turnoCompleto = {
        nombre: nombre,
        tipo: tipoTurno,
        hora: horaTurno
    };
    turnos.push(turnoCompleto);
    guardarTurnosAlmacenados();

    Swal.fire({
        icon: 'success',
        title: 'Turno coordinado',
        text: nombreTurno + ' a las ' + horaTurno,
        timer: 5000,
        showConfirmButton: false
    });


    formulario.reset();
}

function cargarTurnosAlmacenados() {
    let turnosGuardados = localStorage.getItem("turnos");
    if (turnosGuardados) {
        turnos = JSON.parse(turnosGuardados);
        mostrarTurnos();
    }
}


function guardarTurnosAlmacenados() {
    localStorage.setItem("turnos", JSON.stringify(turnos));
}


function mostrarTurnos() {
    listaTurnos.innerHTML = "";

    if (turnos.length === 0) {
        listaTurnos.innerHTML = "<li>No se han solicitado turnos.</li>";
        return;
    }

    turnos.forEach(function (turno) {
        let turnoItem = document.createElement("li");
        turnoItem.className = "turno-item";
        turnoItem.textContent = turno.nombre + " - " + turno.tipo + " - " + turno.hora;
        listaTurnos.appendChild(turnoItem);
    });
}


formulario.addEventListener("submit", coordinarTurno);
