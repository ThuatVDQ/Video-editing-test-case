require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();
const URL = process.env.AWS_ENDPOINT;
async function createDriver() {
    const options = new chrome.Options();
    options.addArguments("--no-sandbox");
    options.addArguments("--headless");
    options.addArguments("window-size=1400,1500");
    options.addArguments("--disable-gpu");
    options.addArguments("start-maximized");
    options.addArguments("enable-automation");
    options.addArguments("--disable-infobars");
    options.addArguments("--disable-dev-shm-usage");

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    return driver;
}
describe("Find match", function () {
    let driver;

    before(async function () {
        // Khởi tạo WebDriver
        driver = await createDriver();
        await driver.manage().window().setRect({ width: 1280, height: 1080 });
        await driver.get(URL);
        await driver.sleep(2000);
        //Login
        await driver.findElement(By.id("mui-1")).click();
        await driver.findElement(By.id("mui-1")).sendKeys("test12");
        await driver.findElement(By.id("mui-2")).sendKeys("Abc1234@");
        await driver.findElement(By.css(".MuiButton-root")).click();
        await driver.sleep(3000);
        assert(
            (await driver
                .findElement(By.css(".MuiGrid-grid-xs-3:nth-child(1)"))
                .getText()) == "League Name"
        );
    });

    after(async function () {
        // Đóng WebDriver sau khi hoàn thành tất cả các test case
        await driver.quit();
    });

    beforeEach(async function () {
        // Điều hướng đến trang web trước mỗi test case
        await driver.get(URL + "/highlight");
        await driver.sleep(2000);
    });

    it("Test Case 1: Tìm kiếm trận đấu", async () => {
        const startDate = driver.findElement(By.xpath("//input"));

        // Tạo đối tượng ActionSequence
        const actionSequence = driver.actions({ bridge: true });

        // Thực hiện double click vào ô input
        actionSequence.click(startDate).perform();

        for (let i = 0; i < 8; i++) {
            startDate.sendKeys(Key.BACK_SPACE);
        }

        startDate.sendKeys("12022020");

        const endDate = driver.findElement(By.xpath("//div[2]/div/div/input"));

        // Thực hiện double click vào ô input
        actionSequence.click(endDate).perform();

        for (let i = 0; i < 8; i++) {
            endDate.sendKeys(Key.BACK_SPACE);
        }

        endDate.sendKeys("04122023");

        await driver.sleep(3000);

        await driver
            .findElement(By.xpath("//div[3]/div/div/div/input"))
            .click();

        await driver
            .findElement(By.xpath("//li[contains(.,'AFF_U19')]"))
            .click();

        await driver
            .findElement(By.xpath("//div[4]/div/div/div/input"))
            .click();
        await driver.sleep(1000);
        await driver
            .findElement(By.xpath("//li[contains(.,'vietnam')]"))
            .click();

        await driver
            .findElement(By.xpath("//div[5]/div/div/div/input"))
            .click();

        await driver
            .findElement(By.xpath("//li[contains(.,'opening')]"))
            .click();

        await driver.findElement(By.css(".MuiButton-containedSuccess")).click();

        await driver.sleep(4000);

        await driver
            .takeScreenshot()
            .then((image) =>
                require("fs").writeFileSync(
                    "./result-images/findMatch-tc1.png",
                    image,
                    "base64"
                )
            );
    });
});
