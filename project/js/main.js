// Update defense stats
function UpdateDefenseStats()
{
  var defense_options = document.getElementById("defense_options");
  var defense = null;
  var cnt = 0;
  for(cnt = 0; cnt < SoldierTypes.length; cnt++)
  {
    defense = defense_options.querySelector("[data-type=" + SoldierTypes[cnt].name + "]");
    defense.querySelector("img").src = "imgs/" + SoldierTypes[cnt].name.toLowerCase() + ".png";
    defense.querySelector(".defense_cost").innerText = parseFloat(SoldierTypes[cnt].prototype.cost);
    defense.querySelector(".defense_damage").innerText = parseFloat(SoldierTypes[cnt].prototype.damage);
    defense.querySelector(".defense_rate").innerText = parseFloat(SoldierTypes[cnt].prototype.speed);

    defense.addEventListener("mousedown", function(evt) { ChangeDefense(this.dataset.defense_idx); });
    defense.dataset.hello = "HELLO + " + cnt;
    defense.dataset.defense_idx = cnt;
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

  // Set next animation frame to recursively run
  requestAnimationFrame(MainRender);
};

MainLogic = function() {
  var t = new Date() - lastMove;
  checkForDead();

  addAttacker -= t;
  if(addAttacker <= 0) {
    CreateAttacker();
    addAttacker = (stopped > 40) ? 10*1000 : 7.0*1000; // Vary the time an attacker is generated
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

  addCurrency -= t;
  CheckCurrency(addCurrency)

  lastMove = new Date();
  requestIdleCallback(MainLogic, { timeout: 250 });
};

function BeginGame()
{
  lastMove = new Date(); // Set to now
  requestIdleCallback(MainLogic, { timeout: 250 });
  requestAnimationFrame(MainRender);
}

function CheckCurrency(addition)
{
  if(addition <= 0)
  {
    currency.innerText = parseInt(currency.innerText) + 1;
    addCurrency = 1*1000;
  }

  // Mark the currency as indebt if below 0
  currency.classList = (parseInt(currency.innerText) < 0) ? 'currency_debt' : '';

}


// Ensure the defense stats are up to date when loaded
UpdateDefenseStats();