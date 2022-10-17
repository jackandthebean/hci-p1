function preload(){
  tab = loadImage("guitar-tab.png");
  instructions = loadImage("instructions.png");
}

var run_game = false;
var dots = [];
var dot_speed = 2;

// x values for main board
var one = 300 + 75;
var two = 300 + 75*2;
var three = 300 + 75*3;
var four = 300 + 75*4;
var five = 300 + 75*5;

var assigned_nums = '1  2  3  4  5';

var num_rounds = 1;

var total_hits = 0;

var key1 = false;
var key2 = false;
var key3 = false;
var key4 = false;
var key5 = false;

// y value of the last note created
var last_y = 75;


function setup() {
  createCanvas(800, 600);
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
  rect(300, 50, 450, 500);
  
  // note lines
  line(one, 75, one, 475);
  line(two, 75, two, 475);
  line(three, 75, three, 475);
  line(four, 75, four, 475);
  line(five, 75, five, 475);
  
  // target zone
  fill(color(0, 204, 0));
  rect(300, 500, 450, 50);
}

function draw_start_board() {
  // main board
  fill(color(255, 204, 0));
  rect(300, 50, 450, 500);
  
  //instructions
  fill(200, 0, 200);
  textSize(28);
  text("Press 's' to start round " + num_rounds, 385, 300)
  
  
  // target zone
  fill(color(0, 204, 0));
  rect(300, 500, 450, 50);
}

function draw_sideboard() {
  image(tab,30,20,150,150);
  image(instructions,0,200,270,80);
  
  fill(0, 0, 0);
  textSize(28);
  text(assigned_nums, 36, 185);
  
  fill(200, 0, 200);
  textSize(32);
  text('Hits: ' + total_hits + '/30', 36, 440);
}

function manage_dots() {
  dots.forEach(dot => {
    dot['y'] += dot_speed;
    circle(dot['x'], dot['y'], 30);
    
    // check if note is in target zone
    if (dot['y'] >= 450 && dot['y'] <= 500) {
        // check if correct key for the column was pressed
        if(key1 && dot['x'] == one) {
          key1 = false;
          dot['hit'] = true;
          total_hits++;
        }
        if(key2 && dot['x'] == two) {
          key2 = false;
          dot['hit'] = true;
          total_hits++;
        }
        if(key3 && dot['x'] == three) {
          key3 = false;
          dot['hit'] = true;
          total_hits++;
        }
        if(key4 && dot['x'] == four) {
          key4 = false;
          dot['hit'] = true;
          total_hits++;
        }
        if(key5 && dot['x'] == five) {
          key5 = false;
          dot['hit'] = true;
          total_hits++;
        }
     }
    if (dots[29]['y'] > 600) {
      end_round();
    }
    
  });
  
}

//transition from one round to the next
function end_round() {
  dots = []
  total_hits = 0;
  num_rounds ++;
  run_game = false;
  createDots();
}

function draw() {
  background(200);
  draw_sideboard();
  
  
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
  if (key == 's') {
    run_game = true;
  }
  
  if (key == '1') {
    key1 = true;
  }
  if (key == '2') {
    key2 = true;
  }
  if (key == '3') {
    key3 = true;
  }
  if (key == '4') {
    key4 = true;
  }
  if (key == '5') {
    key5 = true;
  }

}
