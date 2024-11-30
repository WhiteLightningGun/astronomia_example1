import { GetPlanetaryPositions } from "./planet_positions.js";

const currentDate = new Date();

const planets = GetPlanetaryPositions(currentDate);

console.log(currentDate);
console.log(planets);
