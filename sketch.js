// This sketch can be viewed at https://www.openprocessing.org/sketch/1037289

let n = 2 // length of an triangle in pixel

const pixel = 25; // 1 pixel is equal to a distance of 30

function setup() {

    colorMode(HSB);

    let l = 26
    canva = createCanvas(pixel*28, pixel*25);


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
    function newTriangle(A, B, C,dim,addhue,b) {

        currentPoints = [A, B, C];

        let h = 210;
        let s = 55;
        //let b = 100;

        fill(h+(10*addhue),s-(16*dim),b);

        noStroke();
        triangle(A.x, A.y, B.x, B.y, C.x, C.y);

}

    function initializeCoordinate(column) {

        let initializeCoordinate = [point(0, 0)]

        for (let i = 0; i < column; i++) {
            initializeCoordinate.push(point(n + (n * i), 0))
        }
        return initializeCoordinate;

    }

    let current;

    function drawOneRow(j, initializeCoordinate) {
        let previousCoordinate = []
    
        let A = initializeCoordinate[0]
        let B = point(0, (j * n))
        previousCoordinate.push(B)
        let len = initializeCoordinate.length / 2;
        for (let i = 1; i < len; i++) {
            let ran = Math.random()*2;
            current = (2 * i) - 1
            let C = initializeCoordinate[current]

            dim = ((i/len)/8);
                newTriangle(A, B, C,(i*(dim)),j,92+(i*0.95)) // Triangle 1 

            

            let bool = Math.floor(Math.random()*2)
            if (bool == 0){
                A = point((current * n)- (ran/2), (j * n)+ran)

            }
            else if (bool == 1){
                A = point((current * n)+(ran/2), (j * n)+ran)

            }
        
            previousCoordinate.push(A)
            newTriangle(A, B, C,(i*(2*dim)),j,95+(i*0.65)) // Triangle  2

            current = 2 * i
            if (bool == 0){
                B = point((current * n)+ (ran/2), j * n)

            }
            else if (bool == 1){
                B = point((current * n)-(ran/2), j * n)

            }
            previousCoordinate.push(B)
            newTriangle(A, B, C,(i*(3*dim)),j,97.5) // Triangle 3


            A = initializeCoordinate[current]
            newTriangle(A, B, C,(i*(4*dim)),j,98); // Triangle 4

        }
        return previousCoordinate;

    }


    function drawAllRows(numberOfRows, numberOfColumns) {
        numberOfRows++;
        let newCoordinate = drawOneRow(1, initializeCoordinate(numberOfColumns));
        for (let j = 2; j < numberOfRows; j++) {
          newCoordinate = drawOneRow(j, newCoordinate);
        }

    }
    drawAllRows(12, 15);


    function draw() {
        // put drawing code here
    }
}
