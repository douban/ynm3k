#import "../importAll.js";

var target = UIATarget.localTarget(); 
var appWindow = target.frontMostApp().mainWindow();

randomHorizontalLeftToRight();
randomHorizontalRightToLeft();

randomVerticalDownToUp();
randomVerticalUpToDown();