//ok 6-digit

//Ranks will be a feature throughout the game. You always unlock stuff and/or gain bonuses with each rankup.
/*
let ranks = [
  { label: 'α', requirement: () => true, requirementDisplay: 'Automatically given.', reward: 'None.', startNewRowAfter: true },
  { label: 'A', requirement: () => player.number >= 1000, requirementDisplay: 'Have a Number of 1000.', reward: '+5% to both Gain and Limit.', startNewRowAfter: false },
  { label: 'B', requirement: () => player.number >= 1000, requirementDisplay: 'Acquire at least 8 Number upgrades.', reward: 'Start any run with the 1<sup>st</sup> Unlock.', startNewRowAfter: false },
  { label: 'C', requirement: () => player.number >= 1000, requirementDisplay: 'Acquire at least 10 Number upgrades.', reward: 'Unlock nothing.', startNewRowAfter: false },
];

(function initRanks() {
  let firstRow = document.createElement('div');
  firstRow.className = 'ranks-row';
  document.getElementById('ranks').appendChild(firstRow);
  let row = 0;
  for (let x = 0; x < ranks.length; x++) {
    let rankElement = document.createElement('div');
    rankElement.className = 'rank';
    let titleElement = document.createElement('p');
    titleElement.className = 'rank-label';
    titleElement.innerHTML = `Rank ${ranks[x].label}`;
    rankElement.appendChild(titleElement);
    let tooltipElement = document.createElement('div');
    tooltipElement.className = 'rank-tooltip';
    tooltipElement.innerHTML = ranks[x].requirementDisplay;
    rankElement.appendChild(tooltipElement);
    document.querySelectorAll('#ranks > .ranks-row')[row].appendChild(rankElement);
    if (ranks[x].startNewRowAfter === true) {
      row++;
      let rowElement = document.createElement('div');
      rowElement.className = 'ranks-row';
      document.getElementById('ranks').appendChild(rowElement);
    };
  };
})();

function getRank(rank = player.rank) {
  return ranks[rank].label;
}
*/