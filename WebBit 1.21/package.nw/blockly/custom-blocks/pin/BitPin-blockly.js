+(function (scope, webduino) {
  'use strict';

  function getPin(board, pinNum) {
    return board ? board.getPin(pinNum) : undefined;
  }

  scope.Pin = (function () {
    const instances = {};

    return {
      init: function (board, pin, mode) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${pin}_${mode}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = getPin(board, scope.bitGPIO(pin));
          instances[tagetObject].setMode(mode);
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
