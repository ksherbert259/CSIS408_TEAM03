var all_defenses = [];
var defense_speed = 1;


// Set SOLDIER progress increment
function SOLDIER(x, y)
{
  this.maxLife = 100;
  this.damage = 25;
  this.cost = 25;
  // this.life = this.maxLife + addedLife;
  this.x = x;
  this.y = y - att_height - 10;
  this.row = 0;
}

SOLDIER.prototype.cost = 25
SOLDIER.prototype.damage = 25;
SOLDIER.prototype.speed = defense_speed;
SOLDIER.prototype.name = "SOLDIER";
SOLDIER.prototype.color = "#333";
SOLDIER.prototype.visor = "#00AAFF";
SOLDIER.prototype.gun = "#000";

// Draw the soldier
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

  // Name background
  context.fillStyle = "#000";
  context.fillRect(this.x, this.y - 45, att_width + 15, att_height / 3);

  // Name
  context.fillStyle = "#FFF";
  context.font = "30px Arial";
  context.fillText(this.name.toLowerCase(), this.x + 5, this.y - att_height / 5);
};

var CreateSoldier = (type) => {
  type = (type === undefined) ? parseInt(Math.random() * 3) : type;

  var soldier;
  var row = parseInt(Math.random() * 4);
  var rect = game_rows[row].getBoundingClientRect();

  soldier = new SoldierTypes[type](0);
  soldier.row = row;
  soldier.y = rect.bottom - att_height - wrapper.offsetTop - 10; // Get the selected row, remove the soldier height, remove the offset top, remove 10 (for good looks)
  all_defenses.push(soldier);
}

// Create ASSAULT defense
var ASSAULT = function(x, y) {
  SOLDIER.call(this, x, y);
};
ASSAULT.prototype = Object.create(SOLDIER.prototype);
ASSAULT.prototype.constructor = ASSAULT;
ASSAULT.prototype.health = SOLDIER.prototype.health;
ASSAULT.prototype.speed = SOLDIER.prototype.speed * 1.5;
ASSAULT.prototype.damage = SOLDIER.prototype.damage * 0.7;
ASSAULT.prototype.cost = 40;
ASSAULT.prototype.name = "ASSAULT"
ASSAULT.prototype.color = "#850";
ASSAULT.prototype.visor = "#AAA";
ASSAULT.prototype.gun = "#401";

// Create SNIPER defense
var SNIPER = function(x, y) {
  SOLDIER.call(this, x, y);
};
SNIPER.prototype = Object.create(SOLDIER.prototype);
SNIPER.prototype.constructor = SNIPER;
SNIPER.prototype.health = SOLDIER.prototype.health;
SNIPER.prototype.speed = SOLDIER.prototype.speed * 0.5;
SNIPER.prototype.damage = SOLDIER.prototype.damage * 1.7;
SNIPER.prototype.cost = 40;
SNIPER.prototype.name = "SNIPER"
SNIPER.prototype.color = "#088";
SNIPER.prototype.visor = "#BBB";
SNIPER.prototype.gun = "#CCC";

// Create TANK / Tank defense
var TANK = function(x, y) {
  SOLDIER.call(this, x, y);
};
TANK.prototype = Object.create(SOLDIER.prototype);
TANK.prototype.constructor = TANK;
TANK.prototype.health = SOLDIER.prototype.health * 1.5;
TANK.prototype.speed = SOLDIER.prototype.speed * 0.7;
TANK.prototype.damage = SOLDIER.prototype.damage * 2.5;
TANK.prototype.cost = 50;
TANK.prototype.name = "TANK";
TANK.prototype.color = "#493";
TANK.prototype.visor = "#FFF";
TANK.prototype.gun = "#401";

// Create list of soldier types
var SoldierTypes = [SOLDIER, ASSAULT, SNIPER, TANK];