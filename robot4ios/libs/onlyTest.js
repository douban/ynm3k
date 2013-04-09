function test(title, f) { 
  target = UIATarget.localTarget();
  UIALogger.logStart(title);
  try {
    f(target);
    UIALogger.logPass(title);
  }
  catch (e) {
    UIALogger.logError(e.toString());
    target.logElementTree();
    UIALogger.logFail(title);
  }
}