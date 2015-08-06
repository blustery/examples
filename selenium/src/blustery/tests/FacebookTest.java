package blustery.tests;

import static org.junit.Assert.fail;

import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

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
	
	@Before
	public void setUp() throws Exception
	{
		driver = SeleniumUtils.Browser.CHROME.createLocalWebDriver();
		baseUrl = "https://www.facebook.com/";
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
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
		
		if(SeleniumUtils.waitForEl(driver, By.id("u_0_x")))
			driver.findElement(By.id("u_0_x")).click();
		else
			Assert.fail("Could not login.");
		
		if(SeleniumUtils.waitForEl(driver, By.linkText("Facebook")))
			driver.findElement(By.linkText("Facebook")).click();
		else
			Assert.fail("Could not go to facebook newsfeed.");
	}
	
	/**
	 * Logs into Facebook and likes the first post it sees.
	 * 
	 * @throws Exception
	 */
	@Test
	public void like() throws Exception
	{
		login();
		
		if(SeleniumUtils.waitForEl(driver, By.cssSelector("a.UFILikeLink > span")))
			driver.findElement(By.cssSelector("a.UFILikeLink > span")).click();
		else
			Assert.fail("Could not like post.");
	}
	
	/**
	 * Logs into Facebook and creates a post with "Hello world! (Current Time)"
	 * 
	 * @throws Exception
	 */
	@Test
	public void post() throws Exception
	{
		login();
		
		if(SeleniumUtils.waitForEl(driver, By.cssSelector("div.uiTypeahead.composerTypeahead.mentionsTypeahead > div > div > textarea")))
		{
			driver.findElement(By.cssSelector("div.uiTypeahead.composerTypeahead.mentionsTypeahead > div > div > textarea")).click();
			driver.findElement(By.cssSelector("div.uiTypeahead.composerTypeahead.mentionsTypeahead > div > div > textarea")).clear();
			driver.findElement(By.cssSelector("div.uiTypeahead.composerTypeahead.mentionsTypeahead > div > div > textarea")).sendKeys("Hello world! " + System.currentTimeMillis());
		}
		else
			Assert.fail("Could not type post.");
		
		
		if(SeleniumUtils.waitForEl(driver, By.xpath("//button[contains(.,'Post')]"), 30))
			driver.findElement(By.xpath("//button[contains(.,'Post')]")).click();
		else
			Assert.fail("Could not click the Post button.");
	}
	
	/**
	 * Logs into Facebook and shares the first post it finds.
	 * 
	 * @throws Exception
	 */
	@Test
	public void share() throws Exception
	{
		login();
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.cssSelector("span.share_root")))
			driver.findElement(By.cssSelector("span.share_root")).click();
		else
			Assert.fail("Could not find Share element.");
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.cssSelector("a.share_action_link")))
			driver.findElement(By.cssSelector("a.share_action_link")).click();
		else
			Assert.fail("Could not find Share action link");
				
		if(SeleniumUtils.waitForElToBeClickable(driver, By.linkText("Share Now (Friends)")))
			driver.findElement(By.linkText("Share Now (Friends)")).click();
		else 
			Assert.fail("Could not find \"Share Now (Friends)\" button.");
	}
	
	/**
	 * Logs into Facebook and searches for "Apple Music".
	 * 
	 * @throws Exception
	 */
	@Test
	public void search() throws Exception
	{
		login();
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.cssSelector("form[action*='search']")))
			driver.findElement(By.cssSelector("form[action*='search']")).click();
		else
			Assert.fail("Could not click on form.");
		
		if(SeleniumUtils.waitForElToBeClickable(driver, By.cssSelector("form[action*='search'] .textInput")))
		{
			WebElement textInput = driver.findElement(By.cssSelector("form[action*='search'] .textInput"));
			Actions builder = new Actions(driver);    
			builder.moveToElement(textInput).click(textInput).sendKeys("Apple Music").sendKeys(Keys.RETURN);    
			builder.perform();				
		}
		else
			Assert.fail("Could not perform search.");	
					
		Assert.assertTrue("Search unsuccessful.", driver.getCurrentUrl().contains("search"));
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
