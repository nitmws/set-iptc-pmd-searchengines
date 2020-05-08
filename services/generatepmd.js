const fs = require('fs');
const path = require('path');
const util1 = require('./utilities1');
const appconfig = require('../config/appconfig');

const {body, validationResult} = require('express-validator'); // /check
const {sanitizeBody} = require('express-validator'); // /filter

/**
 * Processes a POST request after editing the photo metadata form
 * @type {(function(...[*]=))[]}
 */
exports.pmd_edit_post = [

  // Validate fields.
  // body('xxFeldname').isLength({min: 2}).trim().withMessage('Wurde Genutzt ist erforderlich.'),

  // Sanitize fields.
  // sanitizeBody('xxFeldname').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req)

    let currPmdObj = Object.assign({}, req.body);


    if (!errors.isEmpty()) { //
      // There are errors. Render the form again with sanitized values and error messages.
      res.render('pmdform1', {pmdObj: currPmdObj});
    }
    else {
      // no errors exist
      let currEtObj = transformFormobjToETobj(currPmdObj);
      let currEtObjStr = JSON.stringify(currEtObj, null, 2);
      let iptcpmdAsETfn = util1.writeText2TempFileRandomname(currEtObjStr, "etpmd_", ".json");
      let currSoObj = transformFormobjToSchemaorgobj(currPmdObj);
      let currSoObjStr = JSON.stringify(currSoObj, null, 2);

      let msg = "It worked!";

      // write log
      util1.write2Log("IPTC PMD generated from form - in " + iptcpmdAsETfn);
      res.render('showresults1', {message: msg, pmdObj: currPmdObj, etObjStr: currEtObjStr, schemaorgObjStr: currSoObjStr, ipmdetfname: iptcpmdAsETfn});
    }
  }
]

/**
 * Processes a GET request for photo metadata as ExifTool JSON data
 * @param req
 * @param res
 */
exports.pmd_get_etjson = function (req, res){
  let filename = req.params.filename;
  let filepath = path.join(appconfig.app.localFilecacheDir, filename);
  let fileExists = true;
  try {
    if (fs.existsSync(filepath)) {
    }
  } catch(err) {
    console.error(err)
    fileExists = false;
  }
  if (fileExists){
    util1.write2Log("IPTC PMD downloaded from " + filename);
    const ipmdData = require(filepath);
    res.setHeader('Content-disposition', 'attachment; filename=myiptcpmd.json');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(ipmdData, null, 2));
  }
  else{
    res.render('amessage1', {title: "Data not found", message: "Sorry, your cached IPTC Photo Metadata got lost, please fill in the form again."})
  }
}

/**
 * Transforms an object of data from the form to an ExifTool object
 * @param formObj
 * @returns {{}}
 */
function transformFormobjToETobj(formObj){
  let etObj = {}
  etObj.SourceFile = "*";
  let imgCreator = {};
  let imgCreatorUsed = false;
  if (formObj.creatorName){
    etObj["IFD0:Artist"] = formObj.creatorName;
    etObj["IPTC:By-line"] = formObj.creatorName;
    etObj["XMP-dc:Creator"] = [];
    etObj["XMP-dc:Creator"].push(formObj.creatorName);
    imgCreator.ImageCreatorName = formObj.creatorName;
    imgCreatorUsed = true;
  }
  if (formObj.creatorId){
    imgCreator.ImageCreatorID = formObj.creatorId;
    imgCreatorUsed = true;
  }
  if (imgCreatorUsed){
    etObj["XMP-plus:ImageCreator"] = [];
    etObj["XMP-plus:ImageCreator"].push(imgCreator);
  }
  let imgCreatorContactUsed = false;
  let imgCreatorContact = {};
  if (formObj.creatorAddr){
    imgCreatorContact["CiAdrExtadr"] = formObj.creatorAddr;
    imgCreatorContactUsed = true;
  }
  if (formObj.creatorCity){
    imgCreatorContact["CiAdrCity"] = formObj.creatorCity;
    imgCreatorContactUsed = true;
  }
  if (formObj.creatorPostalcode){
    imgCreatorContact["CiAdrPcode"] = formObj.creatorPostalcode;
    imgCreatorContactUsed = true;
  }
  if (formObj.creatorStateProvince){
    imgCreatorContact["CiAdrRegion"] = formObj.creatorStateProvince;
    imgCreatorContactUsed = true;
  }
  if (formObj.creatorCountry){
    imgCreatorContact["CiAdrCtry"] = formObj.creatorCountry;
    imgCreatorContactUsed = true;
  }
  if (formObj.creatorEmail){
    imgCreatorContact["CiEmailWork"] = formObj.creatorEmail;
    imgCreatorContactUsed = true;
  }
  if (formObj.creatorUrl){
    imgCreatorContact["CiUrlWork"] = formObj.creatorUrl;
    imgCreatorContactUsed = true;
  }
  if (imgCreatorContactUsed){
    etObj["XMP-iptcCore:CreatorContactInfo"] = imgCreatorContact;
  }
  if (formObj.creatorJobtitle){
    etObj["IPTC:By-lineTitle"] = formObj.creatorJobtitle;
    etObj["XMP-photoshop:AuthorsPosition"] = formObj.creatorJobtitle;
  }
  if (formObj.copyrightNotice){
    etObj["IFD0:Copyright"] = formObj.copyrightNotice;
    etObj["IPTC:CopyrightNotice"] = formObj.copyrightNotice;
    etObj["XMP-dc:Rights"] = formObj.copyrightNotice;
  }
  if (formObj.creditLine){
    etObj["IPTC:Credit"] = formObj.creditLine;
    etObj["XMP-photoshop:Credit"] = formObj.creditLine;
  }
  if (formObj.webstatementRights){
    etObj["XMP-xmpRights:WebStatement"] = formObj.webstatementRights;
  }
  let licensor = {};
  let licensorUsed = false;
  if (formObj.licensors_1_name){
    licensor.LicensorName = formObj.licensors_1_name;
    licensorUsed = true;
  }
  if (formObj.licensors_1_id){
    licensor.LicensorID = formObj.licensors_1_id;
    licensorUsed = true;
  }
  if (formObj.licensors_1_url){
    licensor.LicensorURL = formObj.licensors_1_url;
    licensorUsed = true;
  }
  if (licensorUsed){
    etObj["XMP-plus:Licensor"] = [];
    etObj["XMP-plus:Licensor"].push(licensor);
  }
  return etObj;
}

/**
 * Transforms an object of data from the form to a JSON-LD/Schema.org object
 * @param formObj
 * @returns {{}}
 */
function transformFormobjToSchemaorgobj(formObj){
  let schemaorgObj = {};
  schemaorgObj["@context"] = "https://schema.org";
  schemaorgObj["@type"] = "ImageObject"
  schemaorgObj.url = "FILL IN THE URL OF THE SHOWN IMAGE: https://...."
  if (formObj.webstatementRights){
    schemaorgObj.license = formObj.webstatementRights;
  }
  if (formObj.licensors_1_url){
    schemaorgObj.acquireLicensePage = formObj.licensors_1_url;
  }
  return schemaorgObj;
}