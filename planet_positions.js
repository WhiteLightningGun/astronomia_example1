import { julian, planetposition, elliptic, solar } from "astronomia";
import planetData from "astronomia/data";

/**
 * Computes the current positions of the planets in equatorial coordinates at this moment in time using the Astronomia library
 * @param {*} currentDate argument should be the object returned from javascript new Date() function
 * @returns Returns array of form {PlanetName: [ra, dec]}
 */
export function GetPlanetaryPositions(currentDate) {
  const currentJDE = julian.CalendarGregorianToJD(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() +
      currentDate.getHours() / 24 +
      currentDate.getMinutes() / 1440 +
      currentDate.getSeconds() / 86400
  ); // Julian Date

  const earth = new planetposition.Planet(planetData.vsop87Dearth);
  const mercury = new planetposition.Planet(planetData.vsop87Dmercury);
  const venus = new planetposition.Planet(planetData.vsop87Dvenus);
  const mars = new planetposition.Planet(planetData.vsop87Dmars);

  const mercuryPosition = elliptic.position(mercury, earth, currentJDE);
  const venusPosition = elliptic.position(venus, earth, currentJDE);
  const marsPosition = elliptic.position(mars, earth, currentJDE);

  const solarPosition = solar.apparentEquatorial(currentJDE);

  const planetaryPositions = {
    Mercury: [mercuryPosition.ra, mercuryPosition.dec],
    Venus: [venusPosition.ra, venusPosition.dec],
    Mars: [marsPosition.ra, marsPosition.dec],
    Sol: [solarPosition._ra, solarPosition._dec],
  };

  return planetaryPositions;
}
