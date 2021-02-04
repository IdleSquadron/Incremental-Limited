function reset() {
  player = {
    number: 0,
    pointsInvestedInLimit: 0,
    pointsInvestedInGain: 0,
    pointsInvestedInEffectiveness: 0,
    settings: {
      increaserBuyMultiplier: 1,
      ticksPerSecond: 30,
      doAutoSaving: true,
      autoSavesPerMinute: 60,
    },
    time: {
      lastTick: Date.now(),
      firstTick: Date.now(),
    },
    unlocks: [],
    upgrades: [],
    rank: 0,
  };
};

function autoSave() {
  localStorage["IncrementalLimitedSave"] = JSON.stringify(player);
};

function importSave() {
  let save = prompt('Import save here....');
  let errorx = 0;
  try {
    parseSave(save);
  } catch (err) {
    errorx = 1;
  };
  if (errorx < 1 && save) {
    loadImportedSave(parseSave(save));
  };
};

function loadImportedSave(saveToLoad) {
  reset();
  if (saveToLoad) {
    let savething = JSON.parse(saveToLoad);
    savething = convertOldSave(savething);
    applySave(savething);
  };
};

function convertOldSave(save) {
  if (save.settings.autoSavesPerMinute === undefined) save.settings.autoSavesPerMinute = 60;
  if (save.pointsInvestedInEffectiveness === undefined) save.pointsInvestedInEffectiveness = 0;
  if (save.settings.doAutoSaving === undefined) save.settings.doAutoSaving = true;
  if (save.settings.autoSavesPerMinute === undefined) save.settings.autoSavesPerMinute = 60;
  return save;
};

function applySave(save) {
  for (let x in save) player[x] = save[x];
};

function loadSave() {
  let localSave = localStorage["IncrementalLimitedSave"];
  if (localSave) {
    let saveToLoad;
    try {
      saveToLoad = JSON.parse(localSave);
    } catch(err) {
      reset();
    }
    saveToLoad = convertOldSave(saveToLoad);
    applySave(saveToLoad);
  }
}

function copySave() {
  let copy = document.getElementById('exportSaveData');
  copy.value = formSave(getLocalSaveString());
  copy.select();
  copy.setSelectionRange(0, 9999999);
  document.execCommand('copy');
};

function getLocalSaveString() {
  return JSON.stringify(player);
};

function formSave(save) {
  return btoa(btoa(save));
};

function parseSave(save) {
  return atob(atob(save));
};