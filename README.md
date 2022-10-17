var run_game = false;
var dots = [];
var dot_speed = 3;

// x values for main board
var one = 300 + 75;
var two = 300 + 75*2;
var three = 300 + 75*3;
var four = 300 + 75*4;
var five = 300 + 75*5;

// y value of the last note created
var last_y = 75;


function setup() {
  createCanvas(800, 600);
  
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
}

function manage_dots() {
  dots.forEach(dot => {
    dot['y'] += dot_speed;
    circle(dot['x'], dot['y'], 30);
    
    // FOR KIKI
    // if (dot['y'] >= 475) {
      // check mouse pressed or whatever
      // set dot['hit'] --> true
    // }
    
    // FOR EMILY
    // process dot score
    // else if (dot['y'] >= 520) {
//       if (dot['hit']) {
            // increase hit counter
//       }
//     }
  });
}

function draw() {
  background(200);
  draw_board();
  
  fill(color(255, 59, 0))
  manage_dots();
}


function keyPressed() {
  run_game = true;
}