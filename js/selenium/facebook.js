var assert = require('assert'),
	fs = require('fs'),
	test = require('selenium-webdriver/testing'),
	webdriver = require('selenium-webdriver'),
	user = '',
	pass = '';

// Run the bash script "setup.sh" to assign static credentials as environment
// variables for use with this and other example scripts of ours.
	user = process.env.FBuser;
	pass = process.env.FBpass;
    
test.describe('Facebook test', function() {
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
		driver.get('http://www.facebook.com');
		return true;
	});

	test.it('Login', function() {
		driver.findElement(webdriver.By.name('email'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys(user);
			});
		driver.findElement(webdriver.By.name('pass'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys(pass);
			});
		driver.findElement(webdriver.By.id('u_0_x'))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.wait(function() {
		 return driver.getTitle().then(function(title) {
		   return title === 'Facebook';
		 });
		}, 5000);
		return true;
	});

	test.it('Search', function() {
		driver.findElement(webdriver.By.name('q'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys("loadstorm");
			});
		driver.sleep(1000);
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Post a message', function() {
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.xpath("//div[@id='browse_result_area']//*[contains(text(),'loadstorm')]"));
		}, 5000);
		driver.findElement(webdriver.By.xpath("//a[contains(text(),'Home')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.name('xhpc_message'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys('selenium post');
			});
		driver.findElement(webdriver.By.xpath("//button[contains(text(),'Post')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Like the post', function() {
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//a[@aria-label='Like this']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Comment on the post', function() {
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//a[@class='comment_link']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.actions().sendKeys('selenium comment').perform();
		driver.sleep(1000);
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Share the post', function() {
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//span[contains(concat(' ', @class, ' '), ' share_root ')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and  div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//a[contains(concat(' ', @class, ' '), ' share_action_link ')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.findElement(webdriver.By.linkText("Share…"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//textarea[contains(@title,'Say something about this...')]"))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys('selenium share');
			});
		driver.findElement(webdriver.By.xpath("//button[contains(text(),'Share Status')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Delete the post', function() {
		driver.sleep(2000);
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//a[@aria-label='Story options']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//span[contains(text(),'Delete')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(text(),'Delete Post')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Click on Profile', function() {
		driver.sleep(2000);
		driver.findElement(webdriver.By.xpath("//a[contains(@title, 'Profile')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(2000);
		return true;
	});

    test.after(function() {
        driver.quit();
        return true;
    });
});