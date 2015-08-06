package blustery.utils;

import java.io.File;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Utility class for common Selenium webdriver tasks.
 * 
 * @author Sonny Trujillo &lt;sonnyt@loadstorm.com&gt;
 * @since Apr 1, 2014
 */
public class SeleniumUtils
{	
	/**
	 * Waits for element to become visible.
	 * 
	 * @param driver The {@link WebDriver}
	 * @param locator The {@link By} locator.
	 * 
	 * @return <tt>True</tt> when visible, <tt>false</tt> otherwise.
	 */
	public static boolean waitForEl(WebDriver driver, By locator)
	{
		return waitForEl(driver, locator, 30);
	}

	/**
	 * Waits for element to become visible.
	 * 
	 * @param driver The {@link WebDriver}
	 * @param locator The {@link By} locator.
	 * @param timeout How long to wait.
	 * 
	 * @return <tt>True</tt> when visible, <tt>false</tt> otherwise.
	 */
	public static boolean waitForEl(WebDriver driver, By locator, Integer timeout)
	{
		try{
			ExpectedCondition<WebElement> condition = ExpectedConditions.visibilityOfElementLocated(locator);
			WebDriverWait wait = new WebDriverWait(driver, timeout);
			wait.until(condition);
		} 
		catch(org.openqa.selenium.TimeoutException exception)
		{
			return false;
		}
		return true;
	}
	
	/**
	 * Waits for element to become clickable.
	 * 
	 * @param driver The {@link WebDriver}
	 * @param locator The {@link By} locator.
	 * 
	 * @return <tt>True</tt> when clickable, <tt>false</tt> otherwise.
	 */
	public static boolean waitForElToBeClickable(WebDriver driver, By locator)
	{
		try{
			ExpectedCondition<WebElement> condition = ExpectedConditions.elementToBeClickable(locator);
			WebDriverWait wait = new WebDriverWait(driver, 30);
			wait.until(condition);
		} 
		catch(org.openqa.selenium.TimeoutException exception)
		{
			return false;
		}
		
		return true;
	}
	
	/**
	 * Waits for the given condition to be true.
	 * 
	 * @param driver The {@link WebDriver}
	 * @param codition The {@link ExpectedCondition}
	 * 
	 * @return <tt>True</tt> when condition is satisfied, <tt>false</tt> otherwise.
	 */
	public static boolean waitFor(WebDriver driver, ExpectedCondition<WebElement> condition)
	{
		try{
			WebDriverWait wait = new WebDriverWait(driver, 30);
			wait.until(condition);
		} 
		catch(org.openqa.selenium.TimeoutException exception)
		{
			return false;
		}
	
		return true;
	}
	
	/**
	 * Waits for all elements to become visible.
	 * 
	 * @param driver The {@link WebDriver}
	 * @param locator The {@link By} locator for multiple elements.
	 * @param timeout How long to wait.
	 * 
	 * @return <tt>True</tt> when all elements are visible, <tt>false</tt> otherwise.
	 */
	public static boolean waitForAllEl(WebDriver driver, By locator, Integer timeout)
	{
		try{
			ExpectedCondition<List<WebElement>> condition = ExpectedConditions.visibilityOfAllElementsLocatedBy(locator);
			WebDriverWait wait = new WebDriverWait(driver, timeout);
			wait.until(condition);
		} 
		catch(org.openqa.selenium.TimeoutException exception)
		{
			return false;
		}
		
		return true;
	}

	/**
	 * The list of browsers that can be tested.
	 * 
	 * @author Sonny Trujillo &lt;sonnyt@loadstorm.com&gt;
	 * @since Apr 4, 2014
	 */
	public static enum Browser
	{
		FIREFOX(DesiredCapabilities.firefox()), 
		CHROME(DesiredCapabilities.chrome()), 
		IE(DesiredCapabilities.internetExplorer()),
		PHANTOM(DesiredCapabilities.phantomjs());
		
		private DesiredCapabilities capabilities;
		
		/**
		 * Sets the {@link DesiredCapabilites} for this driver.
		 * 
		 * @param capabilities The {@link DesiredCapabilites}.
		 */
		Browser(DesiredCapabilities capabilities)
		{
			this.capabilities = capabilities; 
			capabilities.setJavascriptEnabled(true);
		}

		public DesiredCapabilities getCapabilities()
		{
			return capabilities;
		}
		
		/**
		 * Creates and returns a new Remote {@link WebDriver}.
		 * 
		 * @return A new {@link WebDriver} or <tt>null</tt> if unsuccessful.
		 */
		public WebDriver createRemoteWebDriver()
		{
			return new RemoteWebDriver(getCapabilities());			
		}
		
		/**
		 * Creates and returns a new Local {@link WebDriver} that implicitly waits 30 seconds for elements to load and 
		 * before page load timeout exception is thrown.
		 * 
		 * @return Local {@link WebDriver} or <tt>null</tt> when unsuccessful 
		 */
		public WebDriver createLocalWebDriver()
		{
			return createLocalWebDriver(30);
		}
		
		/**
		 * Creates and returns a new Local {@link WebDriver}
		 * 
		 * @param seconds The seconds to implicitly wait for elements to load and before page load timeout exception is 
		 * thrown.
		 * 
		 * @return Local {@link WebDriver} or <tt>null</tt> when unsuccessful 
		 */
		public WebDriver createLocalWebDriver(int seconds)
		{
			WebDriver driver = null;

			if(this == Browser.FIREFOX)
				driver = new FirefoxDriver(getCapabilities());
			else if(this == Browser.CHROME)
			{
				System.setProperty("webdriver.chrome.driver", (new File(".")).getAbsolutePath() + "/lib/chromedriver");
				driver = new ChromeDriver(getCapabilities());
			}
			
			driver.manage().timeouts().implicitlyWait(seconds, TimeUnit.SECONDS);			
			driver.manage().timeouts().pageLoadTimeout(seconds, TimeUnit.SECONDS);
			
			return driver; 
		}
	};		
}