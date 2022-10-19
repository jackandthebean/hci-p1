let screen_horizontal = window.innerWidth;
let screen_vertical = window.innerHeight;
let left = 20;

let finger_board;
let finger_board_width = screen_horizontal/4;
let finger_board_height = finger_board_width * 650 / 850;

let game_board_width = 450;
//let game_board_height = 450;
//let target_zone_height = 450;
let game_board_x = screen_horizontal - game_board_width - left;
let game_board_y = 50;
//let target_zone_y = 450;

var run_game = false;
var dots = [];
var dot_speed = 2;
var normal_rounds = 3;
var weird_rounds = 6;
var normal_game = true;

// x values for main board
var one = game_board_x + 75;
var two = game_board_x + 75*2;
var three = game_board_x + 75*3;
var four = game_board_x + 75*4;
var five = game_board_x + 75*5;


var assigned_nums = '1  2  3  4  5';
var inputs = ['1', '2', '3', '4', '5']

var num_rounds = 1;

var total_hits = 0;

var key1 = false;
var key2 = false;
var key3 = false;
var key4 = false;
var key5 = false;

// y value of the last note created
var last_y = 75;

function preload(){
  finger_board = loadImage('finger_board.png');
}

function setup() {
  createCanvas(screen_horizontal, screen_vertical);
  createDots();
}

function createDots() {
  // create 30 notes at randomized y
  for (let i = 0; i < 30; i++) {
    x_coord = random(5);
    x_coord = x_coord <= 1 ? one : (x_coord <= 2 ? two : (x_coord <= 3 ? three : (x_coord <= 4 ? four : five)));

    // add dot to dots
    dots.push({x: x_coord, y: last_y, hit: false});

    // set y higher by a random amount
    last_y += random(-75, -125);
  }

}

function draw_board() {
  // main board
  fill(color(255, 204, 0));
  rect(game_board_x, game_board_y, game_board_width, 500);

  // note lines
  line(one, 75, one, 475);
  line(two, 75, two, 475);
  line(three, 75, three, 475);
  line(four, 75, four, 475);
  line(five, 75, five, 475);

  // target zone
  fill(color(0, 204, 0));
  rect(game_board_x, 500, game_board_width, 50);
}

function draw_start_board() {
  // main board
  fill(color(255, 204, 0));
  rect(game_board_x, game_board_y, game_board_width, 500);

  //instructions
  fill(200, 0, 200);
  textSize(28);
  if (num_rounds <= normal_rounds + weird_rounds) {
     text("Press 's' to start round " + num_rounds, 385, 300)
    if (num_rounds == normal_rounds + 1){
      text(" \t \t   ATTENTION: \n The keys have changed", 375, 380)

  }


  }
  else {
    text("Thanks for playing :)", 400, 300)
  }



  // target zone
  fill(color(0, 204, 0));
  rect(game_board_x, 500, game_board_width, 50);
}

function manage_dots() {
  dots.forEach(dot => {
    dot['y'] += dot_speed;

    if (dot['hit'] == false) {
      circle(dot['x'], dot['y'], 30);


      // check if note is in target zone
      if (dot['y'] >= 500 && dot['y'] <= 550 && dot['hit'] == false) {
          // check if correct key for the column was pressed
          if(key1 && dot['x'] == one) {
            dot['hit'] = true;
            total_hits++;
          }
          if(key2 && dot['x'] == two) {
            dot['hit'] = true;
            total_hits++;
          }
          if(key3 && dot['x'] == three) {
            dot['hit'] = true;
            total_hits++;
          }
          if(key4 && dot['x'] == four) {
            dot['hit'] = true;
            total_hits++;
          }
          if(key5 && dot['x'] == five) {
            dot['hit'] = true;
            total_hits++;
          }
        }
      }
  });

  key1 = false;
  key2 = false;
  key3 = false;
  key4 = false;
  key5 = false;

  if (dots[29]['y'] > 600) {
    end_round();
  }
}

//transition from one round to the next
function end_round() {
  dots = []
  total_hits = 0;
  num_rounds ++;
  if (num_rounds > normal_rounds){
    normal_game = false;
    assigned_nums = '5  1  4  3  2';
    inputs = ['5', '1', '4', '3', '2']
  }
  run_game = false;
  last_y = 75
  createDots();
}

function draw() {
  background('#92C471');
  image(finger_board, left, screen_vertical/2 - finger_board_height, finger_board_width, finger_board_height);
  
  fill(200, 0, 200);
  textSize(32);
  text('Hits: ' + total_hits + '/30', 36, 440);

  if (run_game) {
    draw_board();
    fill(color(255, 59, 0))
    manage_dots();
  }

  else {
    draw_start_board();
  }
}

function keyPressed() {
  if (key == 's' && num_rounds <= normal_rounds + weird_rounds) {
    run_game = true;
    document.getElementById("instruction").style = "display: none";
  }

  if (key == inputs[0]) {
    key1 = true;
  }
  if (key == inputs[1]) {
    key2 = true;
  }
  if (key == inputs[2]) {
    key3 = true;
  }
  if (key == inputs[3]) {
    key4 = true;
  }
  if (key == inputs[4]) {
    key5 = true;
  }

}

