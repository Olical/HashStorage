/**
 * HashStorage v0.0.0
 * https://github.com/Wolfy87/HashStorage
 * 
 * Oliver Caldwell (http://oli.me.uk)
 * Creative Commons Attribution 3.0 Unported License (http://creativecommons.org/licenses/by/3.0/)
 */

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
		exports.location.hash = '#' + JSON.stringify(hash);
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
				this.merge(hash, this.data);
			}
		}
		else {
			// There is nothing stored yet
			// Store either the hash or empty object
			this.data = hash || {};
		}
		
		// Because any merging has been completed we need to set the hash to the current data
		// This allows copying of the URL with the persistent hash based object
		this.setHash(hash);
	};
	
	HashStorage.prototype.merge = function(from, to) {
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
					// If the destination does not contain the object initialise it
					if(typeof to[key] === 'undefined') {
						to[key] = {};
					}
					
					// Recurse with the deeper object
					this.merge(from[key], to[key]);
				}
			}
		}
	};
	
	// Expose the class
	exports.HashStorage = HashStorage;
}(this));