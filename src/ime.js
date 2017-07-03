//var $ = require('jQuery');

var events = {
  load: function () {},
  unload: function () {},

  start: function (state) {
    $(document).on('keydown.furiganaIME', function (e) {
      console.log(e.keyCode);
    });
  },

  stop: function (state) {
    $(document).off('keydown.furiganaIME');
  },
};

module.exports = events;