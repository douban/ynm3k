#import "System.js"
#import "Util.js"

var DYUI = DYUI || {}

DYUI.namespace("tool");

DYUI.tool.TestCase = function(template) {

    this._should /*:Object*/ = {};

    for (var prop in template) {
        this[prop] = template[prop];
    }
};

DYUI.tool.TestCase.prototype = {
    
    /**
     * Function to run before each test is executed.
     * @return {Void}
     * @method setUp
     */
    setUp: function() {
    },
    
    /**
     * Function to run after each test is executed.
     * @return {Void}
     * @method tearDown
     */
    tearDown: function() {
    }
};


DYUI.tool.TestSuite = function(data) {
    /**
     * The name of the test suite.
     * @type String
     * @property name
     */
    this.name /*:String*/ = "";

    /**
     * Array of test suites and
     * @private
     */
    this.items /*:Array*/ = [];

};

DYUI.tool.TestSuite.prototype = {
    /**
     * Adds a test suite or test case to the test suite.
     * @param {DYUI.tool.TestSuite||DYUI.tool.TestCase} testObject The test suite or test case to add.
     * @return {Void}
     * @method add
     */
    add : function (testObject /*:DYUI.tool.TestSuite*/) /*:Void*/ {
        if (testObject instanceof DYUI.tool.TestSuite || testObject instanceof DYUI.tool.TestCase) {
            this.items.push(testObject);
        }
    },

    //-------------------------------------------------------------------------
    // Stub Methods
    //-------------------------------------------------------------------------

    /**
     * Function to run before each test is executed.
     * @return {Void}
     * @method setUp
     */
    setUp : function () /*:Void*/ {
    },

    /**
     * Function to run after each test is executed.
     * @return {Void}
     * @method tearDown
     */
    tearDown: function () /*:Void*/ {
    }
};

