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

var minMaxTestSample1 = [1, 2, 3, 4, 5, 3, 2, 1, 0, -4];
var minMaxTestSample2 = [-1, undefined, -3, null, -5, -3, -2, -1, 0, -4];
var minMaxTestSample3 = [null, undefined, null];

var averageTestSample1 = [null, 10007, 37, 399846234235];
var averageTestSample2 = [null, null, null, null];
