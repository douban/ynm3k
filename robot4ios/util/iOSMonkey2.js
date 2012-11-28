/*
 *
 *
 */

function iOSMonkey2(){

	this.elementArray = null;

	this._addToArray = function(root,len){
		var rootname = root.name()+""
		rootname = rootname.toLowerCase();
		if( !this._isIndicator(root) && root.toString() != "[object UIAKey]" && rootname.match("notap"+"$") !="notap" ){
			if(root.isEnabled() && root.isVisible()){
				if(len==0){
					if(root.hitpoint() != null){
						var rect = root.hitpoint();
						if(rect.y>20){
							this.elementArray.push(root);
						}
					}
				}
				if(this._toFlick(root) || this._toType(root)){
					this.elementArray.push(root);
				}
			}
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

	this._isIndicator = function(element){
		return element.toString().match("Indicator"+"$")=="Indicator";
	}

	this._findIndicator = function(root){
		var elements = root.elements();
		if(elements.length !=0 && elements != null){
			for(var i =0; i<elements.length;i++){
				if(this._isIndicator(elements[i])){
					return 1;
				}
				this._findIndicator(elements[i]);
			}
		}
	}

	this._getAllElements = function(){
		var app = UIATarget.localTarget().frontMostApp();
		this.elementArray = null;
		this.elementArray = new Array();
		this._iterator(app);
	}

	this._getElementAncestry = function(element){
		var arr = element.ancestry();
		var tmp = ""
			for(var i = 0; i< arr.length; i++){
				tmp += arr[i].toString()+"->"
			}
		return tmp;
	}

	this._selector = function(){
		this._getAllElements();
		var len = this.elementArray.length;
		//UIALogger.logMessage(len+"");
		var random = Math.round(Math.random() * len);
		if (random == len){
			random = random-1;
		}
		return this.elementArray[random];
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

	this._tap = function(element){
		if(element.toString()=="[object UIASwitch]"){
			if(element.value() != "" && element.value() != null){
				element.setValue(this._falseString(element.value()));
			}
		}else{
			var x = Math.random().toFixed(2);
			var y = Math.random().toFixed(2);
			element.tapWithOptions({tapOffset:{x:x,y:y}});
		}

	}


	this._flick = function(element){
		//element.scrollToVisible();
		var x = Math.random().toFixed(2);
		var y = Math.random().toFixed(2);
		element.flickInsideWithOptions({startOffset:{x:0.5, y:0.5}, endOffset:{x:x,y:y}});
	}

	this._getAppSize = function(){
		var rect = UIATarget.localTarget().frontMostApp().rect();
		return rect;
	}

	this._type = function(element){
		var len = Math.round(Math.random()*100);
		var value = this._randomChar(len);
		element.setValue(value);
	}

	this._falseString = function(value){
		if(value=="0"){
			return "1";
		}else{
			return "0";
		}
	}

	this._randomChar = function(len){
		var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
		var  tmp="";
		for(var i = 0;i < len;i++){
			tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
		}
		return  tmp;
	}


	this.operator = function(){
		var element = this._selector();
		UIALogger.logMessage("本次操作的对象的类型是："+element.toString());
		var ancestry = this. _getElementAncestry(element);
		UIALogger.logMessage(ancestry+element.toString()+"->name:"+element.name());
		if (this._toFlick(element)){
			this._flick(element);
		}else if(this._toType(element)){
			this._type(element);
		}else{
			if(element.hitpoint() != null){
				this._tap(element);
			}
		}

	}

	this.screenShoot = function(imageName){
		var target = UIATarget.localTarget();
		var app = target.frontMostApp();
		target.captureRectWithName(target.frontMostApp().rect(),imageName);
	}

	this.waitForLoad = function(preDelay) {        
		var target = UIATarget.localTarget();
		if (!preDelay) {
			target.delay(0);
		}
		else {
			target.delay(preDelay);
		}

		var done = false;
		var counter = 0;      
		while ((!done) && (counter < 60)) {
			var progressIndicator = UIATarget.localTarget().frontMostApp().windows()[0].activityIndicators()[0];
			var indicator = this._findIndicator(UIATarget.localTarget().frontMostApp());
			if (indicator == 1) {
				UIALogger.logMessage("来到这里等待一下")
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

mon = new iOSMonkey2();
UIATarget.localTarget().setTimeout(0);
for(var i = 0; i< 1000; i++){
	try{
	mon.operator();
	}catch(err){
		UIALogger.logMessage("这里有一个异常");
		UIALogger.logMessage(err.toString()+"");
	}
	mon.screenShoot("test");
	mon.waitForLoad(1);
	//UIATarget.localTarget().delay(2);
}
