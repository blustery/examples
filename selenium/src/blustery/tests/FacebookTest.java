package blustery.tests;

import static org.junit.Assert.fail;

import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import blustery.utils.SeleniumUtils;

/**
 * Performs Selenium test of Facebook that tests logging in, liking, posting, sharing, and searching.
 * 
 * @author Sonny Trujillo &lt;sonnyt@loadstorm.com&gt;
 */
public class FacebookTest
{
	public static String name = "Will Alajahchfcjhb Smithwitz";
	public static String id = "100010183863082";
	public static String email = "pjtbxgo_smithwitz_1438101950@tfbnw.net";
	public static String password = "qn01tcl5slc";
	private WebDriver driver;
	private String baseUrl;
	private StringBuffer verificationErrors = new StringBuffer();
	private String post;
	
	@Before
	public void setUp() throws Exception
	{
		driver = SeleniumUtils.Browser.CHROME.createLocalWebDriver();
		baseUrl = "https://www.facebook.com/";
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		post = "Hello world! " + System.currentTimeMillis();
	}	
	
	@Test
	private void fbTest() throws Exception 
	{
		login();
		String searched = search();
		String posted = post();
		String opened = openPost();
		String liked = like();
		String shared = share();
		
		String comment = comment();
		
		if(posted == null)
			delete();
		
		String error = new StringBuilder().append(searched).append(posted).append(opened).append(liked).append(shared).append(comment).toString();
		
		Assert.assertTrue(error, searched == null && posted == null && opened == null && liked == null && shared == null && comment == null);
	}
	
		
	private By getLocatorForPostStoryOptions(String post)
	{
		return getLocatorForPostElementWithLabel(post, "aria-label", "Story options");	
	}
	
	private By getLocatorForPostLikeLink(String post)
	{
		return getLocatorForPostElementWithLabel(post, "aria-label", "Like this");	
	}
		
	private By getLocatorForPostCommentInput(String post)
	{
		if(post == null || post.isEmpty())
			Assert.fail();
		
		String xpath = "//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and "
				+ "div/div[contains(concat(' ', @class, ' '), ' userContent ') and "
				+ "*[contains(text(), '"+post+"')]]]//div[contains(concat(' ', @class, ' '), ' UFIInputContainer ')]";
		
		return By.xpath(xpath);
	}
	
	private By getLocatorForPostTimestamp(String post)
	{
		if(post == null || post.isEmpty())
			Assert.fail();
		
		String xpath = "//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and "
				+ "div/div[contains(concat(' ', @class, ' '), ' userContent ') and "
				+ "*[contains(text(), '"+post+"')]]]"
				+ "//a[abbr[contains(concat(' ', @class, ' '), ' timestamp ')]]";
		
		return By.xpath(xpath);
	}

	private By getLocatorForPostShareRoot(String post)
	{
		if(post == null || post.isEmpty())
			Assert.fail();
		
		String xpath = "//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and "
				+ "div/div[contains(concat(' ', @class, ' '), ' userContent ') and "
				+ "*[contains(text(), '"+post+"')]]]//span[contains(concat(' ', @class, ' '), ' share_root ')]";
	
		return By.xpath(xpath);
	}	

	private By getLocatorForPostShareToggle(String post)
	{
		if(post == null || post.isEmpty())
			Assert.fail();
		
		String xpath = "//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and  "
				+ "div/div[contains(concat(' ', @class, ' '), ' userContent ') and "
				+ "*[contains(text(), '"+post+"')]]]//span[contains(concat(' ', @class, ' '), ' share_root ')]"
				+ "//div[contains(concat(' ', @class, ' '), ' openToggler ')]";
		
		return By.xpath(xpath);
	}
	
