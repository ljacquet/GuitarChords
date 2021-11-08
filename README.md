## Guitar Chord Flash Cards
Quizlet doesn't allow for images in flashcards unless you are a paid user so I made a barebones version.
I'm most likely not going to be making any updates to this unless something completely breaks. Feel free to fork and create any modifications you want.

## Usage - Mobile
1. tap to flip
2. double tap to switch to next

## Usage - Desktop
### Flip
1. click the card
2. Up arrow key
3. Down arrow key

### Next Card
1. Right arrow key
2. Left arrow key
3. Double tap

### Autoflip
if there is a number entered in the autoflip field the chords will automatically change every x seconds and flip every x / 2.

## Choosing Cards
Click / Tap the toggles at the top of the page to choose what cards you are learning

# Changing Cards
If you ever want to use this as a baseline for another set of flash cards you can replace the strings in the flip.js activeCards array to whatever you want. You can either update the updateSelections function or set the array to an object with the following properties.
{ name: name within directory / name on card, type: directory to search in, typeName: name to show over card }