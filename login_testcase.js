const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Đăng nhập", function () {
    let driver;

    before(async function () {
        // Khởi tạo WebDriver
        driver = await new Builder().forBrowser("chrome").build();
    });

    after(async function () {
        // Đóng WebDriver sau khi hoàn thành tất cả các test case
        await driver.quit();
    });

    beforeEach(async function () {
        // Điều hướng đến trang web trước mỗi test case
        await driver.get(
            "http://ec2-3-92-184-188.compute-1.amazonaws.com/login"
        );
    });

    it("Test Case 1: Sai tài khoản", async () => {
        await driver.findElement(By.id("mui-1")).click();
        await driver.findElement(By.id("mui-1")).sendKeys("test123");
        await driver.findElement(By.id("mui-2")).sendKeys("Abc1234@");
        await driver.findElement(By.css(".MuiButton-root")).click();

        await driver.sleep(5000);

        assert(
            (await driver
                .findElement(By.css(".MuiPaper-elevation0"))
                .getText()) == "Incorrect Username"
        );
    });

    it("Test Case 2: Sai mật khẩu", async () => {
        await driver.findElement(By.id("mui-1")).click();
        await driver.findElement(By.id("mui-1")).sendKeys("test12");
        await driver.findElement(By.id("mui-2")).sendKeys("Abc12345");
        await driver.findElement(By.css(".MuiButton-root")).click();

        await driver.sleep(5000);

        assert(
            (await driver
                .findElement(By.css(".MuiPaper-elevation0"))
                .getText()) == "Incorrect Password"
        );
    });

    it("Test Case 3: Đăng nhập thành công", async () => {
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
});
