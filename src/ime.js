var convert = require('./kanaConvert.js');
var kuromoji = require('kuromoji');
var KANJI_MATCH = /[\u3400-\u4DB5\u4E00-\u9FCB\uF900-\uFA6A]+/;
//var HIRA_KATA_HALFKATA_PUNCTUATION = /[\u30A0-\u30FF\u3041-\u3096]/;
// Key test examples
// - びしょ濡れーービショウヌレ
// - 属するーーーーゾクスル

var events = {
  load: function () {},
  unload: function () {},

  start: function (state) {
    new Promise(function (resolve, reject) {
      kuromoji.builder({dicPath: 'src/dic/' }).builder(function (err, tokenizer) {
        resolve(tokenizer);
      });
    }).then(function (parser) {
      $(document).on('keydown.furiganaIME', function (ev) {
        var textInput, text;

        // Textinput must start with 'furi:' and need to Ctrl+C to trigger conversion
        if (ev.ctrlKey && ev.keyCode === 67) { // Ctrl + C
          textInput = document.querySelector('.channel-textarea-inner textarea');
          if (textInput.value.startsWith('furi:')) {
            text = textInput.value.substr(5);
            
            // Tokenize and build string form kuromoji output
            var str = parser.then.tokenize(text).map(function (token) {
              //var match = token.surface_form.match(KANJI_MATCH);
              return(token.surface_form.match(KANJI_MATCH) != null
                ? convert.splitSideKanaAndJoinWithReading(
                  token.surface_form, token.reading, '[', ']')
                //? token.surface_form + '(' + token.reading + ')'
                : token.surface_form
              );
            }).join('');
            console.log(str);
          }
        }
        //console.log(ev.target, ev.keyCode, textInput.value);
      });
    });
  },

  stop: function (state) {
    $(document).off('keypress.furiganaIME');
  },
};

module.exports = events;