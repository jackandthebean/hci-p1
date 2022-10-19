/*
weird mapping game for hci
by team Hot Coding Individuals

Keyboard Options:
's' to start
'd' to download results

*/

// Data
const rows = [];

// Design Variables
let screen_horizontal = window.innerWidth;
let screen_vertical = window.innerHeight;
let margin = 20;

let game_board_width = 450;
let game_board_height = 0.8 * screen_vertical;
let game_board_x = screen_horizontal - game_board_width - margin;
let game_board_y = screen_vertical - game_board_height - margin;

let target_zone_height = 90;
let target_zone_y = game_board_y + game_board_height - target_zone_height;
let target_zone_leeway = 22;

let dot_diameter = 30;
let line_interval = 75;

// x values for lines on main board
var one = game_board_x + line_interval;
var two = game_board_x + line_interval * 2;
var three = game_board_x + line_interval * 3;
var four = game_board_x + line_interval * 4;
var five = game_board_x + line_interval * 5;

// Finger Board Image
let finger_board;
let finger_board_height = screen_vertical/5;
let finger_board_width = finger_board_height * 860 / 494;

// Game State
var run_game = false;
var dots = [];
var dot_speed = 90;
var normal_rounds = 2;
var weird_rounds = 4;
var normal_game = true;

var assigned_nums = '1  2  3  4  5';
var inputs = ['1', '2', '3', '4', '5']

var key1 = false;
var key2 = false;
var key3 = false;
var key4 = false;
var key5 = false;

var num_rounds = 1;

var total_hits = 0;

var one_hits = 0;
var two_hits = 0;
var three_hits = 0;
var four_hits = 0;
var five_hits = 0;

var ones = 0;
var twos = 0;
var threes = 0;
var fours = 0;
var fives = 0;

// y value of the last note created
var last_y = game_board_y + dot_diameter/2;

function preload(){
  finger_board = loadImage('finger_board.png');
}

function setup() {
  let row = [];
  row.push("Round Number");
  row.push("Normal Round?");
  row.push("One Hits");
  row.push("Ones Total");
  row.push("Two Hits");
  row.push("Twos Total");
  row.push("Three Hits");
  row.push("Threes Total");
  row.push("Four Hits");
  row.push("Fours Total");
  row.push("Five Hits");
  row.push("Fives Total");
  rows.push(row);

  createCanvas(screen_horizontal, screen_vertical);
  createDots();
}

function createDots() {
  // create 30 notes at randomized y
  for (let i = 0; i < 30; i++) {
    x_coord = random(5);

    if (x_coord <= 1) {
      x_coord = one;
      ones += 1;
    }

    else if (x_coord <= 2) {
      x_coord = two;
      twos += 1;
    }

    else if (x_coord <= 3) {
      x_coord = three;
      threes += 1;
    }

    else if (x_coord <= 4) {
      x_coord = four;
      fours += 1;
    }

    else if (x_coord <= 5) {
      x_coord = five;
      fives += 1;
    }
    // add dot to dots
    dots.push({x: x_coord, y: last_y, hit: false});

    // set y higher by a random amount
    last_y += random(-75, -125);
  }

}

function draw_board() {
  // main board
  fill('#E4BE82');
  rect(game_board_x, game_board_y, game_board_width, game_board_height);

  // note lines
  line(one, 0, one, game_board_y + game_board_height);
  line(two, 0, two, game_board_y + game_board_height);
  line(three, 0, three, game_board_y + game_board_height);
  line(four, 0, four, game_board_y + game_board_height);
  line(five, 0, five, game_board_y + game_board_height);

  // target zone
  fill('#CBD125');
  rect(game_board_x, target_zone_y, game_board_width, target_zone_height);
}

