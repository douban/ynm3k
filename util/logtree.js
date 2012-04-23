var target = UIATarget.localTarget(); 
var app = target.frontMostApp();
var appWindow = target.frontMostApp().mainWindow();
app.logElementTree();

//var skip_but = appWindow.buttons()[appWindow.buttons().length-1];
////skip_but.tap();
//target.delay(1);
////app.logElementTree();
//
//var song_name = appWindow.staticTexts()[appWindow.staticTexts().length-2];
//var song_time = appWindow.staticTexts()[appWindow.staticTexts().length-1];
//UIALogger.logMessage("现在的操作::::::::"+song_name.value()+"--->"+song_time.value());