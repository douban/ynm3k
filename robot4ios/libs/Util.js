var DYUI = DYUI || {};

(function() {
    DYUI.namespace = function() {
        var a = arguments, o = null, i, j, d;
        for (i = 0; i < a.length; i = i + 1) {
            d = ("" + a[i]).split(".");
            o = DYUI;
    
            for (j = (d[0] == "DYUI") ? 1 : 0; j < d.length; j = j + 1) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
        return o;
    };
    
    DYUI.namespace('consts');

    DYUI.consts.OP = Object.prototype;
    DYUI.consts.FUNCTION_TOSTRING = '[object Function]';
    DYUI.consts.ARRAY_TOSTRING = '[object Array]';
    
    DYUI.namespace('util');
    
    DYUI.util = {
        isFunction: function(o) {
            return (typeof o === 'function') || DYUI.consts.OP.toString.apply(o) === DYUI.consts.FUNCTION_TOSTRING;
        },
        
        isObject: function(o) {
            return (o && (typeof o === 'object' || DYUI.util.isFunction(o))) || false;
        },
        
        isString: function(o) {
            return typeof o === 'string';
        },
        
        isArray: function(o) {
            return DYUI.consts.OP.toString.apply(o) === DYUI.consts.ARRAY_TOSTRING;
        },
        
        isDict: function(o) {
            return DYUI.contes.OP.toString.applay(o) === DYUI.contes.DICT_TOSTRING;
        },
        
        /**
         * (intentionally not documented)
         * Simple escape function for XML attribute values.
         * @param {String} text The text to escape.
         * @return {String} The escaped text.
         */
        xmlEscape: function(text){
            var text1 = text+"";
            return text1.replace(/["'<>&]/g, function(c){
                switch(c){
                    case "<":   return "&lt;";
                    case ">":   return "&gt;";
                    case "\"":  return "&quot;";
                    case "'":   return "&apos;";
                    case "&":   return "&amp;";
                }
            });
        },
        
        /**
         * Utility to set up the prototype, constructor and superclass properties to
         * support an inheritance strategy that can chain constructors and methods.
         * Static members will not be inherited.
         *
         * @method extend
         * @static
         * @param {Function} subc   the object to modify
         * @param {Function} superc the object to inherit
         * @param {Object} overrides  additional properties/methods to add to the
         *                              subclass prototype.  These will override the
         *                              matching items obtained from the superclass
         *                              if present.
         */
        extend: function(subc, superc, overrides) {
            if (!superc||!subc) {
                throw new Error("extend failed, please check that " +
                                "all dependencies are included.");
            }
            var F = function() {}, i;
            F.prototype=superc.prototype;
            subc.prototype=new F();
            subc.prototype.constructor=subc;
            subc.superclass=superc.prototype;
            if (superc.prototype.constructor == DYUI.consts.OP.constructor) {
                superc.prototype.constructor = superc;
            }

            if (overrides) {
                for (i in overrides) {
                    subc.prototype[i]=overrides[i];
                }
            }
        },
    };
})();


DYUI.namespace('event');

DYUI.event.Event = function(name) {

    this.name = name;

    return this;
};

DYUI.event.Event.prototype = {
    
};

DYUI.event.EventProvider = function() {
    
};


DYUI.event.EventProvider.prototype = {
    __douban_events : null,
    
    __douban_subscribers : null,
    
    /**
     * Subscribe the event with the given callback.
     * @param event
     * @param callback
     */
    subscribe : function(event, callback) {
        this.__douban_events = this.__douban_events || {};
        var theEvent = this.__douban_events[event];
        if (theEvent) {
            this.__douban_subscribers = this.__douban_subscribers || {};
            this.__douban_subscribers[event] = this.__douban_subscribers[event] || [];
            this.__douban_subscribers[event].push(callback);
        }
    },
    
    /**
     * Create a event into the list.
     * When an event is fired, only the event in this list would be notified.
     * @param event
     */
    createEvent : function(event) {
        this.__douban_events = this.__douban_events || {};
        this.__douban_events[event] = new DYUI.event.Event(event);
    },
    
    /**
     * Fire 
     * @param event
     * @param type
     * @param data
     */
    fireEvent : function(event, data) {
        this.__douban_subscribers = this.__douban_subscribers || {};
        var subscribers = this.__douban_subscribers[event] || [], i;
        for (i = 0; i < subscribers.length; i++) {
            subscribers[i].call(this, data);
        }
    }
};
