# HashStorage

A small JavaScript class that allows you to store complex data in the URLs hash. So you could link someone to this page and instantly point the users browser at the correct slide and scroll position.

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

## Documentation

### Loading

There are a couple of ways to load HashStorage. The first and most obvious is to point a script tag at it.

	<script type='text/javascript' src='/assets/javascript/HashStorage.min.js'></script>
	<script type='text/javascript'>
		var hs = new HashStorage();
	</script>

You can also load the script via AMD with [RequireJS](http://requirejs.org/) for example.

	define(['HashStorage'], function(HashStorage) {
		var hs = new HashStorage();
	});

As you can see I am also creating an instance of `HashStorage` when it is loaded, this is required for it to function. When you create an instance all of the required events are registered with the browser.

### Manipulating with links

You can easily edit the hash object with HTML links, here is an example.

	<a href='#{"messageSent":true}'>Send the message</a>

Thats it. When a user clicks your link the hash object will be updated with the new boolean, `messageSent`. You can then add more values like this.

	<a href='#{"volume":0}'>Mute volume</a>

If a user clicks both of these links then the hash object will contain both variables. This is because the old and new objects are merged recursively. That means you can overwrite deeply nested values if you require. Here is an example of nested objects.

	<a href='#{ "music": { "volume": 3, "file": "sound.mp3" } }'>Start</a>
	<a href='#{ "music": { "file": "newSound.mp3" } }'>Change song</a>

A user can click the first and then the second links. The volume will stay the same but the file will be overwritten.

### Manipulating with JavaScript

Sometimes you may want to update the hash programmatically, such as when the user scrolls or a video finishes. You can do this easily with the `set` method. It works exactly the same as the link method so the objects will be merged not overwritten. The following example assumes that you have already created an instance of `HashStorage` called `hs`.

	// Change the volume from the previous example
	hs.set({
		music: {
			volume: 8
		}
	});

### Accessing the stored data

To access the hash object simply use the data property. So assuming you have created an instance of `HashStorage` called `hs`, you can access data from the above examples like so.

	var volume = hs.data.music.volume;

## License

[![Creative Commons License](http://i.creativecommons.org/l/by/3.0/88x31.png)](http://creativecommons.org/licenses/by/3.0/)

HashStorage by [Oliver Caldwell](http://oli.me.uk) is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).