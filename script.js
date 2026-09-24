let numeroActual = 0;

let correctas = 0;

let intentos = 0;


// ===============================
// CREAR NÚMEROS DEL 1 AL 20
// ===============================

const contenedor = document.getElementById("numeros");

for (let i = 1; i <= 20; i++) {

  const boton = document.createElement("button");

  boton.textContent = i;

  boton.onclick = function() {
    mostrarNumero(i);
  };

  contenedor.appendChild(boton);
}


// ===============================
// NÚMERO EN PALABRAS
// ===============================

const nombres = [
  "",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
  "diez",
  "once",
  "doce",
  "trece",
  "catorce",
  "quince",
  "dieciséis",
  "diecisiete",
  "dieciocho",
  "diecinueve",
  "veinte"
];

function numeroEnPalabras(numero) {
  return nombres[numero];
}


// ===============================
// MOSTRAR NÚMERO
// ===============================

function mostrarNumero(numero) {

  numeroActual = numero;

  document.getElementById("numeroSeleccionado").innerHTML =
    "🔢 " + numero +
    "<br>" +
    "<span style='font-size:28px'>" +
    numeroEnPalabras(numero) +
    "</span>";

  hablar(numero);
}


// ===============================
// HABLAR
// ===============================

function hablar(numero) {

  if (!("speechSynthesis" in window)) {
    return;
  }

  speechSynthesis.cancel();

  const voz =
    new SpeechSynthesisUtterance(
      "El número es " +
      numero +
      ". " +
      numeroEnPalabras(numero)
    );

  voz.lang = "es-ES";

  speechSynthesis.speak(voz);
}


// ===============================
// ESCUCHAR NÚMERO
// ===============================

function escucharNumero() {

  if (numeroActual === 0) {

    alert("Primero escoge un número 😊");

    return;
  }

  hablar(numeroActual);
}


// ===============================
// CAMBIAR SECCIÓN
// ===============================

function mostrarSeccion(seccion) {

  document.getElementById("aprender")
    .classList.add("oculta");

  document.getElementById("jugar")
    .classList.add("oculta");

  document.getElementById(seccion)
    .classList.remove("oculta");
}


// ===============================
// NUEVA PREGUNTA
// ===============================

function nuevaPregunta() {

  numeroActual =
    Math.floor(Math.random() * 20) + 1;

  document.getElementById("pregunta").textContent =
    "🎯 ¿Cuál es el número " +
    numeroEnPalabras(numeroActual) +
    "?";

  document.getElementById("mensaje").textContent = "";

  crearOpciones();
}


// ===============================
// CREAR LAS 4 OPCIONES
// ===============================

function crearOpciones() {

  const contenedor =
    document.getElementById("opciones");

  contenedor.innerHTML = "";

  let opciones = [numeroActual];

  while (opciones.length < 4) {

    let numero =
      Math.floor(Math.random() * 20) + 1;

    if (!opciones.includes(numero)) {
      opciones.push(numero);
    }
  }

  opciones.sort(() => Math.random() - 0.5);

  opciones.forEach(numero => {

    const boton =
      document.createElement("button");

    boton.textContent = numero;

    boton.className = "opcion";

    boton.onclick = function() {
      comprobarRespuesta(numero, boton);
    };

    contenedor.appendChild(boton);
  });
}


// ===============================
// COMPROBAR RESPUESTA
// ===============================

function comprobarRespuesta(numero, boton) {

  intentos++;

  document.getElementById("intentos")
    .textContent = intentos;

  if (numero === numeroActual) {

    correctas++;

    document.getElementById("correctas")
      .textContent = correctas;

    boton.classList.add("correcta");

    document.getElementById("mensaje").textContent =
      "🎉 ¡CORRECTO! ⭐ ¡Muy bien!";

    const botones =
      document.querySelectorAll(".opcion");

    botones.forEach(b => {
      b.disabled = true;
    });

    hablar(numero);

  } else {

    boton.classList.add("incorrecta");

    document.getElementById("mensaje").textContent =
      "💪 ¡Casi! Intenta otra vez.";

    setTimeout(() => {
      boton.classList.remove("incorrecta");
    }, 700);
  }
}


// ===============================
// PRIMERA PREGUNTA
// ===============================

nuevaPregunta();