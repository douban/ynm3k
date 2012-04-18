#import "Finder.js"
var Assert = {
    
    _formatMessage : function (customMessage, defaultMessage) {
        if (typeof customMessage == "string" && customMessage.length > 0){
            return customMessage.replace("{message}", defaultMessage);
        } else {
            return defaultMessage;
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
    }
}