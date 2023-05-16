const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
require("dotenv").config();
const URL = process.env.AWS_ENDPOINT;
describe("Upload file json", () => {
    let driver;

    before(async function () {
        // Khởi tạo WebDriver
        driver = await new Builder().forBrowser("chrome").build();
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
        await driver.get(URL);
    });

    //Upload json file cho trận đấu đầu tiên
    it("Upload json file", async () => {
        await driver.sleep(2000);
        await driver.findElement(By.xpath("//td[7]")).click();
        await driver.findElement(By.css(".sc-hLseeU > span")).click();
        await driver
            .findElement(By.name("file"))
            .sendKeys("C:/Users/ZEPHYRUS/Downloads/vn_tl.json");

        await driver.sleep(1000);

        await driver
            .findElement(By.css(".MuiButton-root:nth-child(2)"))
            .click();
        await driver.sleep(3000);
        assert(
            (await driver
                .findElement(By.css(".MuiPaper-elevation0"))
                .getText()) == "Saved"
        );
    });
});
