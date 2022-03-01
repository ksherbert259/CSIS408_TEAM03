var all_defenses = [];
var defense_speed = 1;


// Set SOLDIER progress increment
function SOLDIER(progress)
{
  this.maxLife = 100;
  this.damage = 25;
  // this.life = this.maxLife + addedLife;
  this.x = 200; // canvas.width;
  this.y = 200; // canvas.height;
  this.row = 0;
}

SOLDIER.prototype.speed = defense_speed;
SOLDIER.prototype.color = "#333";
SOLDIER.prototype.visor = "#00AAFF";
SOLDIER.prototype.gun = "#000";

// Draw the damageer
SOLDIER.prototype.draw = function() {
  // Body
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, att_width, (att_height / 3) * 2); // Head
  context.fillRect(this.x, this.y, (att_width / 2.5), att_height); // Left Leg
  context.fillRect(this.x + (att_width / 3) * 2, this.y, (att_width / 2.5), att_height); // Right Leg

  // Visor
  context.fillStyle = this.visor;
  context.fillRect(this.x + (att_width / 3), (this.y + (att_height / 5)), (att_width / 2), att_height / 5);

  // Gun
  context.fillStyle = this.gun;
  context.fillRect(this.x + (att_width / 1.2), (this.y + (att_height / 2.3)), att_width, att_height / 5);
  context.fillRect(this.x + (att_width / 1.2) + 5, (this.y + (att_height / 2.3)), att_width / 5, att_height / 3);
  context.fillStyle = "#FFF";
  context.fillRect(this.x + (att_width * 1.3), this.y + (att_height / 2), att_width / 3, att_height / 7);
};

var CreateSoldier = () => {
  var soldier;
  var type = parseInt(Math.random() * 3);
  var row = parseInt(Math.random() * 4);
  var rect = game_rows[row].getBoundingClientRect();

  soldier = new SoldierTypes[type](0);
  soldier.row = row;
  soldier.y = rect.bottom - att_height - wrapper.offsetTop - 10; // Get the selected row, remove the soldier height, remove the offset top, remove 10 (for good looks)
  all_defenses.push(soldier);
}

// Create SNIPER defense
var SNIPER = function(progress) {
  SOLDIER.call(this, progress);
};
SNIPER.prototype = Object.create(SOLDIER.prototype);
SNIPER.prototype.constructor = SNIPER;
SNIPER.prototype.health = SOLDIER.prototype.health;
SNIPER.prototype.speed = SOLDIER.prototype.speed * 1.2;
SNIPER.prototype.speed = SOLDIER.prototype.damage * 0.7
SNIPER.prototype.color = "#493";
SNIPER.prototype.visor = "#FFF";

// Create TANK / Tank defense
var TANK = function(progress) {
  SOLDIER.call(this, progress);
};
TANK.prototype = Object.create(SOLDIER.prototype);
TANK.prototype.constructor = TANK;
TANK.prototype.health = SOLDIER.prototype.health * 1.5;
TANK.prototype.speed = SOLDIER.prototype.speed * 0.7;
TANK.prototype.damage = SOLDIER.prototype.damage * 1.5;
TANK.prototype.color = "#088";
TANK.prototype.visor = "#620";

// Create list of soldier types
var SoldierTypes = [SOLDIER, SNIPER, TANK];