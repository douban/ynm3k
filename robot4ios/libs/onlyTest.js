function test(title, f) { 
  target = UIATarget.localTarget();
  UIALogger.logStart(title);
  try {
    f(target);
    UIALogger.logPass(title);
  }
  catch (e) {
    UIALogger.logError(e.toString());
    target.captureRectWithName(target.frontMostApp().rect(),title)
    target.logElementTree();
    UIALogger.logFail(title);
  }
}