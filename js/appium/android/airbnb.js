"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require("chai").expect;
var user = '';
var pass = '';

// Run the bash script "setup.sh" to assign static credentials as environment
// variables for use with this and other example scripts of ours.
	user = process.env.ABNBuser;
	pass = process.env.ABNBpass;

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("airbnb", function () {
	this.timeout(300000);
	var browser = wd.promiseChainRemote("127.0.0.1", 4723);
	var allPassed = true;

	before(function () {
		var desired = {
			"appium-version": "1.0",
			platformName: "Android",
			platformVersion: "4.4",
			deviceName: "QAphone",
			app: "https://github.com/Blustery/appium/raw/master/js/android/apps/Airbnb-5.7.1.apk",
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

	it("Log In", function () {
		return browser
			.waitForElementByXPath("//*[@text='Log In']",4000)
			.click()
			.waitForElementById("com.airbnb.android:id/btn_email_sign_in",4000)
			.click()
			.waitForElementById("com.airbnb.android:id/edit_email",4000)
			.sendKeys(user)
			.waitForElementById("com.airbnb.android:id/edit_password",4000)
			.sendKeys(pass)
			.waitForElementById("com.airbnb.android:id/btn_signin",4000)
			.click();
	});

	it("Click the Search menu, and search for a Location", function () {
		return browser
			.waitForElementByXPath("//android.widget.HorizontalScrollView[1]/android.widget.LinearLayout[1]/android.widget.ImageView[2]",4000)
			.click()
			.waitForElementById("com.airbnb.android:id/search_src_text",4000)
			.sendKeys("Tokyo, Japan")
			.deviceKeyEvent(66);
	});

	it("Click a result for details about the lodging", function () {
		return browser
			.waitForElementByXPath("//android.widget.ListView[1]/android.widget.RelativeLayout[1]/android.view.View[1]",4000)
			.click()
	});

	it("Flick down until the end, then click More Similar Listings", function () {
		function findElement() {
			var flickOpts = {
				endX: 0.5
				, endY: 0.2
				, touchCount: 1
			};
			return browser.execute("mobile: flick", [flickOpts], function(err) {
			// continue testing
			})
			.sleep(1000)
			.elementByXPath("//*[@text='More Similar Listings']")
			.catch(function() {
				return findElement();
				// loops flicking function if Goofs is not found
			});
		};
		return browser.sleep(1000)
			.then(findElement).sleep(1000).click()
			.waitForElementByXPath("//*[@text='Similar Listings']",4000);
	});

	it("Navigate back and view Account", function () {
		return browser
			.sleep(1000)
			.deviceKeyEvent(4)
			.sleep(1000)
			.deviceKeyEvent(4)
			.sleep(1000)
			.deviceKeyEvent(4)
			.sleep(1000)
			.waitForElementByName("Account")
			.click();
	});

	it("Should fail to find Waldo", function () {
		return browser
			.waitForElementByXPath("//*[@content-desc='Waldo']",1000).should.eventually.be.rejected;
	});

});