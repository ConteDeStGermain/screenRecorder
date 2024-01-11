require('dotenv').config()
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const { exec } = require('child_process');


const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });

  const page = await browser.newPage();
  await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fclassroom.google.com%2F&emr=1&followup=https%3A%2F%2Fclassroom.google.com%2F&ifkv=ASKXGp38XQD342-5MlElrLTgg7IAgglt6UixzE8dNhNGh8YoEeZdidrunhedzyLyId_408CDPPkg&passive=1209600&service=classroom&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-720719761%3A1704937311118373&theme=glif');
  await wait(2000);

  await page.type('input[type^="email"]', process.env.EMAIL);
  await page.keyboard.press('Enter');

  await wait(2000);
  
  await page.type('input[type^="password"]', process.env.PASSWORD);
  await page.keyboard.press('Enter');



  const recorder = new PuppeteerScreenRecorder(page);
  await recorder.start('./video/simple.mp4')
  
  exec('python audio.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Python script: ${error}`);
      return;
    }

    console.log(`Python script output:\n${stdout}`);
  });
  
  await wait(30000);

  await recorder.stop();
  await browser.close();
})();