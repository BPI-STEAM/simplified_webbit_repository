var launcher = require('browser-launcher2');
var usage = require('usage');
var currMem;
var checker;

if (process.argv.length <= 2) {
  throw new Error("Require a web page to launch.");
}

launcher(function (err, launch) {
  if (err) {
    return console.error(err);
  }

  spawn(process.argv[2]);

  function spawn(fileURL) {
    launch(fileURL, { browser: 'firefox', headless: true }, function (err, instance) {
      if (err) {
        return console.error(err);
      }

      console.log('Instance started with PID:', instance.pid);

      instance.on('stop', function (code) {
        console.log('Instance stopped with exit code:', code);
        clearInterval(checker);
        checker = null;
        instance = null;
        spawn(fileURL);
      });

      checker = setInterval(function () {
        usage.lookup(instance.pid, function (err, result) {
          if (err) {
            return console.error(err);
          }

          currMem = Math.round(result.memory / 1000000);
          console.log('memory: ' + currMem + ' MB');
          if (currMem > 400) {
            instance.stop();
          }
        });
      }, 25000);
    });
  }
});