DYUI.tool.TestRunner = (function() {

    /**
     * A node in the test tree structure. May represent a TestSuite, TestCase, or
     * test function.
     * @param {Variant} testObject A TestSuite, TestCase, or the name of a test function.
     * @class TestNode
     * @constructor
     * @private
     */
    function TestNode(testObject /*:Variant*/){
    
        /**
         * The TestSuite, TestCase, or test function represented by this node.
         * @type Variant
         * @property testObject
         */
        this.testObject = testObject;
        
        /**
         * Pointer to this node's first child.
         * @type TestNode
         * @property firstChild
         */
        this.firstChild /*:TestNode*/ = null;
        
        /**
         * Pointer to this node's last child.
         * @type TestNode
         * @property lastChild
         */
        this.lastChild = null;
        
        /**
         * Pointer to this node's parent.
         * @type TestNode
         * @property parent
         */        
        this.parent = null; 
   
        /**
         * Pointer to this node's next sibling.
         * @type TestNode
         * @property next
         */        
        this.next = null;
        
        /**
         * Test results for this test object.
         * @type object
         * @property results
         */                
        this.results /*:Object*/ = {
            passed : 0,
            failed : 0,
            total : 0,
            ignored : 0,
            duration: 0
        };
        
        //initialize results
        if (testObject instanceof DYUI.tool.TestSuite){
            this.results.type = "testsuite";
            this.results.name = testObject.name;
        } else if (testObject instanceof DYUI.tool.TestCase){
            this.results.type = "testcase";
            this.results.name = testObject.name;
        }
       
    }
    
    TestNode.prototype = {
    
        /**
         * Appends a new test object (TestSuite, TestCase, or test function name) as a child
         * of this node.
         * @param {Variant} testObject A TestSuite, TestCase, or the name of a test function.
         * @return {Void}
         */
        appendChild : function (testObject /*:Variant*/) /*:Void*/{
            var node = new TestNode(testObject);
            if (this.firstChild === null) {
                this.firstChild = this.lastChild = node;
            } else {
                this.lastChild.next = node;
                this.lastChild = node;
            }
            node.parent = this;
            return node;
        }
    };

    /**
     * Runs test suites and test cases, providing events to allowing for the
     * interpretation of test results.
     * @namespace DYUI.tool
     * @class TestRunner
     * @static
     */
    function TestRunner() {
    
        /**
         * Suite on which to attach all TestSuites and TestCases to be run.
         * @type DYUI.tool.TestSuite
         * @property masterSuite
         * @private
         * @static
         */
        this.masterSuite = new DYUI.tool.TestSuite("douban_ios_test" + (new Date()).getTime());

        /**
         * Pointer to the current node in the test tree.
         * @type TestNode
         * @private
         * @property _cur
         * @static
         */
        this._cur = null;
        
        /**
         * Pointer to the root node in the test tree.
         * @type TestNode
         * @private
         * @property _root
         * @static
         */
        this._root = null;
        
        /**
         * Indicates if the TestRunner is currently running tests.
         * @type Boolean
         * @private
         * @property _running
         * @static
         */
        this._running = false;
        
        /**
         * Holds copy of the results object generated when all tests are
         * complete.
         * @type Object
         * @private
         * @property _lastResults
         * @static
         */
        this._lastResults = null;

        //create events
        var events /*:Array*/ = [
            this.TEST_CASE_BEGIN_EVENT,
            this.TEST_CASE_COMPLETE_EVENT,
            this.TEST_SUITE_BEGIN_EVENT,
            this.TEST_SUITE_COMPLETE_EVENT,
            this.TEST_PASS_EVENT,
            this.TEST_FAIL_EVENT,
            this.TEST_IGNORE_EVENT,
            this.COMPLETE_EVENT,
            this.BEGIN_EVENT
        ];

        for (var i=0; i < events.length; i++){
            this.createEvent(events[i], { scope: this});
        }
    };

    DYUI.util.extend(TestRunner, DYUI.event.EventProvider, {
        /**
         * Fires when a test case is opened but before the first 
         * test is executed.
         * @event testcasebegin
         */
        TEST_CASE_BEGIN_EVENT /*:String*/ : "testcasebegin",

        /**
         * Fires when all tests in a test case have been executed.
         * @event testcasecomplete
         */        
        TEST_CASE_COMPLETE_EVENT /*:String*/ : "testcasecomplete",

        /**
         * Fires when a test suite is opened but before the first 
         * test is executed.
         * @event testsuitebegin
         */        
        TEST_SUITE_BEGIN_EVENT /*:String*/ : "testsuitebegin",

        /**
         * Fires when all test cases in a test suite have been
         * completed.
         * @event testsuitecomplete
         */        
        TEST_SUITE_COMPLETE_EVENT /*:String*/ : "testsuitecomplete",

        /**
         * Fires when a test has passed.
         * @event pass
         */        
        TEST_PASS_EVENT /*:String*/ : "pass",

        /**
         * Fires when a test has failed.
         * @event fail
         */        
        TEST_FAIL_EVENT /*:String*/ : "fail",

        /**
         * Fires when a test has been ignored.
         * @event ignore
         */        
        TEST_IGNORE_EVENT /*:String*/ : "ignore",

        /**
         * Fires when all test suites and test cases have been completed.
         * @event complete
         */        
        COMPLETE_EVENT /*:String*/ : "complete",

        /**
         * Fires when the run() method is called.
         * @event begin
         */        
        BEGIN_EVENT /*:String*/ : "begin",

        //-------------------------------------------------------------------------
        // Misc Methods
        //-------------------------------------------------------------------------

        /**
         * Retrieves the name of the current result set.
         * @return {String} The name of the result set.
         * @method getName
         */
        getName : function(){
            return this.masterSuite.name;
        },

        /**
         * The name assigned to the master suite of the TestRunner. This is the name
         * that is output as the root's name when results are retrieved.
         * @param {String} name The name of the result set.
         * @return {Void}
         * @method setName
         */
        setName : function(name){
            this.masterSuite.name = name;
        },

        //-------------------------------------------------------------------------
        // Test Tree-Related Methods
        //-------------------------------------------------------------------------

        /**
         * Adds a test case to the test tree as a child of the specified node.
         * @param {TestNode} parentNode The node to add the test case to as a child.
         * @param {DYUI.tool.TestCase} testCase The test case to add.
         * @return {Void}
         * @static
         * @private
         * @method _addTestCaseToTestTree
         */
        _addTestCaseToTestTree : function (parentNode /*:TestNode*/, testCase /*:DYUI.tool.TestCase*/) /*:Void*/{
            //add the test suite
            var node = parentNode.appendChild(testCase);
            
            //iterate over the items in the test case
            for (var prop in testCase){
                if (prop.indexOf("test") === 0 && DYUI.util.isFunction(testCase[prop])){
                    node.appendChild(prop);
                }
            }
         
        },
        
        /**
         * Adds a test suite to the test tree as a child of the specified node.
         * @param {TestNode} parentNode The node to add the test suite to as a child.
         * @param {DYUI.tool.TestSuite} testSuite The test suite to add.
         * @return {Void}
         * @static
         * @private
         * @method _addTestSuiteToTestTree
         */
        _addTestSuiteToTestTree : function (parentNode /*:TestNode*/, testSuite /*:DYUI.tool.TestSuite*/) /*:Void*/ {
            
            //add the test suite
            var node = parentNode.appendChild(testSuite);
            
            //iterate over the items in the master suite
            for (var i=0; i < testSuite.items.length; i++){
                if (testSuite.items[i] instanceof DYUI.tool.TestSuite) {
                    this._addTestSuiteToTestTree(node, testSuite.items[i]);
                } else if (testSuite.items[i] instanceof DYUI.tool.TestCase) {
                    this._addTestCaseToTestTree(node, testSuite.items[i]);
                }
            }
        },

        /**
         * Builds the test tree based on items in the master suite. The tree is a hierarchical
         * representation of the test suites, test cases, and test functions. The resulting tree
         * is stored in _root and the pointer _cur is set to the root initially.
         * @return {Void}
         * @static
         * @private
         * @method _buildTestTree
         */
        _buildTestTree : function () /*:Void*/ {

            this._root = new TestNode(this.masterSuite);
            
            //iterate over the items in the master suite
            for (var i=0; i < this.masterSuite.items.length; i++){
                if (this.masterSuite.items[i] instanceof DYUI.tool.TestSuite) {
                    this._addTestSuiteToTestTree(this._root, this.masterSuite.items[i]);
                } else if (this.masterSuite.items[i] instanceof DYUI.tool.TestCase) {
                    this._addTestCaseToTestTree(this._root, this.masterSuite.items[i]);
                }
            }

        },

        /**
         * Returns the last complete results set from the TestRunner. Null is returned
         * if the TestRunner is running or no tests have been run.
         * @param {Function} format (Optional) A test format to return the results in.
         * @return {Object|String} Either the results object or, if a test format is 
         *      passed as the argument, a string representing the results in a specific
         *      format.
         * @method getResults
         */
        getResults : function(format){
            if (!this._running && this._lastResults) {
                if (DYUI.util.isFunction(format)) {
                    return format(this._lastResults);
                } else {
                    return this._lastResults;
                }
            } else {
                return null;
            }
        },

        /**
         * Handles the completion of a test object's tests. Tallies test results 
         * from one level up to the next.
         * @param {TestNode} node The TestNode representing the test object.
         * @return {Void}
         * @method _handleTestObjectComplete
         * @private
         * @static
         */
        _handleTestObjectComplete : function (node /*:TestNode*/) /*:Void*/ {
            if (DYUI.util.isObject(node.testObject)){
                node.parent.results.passed += node.results.passed;
                node.parent.results.failed += node.results.failed;
                node.parent.results.total += node.results.total;
                node.parent.results.ignored += node.results.ignored;
                node.parent.results[node.testObject.name] = node.results;
            
                if (node.testObject instanceof DYUI.tool.TestSuite){
                    node.testObject.tearDown();
                    node.results.duration = (new Date()) - node._start;
                    this.fireEvent(this.TEST_SUITE_COMPLETE_EVENT, { testSuite: node.testObject, results: node.results});
                } else if (node.testObject instanceof DYUI.tool.TestCase){
                    node.results.duration = (new Date()) - node._start;
                    this.fireEvent(this.TEST_CASE_COMPLETE_EVENT, { testCase: node.testObject, results: node.results});
                }
            } 
        },

        //-------------------------------------------------------------------------
        // Navigation Methods
        //-------------------------------------------------------------------------
        
        /**
         * Retrieves the next node in the test tree.
         * @return {TestNode} The next node in the test tree or null if the end is reached.
         * @private
         * @static
         * @method _next
         */
        _next : function () /*:TestNode*/ {
                
            if (this._cur === null) {
                this._cur = this._root;
            } else if (this._cur.firstChild) {
                this._cur = this._cur.firstChild;
            } else if (this._cur.next) {
                this._cur = this._cur.next;
            } else {
                while (this._cur && !this._cur.next && this._cur !== this._root){
                    this._handleTestObjectComplete(this._cur);
                    this._cur = this._cur.parent;
                }
                
                if (this._cur == this._root){
                    this._cur.results.type = "report";
                    this._cur.results.timestamp = (new Date()).toLocaleString();
                    this._cur.results.duration = (new Date()) - this._cur._start;
                    this._lastResults = this._cur.results;
                    this._running = false;
                    this.fireEvent(this.COMPLETE_EVENT, { results: this._lastResults});
                    this._cur = null;
                } else {
                    this._handleTestObjectComplete(this._cur);
                    this._cur = this._cur.next;
                }
            }
            return this._cur;
        },

        /**
         * Runs a test case or test suite, returning the results.
         * @param {DYUI.tool.TestCase|DYUI.tool.TestSuite} testObject The test case or test suite to run.
         * @return {Object} Results of the execution with properties passed, failed, and total.
         * @private
         * @method _run
         * @static
         */
        _run : function () /*:Void*/ {
                                
            //flag to indicate if the TestRunner should wait before continuing
            var shouldWait = false;
            
            //get the next test node
            var node = this._next();

            
            if (node !== null) {
            
                //set flag to say the testrunner is running
                this._running = true;
                
                //eliminate last results
                this._lastResult = null;
            
                var testObject = node.testObject;
                
                //figure out what to do
                if (DYUI.util.isObject(testObject)){
                    if (testObject instanceof DYUI.tool.TestSuite){
                        this.fireEvent(this.TEST_SUITE_BEGIN_EVENT, { testSuite: testObject });
                        node._start = new Date();
                        testObject.setUp();
                    } else if (testObject instanceof DYUI.tool.TestCase){
                        this.fireEvent(this.TEST_CASE_BEGIN_EVENT, { testCase: testObject });
                        node._start = new Date();
                    }
                    
                    //some environments don't support setTimeout
                    if (typeof setTimeout != "undefined"){                    
                        setTimeout(function(){
                            DYUI.tool.TestRunner._run();
                        }, 0);
                    } else {
                        this._run();
                    }
                    
                } else {
                    this._runTest(node);
                }
            }
        },

        _resumeTest : function (segment /*:Function*/) /*:Void*/ {
            
            //get relevant information
            var node /*:TestNode*/ = this._cur;
            var testName /*:String*/ = node.testObject;
            var testCase /*:DYUI.tool.TestCase*/ = node.parent.testObject;
            
            //variable to hold whether or not the test failed
            var failed /*:Boolean*/ = false;
            var error /*:Error*/ = null;
                
            //try the test
            try {
            
                //run the test
                segment.apply(testCase);
                
            } catch (thrown /*:Error*/){
                error = thrown;
                failed = true;
            }
            
          //fireEvent appropriate event
            if (failed) {
                this.fireEvent(this.TEST_FAIL_EVENT, { testCase: testCase, testName: testName, error: error });
                UIALogger.logFail(testName + " has failed and error is: " + error);
            } else {
                this.fireEvent(this.TEST_PASS_EVENT, { testCase: testCase, testName: testName });
                UIALogger.logPass(testName + " has passed...");
            }

            
            //run the tear down
            testCase.tearDown();
        
            //calculate duration
            var duration = (new Date()) - node._start;
            
            //update results
            node.parent.results[testName] = { 
                result: failed ? "fail" : "pass",
                message: error ? error: "Test passed",
                type: "test",
                name: testName,
                duration: duration
            };
            
            if (failed) {
                node.parent.results.failed++;
            } else {
                node.parent.results.passed++;
            }
            node.parent.results.total++;

            //set timeout not supported in all environments
            if (typeof setTimeout != "undefined"){
                setTimeout(function(){
                    DYUI.tool.TestRunner._run();
                }, 0);
            } else {
                this._run();
            }
        
        },

        /**
         * Runs a single test based on the data provided in the node.
         * @param {TestNode} node The TestNode representing the test to run.
         * @return {Void}
         * @static
         * @private
         * @name _runTest
         */
        _runTest : function (node /*:TestNode*/) /*:Void*/ {
        
            //get relevant information
            var testName /*:String*/ = node.testObject;
            var testCase /*:DYUI.tool.TestCase*/ = node.parent.testObject;
            var test /*:Function*/ = testCase[testName];
            
            //get the "should" test cases
            var shouldIgnore /*:Object*/ = (testCase._should.ignore || {})[testName];
            
            //figure out if the test should be ignored or not
            if (shouldIgnore){
            
                //update results
                node.parent.results[testName] = { 
                    result: "ignore",
                    message: "Test ignored",
                    type: "test",
                    name: testName
                };
                
                node.parent.results.ignored++;
                node.parent.results.total++;

                this.fireEvent(this.TEST_IGNORE_EVENT, { testCase: testCase, testName: testName });

                //some environments don't support setTimeout
                if (typeof setTimeout != "undefined"){
                    setTimeout(function(){
                        DYUI.tool.TestRunner._run();
                    }, 0);              
                } else {
                    this._run();
                }

            } else {
            
                //mark the start time
                node._start = new Date();
            
                //run the setup
                testCase.setUp();
                
                //now call the body of the test
                this._resumeTest(test);
            }

        },

        //-------------------------------------------------------------------------
        // Protected Methods
        //-------------------------------------------------------------------------   
    
        /**
         * Fires events for the TestRunner. This overrides the default fireEvent()
         * method from EventProvider to add the type property to the data that is
         * passed through on each event call.
         * @param {String} type The type of event to fire.
         * @param {Object} data (Optional) Data for the event.
         * @method fireEvent
         * @static
         * @protected
         */
        fireEvent : function (type /*:String*/, data /*:Object*/) /*:Void*/ {
            data = data || {};
            data.type = type;
            TestRunner.superclass.fireEvent.call(this, type, data);
        },
        
        //-------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------   

        /**
         * Adds a test suite or test case to the list of test objects to run.
         * @param testObject Either a TestCase or a TestSuite that should be run.
         * @return {Void}
         * @method add
         * @static
         */
        add : function (testObject /*:Object*/) /*:Void*/ {
            this.masterSuite.add(testObject);
        },

        /**
         * Removes all test objects from the runner.
         * @return {Void}
         * @method clear
         * @static
         */
        clear : function () /*:Void*/ {
            this.masterSuite = new DYUI.tool.TestSuite("douban_ios_tests" + (new Date()).getTime());
        },

        /**
         * Runs the test suite.
         * @param {Boolean} oldMode (Optional) Specifies that the <= 2.8 way of
         *      internally managing test suites should be used.
         * @return {Void}
         * @method run
         * @static
         */
        run : function (oldMode) {
            
            //Check if the iOS version is greater than 5.
            var version = System.getDeviceVersion();
            var mainVersion = version.split(".");

            if (mainVersion[0] < 5) {
                UIALogger.logFail("The ynm3k cannot run on ios which version is less than 5");
                return;
            }
            var handleCompeleteResult = function(testresults) {
                    var reportfilename = System.createFile("test.xml")
                        var reporter = new DYUI.tool.TestReporter(reportfilename);
                        reporter.report(testresults['results']);
                        UIALogger.logMessage("ALL test finished,and the report is: "+reportfilename);
            }
            DYUI.tool.TestRunner.subscribe(DYUI.tool.TestRunner.COMPLETE_EVENT, handleCompeleteResult);
            
            //pointer to runner to avoid scope issues 
            var runner = DYUI.tool.TestRunner;
            
            //if there's only one suite on the masterSuite, move it up
            if (!oldMode && this.masterSuite.items.length == 1 && this.masterSuite.items[0] instanceof DYUI.tool.TestSuite){
                this.masterSuite = this.masterSuite.items[0];
            }

            //build the test tree
            runner._buildTestTree();
            
            //set when the test started
            runner._root._start = new Date();
                            
            //begin the testing
            runner._run();
        }
    });
    return new TestRunner();

})();

