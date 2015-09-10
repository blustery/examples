# Appium Javascript Examples for Android Apps
These javascript tests were created for use with the Mocha test framework. So before you can run these you need to install NodeJS, Appium, WD, Chai, Chai-as-promised, and Mocha. You'll also need to launch an Android Virtual Device or hook up a real Android device via USB cable and put it into developer mode.

Some of these apps require login credentials. If you have a fake account or don't mind using your own credentials then download the bash script `setup.sh` from the examples/js folder of this repository. Edit the file and add the credentials for the app you want to test using one of the example scripts. Then open a command prompt and type `source setup.sh` and run that. This will assign the credentials you entered as environment variables which can be used by the test script.

Once everything is ready, type the following in your command-line to run the test:
`mocha [testname].js`

The script will automatically install its app and run the test cases.
