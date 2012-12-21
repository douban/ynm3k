Waiter = {
MIN_TIME: 2,
MID_TIME: 5,
MAX_TIME: 8,

wait : function(times){
    var target = UIATarget.localTarget();
    target.delay(times);
    },
wait4IndicatorDis: function(func,times,preDelay) {        
    if (!preDelay) {
        target.delay(0);
        }
    else {
        target.delay(preDelay);
        }

    var done = false;
    var counter = 0;      
    while ((!done) && (counter < times)) {
        var indicator = func
        if (indicator != "[object UIAElementNil]") {
            target.delay(0.5);
            counter++;  
            }
        else {
            done = true;           
            }
        }
    target.delay(0.5);
    }
}