DYUI.namespace("tool.TestFormat");

/**
 * Returns test results formatted in JUnit XML format.
 * @param {Object} result The results object created by TestRunner.
 * @return {String} An XML-formatted string of results.
 * @namespace DYUI.tool.TestFormat
 * @method JUnitXML
 * @static
 */
DYUI.tool.TestFormat.JUnitXML = function(results) {

    function serializeToJUnitXML(results){
        var l = DYUI.util,
            xml = "",
            prop;
        switch (results.type){
            //equivalent to testcase in JUnit
            case "test":
                if (results.result != "ignore"){
                    xml = "<testcase name=\"" + l.xmlEscape(results.name) + "\">";
                    if (results.result == "fail"){
                        xml += "<failure message=\"" + l.xmlEscape(results.message) + "\"><![CDATA[" + results.message + "]]></failure>";
                    }
                    xml+= "</testcase>";
                }
                break;
                
            //equivalent to testsuite in JUnit
            case "testcase":
            
                xml = "<testsuite name=\"" + l.xmlEscape(results.name) + "\" tests=\"" + results.total + "\" failures=\"" + results.failed + "\">";
            
                for (prop in results) {
                    if (l.isObject(results[prop]) && !l.isArray(results[prop])){
                        xml += serializeToJUnitXML(results[prop]);
                    }
                }
                
                xml += "</testsuite>";
                break;
            
            case "testsuite":
                for (prop in results) {
                    if (l.isObject(results[prop]) && !l.isArray(results[prop])){
                        xml += serializeToJUnitXML(results[prop]);
                    }
                } 

                //skip output - no JUnit equivalent
                break;
                
            case "report":
            
                xml = "<testsuites>";
            
                for (prop in results) {
                    if (l.isObject(results[prop]) && !l.isArray(results[prop])){
                        xml += serializeToJUnitXML(results[prop]);
                    }
                }
                
                xml += "</testsuites>";
            
            //no default
        }
        
        return xml;
 
    }

    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + serializeToJUnitXML(results);
};
/**
 * An object capable of sending test results to a server.
 * @param {String} path The report file path to submit the results to.
 * @param {Function} format (Optional) A function that outputs the results in a specific format.
 *      Default is DYUI.tool.TestFormat.JUnitXML.
 * @constructor
 * @namespace DYUI.tool
 * @class TestReporter
 */
DYUI.tool.TestReporter = function(path /*:String*/, format /*:Function*/) {

    this.path = path;

    this.format = format || DYUI.tool.TestFormat.JUnitXML;
};

/**
 * Sends the report to the server.
 * @param {Object} results The results object created by TestRunner.
 * @return {Void}
 * @method report
 */

DYUI.tool.TestReporter.prototype = {

    /**
     * Sends the report to the server.
     * @param {Object} results The results object created by TestRunner.
     * @return {Void}
     * @method report
     */
    report: function(results) {
        var reportText = this.format(results);
        System.writeFile(this.path, reportText, "false");
    }
};
