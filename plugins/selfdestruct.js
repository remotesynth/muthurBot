var countdown = require('node-timers/countdown');
exports.setDestruct= function setDestruct(tm, cb) {
    var timer = countdown({
        startTime:tm*60000,
        pollInterval:60000
    });
    console.log(cb.userId);
    //this.bot.directReply(1,"random","this is a message",function() {});
    timer.on('poll', function() {
        console.log("timer called");
    });
    timer.start();
    cb(null,'THE EMERGENCY DESTRUCT SYSTEM IS NOW ACTIVATED. THE SHIP WILL DETONATE IN T MINUS ' + tm + ' MINUTES.')
}