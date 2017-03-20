var countdown = require('node-timers/countdown');
exports.setDestruct= function setDestruct(tm, cb) {
    var timer = countdown({
        startTime:tm*60000,
        pollInterval:60000
    }),
    that = this;
    timer.on('poll', function(time) {
        // this is experimental. I am calling the websocket passed to send a reply to the user
        // watch for a potential memory leak
        // thanks to @silentrob and @benhjames for all their help
        var response = '';
        if (time > 0) {
            response = 'ATTENTION. ENGINES WILL OVERLOAD IN '+millisToMinutesAndSeconds(time)+' MINUTES.';
            // handle error if the user session doesn't exist anymore
            try {
                that.extraScope.ws.write(`\n> ${response}\n`);
                that.extraScope.ws.write('> ');
            }
            catch (e) {
                console.log('Message not posted. User has disconnected.\n');
            }
        }
        else {
            response = 'ENGINES OVERLOADED.'
            that.extraScope.ws.write(`\n> ${response}\n`);
        }
    });
    timer.start();
    cb(null,'THE EMERGENCY DESTRUCT SYSTEM IS NOW ACTIVATED. THE SHIP WILL DETONATE IN T MINUS ' + tm + ':00 MINUTES.')
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}