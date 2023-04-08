const {iru, eru} = require('./utils');
const iruEru = require('./iruEru');
const nonIruEru = require('./nonIruEru');

module.exports = function classify(s) {
  if (!s.endsWith('る')) {
    return 'godan';
  }
  if (iru(s) || eru(s)) {
    if (iruEru.both.has(s)) {
      return 'both';
    } else if (iruEru.godan.has(s)) {
      return 'godan';
    }
    return 'ichidan';
  }
  // NOT iru/eru
  if (nonIruEru.both.has(s)) {
    return 'both';
  }
  if (nonIruEru.ichidan.has(s)) {
    return 'ichidan';
  }
  return 'godan';
};
