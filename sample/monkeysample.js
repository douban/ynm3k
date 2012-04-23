#import "../importAll.js";

var target = UIATarget.localTarget(); 
var appWindow = target.frontMostApp().mainWindow();

for (var i = 0; i < 5; i++) {
	randomHorizontalLeftToRight();
}

for (var i = 0; i < 5; i++) {
	randomHorizontalRightToLeft();
}

for (var i = 0; i < 5; i++) {
	UIATarget.localTarget().delay(2);
	randomVerticalDownToUp();
}

for (var i = 0; i < 5; i++) {
	UIATarget.localTarget().delay(2);
	randomVerticalUpToDown();
}