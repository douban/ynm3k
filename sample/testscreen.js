#import "../robot4ios/importAll.js";


var testscreen = new DYUI.tool.TestCase({
    
    name : 'Screen Shoot',
    
    setUp : function(){
		UIALogger.logMessage("setUp");
        //do some things before any test method in the TestCase
        },
        
    tearDown : function(){
		UIALogger.logMessage("tearDown");
        //do some things after any test method in zhe TestCase
        },
 
    test_diff : function(){
        screenShoot("test1");
        Finder.findElement_By_name("Unit Conversion").tap();
        Waiter.wait(Waiter.MIN_TIME);
        screenShoot("test2");
        Assert.isFalse(diffPNG("test1","test2"))
        },
    test_same : function(){
        screenShoot("test3");
        screenShoot("test4");

        Assert.isTrue(diffPNG("test3","test4"));
        }
    });

