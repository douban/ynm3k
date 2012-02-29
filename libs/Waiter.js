Waiter = {
MIN_TIME: 2,
MID_TIME: 5,
MAX_TIME: 8,

wait : function(times){
    var target = UIATarget.localTarget();
    target.delay(times);
    }
}