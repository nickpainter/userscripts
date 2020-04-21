// ==UserScript==
// @name         ADO - Generate branch name
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Pressing the F2 key within ADO will automatically fill in the branch name when creating a new branch from an existing work item.
// @author       You
// @match        https://danfoss.visualstudio.com/*
// @match        https://danfosscrm.visualstudio.com/*
// @match        https://dev.azure.com/danfoss/*
// @match        https://dev.azure.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // Your code here...
  document.addEventListener("keyup", doc_keyUp, false);
})();

function doc_keyUp(e) {
  var itemId = document.querySelector('[aria-label="ID Field"]').innerText;
  var itemTitle = document
    .querySelector('[aria-label="Title Field"]')
    .value.replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^\w-]+/g, "");
  var itemType = document.getElementsByClassName("work-item-type-icon")[0]
    .attributes["aria-label"].value;
  var itemTypeValue = "feature";

  if (itemType === "Bug") {
    itemTypeValue = "bug";
  }

  if (e.keyCode == 113) {
    // call your function to do the thing
    console.log({ itemId, itemTitle, itemType });
    var newBranchName = `${itemTypeValue}/${itemId}_${itemTitle}`;
    document.querySelector(
      '[placeholder="Enter your branch name"]'
    ).value = newBranchName;
    navigator.clipboard.writeText(newBranchName);
  }
}
