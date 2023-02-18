import puppeteer from "puppeteer";
describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".eventCard");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".eventCard .description");
    expect(eventDetails).toBeNull();
  });
  test("User can expand an event to see its details", async () => {
    await page.click(".eventCard .showDetails");
    const eventDetails = await page.$(".eventCard .description");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".eventCard .showDetails");
    await page.click(".eventCard .collapseDetails");
    const eventDetails = await page.$(".eventCard .description");
    expect(eventDetails).toBeNull();
  });
});
