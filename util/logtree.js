var target = UIATarget.localTarget(); 
var app = target.frontMostApp();
var appWindow = target.frontMostApp().mainWindow();
app.logElementTree();