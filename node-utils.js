const fs = require('fs');

const USAGE = `No JMdict JSON file found.

Run "npm run download" to automatically download this.

If that doesn't work, here's the manual ways to get this:

1. Go to https://github.com/scriptin/jmdict-simplified/releases
2. Download the most recent "jmdict-eng" tgz or zip
3. Uncompress the download and put it in this directory.
`

function findLastJson() {
  const files = fs.readdirSync('.');
  const zips =
      files
          .filter(
              (file) => file.startsWith('jmdict-') && file.endsWith('.json'))
          .sort();
  return zips[zips.length - 1]
}

function loadWords() {
  const fname = findLastJson();
  if (!fname) {
    console.error(USAGE);
    process.exit(-1);
  }
  const dict = JSON.parse(fs.readFileSync(fname, 'utf8'));
  return dict.words;
}

module.exports = {
  loadWords,
};
