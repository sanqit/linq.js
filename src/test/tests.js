QUnit.test("test aggregate", function (assert) {
	var sentence = "the quick brown fox jumps over the lazy dog";
	// Split the string into individual words.
	var words = sentence.split(" ");

	// Prepend each word to the beginning of the 
	// new sentence to reverse the word order.
	var reversed = words.aggregate((workingSentence, next) => next + " " + workingSentence);
	assert.equal(reversed, "dog lazy the over jumps fox brown quick the ");
});


QUnit.test("test all", function (assert) {
	assert.ok(testSample4.all(x => x.Desc == "Desc1"), "test all with simple predicate");
	assert.ok(testSample4.all(x => x.Desc == "Desc1" && x.Code !== "code"), "test all with complex predicate");
	assert.ok(testSample4.all(x => x != null), "test all array, where all elements is not null");
});


QUnit.test("test any", function (assert) {
	assert.notOk(empty.any());
	assert.ok(testSample1.any(), "test any without predicate");
	assert.ok(testSample1.any(x => x.Desc == "Desc2" || x.Code == "Code1"), "test any with predicate");
	assert.notOk(testSample1.any(x => x.Desc == "Desc32"));
	assert.ok(testSample1.any(x => x.equals({ SampleID: 1, Desc: "Desc1", Code: "Code1" })), "test any which equals expression");
});

QUnit.test("test average", function (assert) {
	assert.equal(averageTestSample1.average(), 133282081426.33333, "test average numeric array");
	assert.ok(isNaN(averageTestSample2.average()), "test average array, which contains only nulls");
});

QUnit.test("test concat", function (assert) {
	var cats = [{ Name: "Barley", Age: 8 }, { Name: "Boots", Age: 4 }, { Name: "Whiskers", Age: 1 }];
	var dogs = [{ Name: "Bounder", Age: 3 }, { Name: "Snoopy", Age: 14 }, { Name: "Fido", Age: 9 }];
	var query = cats.select(cat => cat.Name).concat(dogs.select(dog => dog.Name));
	assert.equal(JSON.stringify(query), JSON.stringify(["Barley", "Boots", "Whiskers", "Bounder", "Snoopy", "Fido"]));
});

QUnit.test("test count", function (assert) {
	var fruits = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
	assert.equal(fruits.count(), 6, "test count without predicate");
	var pets = [{ Name: "Barley", Vaccinated: true }, { Name: "Boots", Vaccinated: false }, { Name: "Whiskers", Vaccinated: false }];
	assert.equal(pets.count(x => !x.Vaccinated), 2, "test count with predicate");
});


QUnit.test("test ElementAt", function (assert) {
	var fruits = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
	assert.equal(fruits.elementAt(1), "banana", "elementAt(1)");
});

QUnit.test("test exept", function (assert) {
	var numbers1 = [2.0, 2.1, 2.2, 2.3, 2.4, 2.5];
	var numbers2 = [2.2];
	var onlyInFirstSet = numbers1.except(numbers2);
	assert.equal(JSON.stringify(onlyInFirstSet), JSON.stringify([2.0, 2.1, 2.3, 2.4, 2.5]));
});

QUnit.test("test first", function (assert) {
	var numbers = [9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 435, 67, 12, 19];
	assert.equal(numbers.first(), 9, "test first without predicate");
	assert.equal(numbers.first(number => number > 80), 92, "test first with predicate");
});

QUnit.test("test FirstOrDefault", function (assert) {
	var names = ["Hartono, Tommy", "Adams, Terry", "Andersen, Henriette Thaulow", "Hedlund, Magnus", "Ito, Shu"];
	assert.equal(names.firstOrDefault(name => name.length > 20), "Andersen, Henriette Thaulow", "firstOrDefault with predicate, which array contains");
	assert.equal(names.firstOrDefault(name => name.length > 30), null, "firstOrDefault with predicate, which array not contains");
	assert.equal(names.firstOrDefault(), "Hartono, Tommy", "firstOrDefault without predicate from array");
	assert.equal(empty.firstOrDefault(), null, "firstOrDefault without predicate from empty array");
});

