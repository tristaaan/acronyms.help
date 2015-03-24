var LimitedArray = function(maxSize) {
	var my = {};

	my.maxSize = maxSize || 5;
	my.arr = [];

	my.push = function(el){
		while (my.arr.length >= my.maxSize){
			my.arr.shift();
		}
		if (unique(el)){
			my.arr.push(el);
		}
	}

	my.clear = function(){
		my.arr = [];
	}

	function unique(newEl){
		return my.arr.every(function(el){
			return newEl._id != el._id;
		});
	}

	return my;
}

module.exports = LimitedArray;