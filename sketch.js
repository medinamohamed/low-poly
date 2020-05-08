
let r;  // ???
let n = 3  // length of an triangle in pixel

const pixel = 30; // 1 pixel is equal to a distance of 30

function setup() {
  
  canva = createCanvas(780, 780);

    // Plan cartesien
  for(let j=1 ; j < 26 ; j++){
      for (let i=1 ; i < 26; i++){
        rect(pixel*i, pixel*j, pixel, pixel);
    }
  }

  // map the coordinate of point and convert distance to pixel
function point(x,y){

  if (x == 0 && y ==0){
    return {x :pixel, y:pixel};
  }
  if (x != 0 && y ==0){
    return {x :pixel*(x+1), y:pixel};
  }
  if (x == 0 && y !=0){
    return {x :pixel, y:pixel*(y+1)};
  }
  if (x != 0 && y !=0){
    return {x :pixel*(x+1), y:pixel*(y+1)};
  }

}


function initializeCoordinate(column){

  let initializeCoordinate = [point(0,0)]

  for (let i = 0; i< column;i++){
    initializeCoordinate.push(point(n+(n*i),0))
  }
  return initializeCoordinate;

}

function drawTriangle(A,B,C){
  triangle(A.x, A.y ,B.x,B.y,C.x,C.y);
}

function newTriangle(A,B,C){
  currentPoints = [A,B,C];   
  drawTriangle.apply(this,currentPoints); 
}

let previousCoordinate = []
let current;
function drawOneRow(row,initializeCoordinate){

    let A = initializeCoordinate[0]
    let B = point(0,row*n) 
    previousCoordinate.push(B)

    let len = initializeCoordinate.length/2;
    for (let i = 1; i < len;i++){

      current = (2*i)-1
      let C = initializeCoordinate[current]

      newTriangle(A,B,C)     // Triangle 1 
      
      A = point(current*n,row*n)
      previousCoordinate.push(A)
      newTriangle(A,B,C)    // Triangle  2
  
      current = 2*i

      B = point(current*n,row*n)
      previousCoordinate.push(B)
      newTriangle(A,B,C)    // Triangle 3
  
      
      A = initializeCoordinate[current]
      newTriangle(A,B,C);   // Triangle 4

    }
    return previousCoordinate;
   
}

// think about recursion ... 

let test = drawOneRow(1,initializeCoordinate(8));

let test2 = drawOneRow(2,test);

//let test3 = drawOneRow(3,test2);


function draw() {
  // put drawing code here
}
}