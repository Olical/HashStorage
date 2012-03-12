HashStorage is a small JavaScript class that allows you to store complex data in the URLs hash. So you could link someone to this page and instantly point the users browser at the correct slide and scroll position.

    http://yoursite.co.uk/slideshow#{"page":3,"scrollX":324}

If you did use it for a slideshow of some kind and you were on page 3 for example, you would set your "Next page" links `href` to `#{"page":4}`. So when the user clicks it you perform your slideshows page change and HashStorage will update the hash in the URL to allow the user to copy and paste that link into whatever they want.

As you can see, I have also included a `scollX` property in that example URL. To set this value without the user having to click a link you can use the `set` method. In this instance it would work like this.

	// Initialise the instance of HashStorage
	var hs = new HashStorage();
	
	// Get the current scroll position first...
	// You may want to use a JavaScript library like MooTools or jQuery for this kind of thing
	// We will pretend we stored the value in `currentScrollPosition`
	
	// Now set it
	hs.set({
		scrollX: currentScrollPosition
	});

# License

[![Creative Commons License](http://i.creativecommons.org/l/by/3.0/88x31.png)](http://creativecommons.org/licenses/by/3.0/)

HashStorage by [Oliver Caldwell](http://oli.me.uk) is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).