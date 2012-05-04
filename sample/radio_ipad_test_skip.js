#import "../importAll.js";

var TIMESTODO = 100;
//重复skip或者更换频道次数
var DELAYTIME = 0;
//判断播放歌曲秒数，例如：2表示播放显示2s以后skip或者更换频道

var target = UIATarget.localTarget(); 
var app = target.frontMostApp();
var win = target.frontMostApp().mainWindow();

var arr_info = new Array();

for(var i =0; i<TIMESTODO;i++){
    waitforsongplayed();
    var songsInfo = getSongInfo();
    add(arr_info,songsInfo);
    target.delay(DELAYTIME);
    skipsongs();
    waitforsongcheaged();
	
}
UIALogger.logMessage("播放歌曲的个数为："+ arr_info.length);

for(var i = 0;i<arr_info.length;i++){
	UIALogger.logMessage("  "+ arr_info[i]);
}


function add(arr, obj){
	var flag = false;
	for(var j =0;j<arr.length;j++){
		
		if(arr[j]==obj){
			flag = true;
			break;
		}
	}
	if(flag==false){
		arr.push(obj)
	}
}

 
function skipsongs(){
    var skip_but = win.buttons()[win.buttons().length-1];
    skip_but.tap();
    target.delay(1);
    }
    
function getSongInfo(){
    var song_name = win.staticTexts()[win.staticTexts().length-2];
    var songer_name = win.staticTexts()[win.staticTexts().length-3];
    return songer_name.value()+"-"+song_name.value();
    }
function waitforsongcheaged(){
    var songInfo = getSongInfo();
    target.delay(1);
    var songInfo_after = getSongInfo();
    while(songInfo_after==songInfo){
        target.delay(1);
        songInfo_after = getSongInfo();
        }
    }
function getSongtimes(){
	var song_time = win.staticTexts()[win.staticTexts().length-1];
	return song_time.value();
}
function waitforsongplayed(){
    
    var time_before = getSongtimes();
	UIALogger.logMessage("XXXX"+ time_before);
    target.delay(1);
    var time_after = getSongtimes();
    while(time_after == time_before){
        target.delay(1);
        time_after = getSongtimes();
		//UIALogger.logMessage("in the while"+ time_after);
        }
    }