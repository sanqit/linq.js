"use strict";

Object.defineProperty(Array.prototype, "aggregate", {
	value: function (predicate) {
		if (predicate == null) return null;
		var workingSentence = "";
		for (var i = 0; i < this.length; i++)
			workingSentence = predicate(workingSentence, this[i]);
		return workingSentence;
	}
});

Object.defineProperty(Array.prototype, "all", {
	value: function (predicate) {
		if (predicate == null) return this.length !== 0;
		for (var i = 0; i < this.length; i++)
			if (predicate(this[i]) !== true) return false;
		return true;
	}
});

Object.defineProperty(Array.prototype, "any", {
	value: function (predicate) {
		if (predicate == null) return this.length !== 0;
		for (var i = 0; i < this.length; i++)
			if (predicate(this[i]) === true) return true;
		return false;
	}
});

Object.defineProperty(Array.prototype, "average", {
	value: function () {
		var summ = 0;
		var count = 0;
		for (var i = 0; i < this.length; i++)
			if (this[i] != null) {
				summ += this[i];
				count++;
			}
		return summ / count;
	}
});

Object.defineProperty(Array.prototype, "count", {
	value: function (predicate) {
		if (predicate == null) return this.length;
		var arr = [];
		for (var i = 0; i < this.length; i++)
			if (predicate(this[i]) === true) arr.push(this[i]);
		return arr.length;
	}
});

Object.defineProperty(Array.prototype, "elementAt", {
	value: function (index) {
		return this[index];
	}
});

Object.defineProperty(Array.prototype, "except", {
	value: function(arr, comparer) {
		comparer = comparer || defaultComparer;
		var res = [];
		if (arr.length === 0) {
			return res;
		}

		for (var i = 0; i < this.length; i++)
			for (var j = 0; j < arr.length; j++)
				if (comparer(arr[j], this[i]) !==0)
					res.push(this[i]);
		return res;
	}
});

Object.defineProperty(Array.prototype, "first", {
	value: function (predicate) {
		if (predicate == null) return this[0];
		for (var i = 0; i < this.length; i++)
			if (predicate(this[i]) === true) return this[i];
		throw INVALID_OPERATION;
	}
});

Object.defineProperty(Array.prototype, "firstOrDefault", {
	value: function(predicate) {
		if (predicate != null) {
			for (var i = 0; i < this.length; i++)
				if (predicate(this[i]) === true) return this[i];
			return null;
		} else if (this.length === 0) {
			return null;
		}
		return this[0];
	}
});

Object.defineProperty(Array.prototype, "select", {
	value: function(selector) {
		var arr = [];
		for (var i = 0; i < this.length; i++)
			arr.push(selector(this[i]));
		return arr;
	}
});

Object.defineProperty(Array.prototype, "where", {
	value: function (predicate) {
		var arr = [];
		for (var i = 0; i < this.length; i++)
			if (predicate(this[i]) === true) arr.push(this[i]);
		return arr;
	}
});

Object.defineProperty(Array.prototype, "orderBy", {
	value: function (selector, comparer) {
		comparer = comparer || defaultComparer;

		return this.slice(0).sort(function (a, b) {
			return comparer(selector(a), selector(b));
		});
	}
});

Object.defineProperty(Array.prototype, "orderByDescending", {
	value: function (selector, comparer) {
		comparer = comparer || defaultComparer;
		return this.slice(0).orderBy(selector, function (a, b) { return -comparer(a, b); });
	}
});

Object.defineProperty(Array.prototype, "distinct", {
	value: function () {
		var arr = [];
		for (var i = 0; i < this.length; i++) {
			var a = this[i];
			if (!arr.any(function(x) { return x.equals(a); })) arr.push(a);
		}
		return arr;
	}
});

Object.defineProperty(Array.prototype, "toDictionary", {
	value: function (keySelector, valueSelector) {
		var dictionary = {};
		var key;
		for (var i = 0; i < this.length; i++) {
			key = keySelector(this[i]);
			dictionary[key] = valueSelector != null ? valueSelector(this[i]) : this[i];
		}
		return dictionary;
	}
});

Object.defineProperty(Array.prototype, "max", {
	value: function () {
		var max = this[0];
		for (var i = 1; i < this.length; i++)
			if (this[i] != null && max < this[i]) max = this[i];
		return max;
	}
});

Object.defineProperty(Array.prototype, "min", {
	value: function () {
		var min = this[0];
		for (var i = 1; i < this.length; i++)
			if (this[i] != null && min > this[i]) min = this[i];
		return min != null ? min : null;
	}
});

Object.defineProperty(Object.prototype, "equals", {
	value: function (b) {
		return this === b || JSON.stringify(this) === JSON.stringify(b);
	}
});

function defaultComparer(a, b) {
	if (a === b) return 0;
	if (a == null) return -1;
	if (b == null) return 1;
	if (typeof (a) == "string") return a.toString().localeCompare(b.toString());
	return a.valueOf() - b.valueOf();
};
