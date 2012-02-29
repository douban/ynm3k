#import "Finder.js"
var Assert = {
fail: function(message){
     throw message;
},

element_is_null: function(ele,message){
    if(!Finder.isNil(ele)){
        throw "the element is not null";
        }
},

element_is_not_null: function(ele){
    if(Finder.isNil(ele)){
        throw "the element is not null";
        }
},


}