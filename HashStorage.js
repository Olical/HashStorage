/**
 * HashStorage v0.0.1
 * https://github.com/Wolfy87/HashStorage
 * 
 * Oliver Caldwell (http://oli.me.uk)
 * Creative Commons Attribution 3.0 Unported License (http://creativecommons.org/licenses/by/3.0/)
 */

;(function(exports) {
	/*jshint smarttabs:true*/
	/*global define*/
	'use strict';
	
	/**
	 * Adds an event listener with the correct function
	 */
	function addListener(e, listener) {
		if(exports.addEventListener) {
			exports.addEventListener(e, listener);
		}
		else {
			exports.attachEvent('on' + e, listener);
		}
	}
	
	/**
	 * Removes an event listener with the correct function
	 */
	function removeListener() {
		if(exports.removeEventListener) {
			exports.removeEventListener(e, listener);
		}
		else {
			exports.detachEvent('on' + e, listener);
		}
	}
	
	/**
	 * Watches the URLs hash for changes and merges those changes with an existing object
	 * Allowing storage of complex data in a sharable URL
	 * The data can be accessed via the data property, i.e. `hashStorageInstance.data.foo`
	 */
	function HashStorage() {
		// Setup the events that wait for the hash to change
		this.addEvents();
		
		// Parse the hash for the first time
		this.parseHash();
	}
	
	/**
	 * Attaches the events to the window object that fire when the hash changes
	 * Can be removed with the removeEvents method
	 */
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
		addListener('hashchange', self.hashChangeListener);
	};
	
	/**
	 * Removes the events set by the addEvents method
	 */
	HashStorage.prototype.removeEvents = function() {
		// Remove the listener if present
		if(this.hashChangeListener) {
			removeListener('hashchange', this.hashChangeListener);
		}
	};
	
	/**
	 * Returns the result of decoding the URLs hash as JSON
	 * If the JSON is invalid or the hash is nothing like JSON then it will return false
	 * 
	 * @return {Object|Boolean} Either the decoded hash object or false if no object could be decoded
	 */
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
	
	/**
	 * Checks if an object is empty
	 * 
	 * @param {Object} obj The object to check
	 * @return {Boolean} True if the object is empty, false if not
	 */
	HashStorage.prototype.isEmpty = function(obj) {
		// Initialise variables
		var key = null;
		
		// Loop over the object
		// Return false if there is anything in it
		for(key in obj) {
			if(obj.hasOwnProperty(key)) {
				return false;
			}
		}
		
		// Return true if it is empty
		return true;
	};
	
	/**
	 * Encodes the passed object into JSON and sets the URLs hash to it
	 * 
	 * @param {Object} hash Your data to store in the hash as JSON
	 */
	HashStorage.prototype.setHash = function(hash) {
		// If the data object is not an empty store it
		if(!this.isEmpty(hash)) {
			exports.location.hash = '#' + JSON.stringify(hash);
		}
	};
	
	/**
	 * Store data back into the hash object manually
	 * So when you need to update something without the user having to click something
	 * I.e. a counter or page scroll position, something programmatic
	 * 
	 * @param {Object} data Your custom data object to merge into the hash
	 */
	HashStorage.prototype.set = function(data) {
		this.merge(data, this.data);
		this.setHash(this.data);
	};
	
	/**
	 * Fetches and parses the hash, merges any hash changes into the data object
	 * Will be run every time the hash changes unless the event listener is removed
	 */
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
		this.setHash(this.data);
	};
	
	/**
	 * Merges one object into another
	 * Will recurse on objects to allow specific property setting but completely replace all other variable types
	 * 
	 * @param {Object} from Object containing the new properties to copy in
	 * @param {Object} to The base object to copy the properties into
	 */
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
					if(typeof to[key] !== 'object') {
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
	
	// Allow AMD
	if(typeof define === 'function' && define.amd) {
		define(function() {
			return HashStorage;
		});
	}
}(this));