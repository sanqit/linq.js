var empty = [];
var testSample1 = [
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" },
	{ SampleID: 4, Desc: "Desc4", Code: "Code4" },
	{ SampleID: 3, Desc: "Desc3", Code: "Code3" },
	{ SampleID: 2, Desc: "Desc2", Code: "Code2" },
	{ SampleID: 5, Desc: "Desc5", Code: "Code5" }
];

var testSample2 = [
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" },
	{ SampleID: 2, Desc: "Desc2", Code: "Code2" },
	{ SampleID: 3, Desc: "Desc3", Code: "Code3" },
	{ SampleID: 4, Desc: "Desc4", Code: "Code4" },
	{ SampleID: 5, Desc: "Desc5", Code: "Code5" }
];

var testSample3 = [
	{ SampleID: 5, Desc: "Desc5", Code: "Code5" },
	{ SampleID: 4, Desc: "Desc4", Code: "Code4" },
	{ SampleID: 3, Desc: "Desc3", Code: "Code3" },
	{ SampleID: 2, Desc: "Desc2", Code: "Code2" },
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" }
];

var testSample4 = [
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" },
	{ SampleID: 4, Desc: "Desc1", Code: "Code4" },
	{ SampleID: 3, Desc: "Desc1", Code: "Code3" },
	{ SampleID: 2, Desc: "Desc1", Code: "Code2" },
	{ SampleID: 5, Desc: "Desc1", Code: "Code5" }
];

var testBeforeDistinct1 = [
	{ SampleID: 5, Desc: "Desc5", Code: "Code5" },
	{ SampleID: 5, Desc: "Desc5", Code: "Code5" },
	{ SampleID: 3, Desc: "Desc3", Code: "Code3" },
	{ SampleID: 2, Desc: "Desc2", Code: "Code2" },
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" }
];

var testAfterDistinct1 = [
	{ SampleID: 5, Desc: "Desc5", Code: "Code5" },
	{ SampleID: 3, Desc: "Desc3", Code: "Code3" },
	{ SampleID: 2, Desc: "Desc2", Code: "Code2" },
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" }
];

var sampleBeforeDistinctArrayObj = [
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" },
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" },
	{ SampleID: 4, Desc: "Desc4", Code: "Code4" },
	{ SampleID: 4, Desc: "Desc4", Code: "Code4" },
	{ SampleID: 3, Desc: "Desc3", Code: "Code3" },
	{ SampleID: 2, Desc: "Desc2", Code: "Code2" },
	{ SampleID: 5, Desc: "Desc5", Code: "Code5" }
];

var sampleAfterDistinctArrayObj = [
	{ SampleID: 1, Desc: "Desc1", Code: "Code1" },
	{ SampleID: 4, Desc: "Desc4", Code: "Code4" },
	{ SampleID: 3, Desc: "Desc3", Code: "Code3" },
	{ SampleID: 2, Desc: "Desc2", Code: "Code2" },
	{ SampleID: 5, Desc: "Desc5", Code: "Code5" }
];

var testSampleAfterSelect = [1, 4, 3, 2, 5];

var sampleArrayObjAfterToDictionary = {};
sampleArrayObjAfterToDictionary[1] = "Code1";
sampleArrayObjAfterToDictionary[2] = "Code2";
sampleArrayObjAfterToDictionary[3] = "Code3";
sampleArrayObjAfterToDictionary[4] = "Code4";
sampleArrayObjAfterToDictionary[5] = "Code5";


var sampleArrayObjAfterToDictionary_valueNull = {};
sampleArrayObjAfterToDictionary_valueNull[1] = { SampleID: 1, Desc: "Desc1", Code: "Code1" };
sampleArrayObjAfterToDictionary_valueNull[2] = { SampleID: 2, Desc: "Desc2", Code: "Code2" };
sampleArrayObjAfterToDictionary_valueNull[3] = { SampleID: 3, Desc: "Desc3", Code: "Code3" };
sampleArrayObjAfterToDictionary_valueNull[4] = { SampleID: 4, Desc: "Desc4", Code: "Code4" };
sampleArrayObjAfterToDictionary_valueNull[5] = { SampleID: 5, Desc: "Desc5", Code: "Code5" };

