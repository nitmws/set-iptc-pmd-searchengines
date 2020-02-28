const {body, validationResult} = require('express-validator'); // /check
const {sanitizeBody} = require('express-validator'); // /filter

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
      let currSoObj = transformFormobjToSchemaorgobj(currPmdObj);
      let currSoObjStr = JSON.stringify(currSoObj, null, 2);

      let msg = "it worked ";

      // write log
      // util1.write2DataLog(edGuid + fv1.data.guidverSep + edVersion, "Nach Bearbeitung abgespeichert", "NV");
      res.render('showresults1', {message: msg, pmdObj: currPmdObj, etObjStr: currEtObjStr, schemaorgObjStr: currSoObjStr});
    }
  }
]

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