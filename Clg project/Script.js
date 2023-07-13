const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const singer = document.getElementById("singer");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const songRange = document.getElementById("song-range");
const timer = document.querySelector('.timer');

const songs = [
  {
    name: "file1",
    title: "Sunflower",
    singer: "Post Malone & Swae Lee"
  },
  {
    name: "file2",
    title: "Babydoll remix",
    singer: "Ari Abdul x Mareux"
  },
  {
    name: "file3",
    title: "Counting Stars",
    singer: "OneRepublic"
  },
  {
    name: "file4",
    title: "Blinding Lights",
    singer: "The Weeknd"
  },
  {
    name: "file5",
    title: "Numb",
    singer: "Linkin Park"
  },
  {
    name: "file6",
    title: "24K Magic",
    singer: "Bruno Mars"
  },
  {
    name: "file7",
    title: "On My Own",
    singer: "Darci"
  },
  {
    name: "file8",
    title: "Who Am I",
    singer: "Michael Wyckoff"
  },
  {
    name: "file9",
    title: "One Kiss remix",
    singer: "Calvin x The weeknd"
  },
  {
    name: "file10",
    title: "Memory Reboot",
    singer: "VØJ, Narvent"
  },
];

let isplaying = false;
let songindex = 0;

// Play function
const playmusic = () => {
  isplaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

// Pause function
const pausemusic = () => {
  isplaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isplaying ? pausemusic() : playmusic();
});

// Load song
const loadsong = (song) => {
  title.textContent = song.title;
  singer.textContent = song.singer;
  music.src = `music/${song.name}.mp3`;
  img.src = `image/${song.name}.jpg`;
  if (isplaying) {
    playmusic();
  } else {
    pausemusic();
  }
};

const nextsong = () => {
  songindex = (songindex + 1) % songs.length;
  loadsong(songs[songindex]);
  playmusic(); // Play the next song
};


// Enable loop for the next song when the current song ends
music.addEventListener("ended", () => {
  pausemusic(); // Pause the current song
  nextsong(); // Play the next song
});


const prevsong = () => {
  songindex = (songindex - 1 + songs.length) % songs.length;
  loadsong(songs[songindex]);
};

next.addEventListener("click", nextsong);
prev.addEventListener("click", prevsong);

loadsong(songs[songindex]);

// Update song range value and timer on timeupdate
music.addEventListener("timeupdate", () => {
  songRange.value = (music.currentTime / music.duration) * 100;
  timer.textContent = formatTime(music.currentTime) + ' / ' + formatTime(music.duration);
});

// Update playback progress when song range value changes
songRange.addEventListener("input", () => {
  const seekTime = (songRange.value * music.duration) / 100;
  music.currentTime = seekTime;
});

// Format time (mm:ss)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

// Add leading zero to single-digit numbers
function padZero(number) {
  return number.toString().padStart(2, '0');
}
