import { Asesor } from "./clases/Asesor.js";
import { Escudero } from "./clases/Escudero.js";
import { Luchador } from "./clases/Luchador.js";
import { Rey } from "./clases/Rey.js";

const joffrey = new Rey("Joffrey", "Baratheon", 16, 2);
const jaime = new Luchador("Jaime", "Lannister", 45, "Espada", 7);
const daenerys = new Luchador("Daenerys", "Targaryen", 30, "Dragones", 10);
const tyrion = new Asesor("Tyrion", "Lannister", 40, daenerys);
const bronn = new Escudero("Bronn", "AguasNegras", 54, 0, jaime);

export const personajes = [joffrey, jaime, tyrion, daenerys, bronn];
