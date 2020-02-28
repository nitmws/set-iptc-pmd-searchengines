'use strict';

function startSpinner1(btnId){
  // disable button
  $(btnId).prop("disabled", true);
  // add spinner to button
  $(btnId).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> In progress ...');
}
