//Set up permissions. Create method ownsDocument, checks if user owns the document.
ownsDocument = function ( userId, doc ) {
	return doc && userId === doc.userId;	
}