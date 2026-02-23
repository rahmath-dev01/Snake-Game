const board = document.querySelector('.board');

const startButton = document.querySelector(".btn-start")
const restartButton = document.querySelector(".btn-restart")
const modal = document.querySelector('.modal')
const startGameModal =document.querySelector('.start-game')
const gameOverModal = document.querySelector('.game-over')
const highScoreElement =document.querySelector('#high-score')
const scoreElemnt =document.querySelector('#score')
const timeElemnt =document.querySelector('#time')

const blockHeight = 50
const blockWidth = 50

let highScore= localStorage.getItem("highScore")|| 0
highScoreElement.innerText = highScore;
let score = 0
let time = `00-00`

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

let intervalid = null;
let timerintervalid = null;
const blocks = [];
let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
let snake = [
  {
    x : 1,
    y : 3
  }
]

let direction = 'right'


for(let row=0 ; row<rows ; row++){
  for(let col=0; col<cols ; col++){
    const block = document.createElement('div');
  block.classList.add("block");
  board.appendChild(block)
  
  blocks[ `${row}-${col}` ] = block
  }
}

function render(){

  let head = null;
  blocks[`${food.x}-${food.y}`].classList.add("food")


  if(direction === 'left'){
    head ={x:snake[0].x, y: snake[0].y-1}
  }else if(direction === 'right'){
    head ={x:snake[0].x, y: snake[0].y+1}
  }
  else if(direction === 'down'){
    head ={x:snake[0].x+1, y: snake[0].y}
  }
  else if(direction === 'up'){
    head ={x:snake[0].x-1, y: snake[0].y}
  }

  if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
  
  clearInterval(intervalid)
  modal.style.display ="flex"
  startGameModal.style.display = "none"
  gameOverModal.style.display = "flex"
  

  return;
}
// food consume 
if(head.x == food.x && food.y == head.y){
 
  blocks[`${food.x}-${food.y}`].classList.remove("food")
  food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
   blocks[`${food.x}-${food.y}`].classList.add("food")

   snake.unshift(head)
   score += 10;
   scoreElemnt.innerText =score

   if(score> highScore){
    highScore =score
    localStorage.setItem("highScore",highScore)
   }

}



  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  })
  snake.unshift(head)
  snake.pop()




  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  })
}



startButton.addEventListener("click",()=>{
  intervalid = setInterval(()=> { render() } ,300)
  modal.style.display = "none"
  timerintervalid = setInterval(()=>{
    let [min ,sec ] = time.split("-").map(Number)
    if(sec == 59){
      min+=1
      sec=0
    }
    else{
      sec+=1
    }
    time =`${min}-${sec}`
    timeElemnt.innerText =time
  },1000)
})

restartButton.addEventListener('click',restartGame)
function restartGame(){
  blocks[`${food.x}-${food.y}`].classList.remove("food")
  snake.forEach(segment =>{

    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  })
  score=0
  time=`00-00`

  direction ='right'
  scoreElemnt.innerText= score
  timeElemnt.innerText= time
  highScoreElement.innerText=highScore
  modal.style.display ="none"
  snake = [{x : 1,y : 3 }]
  food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
  intervalid = setInterval(()=> { render() } ,300)
  

}

addEventListener("keydown",function(event){
  if(event.key == "ArrowRight"){
    direction = "right"
  }else if(event.key == "ArrowDown"){
    direction = "down"
  }else if(event.key =="ArrowLeft"){
    direction ="left"
  }else if(event.key == "ArrowUp"){
    direction = "up"
  }
})
