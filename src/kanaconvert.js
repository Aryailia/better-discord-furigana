/**
 * Checks if two characters are the same kana
 * Returns false
 * @param {string} char1 
 * @param {string} char2 
 * @returns {boolean}
 */
function isSameKana(char1, char2) {
  var normalized1 = KATAKANA_TO_HIRAGANA[char1] ? KATAKANA_TO_HIRAGANA[char1] : char1;
  var normalized2 = KATAKANA_TO_HIRAGANA[char2] ? KATAKANA_TO_HIRAGANA[char2] : char2;
  return normalized1 === normalized2;
}

/**
 * Because tokens include hiragana that suround the kanji that we want
 * furigana added to, tries to trim both left and right side of surface
 * in order to add as little redundancy.
 * 
 * @param {string} surface The token string as it is written
 * @param {string} reading {surface} converted into its reading
 * @param {string} leftBreak Character to deliniate the furigana
 * @param {string} rightBreak Character to deliniate the furigana
 * @returns {string}
 */
function splitSideKanaAndJoinWithReading(surface, reading, leftBreak, rightBreak) {
  var index = -1;
  var startStr = [];
  var endStr = [];
  var surfaceList = surface.split('');
  var readingList = reading.split('');
  
  // Trim and and push the shared initial kana and push into {startStr}
  while (isSameKana(surfaceList[++index], readingList[index])) {
    startStr.push(readingList[index]);
  } 
  surfaceList.splice(0, index);
  readingList.splice(0, index);

  // Trim and push the shared end kana
  index = surfaceList.length; // Match the last letters
  while (isSameKana(surfaceList[--index], readingList[readingList.length - 1])) {
    endStr.push(surfaceList.pop());
    readingList.pop();
  }
  
  // {surfaceList} will now the all the middle letters, hopefully only kanji
  // {readingList} will now have the reading for what's left in {surfaceList}
  // Now the 
  return startStr.join('') + surfaceList.join('')
    + leftBreak + readingList.join('') + rightBreak
    + endStr.reverse().join('');
}

var KATAKANA_TO_HIRAGANA = {
  'ア': 'あ',
  'イ': 'い',
  'ウ': 'う',
  'エ': 'え',
  'オ': 'お',
  'ヴ': 'ゔ',
  'カ': 'か',
  'キ': 'き',
  'ク': 'く',
  'ケ': 'け',
  'コ': 'こ',
  'ガ': 'が',
  'ギ': 'ぎ',
  'グ': 'ぐ',
  'ゲ': 'げ',
  'ゴ': 'ご',
  'サ': 'さ',
  'ス': 'す',
  'セ': 'せ',
  'ソ': 'そ',
  'ザ': 'ざ',
  'ズ': 'ず',
  'ゼ': 'ぜ',
  'ゾ': 'ぞ',
  'シ': 'し',
  'ジ': 'じ',
  'タ': 'た',
  'チ': 'ち',
  'ツ': 'つ',
  'テ': 'て',
  'ト': 'と',
  'ダ': 'だ',
  'ヂ': 'ぢ',
  'ヅ': 'づ',
  'デ': 'で',
  'ド': 'ど',
  'ナ': 'な',
  'ニ': 'に',
  'ヌ': 'ぬ',
  'ネ': 'ね',
  'ノ': 'の',
  'ハ': 'は',
  'ヒ': 'ひ',
  'フ': 'ふ',
  'ヘ': 'へ',
  'ホ': 'ほ',
  'バ': 'ば',
  'ビ': 'び',
  'ブ': 'ぶ',
  'ベ': 'べ',
  'ボ': 'ぼ',
  'パ': 'ぱ',
  'ピ': 'ぴ',
  'プ': 'ぷ',
  'ペ': 'ぺ',
  'ポ': 'ぽ',
  'マ': 'ま',
  'ミ': 'み',
  'ム': 'む',
  'メ': 'め',
  'モ': 'も',
  'ヤ': 'や',
  'ユ': 'ゆ',
  'ヨ': 'よ',
  'ラ': 'ら',
  'リ': 'り',
  'ル': 'る',
  'レ': 'れ',
  'ロ': 'ろ',
  'ワ': 'わ',
  'ヲ': 'を',
  'ン': 'ん',

  // Archaic characters
  'ヰ': 'ゐ',
  'ヱ': 'ゑ',

  // Uncommon character combos

  //  Small Characters (normally not transliterated alone)
  'ァ': 'ぁ',
  'ィ': 'ぃ',
  'ェ': 'ぇ',
  'ゥ': 'ぅ',
  'ォ': 'ぉ',
  'ャ': 'ゃ',
  'ュ': 'ゅ',
  'ョ': 'ょ',
  'ッ': 'っ',
  'ヵ': 'ゕ',
  'ヶ': 'ゖ',
  'ヮ': 'ゎ',
};

module.exports = {
  splitSideKanaAndJoinWithReading: splitSideKanaAndJoinWithReading,
};