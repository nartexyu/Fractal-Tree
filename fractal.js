// Global variables
let level = document.getElementById('level');
level.addEventListener('change', (event) => this.onInputChangeEvent(event))

let height = 300
let tempLevel = 1
let proportion = 0

// Note: functions not defined here like setup(), draw(), pop(), push(), rect(), circle() are p5.js library functions for drawing 
function setup() {
    createCanvas(windowWidth, windowHeight)
    angleMode(DEGREES)
    noStroke()
}

function draw() {
    background(240)
    push()
    // Sets drawing to center of window
    translate(windowWidth / 2, windowHeight / 2);
    // Question 8
    // RC_C Recursive approach for fractal dendrite
    numBranches = getFibonacci(tempLevel);
    for (let i = 0; i < numBranches; i++){
        // Question 3
        // Width fo the first branch is 15
        drawBranch(1, height, 15, 0)
        rotate(360 / numBranches)
    }

    pop()
    noLoop()
}

// RC_A Recursive design for dendrite
function drawBranch(depth, height, width, degrees) {
    // Pruning for if the degree of the child is greater than 90 or less than -90 degrees
    if(degrees >= -90 && degrees <= 90){
        // Question 9
        // First layer of branch is RGC(20,112,204)
        // Each subsequent branch increases R value by 20 and G value by 10
        fill(20 + 20 * depth, 112 + 10 * depth, 204)
        // Draws rectangle starting at x = -width/2 and -height
        rect(-width/2, 0, width, -height)
        push();
        // Translates new drawing origin to x = 0 y = -height
        translate(0, -height);
        // Mutually recursively calls drawTree to draw each subsequent child
        drawTree(depth + 1, height, width, degrees);
        pop();
    }
}

// RC_B_1 Recursive approach for fractal flower
function drawFlower(depth, diam){
    // Question 9
    // Flower's color is RGC(255,255,255)
    fill(255, 255, 255, 0)
    stroke(255, 255, 255)

    // Question 6
    // StrokeWeight is the initial width is 4 (11 - level 7) of the circle
    strokeWeight(11 - depth)
    
    circle(0, 0, diam)
    // Calls drawTree to draw children circles
    drawTree(depth + 1, 0, diam, degrees);
}

// RC_A Recursive design for dendrite
function drawTree(depth, height, width, degrees) {
    if (depth <= 6 && depth <= tempLevel) {
        // Question 4
        // Angle between branches should be 30 deg left and 30 deg right
        // Rotate left 30
        if (depth % 2 == 0) {
            rotate(-30)
            // Width of a child branch is 2 pixels less than parent's width
            drawBranch(depth, height * 0.75 / Math.cos(30 * Math.PI / 180), width-2, degrees-30)
            // Rotate right 60 from previous rotate to get right 30
            rotate(60)
            drawBranch(depth, height * 0.75 / Math.cos(30 * Math.PI / 180), width-2, degrees+30)
        } else {

            rotate(-30)
            // Width of a child branch is 2 pixels less than parent's width
            drawBranch(depth, height * 0.75, width-2, degrees-30)
            // Rotate right 60 from previous rotate to get right 30
            rotate(60)
            drawBranch(depth, height * 0.75, width-2, degrees+30)
        }

    }

    // RC_B_1 Recursive approach for fractal flower
    // Question 5
    // When level is 7, fractal flower will bloom
    if (depth == 7 && depth <= tempLevel){
        drawFlower(depth, 22)
    }
    
    // Question 7
    if (depth > 7 && depth <= 9 && depth <= tempLevel){
        push()
        // Next level flower has 6 petals and the difference between two neighboring directions is 60 degrees
        // RC_B_2 Recursive approach for fractal petal
        for (let i = 0; i < 6; i++){
            rotate(60)
            push()
            translate(0, -width/2);

            // Question 6
            // Child's flower's diameter is half less than the parent's flower's diameter
            drawFlower(depth, (30-2*(11-depth)) / 2)
            pop()
        }

        pop()
    }
}

// Question 1
// Increases the level with clicking the + button and gets the new height and fibonacci number
function increaseLevel() {
    let value = parseInt(level.value, 10)
    value = isNaN(value) ? 0 : value
    if(value < 9) {
        value++
        tempLevel ++
    }
    level.value = value
    getHeights(level.value)
    getFibonacci(level.value)
    loop()
}

// Decreases the level with clicking the - button and gets the new height and fibonacci number
function decreaseLevel() {
    let value = parseInt(level.value, 10)
    value = isNaN(value) ? 0 : value
    if (value > 1 ) {
        value--
        tempLevel--
    }
    level.value = value
    getHeights(level.value)
    getFibonacci(level.value)
    loop()
}

// Question 2
// Gets the height of a dendrite at each level
function getHeights(level) {
    if(level == 1){
        height = 300
        return height;
    } else if (level <= 6) {
        height = 300
        sum = 0
        for (let i = 0; i < level; i++) {
            sum += Math.pow((3/4), i) / Math.pow((Math.cos(30 * Math.PI / 180)), Math.floor(i / 2))
        }
        height = height / sum
        return height
    } else return getHeights(6)
}

// Gets the fibonacci number at each level
function getFibonacci(level) {
    let x = 1; 
    let y = 2; 
    // Fibonacci number stays the same until level 6
    if (level < 6) {
        for(let i = 1; i < level; i++){ 
            let tempY = y; 
            y = tempY + x; 
            x = tempY; 
        } 
    } else {
        y = 13
        return y;
    }
    return y;
}

