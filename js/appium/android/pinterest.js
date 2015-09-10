"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require("chai").expect;
var user = '';
var pass = '';

// Run the bash script "setup.sh" to assign static credentials as environment
// variables for use with this and other example scripts of ours.
	user = process.env.PINuser;
	pass = process.env.PINpass;

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("pinterest", function () {
	this.timeout(300000);
	var browser = wd.promiseChainRemote("127.0.0.1", 4723);
	var allPassed = true;

	before(function () {
		var desired = {
			"appium-version": "1.0",
			platformName: "Android",
			platformVersion: "4.4",
			deviceName: "QAphone",
			app: "https://github.com/Blustery/appium/raw/master/js/android/apps/com.pinterest-5.2.2.apk",
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

	it("Click Continue, then Log In", function () {
		return browser
			.waitForElementByXPath("//*[@text='Continue']",4000)
			.click()
			.waitForElementById("com.pinterest:id/login_bt",4000)
			.click()
			.waitForElementById("com.pinterest:id/email",4000)
// IMPORTANT - use clear to remove any existing usernames before sending keys.
// If not cleared the pre-filled username will disappear and then be typed before appending the new username.
			.clear()
			.sendKeys(user)
			.waitForElementById("com.pinterest:id/password",4000)
			.sendKeys(pass)
			.waitForElementById("com.pinterest:id/login_bt",4000)
			.click();
	});

	it("Create a board to pin things to", function () {
		return browser
			.waitForElementByName("Profile")
			.click()
			.waitForElementByXPath("//*[@text='BOARDS']",4000)
			.click()
			.waitForElementByXPath("//*[@text='Create a board']",4000)
			.click()
			.waitForElementByXPath("//*[@text='More options']",4000)
			.click()
			.waitForElementById("com.pinterest:id/is_secret_board_cb",4000)
			.click()
			.waitForElementById("com.pinterest:id/board_name_et",4000)
			.sendKeys("UI-Testing")
			.waitForElementById("com.pinterest:id/create",4000)
			.click();
	});

	it("Click the Search menu, and search for something", function () {
		return browser
			.waitForElementByName("Explore")
			.click()
			.waitForElementById("com.pinterest:id/search_tv",4000)
			.click()
			.waitForElementById("com.pinterest:id/query_input",4000)
			.sendKeys("loadstorm infographics importance")
			.deviceKeyEvent(66);
	});

	it("Like and Pin something", function () {
		return browser
			.waitForElementByXPath("//android.widget.AdapterView[1]/android.view.View[1]",4000)
			.click()
			.waitForElementByName("Like")
			.click()
			.waitForElementById("com.pinterest:id/pinit_bt",4000)
			.click()
			.waitForElementByXPath("//*[@text='UI-Testing']",4000)
			.click();
	});

	it("Navigate back to Profile", function () {
		return browser
			.deviceKeyEvent(4)
			.deviceKeyEvent(4)
			.waitForElementByName("Profile")
			.click();
	});

	it("Delete the Board", function () {
		return browser
			.waitForElementByXPath("//*[@text='BOARDS']",4000)
			.click()
			.waitForElementByXPath("//*[@text='UI-Testing']",4000)
			.click()
			.waitForElementByXPath("//*[@text='Edit']",4000)
			.click()
			.waitForElementByXPath("//*[@text='Delete board']",4000)
			.click()
			.waitForElementById("com.pinterest:id/positive_bt",4000)
			.click();
	});

	it("Unlike the Pin", function () {
		return browser
			.waitForElementByXPath("//*[@text='LIKES']",4000)
			.click()
			.waitForElementByXPath("//android.widget.AdapterView[1]/android.view.View[1]",4000)
			.click()
			.waitForElementByName("Like")
			.click();
	});
	
	it("Should fail to find Waldo", function () {
		return browser
			.waitForElementByXPath("//*[@content-desc='Waldo']",1000).should.eventually.be.rejected;
	});

});