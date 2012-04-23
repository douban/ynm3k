#import "../importAll.js";


/*
System.writeFile(reporter,"Device model:"+ System.getDeviceModel(),"true");
System.writeFile(reporter,"Screen width:"+ target.rect().size.width,"true");
System.writeFile(reporter,"Screen height:"+ target.rect().size.height,"true");
System.writeFile(reporter,"Decice OSVersion:"+ System.getDeviceVersion(),"true");
System.writeFile(reporter,"UTA name:"+ System.getUTABundleID(),"true");
System.writeFile(reporter,"UTA version:"+ System.getUTAVersion(),"true");
*/

var handleCompeleteResult = function(testresults) {
    
    var reporter = new DYUI.tool.TestReporter("/Users/xiaoxiao/workspace/temp/testreport.xml");
    reporter.report(testresults['results']);
    UIALogger.logMessage("Comeplete");
}

var handleFailResult = function(data) {
    for (var i in data) {
        UIALogger.logMessage("i is: " + i + " obj is " + data[i]);
    }
}

DYUI.tool.TestRunner.subscribe(DYUI.tool.TestRunner.COMPLETE_EVENT, handleCompeleteResult);
//DYUI.tool.TestRunner.subscribe(DYUI.tool.TestRunner.TEST_FAIL_EVENT, handleFailResult);

var simpleTest = new DYUI.tool.TestCase({

    name : 'simpleTest',

    setUp : function() {
        UIALogger.logMessage("setUp");
    },

    testSomething : function() {
        UIALogger.logMessage("SimpleTest");
        Assert.fail("Fail Thanks");
    },

    testAnotherthing : function() {
        UIALogger.logMessage("AnotherTest");
        Assert.areEqual(1,2,"must be failed!");
    },

    testYetAnotherthing : function() {
        UIALogger.logMessage("YetAnotherTest");
    },

    tearDown : function() {
        UIALogger.logMessage("TearDown");
    }
});


var anotherSimpleTest = new DYUI.tool.TestCase({

    name : 'anotherSimpleTest',

    setUp : function() {
        UIALogger.logMessage("AnotherSetUp");
    },

    testSomething : function() {
        UIALogger.logMessage("ComplicatedTest");
    },

    testAnotherthing : function() {
        UIALogger.logMessage("Nothing serious");
    }
});


var testSuite = new DYUI.tool.TestSuite("TestSuite Name");
testSuite.add(new DYUI.tool.TestCase({

    name : 'testInSuite',

    setUp : function() {
        UIALogger.logMessage("SuiteAnotherSetUp");
    },

    testSomething : function() {
		var d = new Date();
		UIALogger.logMessage("test"+d.getTime());
		Waiter.wait(3);
		var e = new Date();
		UIALogger.logMessage("test"+e.getTime());
        UIALogger.logMessage("SuiteComplicatedTest");
    },
    testAnotherthing : function() {
        UIALogger.logMessage("SuiteNothing serious");
    }
}));

DYUI.tool.TestRunner.add(simpleTest);
DYUI.tool.TestRunner.add(anotherSimpleTest);
DYUI.tool.TestRunner.add(testSuite);
DYUI.tool.TestRunner.run();


