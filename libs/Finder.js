var Finder = {
    
findElement_By_name: function(name, parent){
    var start = (new Date()).getTime();	
	if (!parent) {
		parent = UIATarget.localTarget().frontMostApp();
	}
        var timeout = UIATarget.localTarget().timeout();
	var result;
	while (((new Date()).getTime() - start) < (timeout * 1000) || timeout == 0) {
		result = this._searchElements(parent, name, "name");
		if (!this.isNil(result)) {
                    //UIATarget.localTarget().delay(0.5); 
		   return result;		   
		}
	}
	//UIALogger.logFail("Unable to find element named " + name);
        //Assert.fail("Unable to find element named " + name);
        return result;
    },
  
findElement_By_value: function(value, parent){
    var start = (new Date()).getTime();	
	if (!parent) {
		parent = UIATarget.localTarget().frontMostApp();
	}
        var timeout = UIATarget.localTarget().timeout();
	var result;
	while (((new Date()).getTime() - start) < (timeout * 1000) || timeout == 0) {
		result = this._searchElements(parent, value, "value");
		if (!this.isNil(result)) {
                    UIATarget.localTarget().delay(0.5); 
		   return result;		   
		}
	}
	//UIALogger.logFail("Unable to find element named " + name);
        //Assert.fail("Unable to find element value " + value);
        return result;
    },

isNil: function(element) {
	return (element.toString() == "[object UIAElementNil]");
    },

_searchElements: function(elem, value, key) {
	try {
		UIATarget.localTarget().pushTimeout(0);		
		var result = elem.withValueForKey(value, key);
		if (!this.isNil(result)) {
                    
			return result;
		}		
		
		var elems = elem.elements();
		var i;
		for (i = 0; i < elems.length; i++) {
			var child = elems[i];		
			result = this._searchElements(child, value, key);
			if (!this.isNil(result)) {
				return result;
			}
		}
		return result;
	} finally {
		UIATarget.localTarget().popTimeout();
	}
    },
}