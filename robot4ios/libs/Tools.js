#import "Finder.js"
#import "Assert.js"
#import "System.js"

function log(msg) {
    UIALogger.logMessage(msg+" ");
}

function sleep(s) {
    var target = UIATarget.localTarget();
    target.delay(s);
}

function wait4IndicatorDis(timeout){
    var times = timeout
    if (timeout == null) {
        times = 5
    }
    while(times >= 0){
        var indicatorArray = Finder.findElementsByClassType('ActivityIndicator')
        times--
        if (indicatorArray.length == 0) {
            break;
        }
        sleep(1);
    }
}

function setLocation(Lng,Lat){
    var target = UIATarget.localTarget();
    target.setLocation({"longitude":Lng,"latitude":Lat})
}

function shake(){
    var target = UIATarget.localTarget()
    target.shake()
}

function screenShoot(imageName,rect){
    var target = UIATarget.localTarget();
    if(!rect){
        var app = target.frontMostApp();
        target.captureRectWithName(target.frontMostApp().rect(),imageName)
    }else{
        target.captureRectWithName(rect,imageName)
    }
    sleep(3)
    // var host = target.host();
    // var tmpname = System.screenPath+"Run 1/"+imageName+".png";
    // var resultname = System.resultPath+imageName+".png";
    // var result = host.performTaskWithPathArgumentsTimeout(System.scriptPath+"copy.sh", [tmpname,resultname], 5);
    // if(result.exitCode==0){
    //     return true;
    // }
    return true;
}

function diffPNG(image1,image2){
    var target = UIATarget.localTarget();
    var host = target.host();
    var pic1 = "/tmp/Run 1/"+image1+".png";
    var pic2 = "/tmp/Run 1/"+image2+".png";
    //var result = host.performTaskWithPathArgumentsTimeout(System.scriptPath+"diff.sh", [pic1,pic2], 5);
    var result = host.performTaskWithPathArgumentsTimeout("/usr/bin/diff", [pic1,pic2], 5);
    if(result.exitCode==0){
        return true;
    }
    return false;
}

function getElement_originx(ele){
    Assert.element_is_not_null(ele);
    return ele.rect().origin.x;
}

function getElement_originy(ele){
    Assert.element_is_not_null(ele);
    return ele.rect().origin.y;
}

function getElement_width(ele){
    Assert.element_is_not_null(ele);
    return ele.rect().size.width;
}

function getElement_height(ele){
    Assert.element_is_not_null(ele);
    return ele.rect().size.height;
}

function getElement_hitpointx(ele){
    Assert.element_is_not_null(ele);
    return ele.hitpoint().x;
}

function getElement_hitpointy(ele){
    Assert.element_is_not_null(ele);
    return ele.hitpoint().y;
}

function inScreen(ele){
    Assert.element_is_not_null(ele);

    var target = UIATarget.localTarget();
    var app = target.frontMostApp();
    var origin_x = app.rect().origin.x;
    var origin_y = app.rect().origin.y;
    var width = app.rect().size.width;
    var height = app.rect().size.height;

    var hitpointx = getElement_originx(ele)+getElement_width(ele)/2;
    var hitpointy = getElement_originy(ele)+getElement_height(ele)/2;

    if( ( hitpointx > origin_x )&&( hitpointx < (origin_x+width) ) ){
        if( ( hitpointy > origin_y )&&( hitpointy < (origin_y+height) ) ){
            return true;
        }
    }
    return false;
}




