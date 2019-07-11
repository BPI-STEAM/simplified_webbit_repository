/*
  v1.3.0
  released at 2019-02-11
*/

/* 
  Minified version is generated from `https://obfuscator.io/` using following options:

  Compact code                  (checked)
  Identifier Names Generator    mangled
  String Array                  (checked)
  Rotate String Array           (checked)
  String Array Encoding         Base64
  String Array Threshold        1
  Unicode Escape Sequence       (checked)
  Sourcemaps                    Off
  Seed                          5566
  Target                        Browser
*/

/* 
  Note: Remember to release on branch `dist`!
*/

+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(scope => {
  'use strict';

  const mqttClient = function () {

    const MQTT_SERVER = 'wss://mqtt1.webduino.io/mqtt';
    const MQTT_USER = 'webduinomqtt';
    const MQTT_PASSWORD = 'ItiK5oeoK2hW';
    /* Generate random client ID */
    const CLIENT_ID = [...Array(8)].map(i => (~~(Math.random() * 36)).toString(36)).join('');

    const _callback = {
      disconnected: null,
      message: null,
      error: null
    };
    let _connected = false;
    let _client = null;

    const getCurrentScriptPath = () => {
      /* Get URL of current script from error message */
      const err = new Error();
      let link = err.stack.split('(');
      link = link[1];
      link = link.split(')')[0];
      link = link.split(':');
      link.splice(-2, 2);
      link = link.join(':');
      link = link.replace(/\/mqttClient[\.min]*\.js/, '');
      return link;
    }

    const loadDenpendency = () => {
      return new Promise(resolve => {
        if (typeof exports === 'undefined') {
          const scriptPath = `${getCurrentScriptPath()}/mqttws31.min.js`;
          (function (d, script) {
            script = d.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.onload = resolve;
            script.src = scriptPath;
            d.getElementsByTagName('head')[0].appendChild(script);
          }(document));
        } else {
          global.WebSocket = require('websocket').w3cwebsocket;
          global.Paho = require('./mqtt-paho.min');
          resolve();
        }
      })
    }

    const onMessage = message => {
      _callback.message && _callback.message(message);
    }

    const onDisconnect = error => {
      _connected = false;
      _callback.disconnected && _callback.disconnected(error);
    }

    const subscribeTopic = topic => {
      return new Promise((resolve, reject) => {
        if (!topic) {
          reject('Require 1 parameter.');
        }
        _client.subscribe(topic, {
          onSuccess: resolve,
          onFailure: (ctx, errCode, errMsg) => {
            reject(errMsg);
          }
        });
      });
    }

    const unsubscribeTopic = topic => {
      return new Promise((resolve, reject) => {
        if (!topic) {
          reject('Require 1 parameter.');
        }
        _client.unsubscribe(topic, {
          onSuccess: resolve,
          onFailure: (ctx, errCode, errMsg) => {
            reject(errMsg);
          }
        });
      });
    }

    const sendMessage = object => {
      if (_connected) {
        _client.send(object.topic, object.message);
      } else {
        _callback.error && _callback.error('Not connected yet');
      }
    }

    const registerMQTTEvent = (event, cb) => {
      const availableEvents = Object.keys(_callback);

      if (availableEvents.indexOf(event) < 0) {
        throw new Error(`Event not supported.`);
      }
      _callback[event] = cb;
    }

    const unregisterMQTTEvent = event => {
      const availableEvents = Object.keys(_callback);

      if (availableEvents.indexOf(event) < 0) {
        throw new Error(`Event not supported.`);
      }
      _callback[event] = null;
    }

    const initializeMQTTClient = async options => {
      const _options = options || {
        server: MQTT_SERVER,
        login: MQTT_USER,
        password: MQTT_PASSWORD
      };

      if (typeof Paho === 'undefined') {
        try {
          await loadDenpendency();
        } catch (ex) {
          console.error(ex);
        }
      }

      if (_options.server === MQTT_SERVER) {
        _options.login = MQTT_USER;
        _options.password = MQTT_PASSWORD;
      }

      return new Promise((resolve, reject) => {
        if (typeof exports === 'undefined') {
          _client = new Paho.MQTT.Client(_options.server, CLIENT_ID);
        } else {
          _client = new Paho.Client(_options.server, CLIENT_ID);
        }
        _client.onMessageArrived = onMessage;
        _client.onConnectionLost = onDisconnect;
        _client.connect({
          userName: _options.login,
          password: _options.password,
          keepAliveInterval: 10,
          onSuccess: () => {
            _connected = true;
            resolve();
          },
          onFailure: (ctx, errCode, errMsg) => {
            _callback.error && _callback.error(error.errorMessage);
            reject(errMsg);
          },
        });
      });
    };

    this.send = sendMessage;
    this.connect = initializeMQTTClient;
    this.subscribe = subscribeTopic;
    this.unsubscribe = unsubscribeTopic;
    this.on = registerMQTTEvent;
    this.off = unregisterMQTTEvent;
  };

  scope.module.mqttClient = mqttClient;
}));
