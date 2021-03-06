'use strict';

{
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    kana.textContent = word.kana;
    underbar1.textContent = '';
    target.textContent = word.alphabet;
    loc = 0;
    offAll()
    bright(fingerMaps[word.alphabet[loc]])
    offAllKey()
    if(enableBright){
      brightKey(word.alphabet[loc])
    }
  }

  const fingerMaps = {
    a:1,
    b:4,
    c:3,
    d:3,
    e:3,
    f:4,
    g:4,
    h:7,
    i:8,
    j:7,
    k:8,
    l:9,
    m:7,
    n:7,
    o:9,
    p:10,
    q:1,
    r:4,
    s:2,
    t:4,
    u:7,
    v:4,
    w:2,
    x:2,
    y:7,
    z:1,
  }

  const words = [
    {alphabet:'ennsoku'},
    {alphabet:'fukuro'},
    {alphabet:'senaka'},
    {alphabet:'kaeru'},
    {alphabet:'taiko'},
    {alphabet:'okasi'},
    {alphabet:'kusuri'},
    {alphabet:'utiwa'},
    {alphabet:'kirinn'},
    {alphabet:'satoimo'},
    {alphabet:'tannkenn'},
    {alphabet:'kaimono'},
    {alphabet:'kaminari'},
    {alphabet:'yama'},
    {alphabet:'hatake'},
    {alphabet:'kumori'},
    {alphabet:'tukue'},
    {alphabet:'ehonn'},
    {alphabet:'himawari'},
    {alphabet:'sakana'},
    {alphabet:'kitutuki'},
    {alphabet:'tikatetu'},
  ];
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const underbar1 = document.getElementById('underbar1');
  const underbar2 = document.getElementById('underbar2');
  // const kana = document.getElementById('kana');
  const target = document.getElementById('target');
  let inputWord = '';
  let oneWordAlphabet = '';
  let enableBright = true;
  const totalCharCount = Object.values(words).reduce((pre,current)=>pre+current.alphabet.length, 0);

  document.body.addEventListener('keydown',
    event => {
        if (event.key === 'o' && event.ctrlKey) {
          enableBright = !enableBright;
          console.log("bright:"+enableBright);
        }
    });

  document.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }

    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== word.alphabet[loc]) {
      return;
    }


    inputWord += word.alphabet[loc];
    // const kanaLength = r2h(inputWord).replace(/[a-z]/g, '').length;
    // underbar1.textContent = '???'.repeat(kanaLength);
    // underbar2.textContent = '???'.repeat(word.kana.length - kanaLength);

    oneWordAlphabet += word.alphabet[loc];
    const oneWordAlphabetLength = r2h(oneWordAlphabet).replace(/[a-z]/g, '').length;
    if (oneWordAlphabetLength >= 1) {
      const oneWordKana = r2h(oneWordAlphabet).replace(/[a-z]/g, '');
      speechSynthesis.speak(new SpeechSynthesisUtterance(oneWordKana));
      oneWordAlphabet = '';
    }
    loc++;

    // console.log(fingerMaps[word.alphabet[loc]])
    if (word.alphabet[loc]){
      offAll()
      bright(fingerMaps[word.alphabet[loc]])
      offAllKey()
      if(enableBright){
        brightKey(word.alphabet[loc])
      }
    }


    // 1: _ed
    // 2: __d
    // 3: ___
    target.textContent = '_'.repeat(loc) + word.alphabet.substring(loc);

    if (loc === word.alphabet.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.innerHTML = `Finished! ${elapsedTime} ???!<br>???????????????<br>?????????):${(totalCharCount/(elapsedTime/60)).toFixed(2)}`;
        return;
      }

      setTimeout(() => {
        inputWord = '';
        setWord();
      }, 400);
    }
  });
}

