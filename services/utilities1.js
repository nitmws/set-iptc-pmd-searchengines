const fs = require('fs');
const path = require('path');
const cryptoRandomString = require('crypto-random-string');
const appconfig = require('../config/appconfig');

function write2Log(logMessage) {
  let now = new Date();
  fs.appendFile(appconfig.app.localLogFpath, now.toISOString() + ": " + logMessage + "\r\n", function (err) {
    if (err) {
      console.log("ERROR while writing to the log file");
      console.log(err);
    }
  });
}
exports.write2Log = write2Log;

function writeText2TempFileRandomname( theText, fnPrefix, fnExtension ){
  if (fnExtension === undefined){
    return "";
  }
  if (fnExtension === ""){
    return "";
  }
  let baseFilename = cryptoRandomString({length: 10});
  let filename = fnPrefix + baseFilename + fnExtension;
  let filepath = path.join(appconfig.app.localFilecacheDir, filename);
  let fileSaved = true;
  try {
    fs.writeFileSync(filepath, theText);
  }
  catch (e){
    fileSaved = false;
  }
  if (fileSaved){
    return filename;
  }
  else {
    return "";
  }
}
exports.writeText2TempFileRandomname = writeText2TempFileRandomname;