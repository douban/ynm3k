#import "../importAll.js"

(function() {
    var IOSMonkey = IOSMonkey || {};
    
    IOSMonkey.prototype = {

        /**
         * Run the monkey
         * @param {Object} action collection eg {"tap": true, "flip": true}
         * @param {int} repeat times of the monkey test. Default value is 1.
         * @param {delay} The delay seconds after each action. Default value is 0.
         */
        run: function(action, repeat, delay) {
            var me = this;
            if (action == null) {
                return;
            }
            if (repeat == null || repeat < 1) {
                repeat = 1;
            }
            if (delay == null) {
                delay = 0;
            }
            var readyActions = [];
            if (action["tap"] == true) {
                readyActions.append(me.tap);
            }
            if (action["flip"] == true) {
                readyActions.append(me.flip);
            }
            var actionLength = action.length;
            for (var i = 0; i < repeat; i++) {
                var index = Math.floor(Math.random() * actionLength);
                var move = readyActions[index];
                apply(this, move);
                UIATarget.localTarget().delay(delay);
            }
        },
        
        /**
         * Randomly tap.
         */
        tap: function() {
            
        },
        
        /**
         * Randomly flip.
         */
        flip: function() {
            
        }
        
    };

})();



//monkey(10);

function monkey(times,delay_time){
	if (!delay_time) {
			delay_time = 0.1;
		}
	var target = UIATarget.localTarget();
	var app = target.frontMostApp();
	var appWindow = target.frontMostApp().mainWindow();
	var appwidth = appWindow.contentArea().size.width;
	var appheight = appWindow.contentArea().size.height;
	
	var origin_x = appWindow.contentArea().origin.x;
	var origin_y = appWindow.contentArea().origin.y;
	
	var width_times = appwidth/20;
	var height_times = appheight/20;
	
	UIALogger.logMessage("Screen width:"+ target.rect().size.width);
	UIALogger.logMessage("Screen height:"+ target.rect().size.height);
	
	UIALogger.logMessage("Screen width11:"+ target.rect().origin.x);
	UIALogger.logMessage("Screen height11:"+ target.rect().origin.y);
	
	for(var i = 0;i<times;i++){
		var x_x = Math.floor(Math.random()*width_times)*20;
		var y_y = Math.floor(Math.random()*height_times)*20;
		if(y_y<20){y_y=y_y+20}
		target.tap({x:x_x,y:y_y});
		target.delay(delay_time);
	}
}

/**
 * This is a function that randomly make vertical swipe from up to down on the screen.
 * @returns
 */
function randomVerticalUpToDown() {
    var target = UIATarget.localTarget(); 
    var appWindow = target.frontMostApp().mainWindow();

    var appwidth = appWindow.contentArea().size.width;
    var appheight = appWindow.contentArea().size.height;

    var width_times = appwidth / 20;
    var height_times = appheight / 20;

    var x_pos = Math.floor(Math.random() * width_times) * 20;
    var y_start = Math.floor(Math.random() * height_times) * 10;
    var y_end = Math.floor(Math.random() * height_times) * 10 + height_times * 10;
    target.flickFromTo({x:x_pos, y:y_start},{x:x_pos, y:y_end});
}

/**
 * This is a function that randomly make vertical swipe from up to down on the screen.
 * @returns
 */
function randomVerticalDownToUp() {
    var target = UIATarget.localTarget(); 
    var appWindow = target.frontMostApp().mainWindow();

    var appwidth = appWindow.contentArea().size.width;
    var appheight = appWindow.contentArea().size.height;

    var width_times = appwidth / 20;
    var height_times = appheight / 20;

    var x_pos = Math.floor(Math.random() * width_times) * 20;
    var y_start = Math.floor(Math.random() * height_times) * 10 + height_times * 10;
    var y_end = Math.floor(Math.random() * height_times) * 10;
    target.flickFromTo({x:x_pos, y:y_start},{x:x_pos, y:y_end});
}

/**
 * This is a function that randomly make horizontal swipe from left to right on the screen.
 * @returns
 */
function randomHorizontalLeftToRight() {
    var target = UIATarget.localTarget(); 
    var appWindow = target.frontMostApp().mainWindow();

    var appwidth = appWindow.contentArea().size.width;
    var appheight = appWindow.contentArea().size.height;

    var width_times = appwidth / 20;
    var height_times = appheight / 20;

    var y_pos = Math.floor(Math.random() * height_times) * 20;
    var x_start = Math.floor(Math.random() * width_times) * 10;
    var x_end = Math.floor(Math.random() * width_times) * 10 + width_times * 10;
    target.flickFromTo({x:x_start, y:y_pos},{x:x_end, y:y_pos});
}

/**
 * This is a function that randomly make horizontal swipe from right to left on the screen.
 * @returns
 */
function randomHorizontalRightToLeft() {
    var target = UIATarget.localTarget(); 
    var appWindow = target.frontMostApp().mainWindow();

    var appwidth = appWindow.contentArea().size.width;
    var appheight = appWindow.contentArea().size.height;

    var width_times = appwidth / 20;
    var height_times = appheight / 20;

    var y_pos = Math.floor(Math.random() * height_times) * 20;
    var x_start = Math.floor(Math.random() * width_times) * 10 + width_times * 10;
    var x_end = Math.floor(Math.random() * width_times) * 10;
    target.flickFromTo({x:x_start, y:y_pos},{x:x_end, y:y_pos});
}
