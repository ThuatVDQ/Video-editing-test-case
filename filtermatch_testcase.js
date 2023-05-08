const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Filter match", function () {
    let driver;

    before(async function () {
        // Khởi tạo WebDriver
        driver = await new Builder().forBrowser("chrome").build();
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
        await driver.get("http://localhost:3000");
        await driver.sleep(2000);
    });
    /*
    it("Test Case 1: lọc theo tên giải đấu", async () => {
        await driver
            .findElement(
                By.css(".ant-table-cell:nth-child(1) .ant-dropdown-trigger")
            )
            .click();

        await driver.findElement(By.xpath("//label/span/input")).click();

        await driver.findElement(By.xpath("//button[2]/span")).click();

        await driver.sleep(2000);

        await driver
            .takeScreenshot()
            .then((image) =>
                require("fs").writeFileSync(
                    "filterMatch-tc1.png",
                    image,
                    "base64"
                )
            );
        //reset lại filter
        await driver
            .findElement(
                By.css(".ant-table-cell:nth-child(1) .ant-dropdown-trigger")
            )
            .click();

        await driver.findElement(By.xpath("//div[2]/button/span")).click();
    });

    it("Test Case 2: lọc theo tên đội", async () => {
        await driver
            .findElement(
                By.css(".ant-table-cell:nth-child(2) .ant-dropdown-trigger")
            )
            .click();

        await driver.findElement(By.css(".ant-input")).sendKeys("vietnam");

        await driver.findElement(By.xpath("//button/span[2]")).click();

        await driver.sleep(2000);

        await driver
            .takeScreenshot()
            .then((image) =>
                require("fs").writeFileSync(
                    "filterMatch-tc2.png",
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

        await driver
            .findElement(By.xpath("//div/div/div/div/div/div[2]/button"))
            .click();
    });

    it("Test Case 3: lọc theo thời gian giải đấu", async () => {
        await driver
            .findElement(
                By.css(".ant-table-cell:nth-child(3) .ant-dropdown-trigger")
            )
            .click();

        await driver
            .findElement(By.css(".ant-picker-input-active > input"))
            .click();

        await driver.findElement(By.xpath("//td[7]/div")).click();

        await driver
            .findElement(
                By.xpath("//div[2]/div/div[2]/table/tbody/tr[5]/td[4]/div")
            )
            .click();

        await driver.findElement(By.css(".ant-btn-primary")).click();

        await driver.sleep(2000);

        await driver
            .takeScreenshot()
            .then((image) =>
                require("fs").writeFileSync(
                    "filterMatch-tc3.png",
                    image,
                    "base64"
                )
            );
        //reset lại filter
        await driver
            .findElement(
                By.css(".ant-table-cell:nth-child(3) .ant-dropdown-trigger")
            )
            .click();

        await driver.findElement(By.xpath("//div[2]/button")).click();
    });
*/
    it("Test Case 4: lọc theo chanel giải đấu", async () => {
        await driver.findElement(By.xpath("//th[4]/div/span[2]")).click();

        await driver.findElement(By.css(".ant-input")).sendKeys("vtv");
        await driver.sleep(2000);
        await driver.findElement(By.css(".ant-btn-primary")).click();

        await driver.sleep(2000);

        await driver
            .takeScreenshot()
            .then((image) =>
                require("fs").writeFileSync(
                    "filterMatch-tc4.png",
                    image,
                    "base64"
                )
            );
        //reset lại filter
        await driver
            .findElement(
                By.css(".ant-table-cell:nth-child(4) .ant-dropdown-trigger")
            )
            .click();

        await driver.findElement(By.xpath("//div[2]/button")).click();
    });
});
