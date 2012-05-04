#import "../robot4ios/importAll.js";


#import "demotest.js";
#import "test.js"

var reportfilename = "/Users/komejun/Documents/doubangit/mobileapps/ynm3k/test-report/testresult.xml";
    
var handleCompeleteResult = function(testresults) {
    var reporter = new DYUI.tool.TestReporter(reportfilename);
    reporter.report(testresults['results']);
    UIALogger.logMessage("Comeplete");
}
DYUI.tool.TestRunner.subscribe(DYUI.tool.TestRunner.COMPLETE_EVENT, handleCompeleteResult);

DYUI.tool.TestRunner.add(demotest);
DYUI.tool.TestRunner.add(test);


DYUI.tool.TestRunner.run();
