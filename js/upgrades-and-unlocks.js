let upgrades = [
  { description: `Limit is increased by 50.`, cost: 20 },
  { description: `Double gain per second.`, cost: 50 },
  { description: `Gain per second is raised to the 1.025.`, cost: 100 },
  { description: `Investing in the Limit increaser is more effective.`, cost: 200 },
  { description: `Limit is multiplied based on Gain per second.<br />Currently: x<span id='upgrade5Effect'>1.00</span>`, cost: 300 },
  { description: `Investing in increasers is 1.5x more effective.`, cost: 500 },
  { description: `Slightly increase Limit.`, cost: 750 },
  { description: `Triple Gain per second!`, cost: 1000 },
  { description: `The GDS (Gain Divider Scaling) is weakened.`, cost: 3000 },
  { description: `Investing Effectiveness is squared!`, cost: 10000 },
];
let unlocks = [
  { description: `Unlock a button to increase Gain.`, cost: 10 },
  { description: `Unlock a button to increase Limit.`, cost: 100 },
  { description: `Unlock Buy Multipliers for Increasers.`, cost: 500 },
  { description: `Unlock the Investing Effectiveness Increaser.`, cost: 1000 },
];

(function initUpgrades() {
  for (let x = 0; x < upgrades.length; x++) {
    let button = document.createElement('button');
    button.className = 'upgrader';
    button.onclick = function() {
      buyUpgrade(x + 1);
    };
    let innerHTMLTemplate = `${upgrades[x].description}<br />Cost: ${upgrades[x].cost}`;
    button.innerHTML = innerHTMLTemplate;
    document.getElementById('upgradesList').appendChild(button);
  };
})();

(function initUnlocks() {
  for (let x = 0; x < unlocks.length; x++) {
    let button = document.createElement('button');
    button.className = 'unlocker';
    button.onclick = function() {
      buyUnlock(x + 1);
    };
    let innerHTMLTemplate = `${unlocks[x].description}<br />Cost: ${unlocks[x].cost}`;
    button.innerHTML = innerHTMLTemplate;
    document.getElementById('unlocksList').appendChild(button);
  };
})();

function CSSUpgradesAndUnlocks() {
  let allUpgrades = document.getElementsByClassName('upgrader');
  for (let i = 0; i < allUpgrades.length; i++) {
    let id = i + 1;
    if (hasUpgrade(id)) allUpgrades[i].className = 'upgrader bought';
    else if (player.number >= upgrades[i].cost) allUpgrades[i].className = 'upgrader buyable';
    else if (limit >= upgrades[i].cost) allUpgrades[i].className = 'upgrader reachable';
    else allUpgrades[i].className = 'upgrader unreachable';
  };
  let allUnlocks = document.getElementsByClassName('unlocker');
  for (let i = 0; i < allUnlocks.length; i++) {
    let id = i + 1;
    if (hasUnlock(id)) allUnlocks[i].className = 'unlocker bought';
    else if (player.number >= unlocks[i].cost) allUnlocks[i].className = 'unlocker buyable';
    else if (limit >= unlocks[i].cost) allUnlocks[i].className = 'unlocker reachable';
    else allUnlocks[i].className = 'unlocker unreachable';
  };
}

function buyUnlock(id) {
  let index = id - 1;
  let cost = unlocks[index].cost;
  if (!hasUnlock(id) && player.number >= cost) {
    player.number -= cost;
    player.unlocks.push(id);
  };
};

function buyUpgrade(id) {
  let index = id - 1;
  let cost = upgrades[index].cost;
  if (!hasUpgrade(id) && player.number >= cost) {
    player.number -= cost;
    player.upgrades.push(id);
  };
};

function hasUnlock(id) {
  return player.unlocks.includes(id);
};

function hasUpgrade(id) {
  return player.upgrades.includes(id);
};
