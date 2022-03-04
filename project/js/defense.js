var all_defenses = [];
var defense_speed = 1

// Set SOLDIER progress increment
function SOLDIER(x, y, idx)
{
  this.x = x;
  this.y = y - att_height - 10;
  this.row = idx;
}

SOLDIER.prototype.cost = 25;
SOLDIER.prototype.damage = 25;
SOLDIER.prototype.displayRate = defense_speed;
SOLDIER.secondarytargs = [];
SOLDIER.prototype.speed = 3;
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
  context.fillRect(this.x, this.y - 45, att_width, att_height / 3);

  // Name
  context.fillStyle = "#FFF";
  context.font = "20px Arial";
  context.fillText(this.name.toLowerCase(), this.x + 5, this.y - att_height / 5);
};

SOLDIER.prototype.fire = function(t)
{
  this.speed -= 0.05;
  if(this.target && this.speed <= 0)
  {
    var critshot = (Math.floor(Math.random() * 10) > 8);
    all_bullets.push(new Bullet(this.x + (att_width * 1.5), this.y + (att_height / 2.1), this.target, this, this.damage, critshot));

    // reset this objects speed to the prototypes
    this.speed = this.constructor.prototype.speed;
  }
};

// Verify the target is on the same row
SOLDIER.prototype.SameRow = function(targ)
{
  return ((this.row === targ.row) && (this.x < targ.x));
}

// Verify there are targets nearby, above or below
SOLDIER.prototype.SameRadius = function(targ)
{
  const radius = 3;
  var available = false;
  for(var cnt = 0; cnt < all_attackers.length; cnt++)
  {
    if((all_attackers[cnt].row > this.row - 1) && (all_attackers[cnt].row < this.row + 1))
    {
      if((all_attackers[cnt].x < targ.x + (inc_value * radius)) && (all_attackers[cnt].x > targ.x - (inc_value * radius)))
      {
        if(targ !== all_attackers[cnt])
        {
          available = true;
        }
      }
    }
  }

  return available;
}

// Find a valid target
SOLDIER.prototype.findTarget = function()
{
  var secondarytargs = [];

  // Nullify if no targets available
  if(all_attackers.length === 0) {
    this.target = null;
    return;
  }

  // If target is dead or moved behind defenses, nullify
  if(this.target && (this.target.life <= 0 || !this.SameRow(this.target)))
  {
    this.target = null;
  }

  //find all attackers in range
  var available = all_attackers.filter(this.SameRow, this);
  if(this.name === "TANK")
  {
    available = all_attackers.filter(this.SameRadius, this);
  }

  // If attackers are found, find target
  if(available.length > 0)
  {
    if((this.name === "SNIPER") || (this.name === "TANK"))
    {
      secondarytargs = available;
    }
    else
    {
      secondarytargs = [];
    }

    var distance = wrapper.clientWidth;
    var idx = 0;
    for(var cnt = 0; cnt < available.length; cnt++)
    {
      minimum = Math.min(distance, available[cnt].x);
      if(minimum !== distance)
      {
        distance = minimum;
        idx = cnt;
      }
    }

    // Chose the closest target available (faster attackers may pass slower attackers)
    this.target = available[idx];

    // Remove duplicate targets
    if((secondarytargs.length > idx) && (this.target === secondarytargs[idx]))
    {
      secondarytargs.splice(idx, 1);
    }
  }

  // Mark secondary targets if applicable
  this.secondarytargs = secondarytargs;
};

var CreateSoldier = (type) => {
  type = (type === undefined) ? Math.floor(Math.random() * SoldierTypes.length) : type;

  var soldier;
  var row = Math.floor(Math.random() * game_row_rect.length);
  var rect = game_row_rect[row];

  soldier = new SoldierTypes[type](0);
  soldier.row = row;
  soldier.y = rect.bottom - att_height - wrapper.offsetTop - 10; // Get the selected row, remove the soldier height, remove the offset top, remove 10 (for good looks)
  all_defenses.push(soldier);
}

// Create ASSAULT defense
var ASSAULT = function(x, y, idx) {
  SOLDIER.call(this, x, y, idx);
};
ASSAULT.prototype = Object.create(SOLDIER.prototype);
ASSAULT.prototype.constructor = ASSAULT;
ASSAULT.prototype.health = SOLDIER.prototype.health;
ASSAULT.prototype.displayRate = SOLDIER.prototype.displayRate * 2.3;
ASSAULT.prototype.speed = SOLDIER.prototype.speed * 0.5;
ASSAULT.prototype.damage = SOLDIER.prototype.damage * 0.9;
ASSAULT.prototype.cost = 35;
ASSAULT.prototype.name = "ASSAULT"
ASSAULT.prototype.color = "#850";
ASSAULT.prototype.visor = "#AAA";
ASSAULT.prototype.gun = "#401";

// Create SNIPER defense
var SNIPER = function(x, y, idx) {
  SOLDIER.call(this, x, y, idx);
};
SNIPER.prototype = Object.create(SOLDIER.prototype);
SNIPER.prototype.constructor = SNIPER;
SNIPER.prototype.health = SOLDIER.prototype.health;
SNIPER.prototype.displayRate = SOLDIER.prototype.displayRate * 0.4;
SNIPER.prototype.speed = SOLDIER.prototype.speed * 1.7;
SNIPER.prototype.damage = SOLDIER.prototype.damage * 2;
SNIPER.prototype.cost = 70;
SNIPER.prototype.name = "SNIPER"
SNIPER.prototype.color = "#088";
SNIPER.prototype.visor = "#BBB";
SNIPER.prototype.gun = "#CCC";

// Create TANK / Tank defense
var TANK = function(x, y, idx) {
  SOLDIER.call(this, x, y, idx);
};
TANK.prototype = Object.create(SOLDIER.prototype);
TANK.prototype.constructor = TANK;
TANK.prototype.health = SOLDIER.prototype.health * 1.5;
TANK.prototype.displayRate = SOLDIER.prototype.displayRate * 0.2;
TANK.prototype.speed = SOLDIER.prototype.speed * 2.7;
TANK.prototype.damage = SOLDIER.prototype.damage * 4;
TANK.prototype.cost = 150;
TANK.prototype.name = "TANK";
TANK.prototype.color = "#493";
TANK.prototype.visor = "#FFF";
TANK.prototype.gun = "#401";

// Create list of soldier types
var SoldierTypes = [SOLDIER, ASSAULT, SNIPER, TANK];