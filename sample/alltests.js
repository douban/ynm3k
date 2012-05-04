#import "../robot4ios/importAll.js";


#import "demotest.js";
#import "test.js"

UIALogger.logMessage("test begin");

var reportfilename = "/Users/komejun/Documents/publicgit/robot4ios/ynm3k-reports/test.xml"  
var handleCompeleteResult = function(testresults) {
    //var reportfilename = System.createFile("test.xml")
    var reporter = new DYUI.tool.TestReporter(reportfilename);
    reporter.report(testresults['results']);
    UIALogger.logMessage("Comeplete");
}
DYUI.tool.TestRunner.subscribe(DYUI.tool.TestRunner.COMPLETE_EVENT, handleCompeleteResult);

DYUI.tool.TestRunner.add(demotest);
DYUI.tool.TestRunner.add(test);


DYUI.tool.TestRunner.run();
