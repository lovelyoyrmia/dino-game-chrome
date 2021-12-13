import { updateGround } from "./ground.js";

const WORLD_HEIGHT = 20;
const WORLD_WIDTH = 100;

const worldElem = document.querySelector("[data-world]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);

let lastTime;
function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta);

  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}
window.requestAnimationFrame(updateLoop);

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
