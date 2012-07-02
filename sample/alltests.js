#import "../robot4ios/importAll.js";
#import "demotest.js";
#import "test.js"
#import "testscreen.js"

DYUI.tool.TestRunner.add(demotest);
DYUI.tool.TestRunner.add(test);
DYUI.tool.TestRunner.add(testscreen);
DYUI.tool.TestRunner.run();
