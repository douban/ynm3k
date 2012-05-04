#import "../robot4ios/importAll.js";

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
        Assert.areEqual(1,2,"why");
       // Assert.fail("testtest");
    },

    testAnotherthing : function() {
        UIALogger.logMessage("Nothing serious");
    }
});


var demotest = new DYUI.tool.TestSuite("TestSuite Name");
demotest.add(new DYUI.tool.TestCase({

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
demotest.add(simpleTest);
demotest.add(anotherSimpleTest);
