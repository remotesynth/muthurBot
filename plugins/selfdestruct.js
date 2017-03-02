var countdown = require('node-timers/countdown');
exports.setDestruct= function setDestruct(tm, cb) {
    var timer = countdown({
        startTime:tm*60000,
        pollInterval:60000
    });
    console.log(cb.userId);
    timer.on('poll', function() {
        console.log("timer called");
        //this.bot.reply(userId,messageString,callback);
    });
    timer.start();
    cb(null,'THE EMERGENCY DESTRUCT SYSTEM IS NOW ACTIVATED. THE SHIP WILL DETONATE IN T MINUS ' + tm + ' MINUTES.')
}