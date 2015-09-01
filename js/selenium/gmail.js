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

    test.before(function() {
    	this.timeout(15000);
        return driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).build();
    });

	test.it('Setup', function() {
		driver.manage().window().setSize(1080, 768);
		driver.get('https://gmail.com');
		return true;
	});

	test.it('Login', function() {
		driver.sleep(1000);
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.name('Email'));
		},5000);
		driver.findElement(webdriver.By.name('Email')).sendKeys(user);
		driver.findElement(webdriver.By.name('signIn')).click();
		driver.sleep(2000);
		driver.findElement(webdriver.By.name('Passwd')).sendKeys(pass);
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Search', function() {
		driver.sleep(1000);
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.name('q'));
		}, 6000);
		driver.findElement(webdriver.By.name('q')).sendKeys("hi");
		driver.actions().sendKeys('\uE006').perform();
		driver.sleep(1000);
		return true;
	});

	test.it('Compose a draft email', function() {
		driver.sleep(1000);
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.xpath("//div[contains(text(),'COMPOSE')]"));
		}, 5000);
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[contains(text(),'COMPOSE')]")).click();
		driver.sleep(1000);
		driver.actions().sendKeys(user).perform();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//input[contains(@name,'subjectbox')]")).sendKeys('Selenium Email');
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[contains(@aria-label, 'Message Body')]")).click();
		driver.sleep(1000);
		driver.actions().sendKeys('This email was composed via a Selenium javascript test.').perform();
		driver.sleep(2000);
		driver.findElement(webdriver.By.xpath("//img[contains(@aria-label, 'Save & Close')]")).click();
		driver.sleep(1000);
		return true;
	});

	test.it('Open draft email and send it', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//a[contains(text(), 'Drafts')]")).click();
		driver.sleep(3000);
		driver.findElement(webdriver.By.xpath("//td/div[contains(@role, 'link')]//span[contains(text(), 'javascript')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@aria-label='Send ‪(⌘Enter)‬']")).click();
		driver.sleep(1000);
		return true;
	});

	test.it('Reply to the newly received email', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//a[contains(text(), 'Inbox')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//td/div[contains(@role, 'link')]//span[contains(text(), 'javascript')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@aria-label='Reply']")).click();
		driver.sleep(1000);
		driver.actions().sendKeys('This reply is a response to an automated email composed via a Selenium javascript test.').perform();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@aria-label='Send ‪(⌘Enter)‬']")).click();
		driver.sleep(1000);
		return true;
	});

	test.it('Delete both of the automated emails', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@aria-label='More']")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@role='menuitem']/div/div/div[contains(text(), 'Delete this message')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@aria-label='More']")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@role='menuitem']/div/div/div[contains(text(), 'Delete this message')]")).click();
		driver.sleep(1000);
		return true;
	});

    test.after(function() {
        driver.quit();
        return true;
    });
});