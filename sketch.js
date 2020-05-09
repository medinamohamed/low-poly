let n = 2 // length of an triangle in pixel

const pixel = 25; // 1 pixel is equal to a distance of 30

function setup() {

    let l = 27
    canva = createCanvas(pixel*l, pixel*l);


    // Plan cartesien
    for (let j = 1; j < l; j++) {
        for (let i = 1; i < l; i++) {
            rect(pixel * i, pixel * j, pixel, pixel);
        }
    }

    // map the coordinate of point and convert distance to pixel
    function point(x, y) {

        if (x == 0 && y == 0) {
            return {
                x: pixel,
                y: pixel
            };
        }
        if (x != 0 && y == 0) {
            return {
                x: pixel * (x + 1),
                y: pixel
            };
        }
        if (x == 0 && y != 0) {
            return {
                x: pixel,
                y: pixel * (y + 1)
            };
        }
        if (x != 0 && y != 0) {
            return {
                x: pixel * (x + 1),
                y: pixel * (y + 1)
            };
        }

    }

    function drawTriangle(A, B, C) {
      triangle(A.x, A.y, B.x, B.y, C.x, C.y);
    }

    function newTriangle(A, B, C) {
        currentPoints = [A, B, C];
        drawTriangle.apply(this, currentPoints);
    }

    function initializeCoordinate(column) {

        let initializeCoordinate = [point(0, 0)]

        for (let i = 0; i < column; i++) {
            initializeCoordinate.push(point(n + (n * i), 0))
        }
        return initializeCoordinate;

    }

    let current;

    function drawOneRow(row, initializeCoordinate) {
        let previousCoordinate = []
    
        let A = initializeCoordinate[0]
        let B = point(0, (row * n))
        previousCoordinate.push(B)
        let len = initializeCoordinate.length / 2;
        for (let i = 1; i < len; i++) {
            let ran = Math.random()*2;
            current = (2 * i) - 1
            let C = initializeCoordinate[current]

            newTriangle(A, B, C) // Triangle 1 

            A = point(current * n, (row * n)+ran)
        
            previousCoordinate.push(A)
            newTriangle(A, B, C) // Triangle  2

            current = 2 * i

            B = point(current * n, row * n)
            previousCoordinate.push(B)
            newTriangle(A, B, C) // Triangle 3


            A = initializeCoordinate[current]
            newTriangle(A, B, C); // Triangle 4

        }
        console.log(previousCoordinate)
        //todo before returning change randomnly the n to 3 , 4 or 5 except for last row
        return previousCoordinate;

    }


    function drawAllRows(numberOfRows, numberOfColumns) {
        numberOfRows++;
        let newCoordinate = drawOneRow(1, initializeCoordinate(numberOfColumns));
        for (let i = 2; i < numberOfRows; i++) {
          newCoordinate = drawOneRow(i, newCoordinate);
        }

    }
    drawAllRows(12, 12);


    function draw() {
        // put drawing code here
    }
}