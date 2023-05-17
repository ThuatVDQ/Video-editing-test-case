const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
require("dotenv").config();
const URL = process.env.AWS_ENDPOINT;

async function createDriver() {
    const options = new chrome.Options();
    options.addArguments("--no-sandbox");

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    return driver;
}

describe("Add match", () => {
    let driver;

    before(async function () {
        // Khởi tạo WebDriver
        driver = await createDriver();
        await driver.get(URL);
        await driver.sleep(1000);
        //Login
        await driver.findElement(By.id("mui-1")).click();
        await driver.findElement(By.id("mui-1")).sendKeys("test12");
        await driver.findElement(By.id("mui-2")).sendKeys("Abc1234@");
        await driver.findElement(By.css(".MuiButton-root")).click();
        await driver.sleep(2000);
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
        await driver.get(URL);
        await driver.sleep(2000);
    });

    it("Test Case 1: Thêm trận đấu (thêm league name mới)", async () => {
        await driver
            .findElement(
                By.css("div:nth-child(1) > div > .MuiIconButton-colorPrimary")
            )
            .click();
        await driver.findElement(By.id("mui-6")).sendKeys("V League");
        await driver
            .findElement(By.id("mui-7"))
            .sendKeys("Viet Nam - Thai Lan");
        await driver.findElement(By.id("mui-9")).sendKeys("VTV3");
        await driver.findElement(By.id("mui-10")).sendKeys("127.0.0.1");
        await driver.findElement(By.id("mui-11")).sendKeys("3000");
        await driver.findElement(By.css(".MuiButton-root")).click();
        await driver.sleep(2000);
    });

    it("Test Case 2: Thêm trận đấu (Chọn league name có sẵn)", async () => {
        await driver.findElement(By.id("mui-5")).click();
        await driver.findElement(By.id("mui-5-option-0")).click();
        await driver
            .findElement(By.id("mui-7"))
            .sendKeys("Viet Nam - Thai Lan");
        await driver.findElement(By.id("mui-9")).sendKeys("VTV3");
        await driver.findElement(By.id("mui-10")).sendKeys("127.0.0.1");
        await driver.findElement(By.id("mui-11")).sendKeys("3000");
        await driver.findElement(By.css(".MuiButton-root")).click();
        await driver.sleep(2000);
    });
});
