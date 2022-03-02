//
// Global Variables for all scripts
//

var wrapper = document.querySelector("body > div");
var canvas = document.getElementById("xCANVAS");
var context = canvas.getContext("2d");
var game_rows = wrapper.querySelectorAll(".gameoverlay");
var lastMove = null
var addAttacker = 7 * 1000; // New attackers every 7 seconds
var addCurrency = 1 * 1000; // Add default gold every 1 second
var addBullet = 10 * 1000;
var stopped = 0;

var currentDefense = 0;

var score_system = document.getElementById("xSCORE");
var currency = document.getElementById("xCURRENCY");

const row_height = (canvas.height / game_rows.length);
for(var cnt = 0; cnt < game_rows.length; cnt++)
{
  game_rows[cnt].style.height = (row_height - 1) + "px";
}

// Find and calculate all grid widths
const ttl_grids = 15;
const inc_value = (canvas.width / ttl_grids);
var grid_boxes = [];
for(var cnt = 0; cnt < ttl_grids; cnt++)
{
  grid_boxes.push(inc_value * cnt);
}

// Create invisible grid lines for defense placement
var game_row_rect = [];
var div = document.createElement("div");
div.className = "invisible grid_block_right";
for(var row = 0; row < game_rows.length; row++)
{
  for(var j = 0; j < grid_boxes.length; j++)
  {
    div.style.width = inc_value + "px";
    div.dataset.begin = grid_boxes[j];
    div.dataset.end = grid_boxes[j] + inc_value;
    game_rows[row].appendChild(div.cloneNode());
  }

  game_row_rect.push(game_rows[row].getBoundingClientRect());
}