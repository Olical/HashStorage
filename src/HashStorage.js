;(function(exports) {
	'use strict';
	
	function HashStorage() {
		// Setup the events that wait for the hash to change
		this.addEvents();
		
		// Parse the hash for the first time
		this.parseHash();
	}
	
	HashStorage.prototype.addEvents = function() {
		// Initialise variables
		var self = this;
		
		// Set up the listener for the hash change event
		// By storing it the listener can be removed later
		// A wrapper function has to be used to correct the scope of the `this` object
		self.hashChangeListener = function() {
			self.parseHash();
		};
		
		// Scan the hash for JSON commands when it changes
		exports.addEventListener('hashchange', self.hashChangeListener);
	};
	
	HashStorage.prototype.removeEvents = function() {
		// Remove the listener if present
		if(this.hashChangeListener) {
			exports.removeEventListener('hashchange', this.hashChangeListener);
		}
	};
	
	HashStorage.prototype.getHash = function() {
		// Initialise variables
		var hash = null;
		
		// Try to decode the hash
		try {
			hash = JSON.parse(exports.location.hash.slice(1));
		}
		catch(e) {
			hash = false;
		}
		
		// Return the result
		return hash;
	};
	
	HashStorage.prototype.setHash = function(hash) {
		// Store the passed object
		exports.location.hash = JSON.parse(hash);
	};
	
	HashStorage.prototype.parseHash = function() {
		// Initialise variables
		var hash = null;
		
		// Attempt to decode the hash
		hash = this.getHash();
		
		// Check for any existing data
		if(this.data) {
			// Check for a hash object
			// If there is some data merge it with the current object
			if(hash) {
				this.mergeData(hash, this.data);
			}
		}
		else {
			// There is nothing stored yet
			// Store either the hash or empty object
			this.data = hash || {};
		}
	};
	
	HashStorage.prototype.mergeData = function(from, to) {
		// Initialise variables
		var key = null;
		
		// Loop over the from object
		// Copy in anything that is not an object
		// If it is an object, recurse
		for(key in from) {
			if(from.hasOwnProperty(key)) {
				if(typeof from[key] !== 'object' || from[key] instanceof Array) {
					to[key] = from[key];
				}
				else {
					
				}
			}
		}
	};
	
	// Expose the class
	exports.HashStorage = HashStorage;
}(this));