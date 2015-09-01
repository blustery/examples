# Selenium Javascript Examples for Chrome
These javascript tests were created for use with the Mocha test framework. So before you can run these you need to install NodeJS, Selenium-WebDriver, ChromeDriver, and Mocha.

Also you'll need to configure your login credentials for the app you want to test using one of the example scripts. To do this edit the bash script `setup.sh` and insert the credentials for the appropriate app. Then open a command prompt and type `source setup.sh` and run that. This will assign the credentials you entered as environment variables which can be used by the test script.

Once everything is ready, type the following in the same command-line prompt that you ran the bash script:
`mocha [testname].js`

Run that and the script will automatically open Chrome and run the test cases.
