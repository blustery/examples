var assert = require('assert'),
	fs = require('fs'),
	test = require('selenium-webdriver/testing'),
	webdriver = require('selenium-webdriver'),
	user = '',
	pass = '';

// Run the bash script "setup.sh" to assign static credentials as environment
// variables for use with this and other example scripts of ours.
	user = process.env.PINuser;
	pass = process.env.PINpass;

test.describe('Pinterest test', function() {
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
		driver.get('https://pinterest.com');
		return true;
	});

	test.it('Login', function() {
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'emailLogin')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.name('username_or_email'))
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

	test.it('Create a board to pin things to', function() {
		driver.findElement(webdriver.By.xpath("//span[@class='profileName']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'createBoardButton')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.id('boardEditName'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys('UI-Testing');
			});
		driver.findElement(webdriver.By.xpath("//li[contains(@class, 'secretToggleWrapper')]/div/div/div[contains(@class, 'slider')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'saveBoardButton')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Search', function() {
		driver.findElement(webdriver.By.name('q'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys("loadstorm infographics importance");
			});
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Like it, click pin it, back up, click pin it again to get secret board to appear', function() {
		driver.findElement(webdriver.By.xpath("//div[contains(@class, 'pinHolder')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'PinLikeButton') and contains(@class, 'pinActionBarButton')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'repin pinActionBarButton')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'cancelButton pinCreateClose')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'repin pinActionBarButton')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//span[contains(text(), 'UI-Testing')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
	});

	test.it('Slow things down a moment, and navigate back to the profile', function() {
		driver.sleep(2000);
		driver.actions().sendKeys('\uE00C').perform();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//span[@class='profileName']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Delete the board', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'boardEditButton')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'deleteBoardButton')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'confirm')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Unlike the pin', function() {
		driver.executeScript("window.scrollBy(0,-250)","");
		driver.findElement(webdriver.By.xpath("//div[contains(@class, 'LikeCount')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//div[contains(@class, 'pinHolder')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'unlike') and contains(@class, 'pinActionBarButton')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, ' close ')]/em[1]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

    test.after(function() {
        driver.quit();
        return true;
    });
});