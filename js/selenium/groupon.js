var assert = require('assert'),
	fs = require('fs'),
	test = require('selenium-webdriver/testing'),
	webdriver = require('selenium-webdriver'),
	user = '',
	pass = '';

// Run the bash script "setup.sh" to assign static credentials as environment
// variables for use with this and other example scripts of ours.
	user = process.env.ABNBuser;
	pass = process.env.ABNBpass;

test.describe('groupon test', function() {
    this.timeout(20000);
    var driver;

	function findWaldo(element) {
		driver.sleep(1000);
		driver.wait(function() {
			return element.isDisplayed().then(function (displayed) {
				if (!displayed) {
					console.log('Where\'s Waldo?');
					return false;
				};
				return element.isEnabled();
			});
		}, 5000);
		return element;
	};

    test.before(function() {
    	this.timeout(15000);
        return driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).build();
    });

	test.it('Setup', function() {
		driver.manage().window().setSize(1080, 768);
		driver.manage().timeouts().implicitlyWait(10000);
		driver.get('https://groupon.com');
		return true;
	});
/*
	test.it('Login', function() {
		driver.findElement(webdriver.By.xpath("//a[contains(text(), 'Log In')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.name('email'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys(user);
			});
		driver.findElement(webdriver.By.name('password'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys(pass);
			});
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});
*/
	test.it('Search', function() {
		driver.sleep(2000);
		driver.findElement(webdriver.By.name('search'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys('chill');
			});
		driver.findElement(webdriver.By.id('ls-header-search-button'))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Click a result for details about the deal', function() {
		driver.sleep(2000);
		driver.findElement(webdriver.By.xpath("//*[contains(@class, 'view-deal')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Click first listing of similar deals', function() {
		driver.sleep(3000);
		driver.findElement(webdriver.By.xpath("//*[contains(@class, 'deal-card')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(7000);
		return true;
	});

    test.after(function() {
        driver.quit();
        return true;
    });
});