QUnit.test("test equals", function (assert) {
	assert.ok(testSample1.equals(testSample1), "equal same array");
	assert.ok(empty.equals(empty), "equal two empty arrays");
});

QUnit.test("test select", function (assert) {
	assert.equal(JSON.stringify(testSampleAfterSelect), JSON.stringify(testSample1.select(x => x.SampleID)));
	assert.equal(JSON.stringify(testSampleAfterSelect), JSON.stringify(testSample1.select(x => x.SampleID)));
	assert.ok(testSample1.select(x => x.Code)[0].indexOf("Code") + 1);
	assert.equal(testSample1.select(x => x.Undef)[0], null);
});

QUnit.test("test where", function (assert) {
	assert.equal(JSON.stringify(testSample1.where(x => x.SampleID == 3)),JSON.stringify([{ SampleID: 3, Desc: "Desc3", Code: "Code3" }]));
	assert.equal(JSON.stringify(testSample1.where(x => x.SampleID >= 3)),JSON.stringify([{ SampleID: 4, Desc: "Desc4", Code: "Code4" }, { SampleID: 3, Desc: "Desc3", Code: "Code3" }, { SampleID: 5, Desc: "Desc5", Code: "Code5" }]));
	assert.equal(testSample1.where(x => x.Code == 100).length, 0);
});

QUnit.test("test distinct", function (assert) {
	assert.equal(JSON.stringify(testAfterDistinct1), JSON.stringify(testBeforeDistinct1.distinct(x => x.SampleID)));
	assert.equal(JSON.stringify(testSample1), JSON.stringify(testSample1.distinct(x => x.Desc)));
	assert.equal(JSON.stringify(sampleAfterDistinctArrayObj), JSON.stringify(sampleBeforeDistinctArrayObj.distinct()));
});

QUnit.test("test orderBy", function (assert) {
	assert.equal(JSON.stringify(testSample2), JSON.stringify(testSample1.orderBy(x => x.SampleID)));
	assert.equal(JSON.stringify(testSample2), JSON.stringify(testSample1.orderBy(x => x.Desc)));
	assert.equal(JSON.stringify(testSample1), JSON.stringify(testSample1));
	assert.equal(JSON.stringify(testSample2), JSON.stringify(testSample1.orderBy(x => x.Code)));
	assert.equal(JSON.stringify(empty), JSON.stringify(empty.orderBy(x => x.Code)));
});

QUnit.test("test orderByDescending", function (assert) {
	assert.equal(JSON.stringify(testSample3), JSON.stringify(testSample1.orderByDescending(x => x.SampleID)));
	assert.equal(JSON.stringify(testSample3), JSON.stringify(testSample1.orderByDescending(x => x.Desc)));
	assert.equal(JSON.stringify(testSample3), JSON.stringify(testSample1.orderByDescending(x => x.Code)));
});

QUnit.test("test toDictionary", function (assert) {
	assert.equal(JSON.stringify(sampleArrayObjAfterToDictionary), JSON.stringify(sampleBeforeDistinctArrayObj.toDictionary(x => x.SampleID, x => x.Code)));
	assert.equal(JSON.stringify(sampleArrayObjAfterToDictionary_valueNull), JSON.stringify(sampleBeforeDistinctArrayObj.toDictionary(x => x.SampleID)));
});

QUnit.test("test max", function (assert) {
	assert.equal(minMaxTestSample1.max(), 5);
	assert.equal(minMaxTestSample2.max(), 0);
	assert.equal(minMaxTestSample3.max(), null);
});

QUnit.test("test min", function (assert) {
	assert.equal(minMaxTestSample1.min(), -4);
	assert.equal(minMaxTestSample2.min(), -5);
	assert.equal(minMaxTestSample3.min(), null);
});
