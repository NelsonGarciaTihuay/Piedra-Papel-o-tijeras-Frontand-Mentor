const buttonRules = document.querySelector('.btn-rules');
const rulesPopup = document.querySelector('.rulesPopup');
const close = document.querySelector('.close');



buttonRules.addEventListener('click', function () {
  rulesPopup.classList.add('openRulesPopUP');
});
close.addEventListener('click', function () {
  rulesPopup.classList.remove('openRulesPopUP');
});

const resultHand = document.querySelector('.resultHands');
const main = document.querySelector('.main');
const scores = document.querySelector('.score__number');
const again = document.querySelector('.again');


let scoreNumber = 0;

function start() {
  main.style.display = 'block';
  resultHand.style.display = 'none';
  again.style.display = 'none';
  
  const handButton = document.querySelectorAll('.hands');


  handButton.forEach((element) => {
    element.addEventListener('click', () => {
      
      rpsButton(element.value, element.children[0].src);
    });
  });
}


function rpsButton(valuePlayer, pngPlayer) {
  let player = { value: valuePlayer, png: pngPlayer };
  let comp = choiceComp();
  let hasil = GetResultScore(player.value, comp.value);
  calculateScore(hasil);

 
  if (window.innerWidth > 600) {
   
    showResultDekstop(player.value, comp.value, player.png, comp.png);
    modeDesktop();
  } else {
    
    showResultMobile(player.value, comp.value, player.png, comp.png);
    modeMobile();
  }

  scores.innerText = scoreNumber;
}

function choiceComp() {
  let arr = ['paper', 'rock', 'scissors', 'spock', 'lizard'];
  let random = Math.floor(Math.random() * arr.length);
  let valueComp = arr[random];
  let pngComp;
  if (valueComp == 'rock') {
    pngComp = 'images/icon-rock.svg';
  } else if (valueComp == 'paper') {
    pngComp = 'images/icon-paper.svg';
  } else if (valueComp == 'scissors') {
    pngComp = 'images/icon-scissors.svg';
  } else if (valueComp == 'lizard') {
    pngComp = 'images/icon-lizard.svg';
  } else if (valueComp == 'spock') {
    pngComp = 'images/icon-spock.svg';
  }
  return { value: valueComp, png: pngComp };
}


function GetResultScore(playerChoice, compChoice) {
  let score;
  if (playerChoice == compChoice) {
    console.log('draw');
    score = 0;
  }
  

  else if ((playerChoice == 'scissors' && compChoice == 'paper') || (playerChoice == 'scissors' && compChoice == 'lizard')) {
    score = 1;
  }
  // papel
  else if ((playerChoice == 'paper' && compChoice == 'rock') || (playerChoice == 'paper' && compChoice == 'spock')) {
    score = 1;
  }
  // piedra
  else if ((playerChoice == 'rock' && compChoice == 'lizard') || (playerChoice == 'rock' && compChoice == 'scissors')) {
    score = 1;
  }
  // lagarto
  else if ((playerChoice == 'lizard' && compChoice == 'spock') || (playerChoice == 'lizard' && compChoice == 'paper')) {
    score = 1;
  }
  // spock
  else if ((playerChoice == 'spock' && compChoice == 'scissors') || (playerChoice == 'spock' && compChoice == 'rock')) {
    score = 1;
  }

  // ------------- Peder -------------
  else {
    score = -1;
  }

  return score;
}


function showResultMobile(playerValue, compValue, playerPng, compPng) {
  main.style.display = 'none';
  resultHand.style.display = 'flex';
  let addElement = `
  <div class="result">
    <button style="" class=" hands ${playerValue}" value="rock">
      <img src="${playerPng}" alt="" />
    </button>
    <h4>YOU PICKED</h4>
  </div>

  <div class="result ">
    <button style="" class=" hands ${compValue}" value="lizard">
      <img src="${compPng}" alt="" />
    </button>
    <h4>THE HOUSE PICKED</h4>
  </div>
  
  `;
  resultHand.innerHTML = addElement;
}

function showResultDekstop(playerValue, compValue, playerPng, compPng) {
  main.style.display = 'none';
  resultHand.style.display = 'flex';
  let addElement = `
  <div class="result">
  <h4>YOU PICKED</h4>
    <button style="" class=" hands ${playerValue}" value="rock">
      <img src="${playerPng}" alt="" />
    </button>
  </div>

  <div class="result ">
  <h4>THE HOUSE PICKED</h4>
    <button style="" class=" hands ${compValue}" value="lizard">
      <img src="${compPng}" alt="" />
    </button>
  </div>
  
  `;
  resultHand.innerHTML = addElement;
}


function modeMobile() {
  if (scoreNumber >= 3) {
    again.style.display = 'block';
    let addElementAgain = `
    <h1>YOU WIN</h1>
    <button onclick="refresh()">Play Again</button>
    `;
    again.innerHTML = addElementAgain;
    scores.innerText = scoreNumber;
  } else if (scoreNumber < 0) {
    again.style.display = 'block';
    let addElementAgain = `
    <h1>YOU LOSE</h1>
    <button onclick="refresh()">Play Again</button>
    `;
    again.innerHTML = addElementAgain;
    scores.innerText = scoreNumber;
  } else {
    scores.innerText = scoreNumber;
    setTimeout(function () {
      main.style.display = 'block';
      resultHand.style.display = 'none';
    }, 2000);
  }
}


function modeDesktop() {
  if (scoreNumber >= 3) {
    
    let textH4 = document.createTextNode(`YOU WIN`);
    let textButton = document.createTextNode('Play Again');

   
    let h4Element = document.createElement('h1');
    let buttonElement = document.createElement('button');

    
    h4Element.appendChild(textH4);
    buttonElement.appendChild(textButton);

    
    let div = document.createElement('div');
    div.appendChild(h4Element);
    div.appendChild(buttonElement);

    
    div.setAttribute('class', 'resultDesktop');

    
    resultHand.insertBefore(div, resultHand.children[1]);
    resultHand.children[1].addEventListener('click', refresh);
  } else if (scoreNumber < 0) {
    
    let textH4 = document.createTextNode(`YOU LOSE`);
    let textButton = document.createTextNode('Play Again');

    
    let h4Element = document.createElement('h1');
    let buttonElement = document.createElement('button');

   
    h4Element.appendChild(textH4);
    buttonElement.appendChild(textButton);
    buttonElement.setAttribute('class', 'btn-again');

   
    let div = document.createElement('div');

    
    div.appendChild(h4Element);
    div.appendChild(buttonElement);
    div.setAttribute('class', 'resultDesktop');

    
    resultHand.insertBefore(div, resultHand.children[1]);
    resultHand.children[1].addEventListener('click', refresh);
  } else {
    
    scores.innerText = scoreNumber;
    setTimeout(function () {
      main.style.display = 'block';
      resultHand.style.display = 'none';
    }, 2000);
  }
}

// alerta
function pesanPengantar() {
  
  setTimeout(() => {
    
    alert('halo selamat datang ...... anda harus mendapatkan 3 score untuk memenangkan game kaga jelas ini😑');
  }, 500);
}


function refresh() {
  location.reload();
}


function calculateScore(hasil) {
  if (hasil == -1) {
    scoreNumber += hasil;
  } else if (hasil == 1) {
    scoreNumber += hasil;
  } else {
    scoreNumber += hasil;
  }
}

start();


