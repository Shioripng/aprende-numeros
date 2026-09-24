// ========================================
// APRENDE LOS NÚMEROS DEL 1 AL 20
// ========================================


// Números escritos en español

const nombresNumeros = [
    "",
    "Uno",
    "Dos",
    "Tres",
    "Cuatro",
    "Cinco",
    "Seis",
    "Siete",
    "Ocho",
    "Nueve",
    "Diez",
    "Once",
    "Doce",
    "Trece",
    "Catorce",
    "Quince",
    "Dieciséis",
    "Diecisiete",
    "Dieciocho",
    "Diecinueve",
    "Veinte"
];


// ========================================
// SELECCIONAR ELEMENTOS
// ========================================

const numbersContainer =
    document.getElementById("numbers");

const resultadoNumero =
    document.getElementById("resultadoNumero");

const gameSection =
    document.getElementById("jugar");

const aprenderSection =
    document.getElementById("aprender");

const numeroPregunta =
    document.getElementById("numeroPregunta");

const opcionesContainer =
    document.getElementById("opciones");

const mensajeJuego =
    document.getElementById("mensajeJuego");

const correctasElement =
    document.getElementById("correctas");

const intentosElement =
    document.getElementById("intentos");


// ========================================
// VARIABLES DEL JUEGO
// ========================================

let numeroSeleccionado = 1;

let respuestaCorrecta = 1;

let correctas = 0;

let intentos = 0;


// ========================================
// CREAR BOTONES DEL 1 AL 20
// ========================================

for (let numero = 1; numero <= 20; numero++) {

    const boton = document.createElement("button");

    boton.textContent = numero;

    boton.addEventListener("click", function () {

        mostrarNumero(numero);

    });

    numbersContainer.appendChild(boton);
}


// ========================================
// MOSTRAR NÚMERO
// ========================================

function mostrarNumero(numero) {

    numeroSeleccionado = numero;

    resultadoNumero.innerHTML = `
        <div class="numeroGrande">🔢 ${numero}</div>

        <h3>${nombresNumeros[numero]}</h3>

        <p>
            El número ${numero} se escribe:
            <strong>${nombresNumeros[numero]}</strong>
        </p>
    `;

    hablar(nombresNumeros[numero]);
}


// ========================================
// HABLAR EN ESPAÑOL
// ========================================

function hablar(texto) {

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

        const mensaje =
            new SpeechSynthesisUtterance(texto);

        mensaje.lang = "es-ES";

        mensaje.rate = 0.8;

        mensaje.pitch = 1.1;

        window.speechSynthesis.speak(mensaje);
    }
}


// ========================================
// BOTÓN ESCUCHAR
// ========================================

function escucharNumero() {

    hablar(nombresNumeros[numeroSeleccionado]);
}


// ========================================
// CAMBIAR ENTRE APRENDER Y JUGAR
// ========================================

function mostrarSeccion(seccion) {

    if (seccion === "aprender") {

        aprenderSection.classList.remove("oculto");

        gameSection.classList.add("oculto");

    } else {

        aprenderSection.classList.add("oculto");

        gameSection.classList.remove("oculto");

        nuevaPregunta();
    }
}


// ========================================
// CREAR NUEVA PREGUNTA
// ========================================

function nuevaPregunta() {

    respuestaCorrecta =
        Math.floor(Math.random() * 20) + 1;

    numeroPregunta.textContent =
        respuestaCorrecta;

    mensajeJuego.textContent =
        "¡Escoge la respuesta correcta! 🌟";

    crearOpciones();
}


// ========================================
// CREAR OPCIONES
// ========================================

function crearOpciones() {

    opcionesContainer.innerHTML = "";

    let opciones = [respuestaCorrecta];


    // Agregar números diferentes

    while (opciones.length < 4) {

        const numeroAleatorio =
            Math.floor(Math.random() * 20) + 1;

        if (!opciones.includes(numeroAleatorio)) {

            opciones.push(numeroAleatorio);
        }
    }


    // Mezclar opciones

    opciones.sort(() => Math.random() - 0.5);


    // Crear botones

    opciones.forEach(numero => {

        const boton =
            document.createElement("button");

        boton.textContent = numero;

        boton.addEventListener(
            "click",
            function () {

                comprobarRespuesta(numero);

            }
        );

        opcionesContainer.appendChild(boton);
    });
}


// ========================================
// COMPROBAR RESPUESTA
// ========================================

function comprobarRespuesta(numero) {

    intentos++;

    intentosElement.textContent =
        intentos;


    if (numero === respuestaCorrecta) {

        correctas++;

        correctasElement.textContent =
            correctas;

        mensajeJuego.textContent =
            "🎉 ¡Muy bien! ¡Respuesta correcta! ⭐";

        hablar("Muy bien");

    } else {

        mensajeJuego.textContent =
            "😊 Casi. ¡Inténtalo otra vez!";
    }
}


// ========================================
// INICIAR CON EL NÚMERO 1
// ========================================

mostrarNumero(1);
