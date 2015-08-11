var assert = require('assert'),
	fs = require('fs'),
	test = require('selenium-webdriver/testing'),
	webdriver = require('selenium-webdriver'),
	user = '',
	pass = '';
try {
	// Assigns the credentials from a file in the root of the repository.
	user = require('../../credentials.json').fbuser;
	pass = require('../../credentials.json').fbpass;
}
catch(e) {
	// Use these to assign static credentials for the test.
	user = 'gisubyd_wongman_1437492351@tfbnw.net';
	pass = 'ga79gzjlt8g';
	console.log("MY EYES! THE GOGGLES DO NOTHING!");
};
    
test.describe('Facebook test', function() {
    this.timeout(20000);
    var driver;

    test.before(function() {
    	this.timeout(15000);
        return driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).build();
    });

	test.it('Setup', function() {
		driver.manage().window().setSize(1080, 768);
		driver.get('http://www.facebook.com');
		return true;
	});

	test.it('Login', function() {
		driver.sleep(1000);
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.name('email'));
		},5000);
		driver.findElement(webdriver.By.name('email')).sendKeys(user);
		driver.findElement(webdriver.By.name('pass')).sendKeys(pass);
		driver.findElement(webdriver.By.id('u_0_x')).click();
		driver.wait(function() {
		 return driver.getTitle().then(function(title) {
		   return title === 'Facebook';
		 });
		}, 5000);
		return true;
	});

	test.it('Search', function() {
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.name('q'));
		}, 5000);
		driver.findElement(webdriver.By.name('q')).sendKeys("loadstorm");
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Post a message', function() {
		driver.sleep(1000);
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.xpath("//span[contains(text(),'Places')]"));
		}, 5000);
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//span[contains(text(),'News Feed')]")).click();
		driver.wait(function() {
			return driver.isElementPresent(webdriver.By.name('xhpc_message'));
		}, 5000);
		driver.findElement(webdriver.By.name('xhpc_message')).sendKeys('selenium post');
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(text(),'Post')]")).click();
		return true;
	});

	test.it('Like the post', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//a[@aria-label='Like this']")).click();
		return true;
	});

	test.it('Comment on the post', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//a[@class='comment_link']")).click();
		driver.sleep(1000);
		driver.actions().sendKeys('selenium comment').perform();
		driver.actions().sendKeys('\uE006').perform();
		return true;
	});

	test.it('Share the post', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//span[contains(concat(' ', @class, ' '), ' share_root ')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and  div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//a[contains(concat(' ', @class, ' '), ' share_action_link ')]")).click();
		driver.sleep(2000);
		driver.findElement(webdriver.By.linkText("Share…")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//textarea[contains(@title,'Say something about this...')]")).sendKeys('selenium share');
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(text(),'Share Status')]")).click();
		driver.sleep(2000);
		return true;
	});

	test.it('Delete the post', function() {
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and div/div[contains(concat(' ', @class, ' '), ' userContent ') and *[contains(text(), 'selenium post')]]]//a[@aria-label='Story options']")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//span[contains(text(),'Delete')]")).click();
		driver.sleep(1000);
		driver.findElement(webdriver.By.xpath("//button[contains(text(),'Delete Post')]")).click();
		return true;
	});

	test.it('Click on Profile', function() {
		driver.sleep(2000);
		driver.findElement(webdriver.By.xpath("//a[contains(@title, 'Profile')]")).click();
		driver.sleep(2000);
		return true;
	});

    test.after(function() {
        driver.quit();
        return true;
    });
});