var canvas = document.getElementById("xGAME");
var context = gamecanvas.getContext("2d");
var enemies = [];
var stats = false;

CreateBoard = function() {

  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height);
};