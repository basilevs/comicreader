//Many components were copied from https://github.com/dgutov/bmreplace

Components.utils.import("resource://gre/modules/Services.jsm");
var console = Services.console;

var addon = {
  getResourceURI: function(filePath) ({
    spec: __SCRIPT_URI_SPEC__ + "/../" + filePath
  })
};


function include(path) {
  Services.scriptloader.loadSubScript(addon.getResourceURI(path).spec, this);
}

function modify(window) {
	// add button
	let doc = window.document;
	let button = doc.createElement("toolbarbutton");
	button.setAttribute("id", "comicreader_showButton");
	button.setAttribute("label", "Start slideshow");
	button.setAttribute("class", "toolbarbutton-1");
	button.setAttribute("tooltiptext", "Start slideshow");
	var icon = addon.getResourceURI("chrome/content/nextSlide24.png").spec;
//	console.logStringMessage("Icon: "+icon);
	button.style.listStyleImage = "url(" + icon + ")";
	button.addEventListener("command", startSlideView, false);
	doc.getElementById("addon-bar").insertBefore(button, null);
	unload(function() {
		button.parentNode.removeChild(button);
	}, window);
}

function startup(data, reason) {
	include("includes/utils.js");
	include("includes/windowhandler.js");
	include("includes/documenthandler.js");
	include("includes/main.js");
	watchWindows(modify, "navigator:browser");
}

function shutdown(data, reason) {
	unload();
}

