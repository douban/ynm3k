#import "System.js"
function test(title, resultPath,tests) {
    
  var str = System.getDeviceVersion();
  var arr = str.split(".");
  try {
    tests();
    var result = title+"is finished no error";
    if(arr[0]>4){
    System.writeFile(resultPath,result,"true"); 
    }
    UIALogger.logPass(result);
    }catch (e) {
    var result = title+"is failed!!"+"and the failed message is "+e;
    if(arr[0]>4){
    System.writeFile(resultPath,result,"true"); 
    }
    UIALogger.logFail(result);
  }
}