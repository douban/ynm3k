#import "../importAll.js";

var target = UIATarget.localTarget(); 
var appWindow = target.frontMostApp().mainWindow();

randomVerticalUpSwipe(appWindow, 10);
randomHorizontalUpSwipe(appWindow, 10);