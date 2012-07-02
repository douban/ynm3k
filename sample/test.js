#import "../robot4ios/importAll.js";


var test = new DYUI.tool.TestCase({
    
    name : 'UI Sample',
    
    setUp : function(){
		UIALogger.logMessage("setUp");
        //do some things before any test method in the TestCase
        },
        
    tearDown : function(){
		UIALogger.logMessage("tearDown");
        //do some things after any test method in zhe TestCase
        },
 
    test_getElementTree : function(){
        var target = UIATarget.localTarget(); 
        var app = target.frontMostApp();
        var appWindow = target.frontMostApp().mainWindow();
        app.logElementTree();
        },
    test_tableviews : function(){
         var tableviews =  Finder.scrollTo_And_Get("Empty list",15);
		Assert.element_is_not_null(tableviews);
        },
    test_addRecipes : function(){
        Finder.findElement_By_name("Unit Conversion").tap();
        Waiter.wait(Waiter.MIN_TIME);
        var target = UIATarget.localTarget(); 
        var app = target.frontMostApp();
        var appWindow = target.frontMostApp().mainWindow();
        app.logElementTree();
        var title = Finder.findElement_By_value("Unit Conversion");
        Assert.element_is_not_null(title);
        },
    test_addError : function(){
       var target = UIATarget.localTarget();
       var reci =  Finder.findElement_By_name("Recipes",target.frontMostApp().mainWindow());
       Assert.element_is_not_null(reci);
       Log(reci.name());
       Log("test"+getElement_hitpointy(reci));
       reci.tap();
       // var title = Finder.findElement_By_value("Unit Conversion");
       // Waiter.wait(10);
       // Assert.element_is_null(title);
        }
    }); 

