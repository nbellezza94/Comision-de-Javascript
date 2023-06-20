let turnos = [];

let formulario = document.getElementById("formularioTurno");
let inputNombre = document.getElementById("nombre");
let selectOpcionTurno = document.getElementById("opcionTurno");
let selectHoraTurno = document.getElementById("horaTurno");
let selectDiaTurno = document.getElementById("diaTurno");
let listaTurnos = document.getElementById("listaTurnos");

cargarContenidoJson();
cargarTurnosAlmacenados();

function coordinarTurno(event) {
    event.preventDefault();

    let nombre = inputNombre.value.trim();
    let opcionTurno = selectOpcionTurno.value;
    let horaTurno = selectHoraTurno.value;
    let diaTurno = selectDiaTurno.value;

    if (nombre === "" || opcionTurno === "" || horaTurno === "" || diaTurno === "") {
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
        case "random":
            nombreTurno = "Consulta random";
            tipoTurno = "Random";
            break;
    }

    let turnoCompleto = {
        nombre: nombre,
        tipo: tipoTurno,
        hora: horaTurno,
        dia: diaTurno
    };
    turnos.push(turnoCompleto);
    guardarTurnosAlmacenados();

    mostrarAlerta("Turno solicitado exitosamente.", "success");
    limpiarFormulario();
    mostrarTurnosSolicitados();
}


function cargarContenidoJson() {
    fetch("contenido.json")
        .then(response => response.json())
        .then(data => {
            cargarServicios(data.services);
            cargarOpcionesDias(data.availability);
            cargarOpcionesHoras(data.availability.available_hours);
        })
        .catch(error => {
            console.log("Error al cargar el contenido JSON:", error);
        });
}

function cargarServicios(servicios) {
    servicios.forEach(servicio => {
        let option = document.createElement("option");
        option.value = servicio.name;
        option.textContent = servicio.name;
        selectOpcionTurno.appendChild(option);
    });
}

function cargarOpcionesDias(availability) {
    for (let day in availability) {
      if (availability.hasOwnProperty(day) && day !== "available_hours") {
        let option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        selectDiaTurno.appendChild(option);
      }
    }
  }

function cargarOpcionesHoras(horasDisponibles) {
    horasDisponibles.forEach(hora => {
        let option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        selectHoraTurno.appendChild(option);
    });
}

function guardarTurnosAlmacenados() {
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

function cargarTurnosAlmacenados() {
    let turnosAlmacenados = localStorage.getItem("turnos");
    if (turnosAlmacenados) {
        turnos = JSON.parse(turnosAlmacenados);
        mostrarTurnosSolicitados();
    }
}

function mostrarTurnosSolicitados() {
    listaTurnos.innerHTML = "";
  
    if (turnos.length === 0) {
      listaTurnos.innerHTML = "<li>No se han solicitado turnos.</li>";
      return;
    }
  
    turnos.forEach(function (turno) {
      let li = document.createElement("li");
      li.textContent = `Nombre: ${turno.nombre}, Tipo: ${turno.tipo}, Hora: ${turno.hora}, Día: ${turno.dia}`;
      listaTurnos.appendChild(li);
    });
  }

function mostrarAlerta(mensaje, tipo = "error") {
    Swal.fire({
        icon: tipo,
        text: mensaje,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}

function limpiarFormulario() {
    formulario.reset();
}

formulario.addEventListener("submit", coordinarTurno);
