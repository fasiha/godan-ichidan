
const iruEndings =
    'りみひびぴにちぢしじきぎいリミヒビピニチヂシジキギイ'.split('').map(
        (s) => s + 'る');
function iru(s) {
  return iruEndings.some((end) => s.endsWith(end));
}

const eruEndings =
    'れめへべぺねてでせぜけげえレメヘベペネテデセゼケゲエ'.split('').map(
        (s) => s + 'る');
function eru(s) {
  return eruEndings.some((end) => s.endsWith(end));
}

module.exports = {
  iru,
  eru,
};
