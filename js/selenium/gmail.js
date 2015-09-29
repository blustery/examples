var assert = require('assert'),
	fs = require('fs'),
	test = require('selenium-webdriver/testing'),
	webdriver = require('selenium-webdriver'),
	user = '',
	pass = '';

// Run the bash script "setup.sh" to assign static credentials as environment
// variables for use with this and other example scripts of ours.
	user = process.env.GMuser;
	pass = process.env.GMpass;
    
test.describe('Gmail test', function() {
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
		driver.get('https://gmail.com');
		return true;
	});

	test.it('Login', function() {
		driver.findElement(webdriver.By.name('Email'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys(user);
			});
		driver.findElement(webdriver.By.name('signIn'))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.name('Passwd'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys(pass);
			});
		driver.sleep(1000);
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Search', function() {
		driver.findElement(webdriver.By.name('q'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys("hi");
			});
		driver.sleep(1000);
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Compose a draft email', function() {
		driver.findElement(webdriver.By.xpath("//div[contains(text(),'COMPOSE')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.actions().sendKeys(user).perform();
		driver.findElement(webdriver.By.xpath("//input[contains(@name,'subjectbox')]"))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys('Selenium Email');
			});
		driver.findElement(webdriver.By.xpath("//div[contains(@aria-label, 'Message Body')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.actions().sendKeys('This email was composed via a Selenium javascript test.').perform();
		driver.sleep(2000);
		driver.findElement(webdriver.By.xpath("//img[contains(@aria-label, 'Save & Close')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Open draft email and send it', function() {
		driver.findElement(webdriver.By.xpath("//a[contains(text(), 'Drafts')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(3000);
		driver.findElement(webdriver.By.xpath("//td/div[contains(@role, 'link')]//span[contains(text(), 'javascript')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//div[@aria-label='Send ‪(⌘Enter)‬']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Reply to the newly received email', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//a[contains(text(), 'Inbox')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//td/div[contains(@role, 'link')]//span[contains(text(), 'javascript')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//div[@aria-label='Reply']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.actions().sendKeys('This reply is a response to an automated email composed via a Selenium javascript test.').perform();
		driver.findElement(webdriver.By.xpath("//div[@aria-label='Send ‪(⌘Enter)‬']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Delete both of the automated emails', function() {
		driver.findElement(webdriver.By.xpath("//div[@aria-label='More']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//div[@role='menuitem']/div/div/div[contains(text(), 'Delete this message')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@aria-label='More']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//div[@role='menuitem']/div/div/div[contains(text(), 'Delete this message')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		return true;
	});

    test.after(function() {
        driver.quit();
        return true;
    });
});