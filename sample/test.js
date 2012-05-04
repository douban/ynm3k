#import "../robot4ios/importAll.js";
#import "demotest.js";

UIALogger.logMessage("testBegin");
    
var handleCompeleteResult = function(testresults) {
    var reporter = new DYUI.tool.TestReporter("/Users/komejun/Documents/publicgit/report/testreport.xml");
    reporter.report(testresults['results']);
    UIALogger.logMessage("Comeplete");
}
DYUI.tool.TestRunner.subscribe(DYUI.tool.TestRunner.COMPLETE_EVENT, handleCompeleteResult);

var demoTest = new DYUI.tool.TestCase({
    
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
         var tableviews =  Finder.scrollTo_And_Get("Empty list",15,0);
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
        Finder.findElement_By_name("Recipes").tap();
        var title = Finder.findElement_By_value("Unit Conversion");
        Assert.element_is_null(title);
        }
    }); 

DYUI.tool.TestRunner.add(demoTest);
DYUI.tool.TestRunner.add(simpleTest);
DYUI.tool.TestRunner.add(anotherSimpleTest);
DYUI.tool.TestRunner.add(testSuite);


DYUI.tool.TestRunner.run();
