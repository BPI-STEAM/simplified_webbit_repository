+(function (window, document) {

  'use strict';

  window.radioReset_ = function (name) {
    let radio;
    if (!firebase.apps.length) {
      firebase.initializeApp({ authDomain: "webduino-bit.firebaseapp.com", projectId: "webduino-bit" });
    }
    radio = firebase.firestore();
    return radio.collection('web-bit-edu').doc(name).delete().then(function () {
      console.log('radio reset');
    });
  };
  window.radioSet_ = function (name, msg) {
    let radio;
    if (!firebase.apps.length) {
      firebase.initializeApp({ authDomain: "webduino-bit.firebaseapp.com", projectId: "webduino-bit" });
    }
    radio = firebase.firestore();
    return radio.collection('web-bit-edu').doc(name).set({
      msg: msg
    }).then(function () {
      radioTrack_('push', name, msg);
      console.log('radio ok');
    });
  };
  window.radioGet_ = function (name, callback) {
    let radio;
    if (!firebase.apps.length) {
      firebase.initializeApp({ authDomain: "webduino-bit.firebaseapp.com", projectId: "webduino-bit" });
    }
    radio = firebase.firestore();
    radio.collection('web-bit-edu').doc(name).onSnapshot(async function (doc) {
      if (typeof doc.data() !== 'undefined') {
        if ('msg' in doc.data()) {
          let val = doc.data().msg;
          if (val.length > 0) {
            radioTrack_('get', name, val);
            callback(val);
          }
        }
      }
    });
  };
  window.radioTrack_ = function (type, channel, msg) {
    let now = new Date().getTime();
    fetch('https://www.google-analytics.com/collect?v=1&tid=UA-2708968-5&cid=' + now + '&t=event&ec=radio&ea=' + type + '&el=' + channel + ':' + msg + '&cs=radio&cm=' + type + '&cn=' + channel + ':' + msg);
  }
}(window, window.document));
