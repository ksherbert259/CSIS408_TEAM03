var wrapper = document.querySelector("body > div");
var canvas = document.getElementById("xCANVAS");
var context = canvas.getContext("2d");
var game_rows = wrapper.querySelectorAll(".gameoverlay");
var lastMove = new Date(); // set to now
var addEnemyTimer = 7 * 1000; // New attackers every 7 seconds
var stopped = 0;

// Set the game row heights
const row_height = (canvas.height / game_rows.length);
for(var cnt = 0; cnt < game_rows.length; cnt++)
{
  game_rows[cnt].style.height = (row_height - 1) + "px";
}

MainRender = function() {
  // Draw all items on canvas
  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i = 0, j = all_attackers.length; i < j; i ++ ) {
    all_attackers[i].draw();
  }

  requestAnimationFrame(MainRender);
};

MainLogic = function() {
  var t = new Date() - lastMove;
  checkForDead();

  addEnemyTimer -= t;
  if(addEnemyTimer <= 0) {
    CreateAttacker();
    addEnemyTimer = (stopped > 40) ? 10*1000 : 7.0*1000;  //how quicklly a new enemy is generated
  }

  for(var i = 0, j = all_attackers.length; i < j; i ++ ) {
    //true if attacker scored
    if(all_attackers[i].move(t)) {
      // attackerPoints++;
      // updateStats = true;
      all_attackers[i].life = 0;
      all_attackers.splice(i,1);
      i--;
      j--;
    }
  }
  lastMove = new Date();
  requestIdleCallback(MainLogic, { timeout: 250 });
};

function BeginGame()
{
  requestIdleCallback(MainLogic, { timeout: 250 });
  requestAnimationFrame(MainRender);
}