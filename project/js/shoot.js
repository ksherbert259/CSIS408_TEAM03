var all_bullets = [];
var bullet_speed = 0.5;

function Bullet(x, y, target, owner, damage, crit)
{
  this.x = x;
  this.y = y;
  this.target = target;
  this.owner = owner;
  this.damage = (crit) ? damage * 2 : damage;
  this.crit = crit;

  if(this.owner.secondarytargs.length > 0)
  {
    console.log(this);
  }
}

Bullet.prototype.speed = bullet_speed;

Bullet.prototype.move = function(t)
{
  this.x = this.x + (this.speed * t);
};

Bullet.prototype.draw = function()
{
  context.fillStyle = "#F00";
  if(this.crit)
  {
    context.fillStyle = '#F9DC5C';
    context.fillRect(this.x, this.y - 10, 50, 10);
    context.fillStyle = "#555"
    context.fillRect(this.x, this.y - 15, 50, 5);
    context.fillStyle = "#F00";
  }

  context.fillRect(this.x, this.y, 50, 20);
}

Bullet.prototype.checkCollision = function()
{
  if(!this.target || (this.x > canvas.clientWidth))
  {
    return true;
  }

  // If target is infront of defender and bullet is infront of target
  if((this.x > this.target.x) && (this.owner.x < this.target.x))
  {
    this.target.life -= this.damage;

    // Create new bullets for richochet or extra damage
    for(var cnt = 0, max = this.owner.secondarytargs.length; cnt < max; cnt++)
    {
      var tempowner = this.owner;
      var temptarg = tempowner.secondarytargs[cnt];
      tempowner.secondarytargs = [];
      all_bullets.push(new Bullet(this.x, this.y, temptarg, tempowner, this.damage * 0.9, this.crit));
    }

    this.owner.secondarytargs = [];
    return true;
  }

  return false;
};