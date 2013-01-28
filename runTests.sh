#! /bin/sh

XCODE_PATH=`xcode-select -print-path`
#TRACETEMPLATE="$XCODE_PATH/Platforms/iPhoneOS.platform/Developer/Library/Instruments/PlugIns/AutomationInstrument.bundle/Contents/Resources/Automation.tracetemplate"
TRACETEMPLATE=$(find ${XCODE_PATH%/*} -type f -name "Automation.tracetemplate")
BASE_TEST_SCRIPT=$1
APP_LOCATION=$2
DEVICE_ID=$3

echo $XCODE_PATH

echo $TRACETEMPLATE
if [ ! $# -gt 1 ]; then
	echo "You must specify the app location and the test file."
	echo "\t (optionally supply unique device ID of physical iOS device)"
	echo "\t eg. ./build.sh suite.js <xcodeproject directory>/build/Debug-iphonesimulator/myapp.app <device-udid>"
	exit -1
fi

# If running on device, only need name of app, full path not important
if [ ! "$DEVICE_ID" = "" ]; then
  RUN_ON_SPECIFIC_DEVICE_OPTION="-w $DEVICE_ID"
  APP_LOCATION=`basename "$APP_LOCATION"`
fi

if [  -d "ynm3k-tmp" ]; then
   rm -rf ynm3k-tmp
fi
mkdir ynm3k-tmp

resultpath="`pwd`/ynm3k-tmp/"
# Kick off the instruments build
instruments \
$RUN_ON_SPECIFIC_DEVICE_OPTION \
-t $TRACETEMPLATE \
"$APP_LOCATION" \
-e UIASCRIPT $BASE_TEST_SCRIPT \
-e UIARESULTSPATH $resultpath

rm -rf instrumentscli*
