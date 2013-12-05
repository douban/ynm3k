#import "Finder.js"
Waiter = {
  MIN_TIME: 2,
  MID_TIME: 5,
  MAX_TIME: 8,

wait : function(times){
    var target = UIATarget.localTarget();
    target.delay(times);
    },
wait4Indicator:function(times){
    target.delay(1);
    var done = false;
    var counter = 0;
    while ((!done) && (counter < times)) {
        var indicator = Finder.findElementsByClassType("ActivityIndicator")
        if (indicator.length > 0) {
            counter++;  
            }
        else {
            done = true;           
            }
        }
    target.delay(1);
    },
wait4SystemIndicator: function(func,times,preDelay) {
    target.delay(1);        
    var done = false;
    var counter = 0;      
    while ((!done) && (counter < times)) {
        var indicator = Finder.findElementByName("Network connection in progress")
        if (indicator != "[object UIAElementNil]") {
            counter++;  
            }
        else {
            done = true;           
            }
        }
    target.delay(1);
    }
}
