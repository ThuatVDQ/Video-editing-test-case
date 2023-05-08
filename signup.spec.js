const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const { describe, it, beforeEach, afterEach } = require('mocha')

describe('sign-up', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('sign-up', async function() {
    await driver.get("http://localhost:3000/login")
    await driver.manage().window().setRect({ width: 974, height: 1032 })
    await driver.findElement(By.css(".MuiGrid-root:nth-child(4) > div")).click()
    await driver.findElement(By.id("mui-3")).click()
    await driver.findElement(By.id("mui-3")).sendKeys("Test0123@")
    await driver.findElement(By.id("mui-3")).click()
    await driver.findElement(By.id("mui-3")).sendKeys("Test0123@1")
    await driver.findElement(By.id("mui-4")).click()
    await driver.findElement(By.id("mui-4")).sendKeys("panhtu0902@gmail.com")
    await driver.findElement(By.id("mui-5")).sendKeys("anhtu123")
    await driver.findElement(By.id("mui-6")).click()
    await driver.findElement(By.id("mui-3")).click()
    await driver.findElement(By.id("mui-3")).click()
    {
      const element = await driver.findElement(By.id("mui-3"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.id("mui-3")).click()
    await driver.findElement(By.id("mui-6")).click()
    await driver.findElement(By.id("mui-6")).sendKeys("Test0123@1")
    await driver.findElement(By.id("mui-7")).click()
    await driver.findElement(By.id("mui-7")).sendKeys("Test0123@1")
    await driver.findElement(By.css(".MuiButton-root")).click()
  })
})