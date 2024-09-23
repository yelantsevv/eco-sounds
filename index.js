const NAME = ["forest", "solovey", "drozd", "zarynka", "javoronok", "slavka"];
const img = document.querySelector(".img");
const play = document.querySelectorAll(".play , .pause");
const playerTime = document.querySelector(".player-time-current");
const playerContainer = document.querySelector(".playerContainer");
let playerTimeDuration = document.querySelector(".player-time-duration");
let playerProgress = document.querySelector(".playerProgressFill");
let playerProgress2 = document.querySelector(".playerProgress");
let interval = null;
let dur = 0;
const audio = new Audio();
let active = "forest";
let audioPlay = false;
let text = document.querySelector(".text");
let time = 0;

document.querySelector(".playPrev").addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }
  active = NAME[NAME.indexOf(active) - 1];
  time = 0;
  if (!active) active = NAME[NAME.length - 1];
  playAudio(false);
});
document.querySelector(".playNext").addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }
  active = NAME[NAME.indexOf(active) + 1];
  time = 0;
  if (!active) active = NAME[0];
  playAudio(false);
});

let activeImg = document.querySelector(".activeImg");
text.innerHTML = active;
activeImg.src = `https://github.com/rolling-scopes-school/file-storage/blob/eco-sounds/assets/img/${active}.jpg?raw=true`;
img.src = `https://github.com/rolling-scopes-school/file-storage/blob/eco-sounds/assets/img/${active}.jpg?raw=true`;

play.forEach((el) => {
  el.addEventListener("click", () => {
    play.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
    audioPlay = el.className.split(" ")[0] !== "pause";
    playAudio(audioPlay);
  });
});

function timeParser(time) {
  if (isNaN(time)) return `00:00`;

  return `${time / 60 == 0 ? "00" : "0" + (time / 60).toFixed(0)}:${
    (time % 60).toFixed(0) > 9
      ? (time % 60).toFixed(0)
      : "0" + (time % 60).toFixed(0)
  }`;
}
function playerTim() {
  audio.currentTime = time;
  interval = setInterval(() => {
    dur = audio.duration;
    time = audio.currentTime.toFixed(0);
    playerTime.innerHTML = timeParser(time);
    playerProgress.style.width = `${(audio.currentTime / dur) * 100}%`;
    playerTimeDuration.innerHTML = timeParser(dur);
  }, 1000);
}
playerProgress2.addEventListener("click", (e) => {
  time = (e.offsetX / playerProgress2.offsetWidth) * 100;
  playerProgress.style.width = `${time}%`;
  audio.currentTime = (time / 100) * dur;
});
function playAudio() {
  text.innerHTML = active;
  activeImg.src = `https://github.com/rolling-scopes-school/file-storage/blob/eco-sounds/assets/img/${active}.jpg?raw=true`;
  img.src = `https://github.com/rolling-scopes-school/file-storage/blob/eco-sounds/assets/img/${active}.jpg?raw=true`;
  audio.src = `./audio/${active}.mp3`;
  audioPlay ? playerTim(true) : clearInterval(interval);
  audioPlay ? audio.play() : audio.pause();
}
