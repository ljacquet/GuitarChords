flipped = false;
currentIndex = -1;
delay = -1;

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

bar = [
  "A7",
  "Amajor",
  "Amajor7",
  "Aminor",
  "Aminor7",
  "E7",
  "Emajor",
  "Emajor7",
  "Eminor",
  "Eminor7",
];

blues = ["A", "D", "E", "G"];

activeCards = [];
updateSelections(true);

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
shuffle(activeCards);

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

function updateSelections(selection) {
  currentIndex = 0;
  activeCards = [];

  if (selection) {
    for (let i = 0; i < chords.length; i++) {
      const element = chords[i];
      activeCards.push({ name: element, type: "chords", typeName: "Chord" });
    }
  } else {
    if (document.getElementById("base").checked) {
      for (let i = 0; i < chords.length; i++) {
        const element = chords[i];
        activeCards.push({ name: element, type: "chords", typeName: "Chord" });
      }
    }

    if (document.getElementById("bar").checked) {
      for (let i = 0; i < bar.length; i++) {
        const element = bar[i];
        activeCards.push({
          name: element,
          type: "bar",
          typeName: "Bar Chord",
          root: element[0],
        });
      }
    }

    if (document.getElementById("jazz").checked) {
      for (let i = 0; i < blues.length; i++) {
        const element = blues[i];
        activeCards.push({
          name: element,
          type: "blues",
          typeName: "Blues Progression",
        });
      }
    }

    shuffle(activeCards);
  }
}

document.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowDown":
    case "ArrowUp":
      handleRotate();
      break;
    case "ArrowRight":
    case "ArrowLeft":
      autoPlayUpdate(delay);
      switchKey();
      break;
  }
};

function switchKey() {
  currentIndex++;
  if (currentIndex >= activeCards.length) {
    currentIndex = 0;
    shuffle(activeCards);
  }

  document.getElementById("c1text").innerHTML =
    activeCards[currentIndex].typeName +
    "<br/>" +
    activeCards[currentIndex].name;

  if (flipped) {
    handleRotate();
    setTimeout(() => {
      document.getElementById("c2image").src =
        "./" +
        activeCards[currentIndex].type +
        "/" +
        activeCards[currentIndex].name.toLowerCase() +
        ".png";
    }, 250);
  } else {
    document.getElementById("c2image").src =
      "./" +
      activeCards[currentIndex].type +
      "/" +
      activeCards[currentIndex].name +
      ".png";
  }
}

currentTimeout = null;
function autoPlayUpdate(e) {
  // Clear old timeout
  if (currentTimeout != null) {
    console.log("Cleared timeout");
    clearTimeout(currentTimeout);
  }

  if (e == "" || parseFloat(e) <= 0) {
    delay = -1;
  } else {
    delay = e;
    // Create timeout
    console.log("delaying: " + delay);
    currentTimeout = setTimeout(switchKeyHandler, (delay * 1000) / 2);
  }
  console.log(e);
}

function switchKeyHandler() {
  console.log("delaying: " + delay / 2);
  if (!flipped) {
    handleRotate();
  } else {
    switchKey();
  }
  currentTimeout = setTimeout(switchKeyHandler, (delay * 1000) / 2);
}

window.onload = function () {
  switchKey();
};
