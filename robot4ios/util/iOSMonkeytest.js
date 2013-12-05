
function iOSMonkey2(){

	this.elementArray = null;

	this._addToArray = function(root,len){
		if( root.toString()!= "[object UIAActivityIndicator]" && root.toString() != "[object UIAKey]" && root.name() != "NoTap"){
			//if(root.isEnabled() && root.isVisible()){
				if(len==0){
					if(root.hitpoint() != null){
						this.elementArray.push(root);
					}
				}
				if(this._toFlick(root) || this._toType(root)){
					this.elementArray.push(root);
				}
			//}
		}
	}

	this._iterator = function(root){
		var eleArray = null;
		if(root.toString() !="[object UIAWebView]" && root.toString() != "[object UIAKeyboard]"){
			eleArray = root.elements();
			this._addToArray(root,eleArray.length);

			if(eleArray.length != 0 && eleArray != null){
				for(var i = 0; i< eleArray.length; i++){
					this._iterator(eleArray[i]);
				}
			}
		}
	}
	this._getAllElements = function(){
		var app = UIATarget.localTarget().frontMostApp();
		this.elementArray = null;
		this.elementArray = new Array();
		this._iterator(app);
	}
	
	this._toFlick = function(element){
		if(element.toString()=="[object UIATableView]" || element.toString()=="[object UIAScrollView]" || element.toString()=="[object UIATableCell]"){
			return 1;
		}
		return 0;
	}

	this._toType = function(element){
		if(element.toString()=="[object UIATextField]" || element.toString()=="[object UIASecureTextField]" || element.toString()=="[object UIATextView]"){
			return 1;
		}
		return 0;
	}

	this.printArray = function(){
		this._getAllElements();
		for(var i=0;i<this.elementArray.length;i++){
			UIALogger.logMessage("type:"+this.elementArray[i].toString()+"->"+"visable:"+this.elementArray[i].isVisible()+"->"+"enable:"+this.elementArray[i].isEnabled()+"->"+"valid:"+this.elementArray[i].checkIsValid()+"->"+"name:"+this.elementArray[i].name());
		}
	}
}

mon = new iOSMonkey2();
UIATarget.localTarget().setTimeout(0);
mon.printArray();
