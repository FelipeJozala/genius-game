/* eslint-disable guard-for-in */
/* eslint-disable no-alert */
let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const blueAudio = new Audio('./audio/simonSound1.mp3');
const redAudio = new Audio('./audio/simonSound2.mp3');
const greenAudio = new Audio('./audio/simonSound3.mp3');
const yellowAudio = new Audio('./audio/simonSound4.mp3');

const scoreDisplay = document.querySelector('#score');
scoreDisplay.textContent = `Pontos: ${score}`;

const playSound = (colorSound) => {
  switch (colorSound) {
    case 'green':
      greenAudio.play();
      break;
    case 'red':
      redAudio.play();
      break;
    case 'yellow':
      yellowAudio.play();
      break;
    default:
      blueAudio.play();
      break;
  }
};

const lightColor = (element, number) => {
  const time = number * 500;
  setTimeout(() => {
    playSound(element.classList.value);
    element.classList.add('selected');
  }, time - 300);
  setTimeout(() => {
    element.classList.remove('selected');
  }, time + 100);
};

const createColorElement = (color) => {
  switch (color) {
    case 0:
      greenAudio.play();
      return green;
    case 1:
      redAudio.play();
      return red;
    case 2:
      return yellow;
    default:
      return blue;
  }
};

const shuffle = () => {
  const colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (const i in order) {
    const elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

const nextLevel = () => {
  scoreDisplay.textContent = `Pontos: ${score}`;
  shuffle();
};

const playGame = () => {
  score = 0;
  nextLevel();
};

const gameOver = () => {
  alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
  order = [];
  clickedOrder = [];
  playGame();
};

const checkOrder = () => {
  for (const i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length === order.length) {
    score += 1;
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
};

const click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');
  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250);
};

green.onclick = () => {
  click(0);
  greenAudio.play();
};
red.onclick = () => {
  click(1);
  redAudio.play();
};

yellow.onclick = () => {
  click(2);
  yellowAudio.play();
};

blue.onclick = () => {
  click(3);
  blueAudio.play();
};
