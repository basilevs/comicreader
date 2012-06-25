function DocumentHandler() {
}
DocumentHandler.all = [];
DocumentHandler.get = function (document) {
	var all = DocumentHandler.all;
	for(let i in all) {
		let handler = all[i].matches(document);
		if (handler) {
			return handler;
		}
	}
	return null;
};

DocumentHandler.prototype = {
	notImplemented: function() { throw new Error("Not implemented");},
	
	//determine if current handler can work with this page
	// Returns working instance of DocumentHandler specifically for this type of documents
	matches: function(document) { return null;},
	//returns url of next page
	next: function(document) { this.notImplemented();}
}

function firstXpathMatch(document, path) {
	var res = document.evaluate(path, document, null, 8, null);
	return res.singleNodeValue;
}

{
	function BatotoHandler () {
		DocumentHandler.call(this);
	}
	BatotoHandler.prototype = new DocumentHandler();
	BatotoHandler.prototype.matches = function (document) {
		if (firstXpathMatch(document, "id('content')/div/ul/li/a/img[@title='Next Page']/..")) {
			console.logStringMessage("Next page image found in " +document.location);
			return new BatotoHandler();
		}
	}
	BatotoHandler.prototype.next = function (document) {
		return firstXpathMatch(document, "//img[@title=\"Next Page\"]/..").href;
	}
	DocumentHandler.all.push(new BatotoHandler);
}


