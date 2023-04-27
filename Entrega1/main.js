
let nombre = prompt("Ingrese su nombre")
let apellido = prompt("ingrese su apellido")
alert("Bienvenido" + " " + nombre + " " + apellido)

let turno = prompt("Desea sacar un turno? SI/NO")

if (turno.toLowerCase() === "no") {
    alert("Gracias por visitar nuestra pagina.");
}

if (turno.toLowerCase() === "si") {
    let cantidadTurnos = parseInt(prompt("Ingrese la cantidad de turnos que desea sacar:"));
    if (isNaN(cantidadTurnos) || cantidadTurnos < 1) {
        alert("La cantidad de turnos ingresada es inválida.");
    } else {
        for (let i = 1; i <= cantidadTurnos; i++) {
            let nombre = prompt("Ingrese su nombre para el turno " + i + ":");
            alert("Turno " + i + ": " + nombre);
        }
    }
}