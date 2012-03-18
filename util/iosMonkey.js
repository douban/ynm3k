#import "../importAll.js"


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
 * This is a function that randomly make vertical swipe on the screen.
 * @returns
 */
function randomVerticalUpSwipe(target, duration) {
    var x_pos = Math.random();
    var y_start = Math.random();
    var y_end = Math.random();
    target.dragInsideWithOptions({startOffset:{x:x_pos, y:y_start}, endOffset:{x:x_pos, y:y_end}, duration: duration});
    UIALogger.logMessage("Scroll from "+ x_pos + " :" + y_start + " to " + x_pos + " :" + y_end);
}

/**
 * This is a function that randomly make horizontal swipe on the screen.
 * @returns
 */
function randomHorizontalUpSwipe(target, duration) {
    var x_start = Math.random();
    var x_end = Math.random();
    var y_pos = Math.random();
    target.dragInsideWithOptions({startOffset:{x:x_start, y:y_pos}, endOffset:{x:x_end, y:y_pos}, duration: duration});
    UIALogger.logMessage("Scroll from "+ x_start + " :" + y_pos + " to " + x_end + " :" + y_pos);
}