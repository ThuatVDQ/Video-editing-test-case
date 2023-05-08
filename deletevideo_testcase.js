const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Delete video, image", function () {
    let driver;

    before(async function () {
        // Khởi tạo WebDriver
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().setRect({ width: 1280, height: 1080 });
        await driver.get("http://localhost:3000");
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
        await driver.get("http://localhost:3000/gallery");
        await driver.sleep(2000);
    });

    it("Test Case 1: Xóa hình ảnh, video đầu tiên", async () => {
        await driver
            .findElement(
                By.xpath(
                    "/html/body/div/div/div/main/div/div/div[3]/div[1]/div/div[1]/button"
                )
            )
            .click();
        await driver.findElement(By.css(".ant-btn-primary > span")).click();
        await driver.sleep(2000);

        assert(
            (await driver
                .findElement(By.css(".MuiPaper-elevation0"))
                .getText()) == "Delete Succeed"
        );
    });
});
