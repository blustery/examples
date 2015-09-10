"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = require("chai").expect;
var user = '';
var pass = '';

// Run the bash script "setup.sh" to assign static credentials as environment
// variables for use with this and other example scripts of ours.
	user = process.env.TWuser;
	pass = process.env.TWpass;

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("twitter", function () {
	this.timeout(300000);
	var browser = wd.promiseChainRemote("127.0.0.1", 4723);
	var allPassed = true;

	before(function () {
		var desired = {
			"appium-version": "1.0",
			platformName: "Android",
			platformVersion: "4.4",
			deviceName: "QAphone",
			app: "https://github.com/Blustery/appium/raw/master/js/android/apps/com.twitter.android-5.75.0.apk",
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

	it("If logged in, click OK on location services, or Log In then click OK", function () {
// After running this script once the login session is maintained for a while and you only need to click OK on the prompt
		function clickOkay() {
			return browser
				.waitForElementByXPath("//*[@text='OK']",4000)
				.catch(function() {
					return browser
						.waitForElementById("com.twitter.android:id/log_in",4000)
						.click()
						.waitForElementById("com.twitter.android:id/login_identifier",4000)
// IMPORTANT - use clear to remove any existing usernames before sending keys.
// If not cleared the pre-filled username will disappear and then be typed before appending the new username.
						.clear()
						.sendKeys(user)
						.waitForElementById("com.twitter.android:id/login_password",4000)
						.sendKeys(pass)
						.waitForElementById("com.twitter.android:id/login_login",4000)
						.click()
						.then(clickOkay);
				})
				.click();
		};
		return browser.sleep(1000).then(clickOkay);
	});

	it("Click the Search menu, and search for something", function () {
		return browser
			.waitForElementByName("Search",4000)
			.click()
			.waitForElementById("com.twitter.android:id/query",4000)
			.sendKeys("LoadStorm aurora")
			.deviceKeyEvent(66);
	});

	it("Retweet something", function () {
		return browser
			.waitForElementByXPath("//*[contains(@content-desc,'shaking')]/android.view.View[1]",4000)
			.click()
			.waitForElementByName("Retweet",4000)
			.click()
			.waitForElementByXPath("//*[@text='Retweet']",4000)
			.click();
	});

	it("Navigate back to Home", function () {
		return browser
			.waitForElementByName("Tweet. Navigate up",4000)
			.click()
			.waitForElementByName("Twitter. Navigate up",4000)
			.click()
			.waitForElementByName("Navigate up",4000)
			.click();
	});

	it("Create a new Tweet", function () {
		return browser
			.waitForElementByName("Compose Tweet",4000)
			.click()
			.waitForElementByXPath("//*[contains(@text,'happening')]",4000)
			.sendKeys("Hello Steven")
			.waitForElementByXPath("//*[@text='Tweet']",4000)
			.click();
	});

	it("Favorite the new Tweet", function () {
		return browser
			.waitForElementByName("Home",4000)
			.click()
			.waitForElementByXPath("//*[contains(@content-desc,'Hello Steven')]/android.view.View[1]",4000)
			.click()
			.waitForElementByName("Favorite",4000)
			.click();
	});

	it("Delete the Tweet", function () {
		return browser
			.waitForElementByName("Delete",4000)
			.click()
			.waitForElementByXPath("//*[@text='Yes']",4000)
			.click();
	});

	it("Undo the Retweet", function () {
		return browser
			.waitForElementByXPath("//*[contains(@content-desc,'shaking')]/android.view.View[1]",4000)
			.click()
			.waitForElementByName("Retweet (Retweeted)",4000)
			.click()
			.waitForElementByXPath("//*[@text='Undo Retweet']",4000)
			.click()
			.waitForElementByName("Tweet. Navigate up",4000)
			.click();
	});
	
	it("Should fail to find Waldo", function () {
		return browser
			.waitForElementByXPath("//*[@content-desc='Waldo']",1000).should.eventually.be.rejected;
	});

});