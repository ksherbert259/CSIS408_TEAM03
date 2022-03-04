// Update defense stats
function UpdateDefenseStats()
{
  var defense_options = document.getElementById("defense_options");
  var defense = null;
  for(var cnt = 0; cnt < SoldierTypes.length; cnt++)
  {
    defense = defense_options.querySelector("[data-type=" + SoldierTypes[cnt].name + "]");
    defense.querySelector("img").src = "imgs/" + SoldierTypes[cnt].name.toLowerCase() + ".png";
    defense.querySelector(".defense_cost").innerText = parseFloat(SoldierTypes[cnt].prototype.cost);
    defense.querySelector(".defense_damage").innerText = parseFloat(SoldierTypes[cnt].prototype.damage);
    defense.querySelector(".defense_rate").innerText = parseFloat(SoldierTypes[cnt].prototype.displayRate);

    defense.addEventListener("mousedown", function(evt) { ChangeDefense(this.dataset.defense_idx); });
    defense.dataset.defense_idx = cnt;
  }
}

function GameLost()
{
  // If the score is in the negatives, lose the game
  if(!alreadyLost && (parseInt(score_system.innerText) < 0))
  {
    alreadyLost = true;
    alert("Sorry! The attackers made it past your defenses!\nYour score was dropped below 0 to " + score_system.innerText + "\nYou had " + currency.innerText + " gold before your demise!");
    alert("You may continue playing. Refresh this window to restart your game!");
  }
}

MainRender = function() {
  // Reset canvas
  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height);

  // Draw defense
  for(var i = 0, j = all_defenses.length; i < j; i++)
  {
    all_defenses[i].draw();
  }

  // Draw all attackers approaching
  for(var i = 0, j = all_attackers.length; i < j; i ++ ) {
    all_attackers[i].draw();
  }

  // Draw all bullets
  for(var i = 0, j = all_bullets.length; i < j; i++)
  {
    all_bullets[i].draw();
  }

  // Set next animation frame to recursively run
  requestAnimationFrame(MainRender);
};

MainLogic = function() {
  var t = new Date() - lastMove;
  checkForDead();

  addAttacker -= t;
  if(addAttacker <= 0) {
    CreateAttacker(stopped > 6);
    stopped = (stopped > 6) ? 0 : stopped;
    addAttacker = 7*1000 - Math.min(Math.floor(Math.random() * 7), stopped); // Incrementally spawn more enemies faster
  }

  for(var i = 0, j = all_attackers.length; i < j; i ++ ) {
    // true if attacker won row
    if(all_attackers[i].move(t)) {
      all_attackers[i].life = 0;
      score_system.innerText = parseInt(score_system.innerText) - all_attackers[i].scoreval * 3;
      enemyspeed = Math.max(0.01, enemyspeed - 0.05)
      all_attackers.splice(i,1);
      i--;
      j--;
      GameLost();
    }
  }

  addBullet -= t;
  for(var i = 0, j = all_defenses.length; i < j; i++ )
  {
    all_defenses[i].findTarget();
    all_defenses[i].fire(t);
  }

  for(var i = 0, j = all_bullets.length; i < j; i++)
  {
    all_bullets[i].move(t);
    if(all_bullets[i].checkCollision())
    {
      all_bullets.splice(i,1);
      i--;
      j--;
    }
  }

  addCurrency -= t;
  CheckCurrency(addCurrency, 1)

  lastMove = new Date();
  requestIdleCallback(MainLogic, { timeout: 250 });
};

function BeginGame()
{
  lastMove = new Date(); // Set to now
  requestIdleCallback(MainLogic, { timeout: 250 });
  requestAnimationFrame(MainRender);
}

function CheckCurrency(dontdoit, doit_by)
{
  if(dontdoit <= 0)
  {
    currency.innerText = parseInt(currency.innerText) + doit_by;
    addCurrency = 1 * 1000; // Reset currency timer
  }

  // Mark the currency as indebt if below 0
  currency.classList = (parseInt(currency.innerText) < 0) ? 'currency_debt' : '';
}

// Ensure the defense stats are up to date when loaded
UpdateDefenseStats();