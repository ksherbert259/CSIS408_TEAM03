var all_bullets = [];
var bullet_speed = 0.5;

function Bullet(x, y, target, owner, damage)
{
  this.x = x;
  this.y = y;
  this.target = target;
  this.owner = owner;
  this.damage = damage;
}

Bullet.prototype.speed = bullet_speed;

Bullet.prototype.move = function(t)
{
  this.x = this.x + (this.speed * t);
};

Bullet.prototype.draw = function()
{
  context.fillStyle="#F00";
  context.fillRect(this.x, this.y, 50, 20);
}

Bullet.prototype.checkCollision = function() {
  if((this.x > this.target.x) && (this.owner.x < this.target.x))
  {
    this.target.life -= this.damage;
    return true;
  }

  return false;
};