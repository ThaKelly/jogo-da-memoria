const gameBoard = document.getElementById('gameBoard');

let cards = [
  'imagens/cabra.webp','imagens/gato.webp','imagens/cachorro.webp','imagens/abelha.webp', 
  'imagens/cabra.webp','imagens/gato.webp','imagens/cachorro.webp','imagens/abelha.webp' ,'imagens/cavalo.webp' ,'imagens/cavalo.webp','imagens/vaca.png','imagens/vaca.png'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let startTime;
let timerInterval;
let matchesFound = 0;
const totalMatches = cards.length / 2;
const resultado = document.getElementById('resultados');
const restartButton = document.getElementById('restartButton');
const matches = document.getElementById('matches')

restartButton.addEventListener('click', () => {
  resultado.innerHTML = '';
  restartButton.style.display = 'none';
  createBoard();
  matches.innerHTML = '';
  matches.style.display = 'none'
});
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  gameBoard.innerHTML = '';
  shuffle(cards).forEach(imagePath => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imagePath;

    const img = document.createElement('img');
    img.src = imagePath;
    img.classList.add('card-image');
    img.style.display = 'none'; // escondida até virar

    card.appendChild(img);
    card.addEventListener('click', revealCard);
    gameBoard.appendChild(card);
  });

  // Iniciar o cronômetro
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  matchesFound = 0;
}

function revealCard() {
  if (lockBoard || this.classList.contains('revealed')) return;

  const img = this.querySelector('img');
  img.style.display = 'block';
  this.classList.add('revealed');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}


function checkMatch() {
  lockBoard = true;
  const img1 = firstCard.querySelector('img');
  const img2 = secondCard.querySelector('img');

  if (firstCard.dataset.image === secondCard.dataset.image) {
    matchesFound++;
    if(matchesFound> 0){
      matches.style.display = 'inline-block'
      matches.innerHTML =`✔ ${matchesFound}`
      matches.classList.add('matchesCount')
    }
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    if (matchesFound === totalMatches) {
      clearInterval(timerInterval);
      setTimeout(() => {
        resultado.innerHTML= `Parabéns! Você terminou em ${document.getElementById('timer').textContent}`;
        restartButton.style.display = 'inline-block';
      }, 500);
    }
    resetTurn();
   
  } else {
    setTimeout(() => {
      img1.style.display = 'none';
      img2.style.display = 'none';
      firstCard.classList.remove('revealed');
      secondCard.classList.remove('revealed');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function updateTimer() {
  const now = Date.now();
  const elapsedTime = Math.floor((now - startTime) / 1000);
  document.getElementById('timer').textContent = `Tempo: ${elapsedTime}s`;
}

window.onload = () => {
  createBoard();
};
