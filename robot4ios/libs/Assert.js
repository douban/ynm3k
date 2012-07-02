#import "Finder.js"
#import "Tools.js"
var Assert = {
    
    _formatMessage : function (customMessage, defaultMessage) {
        if (typeof customMessage == "string" && customMessage.length > 0){
            return customMessage.replace("{message}", defaultMessage);
        } else {
            return defaultMessage;
        }        
    },
    
    _getComparisonFailureMessage : function(message,expected,actual){
        if(expected ==""){
            return message  +"   Actual: " + actual;        
            }else{
            return message + "    Expected: " + expected +"    Actual: " + actual;
        }
        
    },
    
    fail: function(message){
         throw Assert._formatMessage(message, "Test force-failed.");
    },
    
    element_is_null: function(ele,message){
        if(!Finder.isNil(ele)) {
            throw Assert._formatMessage(message, "the element is not null");
        }
    },
    
    element_is_not_null: function(ele,message){
        if(Finder.isNil(ele)) {
            throw Assert._formatMessage(message, "the element is  null");
        }
    },

    element_is_visible: function(ele,message){
        if(!ele.isVisible()){
            throw Assert._formatMessage(message,"the element is not visible");
        }
    },

    element_is_not_visible: function(ele,message){
        if(ele.isVisible()){
            throw Assert._formatMessage(message,"the element is visible");
        }
    },

    element_is_enabled: function(ele,message){
        if(!ele.isEnabled()){
            throw Assert._formatMessage(message,"the element is not enabled");
        }
    },

    element_is_not_enabled: function(ele,message){
        if(ele.isEnabled()){
            throw Assert._formatMessage(message,"the element is enabled");
        }
    },

    element_is_valid: function(ele,message){
        if(!ele.isValid()){
            throw Assert._formatMessage(message,"the element is not valid");
        }
    },

    element_is_not_valid: function(ele,message){
        if(ele.isValid()){
            throw Assert._formatMessage(message,"the element is valid");
        }
    },

    elemen_is_inscreen: function(ele,message){
        if(!inScreen(ele)){
            throw Assert._formatMessage(message,"the element is in screen");
        }
    },
    
     areEqual : function (expected, actual, message) {
        if (expected != actual) {
            throw Assert._getComparisonFailureMessage(Assert._formatMessage(message, "Values should be equal."), expected, actual);
        }
    },
    
    areNotEqual: function (expected, actual ,message){
        if(expected == actual){
                throw Assert._getComparisonFailureMessage(Assert._formatMessage(message, "Values should not equal."), expected, actual);
            }
    },
    
    isFalse : function (actual, message) {
        if (false !== actual) {
            throw Assert._getComparisonFailureMessage(Assert._formatMessage(message, "Value should be false."), false, actual);
        }
    },
    
    isTrue : function (actual, message) {
        if (true !== actual) {
            throw Assert._getComparisonFailureMessage(Assert._formatMessage(message, "Value should be false."), true, actual);
        }
    },
    isNaN : function (actual, message){
        if (!isNaN(actual)){
            throw Assert._getComparisonFailureMessage(Assert._formatMessage(message, "Value should be NaN."), NaN, actual);
        }    
    },
    
    isNotNaN : function (actual, message){
        if (isNaN(actual)){
            throw Assert._getComparisonFailureMessage(Assert._formatMessage(message, "Value should  NaN."), NaN, actual);
        }    
    },
    
    isNumber : function (actual, message) {
        if (typeof actual != "number"){
            throw Assert._getComparisonFailureMessage(Assert._formatMessage(message, "Value should be a number."),"", actual);
        }    
    },  
    
    isObject : function (actual, message) {
        if (!actual || (typeof actual != "object" && typeof actual != "function")){
            throw Assert._getComparisonFailureMessage(Assert._formatMessage(message, "Value should be an object."),"", actual);
        }
    },
    
}