function draw_start_board() {
  // main board
  fill('#E4BE82');
  rect(game_board_x, game_board_y, game_board_width, game_board_height);

  //instructions
  fill('white');
  textSize(28);
  if (num_rounds <= normal_rounds + weird_rounds) {
     text("Press 's' to start round " + num_rounds, game_board_x + game_board_width/2 - 150, screen_vertical/2);
    if (num_rounds == 2) {
      text("\t \t \t \t Nice job!\nLet's do this one more time!", game_board_x + game_board_width/2 - 150, screen_vertical/2 + 49);
    }
    
    else if (num_rounds == normal_rounds + 1) {
      text(" \t \t \t \t ATTENTION: \n \t \t The keys have changed! \nCheck the new version on the left!", game_board_x + game_board_width/2 - 210, screen_vertical/2 + 49)
      document.getElementById("one").innerHTML = inputs[0];
      document.getElementById("two").innerHTML = inputs[1];
      document.getElementById("three").innerHTML = inputs[2];
      document.getElementById("four").innerHTML = inputs[3];
      document.getElementById("five").innerHTML = inputs[4];
    }
    
    else if (num_rounds == normal_rounds + 2) {
      text("\t \t \t \t Not bad!\nThat was prety hard right?\n \t \t \t Let's try again!", game_board_x + game_board_width/2 - 160, screen_vertical/2 + 49);
    }


  }
  else {
    text("Thanks for playing :)", game_board_x + game_board_width/2 - 140, screen_vertical/2);
    text("Press 'd' to download results", game_board_x + game_board_width/2 - 165, screen_vertical/2 + 49);
  }



  // target zone
  fill('#CBD125');
  rect(game_board_x, target_zone_y, game_board_width, target_zone_height);
}

function manage_dots() {
  dots.forEach(dot => {
    dot['y'] += dot_speed;

    if (dot['hit'] == false) {
      circle(dot['x'], dot['y'], dot_diameter);


      // check if note is in target zone
      if (dot['y'] >= target_zone_y - target_zone_leeway && dot['y'] <= (target_zone_y + target_zone_height) && dot['hit'] == false) {
          // check if correct key for the column was pressed
          if(key1 && dot['x'] == one) {
            dot['hit'] = true;
            total_hits++;
            one_hits++;
          }
          if(key2 && dot['x'] == two) {
            dot['hit'] = true;
            total_hits++;
            two_hits++;
          }
          if(key3 && dot['x'] == three) {
            dot['hit'] = true;
            total_hits++;
            three_hits++;
          }
          if(key4 && dot['x'] == four) {
            dot['hit'] = true;
            total_hits++;
            four_hits++;
          }
          if(key5 && dot['x'] == five) {
            dot['hit'] = true;
            total_hits++;
            five_hits++;
          }
        }
      }
  });

  key1 = false;
  key2 = false;
  key3 = false;
  key4 = false;
  key5 = false;

  if (dots[29]['y'] > screen_vertical) {
    end_round();
  }
}

//transition from one round to the next
function end_round() {
  let row = [];
  row.push(num_rounds);
  row.push(normal_game);
  row.push(one_hits);
  row.push(ones);
  row.push(two_hits);
  row.push(twos);
  row.push(three_hits);
  row.push(threes);
  row.push(four_hits);
  row.push(fours);
  row.push(five_hits);
  row.push(fives);
  rows.push(row);

  dots = []
  total_hits = 0;

  one_hits = 0;
  two_hits = 0;
  three_hits = 0;
  four_hits = 0;
  five_hits = 0;

  ones = 0;
  twos = 0;
  threes = 0;
  fours = 0;
  fives = 0;

  num_rounds ++;
  if (num_rounds > normal_rounds){
    normal_game = false;
    assigned_nums = '5  1  4  3  2';
    inputs = ['5', '1', '4', '3', '2']
  }
  run_game = false;
  last_y = game_board_y + dot_diameter/2;
  createDots();
}

function draw() {
  background('#92C471');
  image(finger_board, margin, screen_vertical/2 - finger_board_height, finger_board_width, finger_board_height);

  fill('white');
  textSize(28);
  text('Hits: ' + total_hits + '/30', margin, screen_vertical/2 + finger_board_height);

  if (run_game) {
    draw_board();
    fill('#F0DEB3')
    manage_dots();
  }

  else {
    draw_start_board();
  }
}

function keyPressed() {
  if (key == 's' && num_rounds <= normal_rounds + weird_rounds) {
    run_game = true;
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

  if (key == 'd') {
    download_results();
}
}

function download_results() {
  var csv = "data:text/csv;charset=utf-8,";

  rows.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csv += row + "\r\n";
  });

  var encodedUri = encodeURI(csv);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "UkuHero.csv");
  document.body.appendChild(link);

  link.click();
}