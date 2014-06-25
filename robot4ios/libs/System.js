
var System = {
/*
scriptPath and resultPath need to set before use it.
*/
scriptPath:"/Users/mijun/Documents/douban/publicgit/ynm3k/robot4ios/libs/shells/",
resultPath:"/Users/mijun/Documents/douban/publicgit/ynm3k/ynm3k-reports/",
screenPath:"/Users/mijun/Documents/douban/publicgit/ynm3k/ynm3k-tmp/",

printSystemInfo: function(){
    var target = UIATarget.localTarget();
    UIALogger.logMessage("Device model:"+ this.getDeviceModel());
    UIALogger.logMessage("Screen width:"+ target.rect().size.width);
    UIALogger.logMessage("Screen height:"+ target.rect().size.height);
    //UIALogger.logMessage("name:"+ target.name());
    //UIALogger.logMessage("systemName:"+ target.systemName());
    UIALogger.logMessage("Decice OSVersion:"+ this.getDeviceVersion());
    UIALogger.logMessage("UTA name:"+ this.getUTABundleID());
    UIALogger.logMessage("UTA version:"+ this.getUTAVersion());
    },

getDeviceModel: function(){
    var target = UIATarget.localTarget();
    return target.model();
    },

getDeviceVersion: function(){
    var target = UIATarget.localTarget();
    return target.systemVersion();
    },

getUTAVersion: function(){
    var target = UIATarget.localTarget();
    var app = target.frontMostApp();
    return app.version();
    },
    
getUTABundleID: function(){
    var target = UIATarget.localTarget();
    var app = target.frontMostApp();
    return app.bundleID();
    },

simulateMemoryWarning: function(){
    var target = UIATarget.localTarget(); 
    var host = target.host();
    var result = host.performTaskWithPathArgumentsTimeout("/usr/bin/osascript", [this.scriptPath+"SMW.scpt"], 5);
    if(result.exitCode==0){
        return 0;
        }else{
         return null;
            }
},

createFile: function(endName){
    var target = UIATarget.localTarget(); 
    var host = target.host();
    var str = this.resultPath+endName;
    UIALogger.logMessage("test begin:"+str);
    var result = host.performTaskWithPathArgumentsTimeout(this.scriptPath+"createFile.sh", [str], 5);
    if(result.exitCode==0){
        return str;
        }else{
            return null;
            }
    },

readFile: function(fileName){
    var target = UIATarget.localTarget(); 
    var host = target.host();
    var result = host.performTaskWithPathArgumentsTimeout("/bin/cat", [fileName], 5);
    if(result.exitCode==0){
        return result.stdout + "";
        }else{
            return null;
            }
    },
    
writeFile: function(filename, message,flag){
    var target = UIATarget.localTarget(); 
    var host = target.host();
    var result = host.performTaskWithPathArgumentsTimeout(this.scriptPath+"writeFile.sh", [message,filename,flag], 5);
    if(result.exitCode==0){
        return true;
        }else{
            return false;
            }
    }
}
