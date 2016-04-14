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
		return this === b || JSON.stringify(this) === JSON.stringify(b);
	}
});

// Array extensions

Object.defineProperty(Array.prototype, "select", {
	value: function(selector) {
		"use strict";
		var arr = [];
		for (var i = 0; i < this.length; i++)
			arr.push(selector(this[i]));
		return arr;
	}
});

Object.defineProperty(Array.prototype, "where", {
	value: function (predicate) {
		"use strict";
		var arr = [];
		for (var i = 0; i < this.length; i++)
			if (predicate(this[i]) === true) arr.push(this[i]);
		return arr;
	}
});

Object.defineProperty(Array.prototype, "any", {
	value: function (predicate) {
		"use strict";
		if (predicate == null) return this.length !== 0;
		for (var i = 0; i < this.length; i++)
			if (predicate(this[i]) === true) return true;
		return false;
	}
});

Object.defineProperty(Array.prototype, "all", {
	value: function (predicate) {
		"use strict";
		if (predicate == null) return this.length !== 0;
		for (var i = 0; i < this.length; i++)
			if (predicate(this[i]) !== true) return false;
		return true;
	}
});

Object.defineProperty(Array.prototype, "orderBy", {
	value: function (selector, comparer) {
		"use strict";
		comparer = comparer || defaultComparer;
		return this.sort(function(a, b) {
			return comparer(selector(a), selector(b));
		});
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
		for (var i = 0; i < this.length; i++) {
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

Object.defineProperty(Array.prototype, "max", {
	value: function () {
		"use strict";
		var max = this[0];
		for (var i = 1; i < this.length; i++)
			if (this[i] != null && max < this[i]) max = this[i];
		return max;
	}
});

Object.defineProperty(Array.prototype, "min", {
	value: function () {
		"use strict";
		var min = this[0];
		for (var i = 1; i < this.length; i++)
			if (this[i] != null && min > this[i]) min = this[i];
		return min != null ? min : null;
	}
});
