var target = UIATarget.localTarget(); 

//target.setLocation({'longitude':'116.397428','latitude':'39.90923'})

//target.setLocation({'longitude':'116.48735','latitude':'39.98816'})

target.logElementTree();

//var skip_but = appWindow.buttons()[appWindow.buttons().length-1];
////skip_but.tap();
//target.delay(1);
////app.logElementTree();
//
//var song_name = appWindow.staticTexts()[appWindow.staticTexts().length-2];
//var song_time = appWindow.staticTexts()[appWindow.staticTexts().length-1];
//UIALogger.logMessage("现在的操作::::::::"+song_name.value()+"--->"+song_time.value());