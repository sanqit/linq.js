function defaultComparer(a, b) {
	if (a === b) return 0;
	if (a == null) return -1;
	if (b == null) return 1;
	if (typeof(a) == "string") return a.toString().localeCompare(b.toString());
	return a.valueOf() - b.valueOf();
};

Object.defineProperty(Object.prototype, "equals", {
	value: function (b) {
		"use strict";
		var a = this;
		return a === b || a === b || JSON.stringify(a) === JSON.stringify(b);
	}
});

// Array extensions

Object.defineProperty(Array.prototype, "select", {
	value: function(selector) {
		"use strict";
		var arr = [];
		var length = this.length;
		for (var i = 0; i < length; i++)
			arr.push(selector(this[i]));
		return arr;
	}
});

Object.defineProperty(Array.prototype, "where", {
	value: function (predicate) {
		"use strict";
		var arr = [];
		var length = this.length;
		for (var i = 0; i < length; i++)
			if (predicate(this[i]) === true) arr.push(this[i]);
		return arr;
	}
});

Object.defineProperty(Array.prototype, "any", {
	value: function (predicate) {
		"use strict";
		if (predicate == null) return this.length !== 0;
		var length = this.length;
		for (var i = 0; i < length; i++)
			if (predicate(this[i]) === true) return true;
		return false;
	}
});

Object.defineProperty(Array.prototype, "all", {
	value: function (predicate) {
		"use strict";
		if (predicate == null) return this.length !== 0;
		var length = this.length;
		for (var i = 0; i < length; i++)
			if (predicate(this[i]) !== true) return false;
		return true;
	}
});

Object.defineProperty(Array.prototype, "orderBy", {
	value: function (selector, comparer) {
		"use strict";
		comparer = comparer || defaultComparer;
		var fn = function(a, b) {
			return comparer(selector(a), selector(b));
		};
		return this.sort(fn);
	}
});

Object.defineProperty(Array.prototype, "orderByDescending", {
	value: function (selector, comparer) {
		"use strict";
		comparer = comparer || defaultComparer;
		return this.orderBy(selector, function (a, b) { return -comparer(a, b); });
	}
});

Object.defineProperty(Array.prototype, "distinct", {
	value: function () {
		"use strict";
		var arr = [];
		var length = this.length;
		for (var i = 0; i < length; i++) {
			var a = this[i];
			if (!arr.any(function(x) { return x.equals(a); })) arr.push(a);
		}
		return arr;
	}
});

Object.defineProperty(Array.prototype, "toDictionary", {
	value: function (keySelector, valueSelector) {
		"use strict";
		var dictionary = {};
		var key;
		for (var i = 0; i < this.length; i++) {
			key = keySelector(this[i]);
			dictionary[key] = valueSelector != null ? valueSelector(this[i]) : this[i];
		}
		return dictionary;
	}
});