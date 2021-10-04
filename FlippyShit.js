flipped = false;
currentIndex = -1;

chords = [
  "A",
  "Amaj7",
  "A7",
  "Am",
  "Am7",
  "B7",
  "C",
  "Cmaj7",
  "C7",
  "D",
  "Dmaj7",
  "D7",
  "Dm",
  "Dm7",
  "E",
  "Emaj7",
  "E7",
  "Em",
  "Em7",
  "F",
  "Fmaj7",
  "G",
  "G7",
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Initial Shuffle
shuffle(chords);

function handleRotate() {
  if (flipped) {
    document.getElementById("c1").className = "flip front";
    document.getElementById("c2").className = "flip back";
  } else {
    document.getElementById("c1").className = "flip back";
    document.getElementById("c2").className = "flip front";
  }

  flipped = !flipped;
}

document.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowDown":
    case "ArrowUp":
      handleRotate();
      break;
    case "ArrowRight":
    case "ArrowLeft":
      switchKey();
      break;
  }
};

function switchKey() {
  currentIndex++;
  if (currentIndex >= chords.length) {
    currentIndex = 0;
    shuffle(chords);
  }

  document.getElementById("c1text").innerHTML = chords[currentIndex];

  if (flipped) {
    handleRotate();
    setTimeout(() => {
      document.getElementById("c2").src =
        "./chords/" + chords[currentIndex] + ".png";
    }, 1000);
  } else {
    document.getElementById("c2").src =
      "./chords/" + chords[currentIndex] + ".png";
  }
}
