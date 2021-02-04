//This code is REALLY bad and unorganised right now.
var version = 'v1.0100';
document.getElementById('version').textContent = version;
console.warn(`Why are you here in the console?`);
let limit = 20;
let gainPerSecond = 1;
let investingEffectiveness = {
  limit: 1,
  gain: 1,
  global: 1,
};
let upgrades_unlocks_progress = 0;

let dev = {
  timeMultiplier: 1,
};

let player = {};
reset();
loadSave();

function tab(tab) {
  let allTabs = document.getElementsByClassName('tab');
  for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].style.display = 'none';
  }
  allTabs[tab - 1].style.display = 'block';
};

tab(1);
document.getElementById('autoSaveButton').className = player.settings.doAutoSaving ? 'on' : 'off';

(function mainLoop() {
  setTimeout(mainLoop, 1000 / player.settings.ticksPerSecond);
  loop(); //Makes game go BRRRR.
})();

(function autoSaveLoop() {
  setTimeout(autoSaveLoop, 60000 / player.settings.autoSavesPerMinute);
  autoSave(); //Makes autosave go BRRRR.
})();

function loop() {
  let now = Date.now();
  let deltaTime = now - player.time.lastTick;
  player.time.lastTick = now;
  gameLoop(deltaTime * dev.timeMultiplier);
};

function gameLoop(delta) {
  limit = Formula.limit();
  gainPerSecond = Formula.gain();
  effectiveness = Formula.effectiveness();
  investingEffectiveness.limit = 1 * 2.5 ** hasUpgrade(4);
  investingEffectiveness.global = effectiveness;
  let pendingLimitIncrease = Formula.limit(player.pointsInvestedInLimit + player.number * player.settings.increaserBuyMultiplier * investingEffectiveness.limit * investingEffectiveness.global) - limit;
  let pendingGainIncrease = Formula.gain(player.pointsInvestedInGain + player.number * player.settings.increaserBuyMultiplier * investingEffectiveness.gain * investingEffectiveness.global) - gainPerSecond;
  let pendingEffectivenessIncrease = Formula.effectiveness(player.pointsInvestedInEffectiveness + player.number * player.settings.increaserBuyMultiplier * investingEffectiveness.global) - effectiveness;
  let gainPerSecondReal = gainPerSecond / Formula.gainDividerScaling();
  player.upgrades = [...new Set(player.upgrades)];
  player.unlocks = [...new Set(player.unlocks)];
  upgrades_unlocks_progress = (player.upgrades.length + player.unlocks.length) / (upgrades.length + unlocks.length);
  //For below, test to see if the gain is equal for different FPS settings.
  player.number += (gainPerSecond * delta / 1000) / Formula.gainDividerScaling();
  if (player.number > limit) player.number = limit;
  document.getElementById('autoSavingDisplay').innerHTML = player.settings.doAutoSaving ? `The game automatically saves every ${(60 / player.settings.autoSavesPerMinute === 1) ? 'second' : 60 / player.settings.autoSavesPerMinute + ' seconds'}.` : `The game is not currently autosaving.`;
  document.getElementById('fpsDisplay').innerHTML = `The game currently runs at ${player.settings.ticksPerSecond} ticks per second.`;
  document.getElementById('number').innerHTML = player.number.notate();
  document.getElementById('limit').innerHTML = limit.notate();
  document.getElementById('gain').innerHTML = gainPerSecondReal.notate();
  document.getElementById('maxGain').innerHTML = gainPerSecond.notate();
  document.getElementById('effectiveness').innerHTML = effectiveness.notate();
  document.getElementById('pendingLimitIncrease').innerHTML = pendingLimitIncrease.notate();
  document.getElementById('pendingGainIncrease').innerHTML = pendingGainIncrease.notate();
  document.getElementById('pendingEffectivenessIncrease').innerHTML = pendingEffectivenessIncrease.notate();
  let idk = upgrades_unlocks_progress * 100;
  document.getElementById('upgrades-unlocks-progress').dataset.width = idk.toPrecision(3), document.getElementById('upgrades-unlocks-progress').children[0].style.width = idk + '%';

  CSSUpgradesAndUnlocks();

  if (hasUnlock(1)) {
    document.getElementById('gainIncreaser').style.display = 'inline-block';
  } else {
    document.getElementById('gainIncreaser').style.display = 'none';
  };
  if (hasUnlock(2)) {
    document.getElementById('limitIncreaser').style.display = 'inline-block';
  } else {
    document.getElementById('limitIncreaser').style.display = 'none';
  };
  if (hasUnlock(3)) {
    document.getElementById('buyMultipliers').style.visibility = 'visible';
  } else {
    document.getElementById('buyMultipliers').style.visibility = 'hidden';
  };
  if (hasUnlock(4)) {
    document.getElementById('effectivenessIncreaser').style.display = 'inline-block';
  } else {
    document.getElementById('effectivenessIncreaser').style.display = 'none';
  };

  if (hasUnlock(1) || hasUnlock(2) || hasUnlock(4)) {
    document.getElementById('effectivenessDisplay').style.visibility = 'visible';
  } else {
    document.getElementById('effectivenessDisplay').style.visibility = 'hidden';
  };

  let increaserBuyMultipliers = document.getElementsByClassName('increaserBuyMultiplier');
  for (let i = 0; i < increaserBuyMultipliers.length; i++) {
    if (player.settings.increaserBuyMultiplier === Number(increaserBuyMultipliers[i].dataset.ratio)) increaserBuyMultipliers[i].className = 'increaserBuyMultiplier selected';
    else increaserBuyMultipliers[i].className = 'increaserBuyMultiplier unselected';
  }

  document.getElementById('upgrade5Effect').innerHTML = Formula.upgrade5Boost().notate();
  // document.getElementById('currentRank').innerHTML = getRank();
  // document.getElementById('nextRank').innerHTML = getRank(player.rank + 1);
};

function increaseLimit() {
  let amountInvested = player.number * player.settings.increaserBuyMultiplier;
  player.pointsInvestedInLimit += amountInvested * investingEffectiveness.limit * investingEffectiveness.global;
  if (player.settings.increaserBuyMultiplier === 1) player.number = 0;
  else player.number -= amountInvested;
};

function increaseGain() {
  let amountInvested = player.number * player.settings.increaserBuyMultiplier;
  player.pointsInvestedInGain += amountInvested * investingEffectiveness.gain * investingEffectiveness.global;
  if (player.settings.increaserBuyMultiplier === 1) player.number = 0;
  else player.number -= amountInvested;
}

function increaseEffectiveness() {
  let amountInvested = player.number * player.settings.increaserBuyMultiplier;
  player.pointsInvestedInEffectiveness += amountInvested * investingEffectiveness.global;
  if (player.settings.increaserBuyMultiplier === 1) player.number = 0;
  else player.number -= amountInvested;
}

function changeIncreaserBuyMultiplier(ratio) {
  player.settings.increaserBuyMultiplier = ratio;
}

document.getElementsByClassName('progressMeter')[0].dataset.value = 0.9;