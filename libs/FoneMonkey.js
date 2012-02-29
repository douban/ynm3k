
/* This file is part of FoneMonkey.
 
 FoneMonkey is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 FoneMonkey is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with FoneMonkey.  If not, see <http://www.gnu.org/licenses/>.  */
//
//  FoneMonkey.js
//  FoneMonkey
//
//  Copyright 2011 Gorilla Logic, Inc. All rights reserved.
//

/** @namespace <a href="http://www.gorillalogic.com/fonemonkey">FoneMonkey</a> helper function library for iOS <a href="http://developer.apple.com/library/ios/#documentation/DeveloperTools/Reference/UIAutomationRef/_index.html">UIAutomation</a> scripting 
 @author Gorilla Logic, Inc. - <a href="http://www.gorillalogic.com">www.gorillalogic.com</>
 @see <a href="http://developer.apple.com/library/ios/#documentation/DeveloperTools/Reference/UIAutomationRef/_index.html">UIAutomation Reference</a>, <a href="http://www.gorillalogic.com/fonemonkey">FoneMonkey Project Home</a>
 */

var FoneMonkey = {
/** @private */
debugEnabled:false,
/** @private */	
debug: function(msg) {
	if (this.debugEnabled) {
		UIALogger.logMessage(msg);
	}
},	
/** Search the component tree for the element with the supplied name until found or timeout
 @returns {UIAElement} the found element or UIAElementNil if no element is found before the timeout occurs
 @param  {String} name the name of the element to search for
 @param  {Number} [timeout=UIATarget.localTarget().timeout()] the maximum time, in seconds, to wait for the element to appear
 
 */	
elementNamed: function(name, timeout) {
	var start = (new Date()).getTime();	
	if (!timeout) {
		timeout = UIATarget.localTarget().timeout();
	}
	this.debug("Searching for " + name);
	var result;
	while (((new Date()).getTime() - start) < (timeout * 1000) || timeout == 0) {
		result = this.searchElements(UIATarget.localTarget().frontMostApp().mainWindow(), name, "name");
		if (!this.isNil(result)) {
		   this.debug("searchElements returned " + result.toString());		
           UIATarget.localTarget().delay(.5); // A little throttling to allow UI to catch up
		   return result;		   
		}
		if (timeout == 0) {
			break;
		}
	}
	UIALogger.logFail("Unable to find element named " + name);


	return result;
},
	
/** Scroll the UITableView with the supplied name to the supplied group and item number
 @param {String} tableName the name of the UITableView to scroll
 @param {Number} [item=0] the position number of the item to scroll to
 @param {Number} [group=0] the position of the group to scroll to
 @param  {Number} [timeout=UIATarget.localTarget().timeout()] the maximum time, in seconds, to wait for the UITableView to appear
*/ 
scrollTo: function(tableName, item, group, timeout) {
	var table = FoneMonkey.elementNamed(tableName, timeout);
	var grp;
	var grps = table.groups();
	if (grps.length) {
		grp = table.groups()[group];
	} else {
		grp = table.cells();
	}
	var itm = grp[item];
	itm.logElement();
	table.scrollToElementWithName(itm.name());
},	
/** Scroll the UIPickerView with the supplied name to the supplied row number of the supplied component number
 @param {String} pickerName the name of the UIPickerView to select from
 @param {Number} [row=0] the position number of the row to select
 @param {Number} [component=0] the position of the component containing the row
 @param  {Number} [timeout=UIATarget.localTarget().timeout()] the maximum time, in seconds, to wait for the UIPickerView to appear
 */ 	
selectPickerValue: function(pickerName, row, component, timeout) {
	
	var picker = FoneMonkey.elementNamed(pickerName, timeout);
	
	return this.movePicker(picker, component, row);
	
	var wheels = picker.wheels();
	
	var wheel = wheels[component];
	var values = wheel.values();
	var itm = values[row];
	
	// errors out, see ed's apple bug #8826533 - ejs Jan 2011
	wheel.selectValue(itm);
},

/** Toggle the UISwitch with the supplied name
 @param {String} switchName the name of the UISwitch to toggle
 @param  {Number} [timeout=UIATarget.localTarget().timeout()] the maximum time, in seconds, to wait for the UISwitch to appear
 */
toggleSwitch: function(switchName, timeout) {
	swtch = this.elementNamed(switchName, timeout);
	val = swtch.value();
	swtch.setValue(!val);
},
	
	
/** @private */	
searchElements: function(elem, value, key) {
	//this.debug("checking " + elems.length + " kids");		
	//var result = elems.firstWithValueForKey(value, key);
	try {
		UIATarget.localTarget().pushTimeout(0);		
		this.debug("checking " + Object.prototype.toString.call(elem) + "  elem.name()=\"" + elem.name() + "\"  elem.value()=\"" + elem.value() + "\"  value=\"" + value + "\"  key=\"" + key + "\"");
		var result = elem.withValueForKey(value, key);
		if (!this.isNil(result)) {
			this.debug("returning " + result.toString());
			return result;
		}		
		
		var elems = elem.elements();
		this.debug("checking " + elems.length + " children" );
		var i;
		for (i = 0; i < elems.length; i++) {
			var child = elems[i];		
			result = this.searchElements(child, value, key);
			if (!this.isNil(result)) {
				this.debug("returning child of " + elem.name());				
				return result;
			}
		}
		this.debug(value + " not found in children of " + elem.name());
		return result;
	} finally {
		UIATarget.localTarget().popTimeout();
	}
},

/** Tests if the supplied element is UIAElementNil
 @param {UIAElement} element the element to test
 @returns {Boolean} true if the supplied element is UIAElementNil
 */
isNil: function(element) {
	return (element.toString() == "[object UIAElementNil]");
},

/** Log <span style="color:green; font-weight:bold">Pass</span> if an element with the supplied name and value is found before the supplied timeout occurs, and log <span style="color:red; font-weight:bold">Fail</span> otherwise
 @param  {String} name the name of the element to search for
 @param  {String} value the value of the element to search for 
 @param  {Number} [timeout=UIATarget.localTarget().timeout()] the maximum time, in seconds, to wait for the element and value to appear
 */
assertElementValue: function(name, value, timeout) {
	var start = (new Date()).getTime();	
	//if (element && element.withPredicate("value == \"" + expected + "\"").name() != element.name()) {
	if (!timeout) {
		timeout = UIATarget.localTarget().timeout();
	}	
	
	var element = FoneMonkey.elementNamed(name, timeout);
	if (this.isNil(element)) {
		return;
	}
	while (((new Date()).getTime() - start) < (timeout * 1000) || timeout == 0) {	
		if (element.value() == value) {
			UIALogger.logPass(element.name() + " had expected value '" + value + " '");
			return;
		} 
		if (timeout == 0) {
			break;
		}
		//UIATarget.localTarget().delay(.1);		
	}
		
	UIALogger.LogFail("Verify failed for Component '" + element.name() + "' property 'value': expected '" + value + "', but found " + element.value()); 
	return;		
	
},
	/** Log <span style="color:green; font-weight:bold">Pass</span> if an element with the supplied name is found before the supplied timeout occurs, and log <span style="color:red; font-weight:bold">Fail</span> otherwise
	 @param  {String} name the name of the element to search for
	 @param  {Number} [timeout=UIATarget.localTarget().timeout()] the maximum time, in seconds, to wasit for the element to appear
	 */
assertElement: function(name, timeout) {
	var element = FoneMonkey.elementNamed(name, timeout);
	if (this.isNil(element)) {
		UIALogger.logFail("Verify failed. Element '" + name + "' not found.");
	} else {
		UIALogger.logPass(name + " found.");
	}	
},

// adapted from Apple Developer Forum Post at
// https://devforums.apple.com/message/242678#242678	
// This will move a picker index
/** @private */
movePicker: function(picker, pickerIndex, indexInPicker) {
	// Verify it is valid
	if (!picker.isValid()) {
		// Not valid for whatever reason
		return false;
	} // if
	
	var startPicker=picker.wheels()[pickerIndex];
	var itemCount=startPicker.values().length;
		
	// The height of a picker item in our application
	var HEIGHT_OF_PICKER_ITEMS = 40;
		
	// Grab the hit point of this object. This will be the exact center of the
	// picker
	var hitPoint = startPicker.hitpoint();
	// Keep this the same
	var hitPointX = hitPoint.x;
		
	// go to the top of the picker (select the topmost item)
	// This will move us to the previous picker item, if there is one
	var hitPointY = hitPoint.y - HEIGHT_OF_PICKER_ITEMS;
	for (var xx=0; xx<itemCount; xx++) {
		// Tap on the next item
		UIATarget.localTarget().tapWithOptions({x:hitPointX, y:hitPointY}, {touchCount:1, tapCount:1});		
		// Allow the picker to render itself
		UIATarget.localTarget().delay(1);
	} // for
		
	// go to the top of the picker (select the topmost item)
	// This will move us to the desired picker item, if there is one
	hitPointY = hitPoint.y + HEIGHT_OF_PICKER_ITEMS;
	for (var i = 0; i < indexInPicker; i++) {
		// Tap on the next item
		UIATarget.localTarget().tapWithOptions({x:hitPointX, y:hitPointY}, {touchCount:1, tapCount:1});
		// Allow the picker to render itself
		UIATarget.localTarget().delay(1);
	} // for
		
	// We performed our action successfully
	return true;
	
} // movePicker
	
	
}
