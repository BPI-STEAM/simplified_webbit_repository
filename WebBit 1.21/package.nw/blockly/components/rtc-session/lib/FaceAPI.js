+(function (global, $) {

  'use strict';

  var HTMLVideoElement = global.HTMLVideoElement;

  var rectDefaults = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      lineWidth: 1,
      strokeStyle: 'red',
      fillStyle: 'rgba(0, 0, 0, 0)',
      anchor: 'top/left'
    },
    textDefaults = {
      x: 2,
      y: 1,
      fontFamily: 'Helvetica',
      fontSize: 20,
      fillStyle: 'red',
      anchor: 'top/left'
    };

  var dataFormatter = {
    detect: function (dataList, video) {
      var canvas = (this.canvas || (this.canvas = createCanvas(video))),
        stage = (this.stage || (this.stage = new Facade(canvas)));

      stage.clear();

      dataList.forEach(function (data, idx) {
        var faceRectangle = data.faceRectangle,
          faceAttributes = data.faceAttributes;

        var rectOption = $.extend({}, rectDefaults, {
          x: faceRectangle.left,
          y: faceRectangle.top,
          width: faceRectangle.width,
          height: faceRectangle.height,
          rotate: faceAttributes.headPose.roll
        });

        var textOption = $.extend({}, textDefaults, {
          x: rectOption.x > canvas.clientWidth - 100 - rectOption.width ? rectOption.x - 110 : 10 + faceRectangle.width + rectOption.x,
          y: rectOption.y,
          rotate: faceAttributes.headPose.roll
        });

        stage.addToStage(new Facade.Rect(rectOption));
        stage.addToStage(new Facade.Text([
          '性別：' + {
            male: '男',
            female: '女'
          }[faceAttributes.gender],
          '年齡：' + faceAttributes.age,
          '笑容：' + ((faceAttributes.smile || 0) * 100).toFixed() + ' %',
          '眼鏡：' + {
            ReadingGlasses: '一般',
            SunGlasses: '墨鏡',
            SwimmingGoggles: '蛙鏡',
            NoGlasses: '無'
          }[faceAttributes.glasses],
          '鬍子：' + faceAttributes.facialHair.moustache,
          '鬍鬚：' + faceAttributes.facialHair.beard,
          '鬢角：' + faceAttributes.facialHair.sideburns,
        ].join('\n'), textOption));
      });
    },

    emotion: function (dataList, video) {
      var canvas = (this.canvas || (this.canvas = createCanvas(video))),
        stage = (this.stage || (this.stage = new Facade(canvas))),
        moodTable = {
          anger: '生氣',
          contempt: '滿足',
          disgust: '厭惡',
          fear: '害怕',
          happiness: '高興',
          neutral: '無感',
          sadness: '傷心',
          surprise: '驚喜'
        };

      stage.clear();

      dataList.forEach(function (data, idx) {
        var faceRectangle = data.faceRectangle,
          scores = data.scores;

        var rectOption = $.extend({}, rectDefaults, {
          x: faceRectangle.left,
          y: faceRectangle.top,
          width: faceRectangle.width,
          height: faceRectangle.height
        });

        var textOption = $.extend({}, textDefaults, {
          x: rectOption.x > canvas.clientWidth - 100 - rectOption.width ? rectOption.x - 110 : 10 + faceRectangle.width + rectOption.x,
          y: rectOption.y
        });

        stage.addToStage(new Facade.Rect(rectOption));

        var sortable = [];
        for (var mood in scores) {
          sortable.push([mood, scores[mood]]);
        }
        sortable.sort(function (a, b) {
          return b[1] - a[1];
        });
        stage.addToStage(new Facade.Text(sortable.map(function (item) {
          return moodTable[item[0]] + '：' + (item[1] * 100).toFixed() + ' %';
        }).join('\n'), textOption));
      });
    },

    describe: function (result, video) {
      var canvas = (this.canvas || (this.canvas = createCanvas(video))),
        stage = (this.stage || (this.stage = new Facade(canvas)));

      var textOption = $.extend({}, textDefaults, {
        x: canvas.clientWidth / 4,
        y: 20
      });

      stage.clear();

      stage.addToStage(new Facade.Text(result.description.captions.map(function (caption) {
        return caption.text;
      }).join('\n')), textOption);
    }
  };

  function FaceAPI(key, type) {
    this.key = key;
    this.type = type || 'detect';

    switch (type) {
    case 'emotion':
      this.url = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize';
      break;

    case 'describe':
      this.url = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/describe';
      break;

    default:
      this.url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';
      break;
    }
  }

  function params(self, params) {
    self.params = params;
    return self;
  }

  function body(self, body) {
    self.body = dataURLtoBlob(body);
    return self;
  }

  function request(self) {
    return $.ajax({
      url: self.url + '?' + $.param(self.params),
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader('Content-Type', 'application/octet-stream');
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', self.key);
      },
      type: "POST",
      data: self.body,
      processData: false
    });
  }

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  function takeSnapshot(video, callback) {
    var canvas = document.createElement('canvas'),
      context;

    canvas.width = video.clientWidth || video.videoWidth;
    canvas.height = video.clientHeight || video.videoHeight;
    context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (typeof callback === 'function') {
      callback(canvas.toDataURL('image/jpeg', 0.5));
    }
  }

  function createCanvas(video) {
    var canvas = document.createElement('canvas');

    if (video.id) {
      canvas.id = video.id + '-canvas';
    }
    canvas.style.position = 'absolute';
    canvas.style.left = (video.offsetLeft - video.scrollLeft) + 'px';
    canvas.style.top = (video.offsetTop - video.scrollTop) + 'px';
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    video.parentNode.insertBefore(canvas, video.nextSibling);
    return canvas;
  }

  FaceAPI.prototype.detect = function (p, b, interval, callback) {
    var self = this;

    if (b instanceof HTMLVideoElement) {
      self.stopDetect();
      self.capItvl = setInterval(function () {
        takeSnapshot(b, function (dataURL) {
          if (!self.inFlight) {
            self.inFlight = true;
            self.detect(p, dataURL).always(function (dataList, textStatus, xhrObj) {
              if (textStatus === 'error') {
                setTimeout(function () {
                  self.inFlight = false;
                }, 10000);
              } else {
                self.inFlight = false;
                if (typeof callback === 'function') {
                  callback(dataList);
                }
              }
            });
          }
        });
      }, interval || 2000);
    } else {
      return request(body(params(self, p), b));
    }
  };

  FaceAPI.prototype.detectAndShow = function (p, video, interval, callback) {
    var self = this,
      formatter = (typeof callback === 'function' ? callback : dataFormatter[self.type]);

    self.detect(p, video, interval, function (dataList) {
      formatter.call(self, dataList, video);
    });
  };

  FaceAPI.prototype.stopDetect = function () {
    if (this.capItvl) {
      clearInterval(this.capItvl);
      delete this.capItvl;
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      delete this.stage;
    }
  };

  global.FaceAPI = FaceAPI;

}(window, jQuery));
