var all_attackers = [];
var addedLife = 0; // Incremented
var baseSpeed = 0.05;
var att_width = 80;
var att_height = 100;
var maxLife = 100;
var addedLife = 0;

// Set default progress increment
function DEFAULT(progress)
{
  this.progress = progress;
  this.maxLife = 100;
  this.life = this.maxLife + addedLife;
  this.x = canvas.width;
  this.y = canvas.height;
}

// Common Attacker Prototype
DEFAULT.prototype.health = 100;
DEFAULT.prototype.speed = baseSpeed;
DEFAULT.prototype.color = "#990000";
DEFAULT.prototype.visor = "#00AAFF";

// Draw the attacker
DEFAULT.prototype.draw = function() {
  // Body
  context.beginPath();
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, att_width, (att_height / 3) * 2); // Head
  context.fillRect(this.x, this.y, (att_width / 2.5), att_height); // Left Leg
  context.fillRect(this.x + (att_width / 3) * 2, this.y, (att_width / 2.5), att_height); // Right Leg

  // Visor
  context.fillStyle = this.visor;
  context.fillRect(this.x + (att_width / 4), (this.y + (att_height / 5)), (att_width / 2), att_height / 5); // Visor
  context.closePath();
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
  for(var i = 0, j = all_attackers.length; i < j; i++)
  {
    if(all_attackers[i].life <= 0) // Check if attacker is dead
    {
      all_attackers.splice(i, 1);
      i--;
      j--;
    }
  }
}

var CreateAttacker = () => {
  var attacker;
  var type = parseInt(Math.random() * 3);
  var rect = game_rows[parseInt(Math.random() * 4)].getBoundingClientRect();

  attacker = new AttackTypes[type](0);
  attacker.y = rect.bottom - att_height - wrapper.offsetTop - 10; // Get the selected row, remove the attacker height, remove the offset top, remove 10 (for good looks)
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
STRONG.prototype.color = "#550000";
STRONG.prototype.visor = "#555";

// Create list of attack types
var AttackTypes = [DEFAULT, FAST, STRONG];