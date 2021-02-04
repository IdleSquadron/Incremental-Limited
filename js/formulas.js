let sL = 100;
let sG = 10;
let sE = 10;
const Formula = {
  limit: function(ptsInvested = player.pointsInvestedInLimit) {
    return (Math.sqrt(ptsInvested + sL) * Math.log10(ptsInvested + sL) * 5 + 50 * hasUpgrade(1)) * Formula.upgrade5Boost() ** hasUpgrade(5) * 1.25 ** hasUpgrade(7);
  },
  gain: function(ptsInvested = player.pointsInvestedInGain) {
    return (Math.cbrt((ptsInvested + sG) / 10) / Math.sqrt(Math.log10(ptsInvested + sG)) * 2 ** hasUpgrade(2) * 3 ** hasUpgrade(8)) ** 1.025 ** hasUpgrade(3);
  },
  upgrade5Boost: function() {
    return Math.sqrt(Math.log10(Formula.gain()) + 1);
  },
  gainDividerScaling: function(currentN = player.number) {
    return (Formula.limit() / (Formula.limit() - currentN)) ** (0.75 ** hasUpgrade(9));
  },
  effectiveness: function(ptsInvested = player.pointsInvestedInEffectiveness) {
    //log(x + 10)^(0.5 + log2(log2(x + 10))^2 / 100)
    return (Math.log10(ptsInvested + sE) ** (0.5 + Math.log2(Math.log2(ptsInvested + sE)) ** 2 / 100) * 1.5 ** hasUpgrade(6)) ** 2 ** hasUpgrade(10);
  },
};