// License: Public Domain
var roman2hiragana = {
  'a':'???', 'i':'???', 'u':'???', 'e':'???', 'o':'???',
  'ka':'???', 'ki':'???', 'ku':'???', 'ke':'???', 'ko':'???',
  'sa':'???', 'si':'???', 'su':'???', 'se':'???', 'so':'???',
  'ta':'???', 'ti':'???', 'tu':'???', 'te':'???', 'to':'???', 'chi':'???', 'tsu':'???',
  'na':'???', 'ni':'???', 'nu':'???', 'ne':'???', 'no':'???',
  'ha':'???', 'hi':'???', 'hu':'???', 'he':'???', 'ho':'???', 'fu':'???',
  'ma':'???', 'mi':'???', 'mu':'???', 'me':'???', 'mo':'???',
  'ya':'???', 'yi':'???', 'yu':'???', 'ye':'??????', 'yo':'???',
  'ra':'???', 'ri':'???', 'ru':'???', 're':'???', 'ro':'???',
  'wa':'???', 'wyi':'???', 'wu':'???', 'wye':'???', 'wo':'???',
  'nn':'???',
  'ga':'???', 'gi':'???', 'gu':'???', 'ge':'???', 'go':'???',
  'za':'???', 'zi':'???', 'zu':'???', 'ze':'???', 'zo':'???', 'ji':'???',
  'da':'???', 'di':'???', 'du':'???', 'de':'???', 'do':'???',
  'ba':'???', 'bi':'???', 'bu':'???', 'be':'???', 'bo':'???',
  'pa':'???', 'pi':'???', 'pu':'???', 'pe':'???', 'po':'???',
  'kya':'??????', 'kyu':'??????', 'kyo':'??????',
  'sya':'??????', 'syu':'??????', 'syo':'??????',
  'tya':'??????', 'tyi':'??????', 'tyu':'??????', 'tye':'??????', 'tyo':'??????', 'cha':'??????', 'chu':'??????', 'che':'??????', 'cho':'??????',
  'nya':'??????', 'nyi':'??????', 'nyu':'??????', 'nye':'??????', 'nyo':'??????',
  'hya':'??????', 'hyi':'??????', 'hyu':'??????', 'hye':'??????', 'hyo':'??????',
  'mya':'??????', 'myi':'??????', 'myu':'??????', 'mye':'??????', 'myo':'??????',
  'rya':'??????', 'ryi':'??????', 'ryu':'??????', 'rye':'??????', 'ryo':'??????',
  'gya':'??????', 'gyi':'??????', 'gyu':'??????', 'gye':'??????', 'gyo':'??????',
  'zya':'??????', 'zyi':'??????', 'zyu':'??????', 'zye':'??????', 'zyo':'??????',
  'ja':'??????', 'ju':'??????', 'je':'??????', 'jo':'??????', 'jya':'??????', 'jyi':'??????', 'jyu':'??????', 'jye':'??????', 'jyo':'??????',
  'dya':'??????', 'dyi':'??????', 'dyu':'??????', 'dye':'??????', 'dyo':'??????',
  'bya':'??????', 'byi':'??????', 'byu':'??????', 'bye':'??????', 'byo':'??????',
  'pya':'??????', 'pyi':'??????', 'pyu':'??????', 'pye':'??????', 'pyo':'??????',
  'fa':'??????', 'fi':'??????', 'fe':'??????', 'fo':'??????',
  'fya':'??????', 'fyu':'??????', 'fyo':'??????',
  'xa':'???', 'xi':'???', 'xu':'???', 'xe':'???', 'xo':'???', 'la':'???', 'li':'???', 'lu':'???', 'le':'???', 'lo':'???',
  'xya':'???', 'xyu':'???', 'xyo':'???',
  'xtu':'???', 'xtsu':'???',
  'wi':'??????', 'we':'??????',
  'va':'??????', 'vi':'??????', 'vu':'???', 've':'??????', 'vo':'??????'
};

/*
 * roman -> hiragana
 *
 * @param (String) roman:
 * @return (String): hiragana
 */
function r2h(roman) {
  var i, iz, match, regex,
      hiragana = '', table = roman2hiragana;

  regex = new RegExp((function(table){
    var key,
        s = '^(?:';

    for (key in table) if (table.hasOwnProperty(key)) {
      s += key + '|';
    }
    return s + '(?:n(?![aiueo]|y[aiueo]|$))|' + '([^aiueon])\\1)';
  })(table));
  for (i = 0, iz = roman.length; i < iz; ++i) {
    if (match = roman.slice(i).match(regex)) {
      if (match[0] === 'n') {
        hiragana += '???';
      } else if (/^([^n])\1$/.test(match[0])) {
        hiragana += '???';
        --i;
      } else {
        hiragana += table[match[0]];
      }
      i += match[0].length - 1;
    } else {
      hiragana += roman[i];
    }
  }
  return hiragana;
}

function bright(fingerNo){
  const finger = document.querySelector(".border-radius"+fingerNo)
  finger.classList.add("bright")
  // setTimeout(() => {
  // finger.classList.remove("bright")
  // }, 1500);
  console.log("!")
  }
  function brightKey(keyStr){
    const key = document.querySelector("#"+keyStr)
    if(key!=undefined){
      key.classList.add("bright")
    }
  }
function offAll(){
  document.querySelector(".border-radius1").classList.remove("bright")
  document.querySelector(".border-radius2").classList.remove("bright")
  document.querySelector(".border-radius3").classList.remove("bright")
  document.querySelector(".border-radius4").classList.remove("bright")
  document.querySelector(".border-radius5").classList.remove("bright")
  document.querySelector(".border-radius6").classList.remove("bright")
  document.querySelector(".border-radius7").classList.remove("bright")
  document.querySelector(".border-radius8").classList.remove("bright")
  document.querySelector(".border-radius9").classList.remove("bright")
  document.querySelector(".border-radius10").classList.remove("bright")

}

function offAllKey(){
  const keyList = document.querySelectorAll(".key")
  for (const key of keyList){
    key.classList.remove("bright");
  }
}