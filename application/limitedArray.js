/* Maintains an array of objects, if uniqueKey is defined, then a unique array of objects  */

var limitedArray = function(size, uniqueKey){
	this.contents = [];
	this.maxSize = size || 5;
	this.uniqueKey = uniqueKey || false;
	return this;
};
 
Object.defineProperty(
	limitedArray.prototype, 
	'length', 
	{get: function() {
		return this.contents.length;;
	}
});
 
limitedArray.prototype.push = function(){
	if (arguments.length == 0){
		return;
	}

	for (var i=0; i<arguments.length; i++){
		if (this.uniqueKey && this.unique(arguments[i]) || !this.uniqueKey){
			this.contents.push(arguments[i]);
		}
	}

	while (this.length > this.maxSize){
		this.contents.shift();
	}

	return arguments[arguments.length-1];
};

limitedArray.prototype.unique = function(newEl){
	var key = this.uniqueKey;
	return this.contents.every(function(el){
		return newEl[key].toString() !== el[key].toString(); 
	});
}
 
module.exports = limitedArray;