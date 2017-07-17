//var romaaji = require('./constants.js');

var events = {
  load: function () {},
  unload: function () {},

  start: function (state) {
    $(document).on('keypress.furiganaIME', function (ev) {
      var textinput = document.querySelector('.channel-textarea-inner textarea');
      console.log(ev.target, ev.keyCode, textinput.value);
    });
  },

  stop: function (state) {
    $(document).off('keypress.furiganaIME');
  },
};

module.exports = events;