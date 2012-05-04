
var IOSMonkey = {
    run: function(action, repeat, delay) {
        var me = this;
         if (action == null) {
             return;
         }
         if (repeat == null || repeat < 1) {
             repeat = 1;
         }
         if (delay == null) {
            delay = 0;
         }
         var readyActions = [];
         if (action["tap"] == true) {
             readyActions.push(function() {
                 me.tap();
                });
         }
        if (action["flick_NS"] == true) {
            readyActions.push(function() {
            me.flick_NS();
            });
         }
         if(action["flick_WE"]==true){
             readyActions.push(function(){me.flick_WE()});
         }
         if(action["doubleTap"]==true){
             readyActions.push(function(){me.doubleTap()});
         }
         if(action["shake"]==true){
             readyActions.push(function(){me.shake()});
         }
         if(action["volumeUD"]==true){
             readyActions.push(function(){me.volumeUD()});
         }
         if(action["lock"]==true){
             readyActions.push(function(){me.lock()});
         }
         var actionLength = readyActions.length;
         for (var i = 0; i < repeat; i++) {
             var index = Math.floor(Math.random() * actionLength);
             var move = readyActions[index];
             move.call(this);
             UIATarget.localTarget().delay(delay);
         }
       },
        
        /**
         * Randomly tap.
         */
        tap: function() {
            var xyobj = this._getXY();
            var target = UIATarget.localTarget();
            target.tap({x:xyobj.x,y:xyobj.y});
        },
        
        /**
         * Randomly flip.
         */
        flick_NS: function() {
           var xyobj = this._getXY();
           var target = UIATarget.localTarget();
           var mid_y = (xyobj.y2-xyobj.y1)/2;
		   var to_y = 0;
           if(xyobj.y>mid_y){
              to_y = xyobj.y-mid_y;
            }else{
              to_y = xyobj.y+mid_y;
            }
            target.flickFromTo({x:xyobj.x,y:xyobj.y},{x:xyobj.x,y:to_y});
          
        },
        
        flick_WE: function(){
            var xyobj = this._getXY();
            var target = UIATarget.localTarget();
            var mid_x = (xyobj.x2-xyobj.x1)/2;
            var to_x = 0;
            if(xyobj.x>mid_x){
                to_x = xyobj.x-mid_x;
            }else{
                to_x = xyobj.x+mid_x;
            }
            target.flickFromTo({x:xyobj.x,y:xyobj.y},{x:to_x,y:xyobj.y});
        },


        _getXY : function(){
            var target = UIATarget.localTarget();
            var app = target.frontMostApp();
            var origin_x = app.rect().origin.x;
            var origin_y = app.rect().origin.y;
            var width = app.rect().size.width;
            var height = app.rect().size.height;
            var x_x = Math.floor(width*Math.random())+origin_x;
            var y_y = Math.floor(height*Math.random())+origin_y;

            return {x:x_x,y:y_y,x1:origin_x,y1:origin_y,x2:width,y2:height};
        },


        doubleTap : function(){
            var xyobj = this._getXY();
            var target = UIATarget.localTarget();
            target.doubleTap({x:xyobj.x,y:xyobj.y});
        },

        shake : function(){
            var target = UIATarget.localTarget();
            target.shake();
        },

        lock  :function(){
			var target = UIATarget.localTarget();
            target.lockForDuration(5);
        },

        volumeUD : function(){
            var target = UIATarget.localTarget();
            if(Math.random()>0.5){
                target.clickVolumeDown();
            }else{
                target.clickVolumeUp();
            }
        }
};

action = {
   tap: true,
   flick_NS: true,
   flick_WE: true,
   doubleTap:true,
   shake:true,
   volumeUD:true,
   lock:true
}
IOSMonkey.run(action,30,0);
