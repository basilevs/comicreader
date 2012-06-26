function startSlideView() {
	let window = Services.wm.getMostRecentWindow("navigator:browser");
	let doc = window.content.document;
	let handler = DocumentHandler.get(doc);
	if (!handler) 
		throw new Error("Sorry can't work with "+doc.location+". Please report to https://github.com/basilevs/comicreader/issues")
	let wh = new WindowHandler(window, handler);
	wh.next();
}