Waiter = {
MIN_TIME: 1,
MID_TIME: 3,
MAX_TIME: 5,

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
