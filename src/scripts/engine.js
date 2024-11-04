const state={
    view:{
    squares:document.querySelectorAll(".square"),
    enemy:document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
},
    values:{      
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        curretTime: 60,
    },

    actions:{
        timerId:setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown,1000),
        backgroundSound:null,
    }
};

function countDown(){
    state.values.curretTime --;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <0 ){
      clearInterval(state.actions.countDownTimerId);  
      clearInterval(state.actions.timerId);  

      stopBackgroundSound();

      alert("Game Over! O seu resultado foi: " + state.values.result );
    }
}

function playSound(audioName){
    let audio = new Audio(`/src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function playBackgroundSound() {
    if (!state.actions.backgroundSound) {
        state.actions.backgroundSound = new Audio('/src/audios/soundSP.m4a');
        state.actions.backgroundSound.volume = 0.1;
        state.actions.backgroundSound.loop = true; 
    }
    state.actions.backgroundSound.play();
}
document.addEventListener("click", () => {
    playBackgroundSound();
}, { once: true });

function stopBackgroundSound() {
    if (state.actions.backgroundSound) {
        state.actions.backgroundSound.pause();
        state.actions.backgroundSound.currentTime = 0;
    }
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition= randomSquare.id;
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown",() => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");

            }
        })

    } );
}

function initialize(){
addListenerHitbox(); 

playBackgroundSound();

state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
state.actions.countDownTimerId = setInterval(countDown, 1000);
}

initialize();