	private By getLocatorForPostShareLink(String post)
	{
		if(post == null || post.isEmpty())
			Assert.fail();
		
		String xpath = "//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and "
				+ "div/div[contains(concat(' ', @class, ' '), ' userContent ') and "
				+ "*[contains(text(), '"+post+"')]]]//a[contains(concat(' ', @class, ' '), ' share_action_link ')]//span[1]";
		
		return By.xpath(xpath);			
	} 
	
	private By getLocatorForPostElementWithLabel(String post, String attribute, String value)
	{
		if(post == null || post.isEmpty())
			Assert.fail();
		
		String xpath = "//div[contains(concat(' ', @class, ' '), ' userContentWrapper ') and "
				+ "div/div[contains(concat(' ', @class, ' '), ' userContent ') and "
				+ "*[contains(text(), '"+post+"')]]]//a[@"+attribute+"='"+value+"']";
		
		return By.xpath(xpath);		
	}
	
	private void delete() throws Exception
	{
		if(SeleniumUtils.waitForElToBeClickable(driver, getLocatorForPostStoryOptions(post)))
			SeleniumUtils.clickAction(driver, getLocatorForPostStoryOptions(post));			
		else
			Assert.fail("Could not open story options");
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.linkText("Delete")))
			SeleniumUtils.clickAction(driver, By.linkText("Delete"));
		else
			Assert.fail("Delete link could not be clicked");
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.cssSelector("form[action*='delete'] button[type='submit']")))
			SeleniumUtils.clickAction(driver, By.cssSelector("form[action*='delete'] button[type='submit']"));
		else
			Assert.fail("Could not confirm deletion.");
		
		SeleniumUtils.pause(2000);
	}
	
	/**
	 * Logs into Facebook and navigates the home page.
	 * 
	 * @throws Exception
	 */
	private void login() throws Exception
	{
		driver.get(baseUrl + "/?_rdr=p");
		
		if(SeleniumUtils.waitForEl(driver, By.id("email")))
		{	
			driver.findElement(By.id("email")).clear();
			driver.findElement(By.id("email")).sendKeys("pjtbxgo_smithwitz_1438101950@tfbnw.net");
		}
		else
			Assert.fail("Could not enter email");
		
		if(SeleniumUtils.waitForEl(driver, By.id("pass")))
		{
			driver.findElement(By.id("pass")).clear();
			driver.findElement(By.id("pass")).sendKeys("qn01tcl5slc");
		}
		else
			Assert.fail("Could not enter password");
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.id("loginbutton")))
			driver.findElement(By.id("loginbutton")).click();
		else
			Assert.fail("Could not login.");
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.linkText("Facebook")))
			driver.findElement(By.linkText("Facebook")).click();
		else
			Assert.fail("Could not go to facebook newsfeed.");
	}
	
	/**
	 * Logs into Facebook and likes the first post it sees.
	 * 
	 * @throws Exception
	 */
	private String like() throws Exception
	{
		if(SeleniumUtils.waitForElToBeClickable(driver, getLocatorForPostLikeLink(post)))
			driver.findElement(getLocatorForPostLikeLink(post)).click();
		else
			return "Could not like post.";
		
		return null;
	}
	
	/**
	 * Logs into Facebook and creates a post with "Hello world! (Current Time)"
	 * 
	 * @throws Exception
	 */
	private String post() throws Exception
	{
		if(SeleniumUtils.waitForEl(driver, By.cssSelector("div.uiTypeahead.composerTypeahead.mentionsTypeahead > div > div > textarea")))
		{
			driver.findElement(By.cssSelector("div.uiTypeahead.composerTypeahead.mentionsTypeahead > div > div > textarea")).click();
			driver.findElement(By.cssSelector("div.uiTypeahead.composerTypeahead.mentionsTypeahead > div > div > textarea")).clear();
			driver.findElement(By.cssSelector("div.uiTypeahead.composerTypeahead.mentionsTypeahead > div > div > textarea")).sendKeys(post);
		}
		else
			return "Could not type post.";		
		
		if(SeleniumUtils.waitForEl(driver, By.xpath("//button[contains(.,'Post')]"), 30))
			driver.findElement(By.xpath("//button[contains(.,'Post')]")).click();
		else
			return "Could not click the Post button.";
		
		return null;
	}
	
	private String openPost() throws Exception
	{
		if(SeleniumUtils.waitForEl(driver, getLocatorForPostTimestamp(post)))
			SeleniumUtils.clickAction(driver, getLocatorForPostTimestamp(post));
		else
			return "Could not open post.";
		
		return null;
	}
	
	private String comment() throws Exception
	{
		if(SeleniumUtils.waitForElToBeClickable(driver,  getLocatorForPostCommentInput(post)))
			SeleniumUtils.clickAction(driver,  getLocatorForPostCommentInput(post));
		else
			return "Could not focus on comment box.";
		
		if(SeleniumUtils.waitForElToBeClickable(driver, getLocatorForPostCommentInput(post)))
		{
			WebElement textInput = driver.findElement(getLocatorForPostCommentInput(post));
			Actions builder = new Actions(driver);    
			builder.moveToElement(textInput).click(textInput).sendKeys("Hey friend! You're awesome.").sendKeys(Keys.RETURN);    
			builder.perform();				
		}
		else
			return "Could not comment";
		
		SeleniumUtils.pause(2000);
		
		return null;
	}
	
	/**
	 * Logs into Facebook and shares the first post it finds.
	 * 
	 * @throws Exception
	 */
	private String share() throws Exception
	{                 
		if(SeleniumUtils.waitForElToBeClickable(driver, getLocatorForPostShareRoot(post)))
			SeleniumUtils.click(driver, getLocatorForPostShareRoot(post));
		else
			return "Could not find Share root element.";
		
		if(SeleniumUtils.waitForElToBeClickable(driver, getLocatorForPostShareLink(post)))		
			SeleniumUtils.click(driver, getLocatorForPostShareLink(post));
		else
			return "Could not find Share link";
		
		if(!SeleniumUtils.waitForEl(driver, getLocatorForPostShareToggle(post), 10))
		{
			//Try one more time to click share link.
			driver.findElement(getLocatorForPostShareLink(post)).click();
			
			if(!SeleniumUtils.waitForEl(driver, getLocatorForPostShareToggle(post), 10))
				return "Share menu was not found.";
		}
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.linkText("Share Now (Friends)")))
			SeleniumUtils.clickAction(driver, By.linkText("Share Now (Friends)"));
		else 
			return "Could not find Share Now button";
				
		SeleniumUtils.pause(4000);
		
		return null;
	}
	
	/**
	 * Logs into Facebook and searches for "Apple Music".
	 * 
	 * @throws Exception
	 */
	private String search() throws Exception
	{
		if(SeleniumUtils.waitForElToBeClickable(driver, By.cssSelector("form[action*='search']")))
			driver.findElement(By.cssSelector("form[action*='search']")).click();
		else
			return "Could not click on form.";
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.cssSelector("form[action*='search'] .textInput")))
		{
			WebElement textInput = driver.findElement(By.cssSelector("form[action*='search'] .textInput"));
			Actions builder = new Actions(driver);    
			builder.moveToElement(textInput).click(textInput).sendKeys("Apple Music").sendKeys(Keys.RETURN);    
			builder.perform();				
		}
		else
			return "Could not perform search.";			

		if(SeleniumUtils.waitForElToBeClickable(driver, By.linkText("Facebook")))
			driver.findElement(By.linkText("Facebook")).click();
		else
			return "Could not go to facebook newsfeed.";
		
		return null;
	}

	/**
	 * Cleans up and quits the Driver.
	 * 
	 * @throws Exception
	 */
	@After
	public void tearDown() throws Exception
	{
		driver.quit();
		String verificationErrorString = verificationErrors.toString();
		if (!"".equals(verificationErrorString))
		{
			fail(verificationErrorString);
		}
	}
}
