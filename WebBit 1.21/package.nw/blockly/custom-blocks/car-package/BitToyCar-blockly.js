+(function (scope, webduino) {

  'use strict';
  const bitGPIO = scope.bitGPIO;

  scope.ToyCar = (function () {
    const instances = {};

    return {
      init: function (board) {
        const boardID = board._options.device || board._options.url;

        if (!instances[boardID]) {
          instances[boardID] = scope.getToyCar(board, bitGPIO(6), bitGPIO(13), bitGPIO(8), bitGPIO(14));
        }
        return instances[boardID];
      }
    }
  })();

}(window, window.webduino));
 