function DocumentCache() {
	this.docs = [];
}

DocumentCache.prototype = {
	cache: function(url) {
		
	}
};
function WindowHandler(window, docHandler) {
	this.window = window;
	this.docHandler = docHandler;
	let x = new XMLHttpRequest();
	let doc = window.content.document;
	let keyset = doc.createElement("keyset");
	keyset.setAttribute("id", "comicreader_keyset");
	let replaceKey = doc.createElement("key");
	replaceKey.setAttribute("id", "comicreader_next_key");
	replaceKey.setAttribute("keycode", 39);
	replaceKey.setAttribute("modifiers", "ctrl");
	replaceKey.setAttribute("oncommand", "void(0);");
	replaceKey.addEventListener("command", this.next, true);
	keyset.appendChild(replaceKey);
//	window.document.querySelector("window")
//	appendChild(keyset);
//	console.logStringMessage("Hotkey injected in "+doc.location);
	unload(function() {
		keyset.parentNode.removeChild(keyset);
	}, window);
	
}

WindowHandler.prototype = {
	
	next: function () {
		let window = this.window;
		let document =  window.content.document;
		let url = this.docHandler.next(document);
		document.location = url;
	}
};