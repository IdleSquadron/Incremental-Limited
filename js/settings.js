function toggleAutoSaving() {
  if (player.settings.doAutoSaving === true) player.settings.doAutoSaving = false;
  else player.settings.doAutoSaving = true;
  document.getElementById('autoSaveButton').className = player.settings.doAutoSaving ? 'on' : 'off';
}