import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustom.js";

const dinoElem = document.querySelector("[data-dino]");
const JUMMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let currentFrameTime;
let dinoFrame;
let yvelocity;
export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}
export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function getDinoRects() {
  return dinoElem.getBoundingClientRect();
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = "images/dino-stationary.png";
    return;
  }
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElem.src = `images/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}
function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(dinoElem, "--bottom", yvelocity * delta);
  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
  }
  yvelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  yvelocity = JUMMP_SPEED;
  isJumping = true;
}
