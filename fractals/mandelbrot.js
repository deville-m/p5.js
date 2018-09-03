var boundX;
var boundY;
var maxit;

function mandelbrot(x0, y0) {
	var x = 0;
	var y = 0;
	var xtemp;
	var i = 0;
	while (x * x + y * y < 4 && i < maxit) {
		xtemp = x * x - y * y + x0;
		y = 2 * x * y + y0;
		x = xtemp;
		i++;
	}
	return i;
}

function mousePressed() {
	var x_dist = (boundX[1] - boundX[0]) / 4;
	var y_dist = (boundY[1] - boundY[0]) / 4;

	var x = map(mouseX, 0, width, boundX[0], boundX[1]);
	var y = map(mouseY, 0, width, boundY[0], boundY[1]);
	
	boundX[0] = x - x_dist;
	boundX[1] = x + x_dist;

	boundY[0] = y - x_dist;
	boundY[1] = y + x_dist;

	maxit = 1;
}

function setup() {
	// Important configuration for canvas
	maxit = 1;
	boundX = [-2.5, 1];
	boundY = [-1, 1];

	createCanvas(700, 500);
	loadPixels();
}

function draw() {
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			var x = map(j, 0, width, boundX[0], boundX[1]);
			var y = map(i, 0, height, boundY[0], boundY[1]);
			var iter = mandelbrot(x, y);
			if (iter == maxit) {
				set(j, i, color('black'))
			} else {
				iter = map(iter, 0, maxit, 0, 255);
				set(j, i, color(iter, iter, iter));
			}
		}
	}
	maxit++;
	updatePixels();
}