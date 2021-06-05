import { Asesor } from "./clases/Asesor.js";
import { Escudero } from "./clases/Escudero.js";
import { Luchador } from "./clases/Luchador.js";
import { Rey } from "./clases/Rey.js";
import { personajes } from "./personajes.js";

// Elementos del DOM
const personajeDummy = document.querySelector(".personaje-dummy");
const personajesElemento = document.querySelector(".personajes");
const comunicacionesElemento = document.querySelector(".comunicaciones");

// Funciones auxiliares
const getEmoji = (personaje) => {
  if (personaje instanceof Luchador) {
    return "🗡";
  } else if (personaje instanceof Asesor) {
    return "🎓";
  } else if (personaje instanceof Rey) {
    return "👑";
  } else if (personaje instanceof Escudero) {
    return "🛡";
  }
};
const vaciarPersonajes = () => {
  for (const personajeElemento of personajesElemento.querySelectorAll(
    ".personaje"
  )) {
    personajeElemento.remove();
  }
};

// Creamos un elemento personaje por cada personaje del array
const pintarPersonajes = () => {
  vaciarPersonajes();
  let i = 1;
  for (const personaje of personajes) {
    const { nombre, familia, edad, vivo } = personaje;
    // Clonamos el elemento molde y le quitamos la clase molde
    const nuevoPersonajeElemento = personajeDummy.cloneNode(true);
    nuevoPersonajeElemento.classList.remove("personaje-dummy");

    // Rellenamos el elemento con los datos del personaje
    nuevoPersonajeElemento.querySelector(
      ".nombre"
    ).textContent = `${nombre} ${familia}`;
    nuevoPersonajeElemento.querySelector(".edad").textContent = edad;
    nuevoPersonajeElemento
      .querySelector(`.icono-${vivo ? "vivo" : "muerto"}`)
      .classList.add("on");
    nuevoPersonajeElemento.querySelector(".foto").src = `img/${nombre}.jpg`;
    nuevoPersonajeElemento.querySelector(".foto").alt = `${nombre} ${familia}`;
    nuevoPersonajeElemento.querySelector(".emoji").textContent =
      getEmoji(personaje);
    if (!personaje.vivo) {
      nuevoPersonajeElemento.classList.add("muerto");
    }

    // Datos particulares de cada tipo de personaje
    if (typeof personaje.arma !== "undefined") {
      nuevoPersonajeElemento.querySelector(".datos-arma").classList.add("on");
      nuevoPersonajeElemento.querySelector(".datos-arma .dato").textContent =
        personaje.arma;
    }

    if (typeof personaje.anyosReinado !== "undefined") {
      nuevoPersonajeElemento.querySelector(".datos-anyos").classList.add("on");
      nuevoPersonajeElemento.querySelector(".datos-anyos .dato").textContent =
        personaje.anyosReinado;
    }

    if (typeof personaje.destreza !== "undefined") {
      nuevoPersonajeElemento
        .querySelector(".datos-destreza")
        .classList.add("on");
      nuevoPersonajeElemento.querySelector(
        ".datos-destreza .dato"
      ).textContent = personaje.destreza;
    }

    if (typeof personaje.pelotismo !== "undefined") {
      nuevoPersonajeElemento
        .querySelector(".datos-peloteo")
        .classList.add("on");
      nuevoPersonajeElemento.querySelector(".datos-peloteo .dato").textContent =
        personaje.pelotismo;
    }

    if (personaje.asesorado) {
      nuevoPersonajeElemento
        .querySelector(".datos-asesora-a")
        .classList.add("on");
      nuevoPersonajeElemento.querySelector(
        ".datos-asesora-a .dato"
      ).textContent = personaje.asesorado.nombre;
    }

    if (personaje.sirveA) {
      nuevoPersonajeElemento
        .querySelector(".datos-sirve-a")
        .classList.add("on");
      nuevoPersonajeElemento.querySelector(".datos-sirve-a .dato").textContent =
        personaje.sirveA.nombre;
    }

    // Añadimos los escuchadores de eventos
    const morirElemento = nuevoPersonajeElemento.querySelector(".accion-morir");
    const hablarElemento =
      nuevoPersonajeElemento.querySelector(".accion-hablar");

    morirElemento.addEventListener("click", () => {
      personaje.muere();
      pintarPersonajes();
    });

    hablarElemento.addEventListener("click", () => {
      comunicacionesElemento.querySelector(".mensaje").textContent =
        personaje.comunicar();
      comunicacionesElemento.querySelector(".foto").src = `img/${nombre}.jpg`;
      comunicacionesElemento.querySelector(
        ".foto"
      ).alt = `${nombre} ${familia}`;
      comunicacionesElemento.classList.add("on");
      setTimeout(() => {
        comunicacionesElemento.classList.remove("on");
      }, 2000);
    });

    // Insertamos el elemento en el DOM
    setTimeout(() => {
      personajesElemento.append(nuevoPersonajeElemento);
    }, 200 * i++);
  }
};
pintarPersonajes();
