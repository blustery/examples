"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require("chai").expect;

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("imdb", function () {
	this.timeout(300000);
	var browser = wd.promiseChainRemote("127.0.0.1", 4723);
	var allPassed = true;

	before(function () {
		var desired = {
			"appium-version": "1.0",
			platformName: "Android",
			platformVersion: "4.4",
			deviceName: "QAphone",
			app: "https://github.com/Blustery/appium/tree/master/js/apps/com.imdb.mobile_5.4.1.apk",
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

	it("Should click Movies in the left navigation", function () {
		return browser.waitForElementByXPath("//android.widget.TextView[@text='Movies']",4000).click()
			.sleep(3000)
			.waitForElementByXPath("//android.widget.TextView[@text='Coming Soon']",4000);
	});
	
	it("Click Coming Soon in the content menu", function () {
		return browser.sleep(1000).waitForElementByXPath("//android.widget.TextView[@text='Coming Soon']",4000).click()
			.waitForElementByXPath("//android.widget.TextView[@text='Coming Soon']",4000);
	});
	
	it("Click the Search icon, search for The Fifth Element, and press return key", function () {
		return browser.waitForElementByName("Search IMDb",4000).click()
			.waitForElementByName("Search query",4000).sendKeys("The Fifth Element")
			.deviceKeyEvent(66)
			.sleep(3000)
			.waitForElementByXPath("//android.widget.TextView[@text='Bruce Willis, Milla Jovovich, Gary Oldman']",4000);
	});

	it("Click the first search result", function () {
		return browser.sleep(1000).waitForElementByXPath("//android.widget.TextView[@text='Bruce Willis, Milla Jovovich, Gary Oldman']",4000).click()
			.sleep(1000)
			.waitForElementByXPath("//android.widget.TextView[@text='2 hrs 6 mins']",4000);
	});
	
	it("Flick down to the Goofs option then click it", function () {
		function findElement() {
			var flickOpts = {
				endX: 0.5
				, endY: 0.2
				, touchCount: 1
			};
			return browser.execute("mobile: flick", [flickOpts], function(err) {
			// continue testing
			})
			.sleep(1500)
			.elementByXPath("//android.widget.TextView[@text='Goofs']")
			.catch(function() {
				return findElement();
				// loops flicking function if Goofs is not found
			});
		};
		return browser.sleep(1000)
			.then(findElement).sleep(1000).click()
			.waitForElementByXPath("//android.widget.TextView[@text='Errors made by characters']",4000);
	});
	
	it("Click the ... at the top right for More Options and then click contact us", function () {
		return browser.back().waitForElementByName("More options",4000).click()
			.sleep(2000)
			.waitForElementByXPath("//android.widget.TextView[@text='Contact Us']",4000).click()
			.waitForElementByXPath("//android.widget.TextView[@text='Work at IMDb']",4000);
	});
	
	it("Click the back to home navigation, click main navigation button at top left to expand the menu, and click Celebs", function () {
		return browser.back().sleep(2000)
			.waitForElementById("android:id/home",4000).click()
			.sleep(1000)
			.waitForElementByXPath("//android.widget.TextView[@text='Home']",4000).click()
			.sleep(1000)
			.waitForElementById("android:id/home",4000).click()
			.sleep(1000)
			.waitForElementByXPath("//android.widget.TextView[@text='Celebs']",4000).click()
			.sleep(3000)
			.waitForElementByXPath("//android.widget.TextView[@text='STARmeter']",4000);
	});
	
	it("Should fail to find Waldo element for clicking", function () {
		return browser.back().waitForElementByName("More options",4000).click()
			.sleep(2000)
			.waitForElementByXPath("//android.widget.TextView[@text='Waldo']",4000).click()
			.waitForElementByXPath("//android.widget.TextView[@text='Work at IMDb']",4000)
			.text().should.eventually.include('IMDb');
	});
	
	it("Should click element, but fail to find Waldo text", function () {
		return browser.back().waitForElementByName("More options",4000).click()
			.sleep(2000)
			.waitForElementByXPath("//android.widget.TextView[@text='Contact Us']",4000).click()
			.waitForElementByXPath("//android.widget.TextView[@text='Work at IMDb']",4000)
			.text().should.eventually.include('Waldo');
	});
	
});