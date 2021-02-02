var version = 'v1.0000';
document.getElementById('version').textContent = version;
console.warn(`Why are you here in the console?`);
let limit = 20;
let gainPerSecond = 1;
let unlockCosts = [10, 100, 500];
let upgradeCosts = [20, 50, 100, 200, 300, 500, 1000];
let investingEffectiveness = {
  limit: 1,
  gain: 1,
  global: 1,
};

let dev = {
  timeMultiplier: 1,
};

let player = {
  number: 0,
  pointsInvestedInLimit: 0,
  pointsInvestedInGain: 0,
  settings: {
    increaserBuyMultiplier: 1,
    ticksPerSecond: 30,
  },
  time: {
    lastTick: Date.now(),
    firstTick: Date.now(),
  },
  unlocks: [],
  upgrades: [],
  rank: 0,
};

function tab(tab) {
  let allTabs = document.getElementsByClassName('tab');
  for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].style.display = 'none';
  }
  allTabs[tab - 1].style.display = 'block';
};

tab(1);

(function mainLoop() {
  setTimeout(mainLoop, 1000 / player.settings.ticksPerSecond);
  loop(); //Makes game go BRRRR.
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
  let pendingLimitIncrease = Formula.limit(player.pointsInvestedInLimit + player.number * player.settings.increaserBuyMultiplier * investingEffectiveness.limit * investingEffectiveness.global) - limit;
  let pendingGainIncrease = Formula.gain(player.pointsInvestedInGain + player.number * player.settings.increaserBuyMultiplier * investingEffectiveness.gain * investingEffectiveness.global) - gainPerSecond;
  let gainPerSecondReal = (gainPerSecond) / (limit / (limit - player.number));
  //For below, test to see if the gain is equal for different FPS settings.
  player.number += (gainPerSecond * delta / 1000) / (limit / (limit - player.number));
  if (player.number > limit) player.number = limit;
  investingEffectiveness.limit = 1 * 2.5 ** hasUpgrade(4);
  investingEffectiveness.global = 1 * 1.25 ** hasUpgrade(6);
  document.getElementById('number').innerHTML = player.number.notate();
  document.getElementById('limit').innerHTML = limit.notate();
  document.getElementById('gain').innerHTML = gainPerSecondReal.notate();
  document.getElementById('maxGain').innerHTML = gainPerSecond.notate();
  document.getElementById('pendingLimitIncrease').innerHTML = pendingLimitIncrease.notate();
  document.getElementById('pendingGainIncrease').innerHTML = pendingGainIncrease.notate();
  let allUpgrades = document.getElementsByClassName('upgrader');
  for (let i = 0; i < allUpgrades.length; i++) {
    let id = i + 1;
    if (hasUpgrade(id)) allUpgrades[i].className = 'upgrader bought';
    else if (player.number >= upgradeCosts[i]) allUpgrades[i].className = 'upgrader buyable';
    else if (limit >= upgradeCosts[i]) allUpgrades[i].className = 'upgrader reachable';
    else allUpgrades[i].className = 'upgrader unreachable';
  };
  let allUnlocks = document.getElementsByClassName('unlocker');
  for (let i = 0; i < allUnlocks.length; i++) {
    let id = i + 1;
    if (hasUnlock(id)) allUnlocks[i].className = 'unlocker bought';
    else if (player.number >= unlockCosts[i]) allUnlocks[i].className = 'unlocker buyable';
    else if (limit >= unlockCosts[i]) allUnlocks[i].className = 'unlocker reachable';
    else allUnlocks[i].className = 'unlocker unreachable';
  };

  // for (let id = 1; id < allUnlocks.length + 1; id++) {
  //   if (hasUnlock(id)) {
  //     allUnlocks[id - 1].style.display = 'none';
  //   } else {
  //     allUnlocks[id - 1].style.display = 'inline-block';
  //   }
  // }

  // for (let id = 1; id < allUpgrades.length + 1; id++) {
  //   if (hasUpgrade(id)) {
  //     allUpgrades[id - 1].style.display = 'none';
  //   } else {
  //     allUpgrades[id - 1].style.display = 'inline-block';
  //   }
  // }
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

function buyUnlock(id) {
  let index = id - 1;
  if (!hasUnlock(id) && player.number >= unlockCosts[index]) {
    player.number -= unlockCosts[index];
    player.unlocks.push(id);
  };
};

function buyUpgrade(id) {
  let index = id - 1;
  if (!hasUpgrade(id) && player.number >= upgradeCosts[index]) {
    player.number -= upgradeCosts[index];
    player.upgrades.push(id);
  };
};

function hasUnlock(id) {
  return player.unlocks.includes(id);
};

function hasUpgrade(id) {
  return player.upgrades.includes(id);
};

function changeIncreaserBuyMultiplier(ratio) {
  player.settings.increaserBuyMultiplier = ratio;
}