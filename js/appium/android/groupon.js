"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require("chai").expect;

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("groupon", function () {
	this.timeout(300000);
	var browser = wd.promiseChainRemote("127.0.0.1", 4723);
	var allPassed = true;

	before(function () {
		var desired = {
			"appium-version": "1.0",
			platformName: "Android",
			platformVersion: "4.4",
			deviceName: "QAphone",
			app: "https://github.com/Blustery/appium/raw/master/js/android/apps/com.groupon-15.2.4015.apk",
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

	it("Provide zip, continue, show deals, reject app update", function () {
		return browser
			.waitForElementById("com.groupon:id/continue_step",4000)
			.click()
			.waitForElementById("com.groupon:id/home",4000)
			.sendKeys("87111")
			.waitForElementById("com.groupon:id/continue_step",4000)
			.click()
			.elementByXPath("//*[@text='Just show me the deals']")
			.click()
			.waitForElementById("com.groupon:id/negative_button",4000)
			.click();
	});

	it("Click the Search menu, and search for a deal", function () {
		return browser
			.waitForElementById("com.groupon:id/global_search_button_text",4000)
			.click()
			.waitForElementById("com.groupon:id/search_edittext",4000)
			.sendKeys("chill")
			.deviceKeyEvent(66);
	});

	it("Click a result for details about the deal", function () {
		return browser
			.waitForElementByXPath("//android.widget.FrameLayout[1]/android.widget.RelativeLayout[1]/android.widget.FrameLayout[1]",4000)
			.click();
	});

	it("Flick down until the end, then click first similar deal", function () {
		function findElement() {
			var flickOpts = {
				endX: 0.5
				, endY: 0.18
				, touchCount: 1
			};
			return browser.execute("mobile: flick", [flickOpts], function(err) {
			// continue testing
			})
			.sleep(1000)
			.waitForElementById("com.groupon:id/qa_discussions_title",4000)
			.catch(function() {
				return findElement();
				// loops flicking function if Goofs is not found
			});
		};
		return browser.sleep(1000)
			.elementByXPath("//*[@text='Highlights']")
			.then(findElement)
			.waitForElementById("com.groupon:id/submit",4000)
			.click()
			.waitForElementById("com.groupon:id/fragment_log_in_sign_up_email",4000);
	});

	it("Should fail to find Waldo", function () {
		return browser
			.waitForElementByXPath("//*[@content-desc='Waldo']",1000).should.eventually.be.rejected;
	});

});