function TestEquals() {
	var isEquals = true;
	isEquals &= testSample1.equals(testSample1);
	isEquals &= [].equals([]);
	return isEquals;
}

function TestSelect() {
	var isSelectComplete = true;
	isSelectComplete &= (testSampleAfterSelect.equals(testSample1.select(x => x.SampleID)));
	isSelectComplete &= (testSampleAfterSelect.equals(testSample1.select(x => x.SampleID)));
	isSelectComplete &= (testSample1.select(x => x.Code)[0].indexOf("Code") + 1);
	isSelectComplete &= (testSample1.select(x => x.Undef)[0] == null);
	return isSelectComplete;
}

function TestWhere() {
	var isWhereComplete = true;
	isWhereComplete &= (testSample1.where(x => x.SampleID == 3).equals([{ SampleID: 3, Desc: "Desc3", Code: "Code3" }]));
	isWhereComplete &= (testSample1.where(x => x.SampleID >= 3).equals([{ SampleID: 4, Desc: "Desc4", Code: "Code4" }, { SampleID: 3, Desc: "Desc3", Code: "Code3" }, { SampleID: 5, Desc: "Desc5", Code: "Code5" }]));
	isWhereComplete &= (testSample1.where(x => x.Code == 100).length == 0);
	return isWhereComplete;
}

function TestAny() {
	var isAnyComplete = true;
	isAnyComplete &= !empty.any();
	isAnyComplete &= testSample1.any();
	isAnyComplete &= testSample1.any(x => x.Desc == "Desc2" || x.Code == "Code1");
	isAnyComplete &= !testSample1.any(x => x.Desc == "Desc32");
	isAnyComplete &= testSample1.any(x => x.equals({ SampleID: 1, Desc: "Desc1", Code: "Code1" }));
	return isAnyComplete;
}

function TestAll() {
	var isAllComplete = true;
	isAllComplete &= testSample4.all(x => x.Desc == "Desc1");
	isAllComplete &= testSample4.all(x => x.Desc == "Desc1" && x.Code !== "code");
	isAllComplete &= testSample4.all(x => x != null);
	return isAllComplete;
}

function TestDistinct() {
	var isDistinctComplete = true;
	isDistinctComplete &= (testAfterDistinct1.equals(testBeforeDistinct1.distinct(x => x.SampleID)));
	isDistinctComplete &= (testSample1.equals(testSample1.distinct(x => x.Desc)));
	isDistinctComplete &= (sampleAfterDistinctArrayObj.equals(sampleBeforeDistinctArrayObj.distinct()));
	return isDistinctComplete;
}

function TestOrderBy() {
	var isOrderByComplete = true;
	isOrderByComplete &= (testSample2.equals(testSample1.orderBy(x => x.SampleID)));
	isOrderByComplete &= (testSample2.equals(testSample1.orderBy(x => x.Desc)));
	isOrderByComplete &= (testSample2.equals(testSample1.orderBy(x => x.Code)));
	isOrderByComplete &= ([].equals([].orderBy(x => x.Code)));
	return isOrderByComplete;
}

function TestOrderByDescending() {
	var isOrderByDescendingComplete = true;
	isOrderByDescendingComplete &= (testSample3.equals(testSample1.orderByDescending(x => x.SampleID)));
	isOrderByDescendingComplete &= (testSample3.equals(testSample1.orderByDescending(x => x.Desc)));
	isOrderByDescendingComplete &= (testSample3.equals(testSample1.orderByDescending(x => x.Code)));
	return isOrderByDescendingComplete;
}

function TestToDictionary() {
	var isToDictionaryComplete = true;
	isToDictionaryComplete &= (sampleArrayObjAfterToDictionary.equals(sampleBeforeDistinctArrayObj.toDictionary(x => x.SampleID, x => x.Code)));
	isToDictionaryComplete &= (sampleArrayObjAfterToDictionary_valueNull.equals(sampleBeforeDistinctArrayObj.toDictionary(x => x.SampleID)));
	return isToDictionaryComplete;
}