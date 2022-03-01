function ChangeDefense(idx)
{
  console.log("hello -idx " + idx + " -currentDefense " + currentDefense);
  currentDefense = idx;
}

function PurchaseDefense(defense_idx)
{
  var enough_currency = parseInt(currency.innerText);
  if(enough_currency > 0)
  {
    currency.innerText = enough_currency - SoldierTypes[defense_idx].prototype.cost;
  }

  return (enough_currency > 0);
}

// Add the soldier to the canvas element
function addSoldier(evt)
{
  var target = evt.target.closest("div"); // Ensure 1 specific row/column was selected
  var rect = target.getBoundingClientRect();

  if(PurchaseDefense(currentDefense))
  {
    all_defenses.push(new SoldierTypes[currentDefense](rect.left, rect.bottom));
    currency.innerText = parseInt(currency.innerText) - SoldierTypes[currentDefense].prototype.cost;
  }
}
wrapper.addEventListener("click", addSoldier, false);