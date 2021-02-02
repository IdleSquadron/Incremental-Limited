Number.prototype.notate = function() {
  if (this >= 1) return this.toPrecision(4);
  else return this.toFixed(3);
};