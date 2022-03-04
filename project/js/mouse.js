function ChangeDefense(idx)
{
  currentDefense = Math.max(0, Math.min(SoldierTypes.length, idx));

  var defense_options = document.getElementById("defense_options");
  var previous = defense_options.querySelector("div.current_selected");
  if(previous)
  {
    previous.classList = "";
  }
  var selected = defense_options.querySelector("div[data-type=" + SoldierTypes[currentDefense].name + "]");
  selected.classList = "current_selected";

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

  var idx = 0;
  var row = target.parentElement;
  for(var cnt = 0; cnt < game_rows.length; cnt++)
  {
    if(row === game_rows[cnt])
    {
      idx = cnt;
    }
  }

  var rect = target.getBoundingClientRect();

  if(PurchaseDefense(currentDefense))
  {
    all_defenses.push(new SoldierTypes[currentDefense](rect.left, rect.bottom, idx));
  }
}
wrapper.addEventListener("click", addSoldier, false);