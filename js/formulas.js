let startingL = 100;
let startingG = 10;
const Formula = {
  limit: (numberInvested = player.pointsInvestedInLimit) => (Math.sqrt(numberInvested + startingL) * Math.log10(numberInvested + startingL) * 5 + 50 * hasUpgrade(1)) * Formula.upgrade5Boost() ** hasUpgrade(5),
  gain: (numberInvested = player.pointsInvestedInGain) => (Math.cbrt((numberInvested + startingG) / 10) / Math.sqrt(Math.log10(numberInvested + startingG)) * 2 ** hasUpgrade(2) * 4 ** hasUpgrade(7)) ** 1.05 ** hasUpgrade(3),
  upgrade5Boost: () => Math.sqrt(Math.log10(Formula.gain()) + 1),
};