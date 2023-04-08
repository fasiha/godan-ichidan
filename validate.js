const VERBOSE = false;

const classify = require('./index');
const {loadWords} = require('./node-utils');

// Slurp the dictionary
const words = loadWords();

const godanTexts = new Set();
const ichidanTexts = new Set();

// Make a list of entries that are godan or ichidan that end in る
for (const word of words) {
  const isVerb = word.sense.some(
      (sense) => sense.partOfSpeech.some(
          (pos) => pos.startsWith('v5') || pos === 'v1'));
  // going to ignore zuru `vz` verbs
  if (isVerb) {
    const isGodan = word.sense.some(
        (sense) => sense.partOfSpeech.some((pos) => pos.startsWith('v5')));

    const target = isGodan ? godanTexts : ichidanTexts;
    const texts = word.kana.concat(word.kanji).map((k) => k.text);
    for (const text of texts) {
      target.add(text);
    }
  }
}

let nBoth = 0;
const wrongs = [];
for (const v of godanTexts) {
  const c = classify(v);
  if (c === 'ichidan') {
    wrongs.push([v, c]);
  } else if (c === 'both') {
    if (!ichidanTexts.has(v)) {
      wrongs.push([v, c]);
    }
    nBoth++;
  } else {
    if (ichidanTexts.has(v)) {
      wrongs.push([v, c]);
    }
  }
}
if (VERBOSE) {
  console.log('godan', {
    nWrong: wrongs.length,
    nBoth,
    checked: godanTexts.size,
  });
  console.log(wrongs.slice(0, 10), '...');
}
for (const v of ichidanTexts) {
  if (v.endsWith('ル')) {
    continue;
  }
  const c = classify(v);
  if (c === 'godan') {
    wrongs.push([v, c]);
  } else if (c === 'both') {
    if (!godanTexts.has(v)) {
      wrongs.push([v, c]);
    }
    nBoth++;
  } else {
    if (godanTexts.has(v)) {
      wrongs.push([v, c]);
    }
  }
}
if (VERBOSE) {
  console.log('ichidan', {
    nWrong: wrongs.length,
    nBoth,
    checked: ichidanTexts.size,
  });
  console.log(wrongs.slice(0, 10), '...');
}

if (wrongs.length > 0) {
  console.log('wrong', wrongs);
  throw new Error('invalid!');
}
