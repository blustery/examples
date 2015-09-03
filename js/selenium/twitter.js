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

    test.before(function() {
    	this.timeout(15000);
        return driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).build();
    });

	test.it('Setup', function() {
		driver.manage().window().setSize(1080, 768);
		driver.get('https://twitter.com');
		return true;
	});

	test.it('Login', function() {
		driver.sleep(1000);
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.xpath("//button[contains(text(), 'Log In')]"));
		},5000);
		driver.findElement(webdriver.By.xpath("//button[contains(text(), 'Log In')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.name('session[username_or_email]')).sendKeys(user);
		driver.findElement(webdriver.By.name('session[password]')).sendKeys(pass);
		driver.actions().sendKeys('\uE006').perform();
		driver.sleep(1000);
		return true;
	});

	test.it('Search', function() {
		driver.sleep(1000);
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.name('q'));
		}, 6000);
		driver.findElement(webdriver.By.name('q')).sendKeys("LoadStorm Aurora");
		driver.actions().sendKeys('\uE006').perform();
		driver.sleep(1000);
		return true;
	});

	test.it('Retweet the search result', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'js-actionRetweet')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'retweet-action')]")).click();
		driver.sleep(1000);
		return true;
	});

	test.it('Tweet something', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//a[contains(@data-component-term, 'home_nav')]")).click();
		driver.sleep(1000);
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.xpath("//div[@aria-labelledby='tweet-box-home-timeline-label']"));
		}, 5000);
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[@aria-labelledby='tweet-box-home-timeline-label']")).click();
		driver.sleep(1000);
		driver.actions().sendKeys('This tweet was composed via a Selenium javascript test.').perform();
		driver.sleep(2000);
		driver.findElement(webdriver.By.xpath("(//div[contains(@class, 'tweet-button')]/button[contains(@class, 'tweet-action')])")).click();
		driver.sleep(1000);
		return true;
	});

	test.it('Favorite the tweet', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'js-actionFavorite')]")).click();
		driver.sleep(1000);
		return true;
	});

	test.it('Undo the retweet', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//*[contains(@class, 'retweeted')]/div/div/div/div[contains(@class, 'ProfileTweet-action--retweet')]/button[contains(@class, 'ProfileTweet-actionButtonUndo')]")).click();
		driver.sleep(1000);
		return true;
	});

	test.it('Delete the tweet', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("(//button[contains(@class, 'js-dropdown-toggle')])")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(text(), 'Delete Tweet')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(@class, 'delete-action')]")).click();
		driver.sleep(1000);
		return true;
	});

    test.after(function() {
        driver.quit();
        return true;
    });
});