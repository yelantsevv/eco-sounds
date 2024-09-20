const nav = document.querySelectorAll(".nav-item");
const img = document.querySelectorAll(".img");
const play = document.querySelectorAll(".play , .pause");
const audio = new Audio();
let active = "forest";
let audioPlay = false;
nav.forEach((el) => {
  el.addEventListener("click", () => {
    active = el.className.split(" ")[1];
    nav.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");

    playAudio();

    img.forEach((el) => {
      el.classList.remove("active");
      if (active == el.className.split(" ")[1]) {
        el.classList.add("active");
      }
    });
  });
});

play.forEach((el) => {
  el.addEventListener("click", () => {
    play.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
    audioPlay = el.className.split(" ")[0] !== "pause";
    playAudio();
  });
});

function playAudio() {
  if (audioPlay) {
    switch (active) {
      case "forest":
        audio.src = "./audio/forest.mp3";
        break;
      case "solovey":
        audio.src = "./audio/solovey.mp3";
        break;
      case "drozd":
        audio.src = "./audio/drozd.mp3";
        break;
      case "zarynka":
        audio.src = "./audio/zarynka.mp3";
        break;
      case "javoronok":
        audio.src = "./audio/javoronok.mp3";
        break;
      case "slavka":
        audio.src = "./audio/slavka.mp3";
        break;
    }
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.pause();
  }
}
