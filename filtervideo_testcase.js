const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Filter video", function () {
    let driver;

    before(async function () {
        // Khởi tạo WebDriver
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().setRect({ width: 1280, height: 1080 });
        await driver.get("http://ec2-3-92-184-188.compute-1.amazonaws.com");
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
        await driver.get("http://ec2-3-92-184-188.compute-1.amazonaws.com");
        await driver.sleep(2000);
    });

    it("Test Case 1: Tìm video", async () => {
        await driver.findElement(By.xpath("//td[6]/button")).click();

        await driver.sleep(3000);

        await driver
            .findElement(
                By.css(".ant-table-cell:nth-child(2) .ant-dropdown-trigger")
            )
            .click();

        await driver.findElement(By.xpath("//li/span/span")).click();

        await driver.findElement(By.css(".ant-btn-primary")).click();

        await driver.sleep(1000);

        await driver
            .takeScreenshot()
            .then((image) =>
                require("fs").writeFileSync(
                    "filterVideo-tc1.png",
                    image,
                    "base64"
                )
            );

        //reset lại filter
        await driver
            .findElement(
                By.css(".ant-table-cell:nth-child(2) .ant-dropdown-trigger")
            )
            .click();

        await driver.findElement(By.xpath("//div[2]/button/span")).click();
    });
});
