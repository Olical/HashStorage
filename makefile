default: HashStorage.min.js

HashStorage.min.js: HashStorage.js
	uglifyjs -o $@ $^