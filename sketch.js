let data;
let cycle = 1;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0INnSE5LadbZiCd_jzG_EfD_cCPaEdbfLUW_YGiLvdkAg-OrKi9H6YIh18hF4z8Khk-IVJhsImHc_/pub?output=csv" 
//CSV Data Link from Google Sheet

function preload(){
  data = loadTable(url,"csv","header");
}
function setup() {
  createCanvas(400, 600);

}

function draw() {
  background(0);
  console.log(cycle)

  if(data){
    // proteins();
    if (cycle ===1){
    info();
    textAlign(LEFT);
    text("Press the RIGHT ARROW KEY\n to see the protein",10,560)
    }
    if(cycle === 2){
      proteins();
      textAlign(LEFT)
      text("Press the LEFT ARROW KEY \n to see the Nutrition Facts",10,560)
    }
    
  }
}

//Custom Functions to seperate the different columns
function proteins(){
  let numRows = data.getRowCount();
  let protein = data.getColumn("Protein");
  let names = data.getColumn("Food");

  for(let i=0; i<numRows; i++){
    let x = 300;
    let y = 100 + i * 100;
    let r = protein[i];
    fill(0,300,protein[i]);
    ellipse(x,y,r);
    textAlign(LEFT);
    fill(255);
    textSize(14);
    text(names[i],x-250,y);
    push();
    textAlign(CENTER);
    text(protein[i] + " g",x,y+40)
    pop();
    
    textAlign(CENTER);
    text("Protein of the Food Today!", width/2,50);
  }
}

function info(){
  let numRows = data.getRowCount();
  let protein = data.getColumn("Protein");
  let carbs = data.getColumn("Carbs");
  let fats = data.getColumn("Fats");
  let names = data.getColumn("Food");
  fill(255);
  textAlign(CENTER);
  textSize(15);
  text("Hover each Circle to reveal the \n Nutrition Facts",width/2,40)

  for(let i=0; i<numRows; i++){
    let x = 300;
    let y = 100 + i * 100;
    let r = 30;
    let hovering = false;
    fill(255,255,255);
    ellipse(x,y,r);
    textAlign(LEFT);
    fill(255);
    textSize(14);
    text(names[i],x-250,y);
    push();
    textAlign(CENTER);
    pop();

    let halfR = r/2;
    if (abs(mouseX - x) < halfR && 
        abs(mouseY - y) < halfR) {
          cursor(HAND);
          text(protein[i] + "g" + " of Protein",x,y+40)
          text(carbs[i] + "g" + " of Carbs",x,y+60)
          text(fats[i] + "g" + " of Fats",x,y+80)
          hovering = true;
      }

      if(hovering){
        cursor(HAND);
      }else{
        cursor(ARROW);
      }
  
  }
}

function keyPressed(){
  if (keyCode === LEFT_ARROW){
    cycle =1;
  }
  if(keyCode === RIGHT_ARROW){
    cycle= 2;
  }
}





