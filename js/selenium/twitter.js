var assert = require('assert'),
	fs = require('fs'),
	test = require('selenium-webdriver/testing'),
	webdriver = require('selenium-webdriver'),
	user = '',
	pass = '';

// Run the bash script "setup.sh" to assign static credentials as environment
// variables for use with this and other example scripts of ours.
	user = process.env.TWuser;
	pass = process.env.TWpass;
    
test.describe('Twitter test', function() {
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
		driver.get('https://twitter.com');
		return true;
	});

	test.it('Login', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(text(), 'Log In')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.sleep(1000);
		driver.findElement(webdriver.By.name('session[username_or_email]'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys(user);
			});
		driver.findElement(webdriver.By.name('session[password]'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys(pass);
			});
		driver.actions().sendKeys('\uE006').perform();
		driver.sleep(1000);
		return true;
	});

	test.it('Search', function() {
		driver.findElement(webdriver.By.name('q'))
			.then(findWaldo)
			.then(function(element) {
				element.sendKeys("LoadStorm Aurora");
			});
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Retweet the search result', function() {
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'js-actionRetweet')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'retweet-action')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Tweet something', function() {
		driver.findElement(webdriver.By.xpath("//a[contains(@data-component-term, 'home_nav')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//div[@aria-labelledby='tweet-box-home-timeline-label']"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.actions().sendKeys('This tweet was composed via a Selenium javascript test.').perform();
		driver.sleep(2000);
		driver.findElement(webdriver.By.xpath("(//div[contains(@class, 'tweet-button')]/button[contains(@class, 'tweet-action')])"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Favorite the tweet', function() {
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'js-actionFavorite')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Unfavorite and undo the retweet', function() {
		driver.findElement(webdriver.By.xpath("//*[contains(@class, 'retweeted')]//button[contains(@class, 'ProfileTweet-actionButtonUndo') and contains(@class, 'js-actionFavorite')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//*[contains(@class, 'retweeted')]//div[contains(@class, 'ProfileTweet-action--retweet')]/button[contains(@class, 'ProfileTweet-actionButtonUndo')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		return true;
	});

	test.it('Delete the tweet', function() {
		driver.findElement(webdriver.By.xpath("(//button[contains(@class, 'js-dropdown-toggle')])"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(text(), 'Delete Tweet')]"))
			.then(findWaldo)
			.then(function(element) {
				element.click();
			});
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'delete-action')]"))
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