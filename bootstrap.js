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

function startShow() {
	alert("Show started!");
}

function modify(window) {
	// add button
	let button = doc.createElement("toolbarbutton");
	button.setAttribute("id", "comicreader_showButton");
	button.setAttribute("label", "Start slideshow");
	button.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
	button.setAttribute("tooltiptext", "Start slideshow");
//	button.style.listStyleImage = "url(" + icon + ")";
	button.addEventListener("command", startShow, false);
	doc.getElementById("BrowserToolbarPalette").insertBefore(button, null);
	unload(function() {
		button.parentNode.removeChild(button);
	}, window);
}

function startup(data, reason) {
	include("includes/utils.js");
	watchWindows(modify, "navigator:browser");
}

function shutdown(data, reason) {
	unload();
}

