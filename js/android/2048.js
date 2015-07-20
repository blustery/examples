"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require("chai").expect;

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("2048", function () {
	this.timeout(300000);
	var browser = wd.promiseChainRemote("127.0.0.1", 4723);
	var allPassed = true;

	before(function () {
		var desired = {
			"appium-version": "1.0",
			platformName: "Android",
			platformVersion: "4.4",
			deviceName: "QAphone",
			app: "https://github.com/Blustery/appium/blob/master/js/android/apps/2048.apk",
			"app-package": "",
			"app-activity": ""
		};
	    return browser
	    .init(desired)
	    .setImplicitWaitTimeout(5000);
	});

	after(function () {
	    return browser.quit();
	});

	afterEach(function () {
	    allPassed = allPassed && this.currentTest.state === 'passed';
	});

	it("Should find a tile with the number 2", function () {
		return browser.sleep(1000)
			.waitForElementByXPath("//*[@content-desc='2']",1000);
	});

	it("Should flick down, right, and left until a tile with 16 appears", function () {
		function findElement() {
			var flickDown = {
				endX: 0.5
				, endY: 0.8
				, touchCount: 1
			};
			var flickRight = {
				endX: 0.8
				, endY: 0.5
				, touchCount: 1
			};
			var flickLeft = {
				endX: 0.2
				, endY: 0.5
				, touchCount: 1
			};
			return browser
			.execute("mobile: flick", [flickDown], function(err) {
			// continue testing
			})
			.sleep(1500)
			.execute("mobile: flick", [flickRight], function(err) {
			// continue testing
			})
			.sleep(1500)
			.execute("mobile: flick", [flickLeft], function(err) {
			// continue testing
			})
			.sleep(1500)
			.elementByXPath("//*[@content-desc='16']")
			.catch(function() {
				return findElement();
				// loops flicking function if a tile with 16 is not found
			});
		};
		return browser.sleep(1000)
			.then(findElement).sleep(1000)
			.waitForElementByXPath("//*[@content-desc='16']",4000);
	});

	it("Should fail to find Waldo", function () {
		return browser.sleep(1000)
			.waitForElementByXPath("//*[@content-desc='Waldo']",1000);
	});

});