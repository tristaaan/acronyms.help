var limitedArray = function(size){
	this.contents = [];
	this.maxSize = size || 5;
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
 
	while (this.length + arguments.length > this.maxSize){
		this.contents.shift();
	}
 
	for (var i=0; i<arguments.length; i++){
		this.contents.push(arguments[i]);
	}
 
	return arguments[arguments.length-1];
};
 
module.exports = limitedArray;