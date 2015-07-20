"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require("chai").expect;

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("mtgfamiliar", function () {
	this.timeout(300000);
	var browser = wd.promiseChainRemote("127.0.0.1", 4723);
	var allPassed = true;

	before(function () {
		var desired = {
			"appium-version": "1.0",
			platformName: "Android",
			platformVersion: "4.4",
			deviceName: "QAphone",
			app: "https://github.com/Blustery/appium/blob/master/js/android/apps/MTG_Familiar.apk",
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

	it("Close greeting, Search for a card", function () {
		return browser
			.waitForElementByXPath("//*[@text='Enjoy!']",4000).click()
			.sleep(3000)
			.waitForElementById("com.gelakinetic.mtgfam:id/name_search",4000).click()
			.sendKeys("Bant Charm")
			.deviceKeyEvent(66)
			.sleep(2000)
			.waitForElementByXPath("//*[@text='Instant']",4000)
			.waitForElementById("com.gelakinetic.mtgfam:id/ability",4000)
			.text().should.eventually.include("artifact");
	});

	it("Open navigation drawer", function () {
		return browser
			.waitForElementByXPath("//*[@content-desc='Open navigation drawer']",4000).click()
			.waitForElementByXPath("//android.widget.TextView[@text='Life Counter']",4000);
	});
	
	it("Open Life Counter", function () {
		return browser.waitForElementByXPath("//android.widget.TextView[@text='Life Counter']",4000).click()
			.waitForElementByXPath("//android.widget.TextView[@text='Player 1']",4000);
	});

	it("Add 5 life until Player 1 is at 40", function () {
		function findElement() {
			return browser.waitForElementById("com.gelakinetic.mtgfam:id/player_plus5",4000).click()
			.sleep(1500)
			.elementByXPath("//android.widget.TextView[@text='40']")
			.catch(function() {
				return findElement();
				// loops clicking function until Player 1 is at 40 life
			});
		};
		return browser.sleep(1000)
			.then(findElement).sleep(1000)
			.waitForElementByXPath("//android.widget.TextView[@text='35']",4000);
	});
	
	it("Reset Life Totals", function () {
		return browser.waitForElementById("com.gelakinetic.mtgfam:id/reset_button",4000).click()
			.sleep(2000)
			.waitForElementByXPath("//*[@text='Both']",4000).click();
	});

	it("Navigate to the Dice", function () {
		return browser
			.sleep(1000)
			.waitForElementByXPath("//*[@content-desc='Open navigation drawer']",4000).click()
			.sleep(1000)
			.waitForElementByXPath("//android.widget.TextView[@text='Dice']",4000).click()
			.waitForElementById("com.gelakinetic.mtgfam:id/d12",4000);
	});
	
	it("Roll a d6 until you get a 5", function () {
		function findElement() {
			return browser.waitForElementById("com.gelakinetic.mtgfam:id/d6",4000).click()
			.sleep(1500)
			.elementByXPath("//android.widget.TextView[@text='5']")
			.catch(function() {
				return findElement();
				// loops rolling the d6 until a 5 is rolled
			});
		};
		return browser.sleep(1000)
			.then(findElement);
	});

});