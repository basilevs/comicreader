
function startShow() {
	alert("Show started!");
}

function Unloader(container) {
	try {
		if (container.unloader) {
			container.unloader.unload();
		}
	} catch(e) {
	}
	this.callbacks = [];
	this.container = container;
	container.unolader = this;
}

Unloader.prototype = {
	add: function (callback) {
		this.callbacks.push(callback);
	},
	unload: function () {
		this.container.unloader = null;
		for(i in this.callbacks) {
			this.callbacks[i]();
		}
	}
};


function startup(data, reason) {
	var unloader = new Unloader(window);
	// add button
	let doc = window.document;
	let button = doc.createElement("toolbarbutton");
	button.setAttribute("id", "comicreader_showButton");
	button.setAttribute("label", "Start slideshow");
	button.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
	button.setAttribute("tooltiptext", "Start slideshow");
//	button.style.listStyleImage = "url(" + icon + ")";
	button.addEventListener("command", startShow, false);
	doc.getElementById("BrowserToolbarPalette").insertBefore(button, null);
	unloader.add(function() {
		button.parentNode.removeChild(button);
	});
	
}


function shutdown(data, reason) {
	window.unloader.unload();
}

