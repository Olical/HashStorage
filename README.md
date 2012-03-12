HashStorage is a small JavaScript class that allows you to store complex data in the URLs hash. So you could link someone to this page and instantly point the users browser at the correct slide and scroll position.

    http://yoursite.co.uk/slideshow#{"page":3,"scrollX":324}

If you did use it for a slideshow of some kind and you were on page 3 for example, you would set your "Next page" links `href` to `#{"page":4}`. So when the user clicks it you perform your slideshows page change and HashStorage will update the hash in the URL to allow the user to copy and paste that link into whatever they want.

# License

[![Creative Commons License](http://i.creativecommons.org/l/by/3.0/88x31.png)](http://creativecommons.org/licenses/by/3.0/)

HashStorage by [Oliver Caldwell](http://oli.me.uk) is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).