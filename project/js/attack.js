var all_attackers = [];
var addedLife = 0; // Incremented
var maxLife = 100;
var enemyspeed = 0.1;
var att_width = 80;
var att_height = 100;

// Set default progress increment
function DEFAULT(progress)
{
  this.progress = progress;
  this.life = 100;
  this.x = canvas.width;
  this.y = canvas.height;
  this.row = 0;
}

// Common Attacker Prototype
DEFAULT.prototype.health = 100;
DEFAULT.prototype.speed = 0.1;
DEFAULT.prototype.name = "Susser";
DEFAULT.prototype.color = "#990000";
DEFAULT.prototype.visor = "#00AAFF";

// Draw the attacker
DEFAULT.prototype.draw = function() {
  // Body
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, att_width, (att_height / 3) * 2); // Head
  context.fillRect(this.x, this.y, (att_width / 2.5), att_height); // Left Leg
  context.fillRect(this.x + (att_width / 3) * 2, this.y, (att_width / 2.5), att_height); // Right Leg

  // Visor
  context.fillStyle = this.visor;
  context.fillRect(this.x + (att_width / 4), (this.y + (att_height / 5)), (att_width / 2), att_height / 5); // Visor

  // Background Health Bar
  context.fillStyle = "#000";
  context.fillRect(this.x, this.y - 30, att_width, att_height / 4);

  // Health bar
  context.fillStyle = (this.boss && this.life > maxLife * 1.5) ? "#444" : "#F00";
  context.fillRect(this.x, this.y - 25, att_width + ((this.boss) ? (this.life % maxLife) : this.life - maxLife), att_height / 6);

  if(this.boss)
  {
    context.fillStyle = "#FFF";
    context.font = "15px Arial";
    context.fillText("BOSS: " + this.name, this.x, this.y - 10)
  }
};

DEFAULT.prototype.setPosition = function() {
  this.x = canvas.width - this.progress;
  return (this.x <= 0 - att_width);
}

DEFAULT.prototype.move = function(t) {
  this.progress += this.speed * t;
  return this.setPosition();
}

function checkForDead() {
  for(var cnt = 0, max = all_attackers.length; cnt < max; cnt++)
  {
    if(all_attackers[cnt].life <= 0) // Check if attacker is dead
    {
      CheckCurrency(1, (all_attackers[cnt].boss) ? 75 : 25);
      stopped = parseFloat(stopped) + 0.1;
      enemyspeed += 0.001;
      all_attackers.splice(cnt, 1);
      cnt--;
      max--;
      currency.innerText = parseInt(currency.innerText) + 25;
      score_system.innerText = parseInt(score_system.innerText) + 1;
    }
  }
}

var CreateAttacker = (createBoss) => {
  var attacker;
  var type = Math.floor(Math.random() * AttackTypes.length);
  var row = Math.floor(Math.random() * game_rows.length);
  var rect = game_row_rect[row];

  attacker = new AttackTypes[type](0);
  attacker.row = row;
  attacker.boss = createBoss;
  attacker.life = (createBoss) ? attacker.life * 4 : attacker.life;
  attacker.speed = attacker.speed + enemyspeed
  attacker.y = rect.bottom - att_height - wrapper.offsetTop - 10;// Get the selected row, remove the attacker height, remove the offset top
  all_attackers.push(attacker);

  // Create other enemies in different locations at different times if not a boss
  for(var cnt = 0, recurse = Math.floor(Math.random() * 5) + 1; cnt < recurse && !createBoss; cnt++)
  {
    setTimeout(RandomizeAttacker, Math.floor(Math.random() * 4) * 1000);
  }
}

var RandomizeAttacker = () =>
{
  var attacker = new AttackTypes[Math.floor(Math.random() * AttackTypes.length)](0);
  var row = Math.floor(Math.random() * game_rows.length);
  var rect = game_row_rect[row];

  attacker.row = row;
  attacker.boss = false;
  attacker.speed = attacker.speed + enemyspeed
  attacker.y = rect.bottom - att_height - wrapper.offsetTop - (Math.random() * 20);
  all_attackers.push(attacker);
}

// Create Fast Attackers
var FAST = function(progress) {
  DEFAULT.call(this, progress);
};
FAST.prototype = Object.create(DEFAULT.prototype);
FAST.prototype.constructor = FAST;
FAST.prototype.health = DEFAULT.prototype.health * 0.7;
FAST.prototype.speed = DEFAULT.prototype.speed * 1.2;
FAST.prototype.name = "Speed Susser";
FAST.prototype.color = "#950";
FAST.prototype.visor = "#977";

// Create Strong / Tank Attackers
var STRONG = function(progress) {
  DEFAULT.call(this, progress);
};
STRONG.prototype = Object.create(DEFAULT.prototype);
STRONG.prototype.constructor = STRONG;
STRONG.prototype.health = DEFAULT.prototype.health * 1.2;
STRONG.prototype.speed = DEFAULT.prototype.speed * 0.7;
STRONG.prototype.name = "Big Susser";
STRONG.prototype.color = "#550000";
STRONG.prototype.visor = "#555";

// Create list of attack types
var AttackTypes = [DEFAULT, FAST, STRONG];