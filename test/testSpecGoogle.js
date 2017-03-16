const test = require('selenium-webdriver/testing');
const assert = require('selenium-webdriver/testing/assert');
var webdriver = require('selenium-webdriver');

let driver;

if(!process.env.BROWSER){
	process.env.BROWSER = "chrome";
}

if(process.env.BROWSER === "chrome") {
    driver = new webdriver.Builder().
		withCapabilities({
		'browserName' : 'Chrome',
		'browser_version' : '56.0',
		'os' : 'Windows',
		'os_version' : '10',
		'resolution' : '1024x768',
		'browserstack.user' : 'baswarajmalage2',
		'browserstack.key' : '7mi2xvKnK8XgLzcaom4y'
		}).
		usingServer('http://hub-cloud.browserstack.com/wd/hub').build();  
} 

test.describe("Google url test with BrowserStack", function () {
	// ******************** this method was throwing time out error, so commenting for now ***************************
	after(function() {
		driver.takeScreenshot().then(	
		function(image, err) {        		
		require('fs').writeFile('evidence/outGoogle.png', image, 'base64', function(err) {
            console.log(err);
				});
			}		
		);
		
		return driver.quit();
	});
	
	const url = "https://www.google.co.in";	
	this.timeout(50000);
	
	test.it("Launch Google web application", function*() {		
		yield driver.get(url);				
		assert(true).equalTo(true);		
	});

	test.describe("Dummy describe", function() {		
		test.it("Dummy it", function*() {
			assert(true).equalTo(true);
		});
	});
	
	//driver.quit(); //BM --- this I moved here temporarily as after() timing out with browserstack
});