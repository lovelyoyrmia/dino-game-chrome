import { setupGround, updateGround } from "./ground.js";
import { setupDino, updateDino, getDinoRects, setDinoLose } from "./dino.js";
import { setupCactus, updateCactus, getCactusRects } from "./public/cactus.js";

const WORLD_HEIGHT = 20;
const WORLD_WIDTH = 100;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector("[data-world]");
const startTitle = document.querySelector("[data-title]");
const scoreElem = document.querySelector("[data-score]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

setupGround();

let lastTime;
let speedScale;
let score;
function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}

function checkLose() {
  const dinoRect = getDinoRects();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  startTitle.classList.add("hide");
  window.requestAnimationFrame(updateLoop);
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startTitle.classList.remove("hide");
  }, 100);
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
}
